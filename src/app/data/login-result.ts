/**
 * The login result containing the JWT tokens for access and refresh
 */
export interface LoginResult {
  /**
   * The JWT token used to authenticate with the backend
   */
  accessToken: string;
  /**
   * The JWT token used to refresh the access token
   */
  refreshToken?: string;
}
