import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { validatePostMe } from '../../../../validations';
import { getRequestQueryString } from '../../../../swagger/schema';

const me: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  type MePost = {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };

  const MePostSchema = {
    firstName: String,
    lastName: String,
    phone: String,
  };

  fastify.post<{ Body: MePost }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      const body = await validatePostMe.validate(request.body);
      const providerDetails = {
        providerId: request.authUser.sub,
        providerName: 'keycloak',
        username: request.authUser.preferred_username,
      };
      const user = await dbClient.users.upsert({
        create: {
          email: request.authUser.email,
          group: request.authUser.group[0],
          firstName: body.firstName ? body.firstName : request.authUser.given_name,
          lastName: body.lastName ? body.lastName : request.authUser.family_name,
          phone: body.phone,
          ...providerDetails,
        },
        update: {
          group: request.authUser.group[0],
          firstName: body.firstName ? body.firstName : request.authUser.given_name,
          lastName: body.lastName ? body.lastName : request.authUser.family_name,
          phone: body.phone,
          ...providerDetails,
        },
        where: {
          email: request.authUser.email,
        },
      });
      const decoded = request.authUser;
      reply.send({ user, decoded });
    }
  );
};

export default me;
