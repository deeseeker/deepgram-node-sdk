import { isBrowser } from "./helpers";
import { version } from "./version";

export const DEFAULT_HEADERS = {
  "X-Client-Info": `@deepgram/sdk; ${isBrowser() ? "browser" : "server"}; v${version}`,
  "User-Agent": `@deepgram/sdk/${version}`,
  "Content-Type": "application/json",
};

export const DEFAULT_URL = "https://api.deepgram.com";

export const DEFAULT_GLOBAL_OPTIONS = {
  url: DEFAULT_URL,
  headers: DEFAULT_HEADERS,
};

export const DEFAULT_OPTIONS = {
  global: DEFAULT_GLOBAL_OPTIONS,
};