import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: 't4',
  clientId: 't4-client',
};

const _kc = new Keycloak(keycloakConfig);

const initKeycloak = (onAuthenticatedCallback: () => void): void => {
  _kc
    .init({ onLoad: 'login-required' })
    .then((authenticated: boolean) => {
      if (!authenticated) {
        console.warn('User is not authenticated!');
      }
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: () => void): void => {
  _kc.updateToken(5).then(successCallback).catch(doLogin);
};

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles: string[]): boolean =>
  roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;
