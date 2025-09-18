export const QUERY_KEYS = {
  GET_RECENT_POST: "getRecentPost",
  GET_POST_BY_ID: "getPostById",
  GET_POSTS: "getPosts",
  GET_CURRENT_USER: "getCurrentUser",
} as const;
export type QUERY_KEYS = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
