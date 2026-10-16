import { describe, expect, it } from "vitest";
import { dateBlock, formatDateRange, formatINR, formatKm } from "../format";

describe("format helpers", () => {
  it("formats km", () => {
    expect(formatKm(490)).toBe("490 km");
    expect(formatKm(42000)).toBe("42K km");
  });
  it("formats INR", () => {
    expect(formatINR(2499)).toBe("₹2,499");
  });
  it("formats date ranges", () => {
    expect(formatDateRange("2026-12-04", "2026-12-06")).toBe("04 – 06 Dec 2026");
    expect(formatDateRange("2026-11-30", "2026-12-02")).toBe("30 Nov – 02 Dec 2026");
  });
  it("builds a date block", () => {
    expect(dateBlock("2027-02-19")).toEqual({ day: "19", month: "FEB" });
  });
});
