import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';

const about: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { ...getRequestQueryString }, async (request, reply) => {
    const aboutObject = {
      version: '0.0.1',
      name: 'resumAI',
    };
    reply.send(aboutObject);
  });
};
export default about;
