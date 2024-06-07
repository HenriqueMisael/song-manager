export interface Authentication {
  accessToken: string;
  tokenType: string;
  scope: string;
  expiresIn: number;
  refreshToken: string;
}
