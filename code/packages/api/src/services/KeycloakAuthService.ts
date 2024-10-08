import axios from 'axios';

export class KeycloakAuthService {
  constructor(
    private _authUrl: string,
    private _realm: string // private _clientId: string, // private _clientSecret: string
  ) {}

  async verifyToken<KeycloakUser>(token: string): Promise<KeycloakUser> {
    try {
      const { data } = await axios.get<KeycloakUser>(
        `${this._authUrl}realms/${this._realm}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
}
