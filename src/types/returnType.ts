/**
 * File: src/types/returnType.ts
 * Purpose: Defines structure returned by API calls including token info.
 */
type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type returnType = {
  data: any;
  newTokens: Tokens;
};
