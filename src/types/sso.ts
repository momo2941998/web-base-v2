export interface SSOResponse {
  token_type: string;
  /**
   * jwt token dung cho api
   */
  id_token: string;
  /**
   * token for refresh expired jwt
   */
  refresh_token: string;
  /**
   * thoi gian jwt het han tinh bang giay
   */
  expires_in: string;
  state: string;
  access_token: string;
  /**
   * session dung cho api
   */
  sessionId: string;
  [index: string]: string;
}

export interface UserInfo {
  username: string;
  email: string;
  fullname: string;
}