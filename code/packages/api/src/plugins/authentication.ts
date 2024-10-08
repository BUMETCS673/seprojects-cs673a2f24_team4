import fp from 'fastify-plugin';
import { KeycloakAuthService } from '../services/KeycloakAuthService';
import { KeycloakUser } from '../models';
import { PrismaClient } from '../../../database/dist/index';

export interface AuthPluginOptions {
  // Specify Auth plugin options here
}

export default fp<AuthPluginOptions>(async (fastify, _opts) => {
  fastify.addHook<{ Querystring: { pages: string } }>(
    'preHandler',
    async (request, reply) => {
      if (!/^\/(documentation|storage).*/g.test(request.url)) {
        const token = request.headers['authorization'];
        if (!token) {
          return reply.unauthorized('Missing token');
        }
        try {
          const decoded = await fastify
            .container<KeycloakAuthService>('AuthService')
            .verifyToken<KeycloakUser>(token.replace('Bearer ', ''));
          const dbClient = fastify.container<PrismaClient>('PrismaClient');
          const user = await dbClient.users.findUnique({
            select: {
              id: true,
            },
            where: {
              email: decoded.email,
            },
          });
          // console.log(user)
          request.authUser = decoded;
          request.userId = user?.id;
        } catch (_err) {
          console.log(_err);
          return reply.unauthorized('Invalid token');
        }
      }
    }
  );
});

declare module 'fastify' {
  export interface FastifyRequest {
    authUser: KeycloakUser;
    userId?: string;
  }
}
