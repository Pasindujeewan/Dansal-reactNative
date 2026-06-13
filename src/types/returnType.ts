type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type returnType = {
  data: any;
  newTokens: Tokens;
};
