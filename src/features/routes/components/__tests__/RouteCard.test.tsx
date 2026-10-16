import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RouteCard } from "../RouteCard";
import type { Route } from "../../schemas";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: Record<string, unknown>) => <img alt={String(props.alt)} src={String(props.src)} />,
}));

const route: Route = {
  id: "1",
  slug: "leh-ladakh",
  name: "Leh Ladakh",
  state: "Jammu & Kashmir",
  distanceKm: 490,
  difficulty: "expert",
  bestSeason: "May – Sep",
  coverImage: "https://images.unsplash.com/photo-1",
};

describe("RouteCard", () => {
  it("renders route info and links to the detail page", () => {
    render(<RouteCard route={route} />);
    expect(screen.getByRole("heading", { name: "Leh Ladakh" })).toBeInTheDocument();
    expect(screen.getByText("Expert")).toBeInTheDocument();
    expect(screen.getByText("490 km")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/routes/leh-ladakh");
  });
});
