import fp from 'fastify-plugin';
import sawgger, { SwaggerOptions } from '@fastify/swagger';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<SwaggerOptions>(async (fastify, _opts) => {
  fastify.register(sawgger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Software Engineering Team 4 API Documentation',
        version: '1.0.0',
      },
      securityDefinitions: {
        bearerAuth: {
          type: 'oauth2',
          flow: 'password',
          tokenUrl: 'http://localhost:8080/realms/t4/protocol/openid-connect/token',
          scopes: {},
        },
      },
    },
    exposeRoute: true,
  });
});
