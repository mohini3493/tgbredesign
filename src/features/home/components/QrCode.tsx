"use client";

import { QRCodeSVG } from "qrcode.react";

type Level = "L" | "M" | "Q" | "H";

export function QrCode({ value, size = 96, level = "M" }: { value: string; size?: number; level?: Level }) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      fgColor="#111418"
      bgColor="#ffffff"
      level={level}
      title="Scan to download the TGB app"
    />
  );
}
