export const QUERY_KEYS = {
  GET_RECENT_POST: "getRecentPost",
} as const;
export type QUERY_KEYS = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
