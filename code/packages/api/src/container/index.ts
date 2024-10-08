import { Container } from 'typedi';
import { PrismaClient } from '@se-t4/database';

import { KeycloakAuthService } from '../services/KeycloakAuthService';

const { KEYCLOAK_AUTH_URL, KEYCLOAK_AUTH_REALM } = process.env;

if (!KEYCLOAK_AUTH_URL || !KEYCLOAK_AUTH_REALM) {
  console.error(
    'Missing environment variables: KEYCLOAK_AUTH_URL, KEYCLOAK_AUTH_REALM'
  );
}

Container.set<KeycloakAuthService>(
  'AuthService',
  new KeycloakAuthService(KEYCLOAK_AUTH_URL as string, KEYCLOAK_AUTH_REALM as string)
);

// Prisma Client
Container.set<PrismaClient>('PrismaClient', new PrismaClient());

/**
 * Get Container Item
 */
const container = <T>(serviceName: string) => {
  return Container.get<T>(serviceName);
};

export default container;
