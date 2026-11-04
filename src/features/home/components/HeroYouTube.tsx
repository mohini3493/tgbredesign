"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import { SmartImage } from "@/components/shared/SmartImage";

/**
 * YouTube shows its play/pause overlay for ~3s whenever a player starts or restarts
 * (including seeking back to 0 or its own `loop`), and CSS can't reach inside the iframe.
 * So a player is only ever shown once it has been playing longer than that.
 */
const OVERLAY_S = 3.5;
/** Swap this close to the end, so the old player has faded out before YouTube's end screen. */
const SWAP_BEFORE_END_S = 1.2;
/** The hidden player starts this long before the visible one ends, so its overlay is gone by the swap. */
const HANDOFF_LEAD_S = SWAP_BEFORE_END_S + OVERLAY_S + 1;

type Slot = 0 | 1;

/**
 * Muted, seamlessly looping YouTube video as a cover background.
 * Two players take turns: while one is visible, the other restarts hidden and takes over at the end.
 * The video's own thumbnail shows until the first player is playing cleanly (and if playback ever stops).
 * Reduced motion keeps just the thumbnail. The players can't be interacted with.
 */
export function HeroYouTube({ videoId, alt }: { videoId: string; alt: string }) {
  const reduce = useReducedMotion();
  const host0 = useRef<HTMLDivElement>(null);
  const host1 = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Slot | null>(null);

  useEffect(() => {
    const hosts = [host0.current, host1.current];
    if (reduce || !hosts[0] || !hosts[1]) return;
    let cancelled = false;
    const players: YTPlayer[] = [];
    const states = [-1, -1];
    let active: Slot = 0;
    let visible = false;
    let handoffStarted = false;
    let tick: ReturnType<typeof setInterval> | undefined;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const pauseTimers: ReturnType<typeof setTimeout>[] = [];

    const show = (slot: Slot | null) => {
      visible = slot !== null;
      setShown(slot);
    };
    const revealLater = () => {
      revealTimer ??= setTimeout(() => {
        revealTimer = undefined;
        show(active);
      }, OVERLAY_S * 1000);
    };
    const hide = () => {
      clearTimeout(revealTimer);
      revealTimer = undefined;
      show(null);
    };

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      const { PLAYING, PAUSED, ENDED } = YT.PlayerState;

      const create = (slot: Slot) => {
        // YT replaces this node with its iframe, so keep it out of React's tree
        const mount = document.createElement("div");
        hosts[slot]!.appendChild(mount);
        players[slot] = new YT.Player(mount, {
          videoId,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: slot === 0 ? 1 : 0,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (e) => {
              e.target.getIframe().tabIndex = -1;
              e.target.mute();
              if (slot === 0) e.target.playVideo();
            },
            onStateChange: (e) => {
              states[slot] = e.data;
              if (slot !== active) return;
              if (e.data === PLAYING && !visible) revealLater();
              // A stopped player shows the big play button: fall back to the thumbnail
              if ((e.data === PAUSED || e.data === ENDED) && visible) hide();
            },
          },
        });
      };
      create(0);
      create(1);

      tick = setInterval(() => {
        const current = players[active];
        const nextSlot: Slot = active === 0 ? 1 : 0;
        const next = players[nextSlot];
        const duration = current?.getDuration?.() ?? 0;
        const time = current?.getCurrentTime?.() ?? 0;
        if (!duration || !next?.playVideo) return;

        if (!handoffStarted && time >= duration - HANDOFF_LEAD_S) {
          handoffStarted = true;
          next.seekTo(0, true);
          next.playVideo();
        }

        if (time >= duration - SWAP_BEFORE_END_S) {
          handoffStarted = false;
          if (states[nextSlot] === PLAYING) {
            active = nextSlot;
            if (visible) show(active);
            // Let the crossfade finish before parking the old player at the start
            pauseTimers.push(
              setTimeout(() => {
                current.pauseVideo();
                current.seekTo(0, true);
              }, 1000),
            );
          } else {
            // Hidden player didn't start (e.g. blocked): restart this one behind the thumbnail
            hide();
            current.seekTo(0, true);
            revealLater();
          }
        }
      }, 100);
    });

    return () => {
      cancelled = true;
      clearInterval(tick);
      clearTimeout(revealTimer);
      pauseTimers.forEach(clearTimeout);
      players.forEach((p) => p?.destroy());
      hosts.forEach((h) => h?.replaceChildren());
    };
  }, [videoId, reduce]);

  return (
    <>
      <SmartImage
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {!reduce && (
        <>
          <PlayerLayer hostRef={host0} visible={shown === 0} />
          <PlayerLayer hostRef={host1} visible={shown === 1} />
        </>
      )}
    </>
  );
}

function PlayerLayer({ hostRef, visible }: { hostRef: RefObject<HTMLDivElement | null>; visible: boolean }) {
  return (
    // Size container so the 16:9 player can cover it like object-fit: cover
    <motion.div
      className="pointer-events-none absolute inset-0 [container-type:size]"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden
    >
      {/* Slightly oversized so YouTube's edge chrome (title, logo) falls outside the hero */}
      <div
        ref={hostRef}
        className="absolute top-1/2 left-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-1/2 scale-[1.15] [&>iframe]:border-0"
      />
    </motion.div>
  );
}

/* Minimal typings for the parts of the YouTube IFrame API used here. */
type YTPlayer = {
  mute(): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getDuration(): number;
  getCurrentTime(): number;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
};
type YTEvent = { target: YTPlayer; data: number };
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string;
      host?: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, number>;
      events?: { onReady?: (e: YTEvent) => void; onStateChange?: (e: YTEvent) => void };
    },
  ) => YTPlayer;
  PlayerState: Record<"UNSTARTED" | "ENDED" | "PLAYING" | "PAUSED" | "BUFFERING" | "CUED", number>;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | undefined;

/** Loads https://www.youtube.com/iframe_api once per page. */
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}
