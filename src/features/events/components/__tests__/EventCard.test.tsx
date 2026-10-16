import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EventCard } from "../EventCard";
import type { TgbEvent } from "../../schemas";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: Record<string, unknown>) => <img alt={String(props.alt)} src={String(props.src)} />,
}));

const event: TgbEvent = {
  id: "e1",
  slug: "india-bike-week-2026",
  title: "India Bike Week 2026",
  venue: "Vagator",
  city: "Goa",
  startDate: "2026-12-04",
  endDate: "2026-12-06",
  coverImage: "https://images.unsplash.com/photo-1",
  ticketUrl: "/events/india-bike-week-2026",
  priceINR: 2499,
  membersOnly: true,
};

describe("EventCard", () => {
  it("shows date block, price, members badge and booking link", () => {
    render(<EventCard event={event} />);
    expect(screen.getByText("04")).toBeInTheDocument();
    expect(screen.getByText("DEC")).toBeInTheDocument();
    expect(screen.getByText("₹2,499")).toBeInTheDocument();
    expect(screen.getByText("Members only")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book Now" })).toHaveAttribute("href", "/events/india-bike-week-2026");
  });
});
