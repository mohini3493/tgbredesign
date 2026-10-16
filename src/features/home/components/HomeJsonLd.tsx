import { siteConfig, socialLinks } from "@/config/site";
import { eventsService } from "@/features/events/services";

/** Organization + Event structured data for rich results. */
export async function HomeJsonLd() {
  const events = await eventsService.getUpcoming(6);
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}#org`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: siteConfig.logo,
      sameAs: socialLinks.map((s) => s.href),
    },
    ...events.map((e) => ({
      "@type": "Event",
      name: e.title,
      startDate: e.startDate,
      endDate: e.endDate,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: e.coverImage,
      url: `${siteConfig.url}/events/${e.slug}`,
      location: { "@type": "Place", name: e.venue, address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: "IN" } },
      ...(e.priceINR != null && {
        offers: { "@type": "Offer", price: e.priceINR, priceCurrency: "INR", url: `${siteConfig.url}${e.ticketUrl}` },
      }),
    })),
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
