/**
 * Decides where feature services read data from.
 *  - "mock": JSON fixtures in src/mocks (default; lets the web team build before the API is ready)
 *  - "api":  the live TGB backend shared with the mobile app
 * Switching requires no UI changes: components only ever call services.
 */
export type DataSource = "mock" | "api";

export function getDataSource(): DataSource {
  return process.env.NEXT_PUBLIC_DATA_SOURCE === "api" ? "api" : "mock";
}

export const isMock = () => getDataSource() === "mock";
