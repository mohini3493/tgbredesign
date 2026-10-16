import { afterEach, describe, expect, it, vi } from "vitest";
import { getDataSource, isMock } from "../data-source";

describe("data source switch", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("defaults to mock", () => {
    vi.stubEnv("NEXT_PUBLIC_DATA_SOURCE", "");
    expect(getDataSource()).toBe("mock");
    expect(isMock()).toBe(true);
  });

  it("switches to the live API", () => {
    vi.stubEnv("NEXT_PUBLIC_DATA_SOURCE", "api");
    expect(getDataSource()).toBe("api");
    expect(isMock()).toBe(false);
  });
});
