import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';
import { validatePostResume } from '../../../../validations';
import { connect } from 'http2';

const resume: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { ...getRequestQueryString }, async (request, reply) => {
    const dbClient = fastify.container<PrismaClient>('PrismaClient');
    const resumes = await dbClient.resumes.findMany({
      where: {
        userId: request.userId,
      },
      include: {
        storage: true,
      },
    });
    reply.send(resumes);
  });

  type ResumePostBody = {
    storageId: string;
  };

  fastify.post<{ Body: ResumePostBody }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      const body = await validatePostResume.validate(request.body);
      const createdResume = await dbClient.resumes.create({
        data: {
          storage: {
            connect: {
              id: body.storageId,
            },
          },
          user: {
            connect: {
              id: request.userId,
            },
          },
        },
      });
      reply.status(201).send(createdResume);
    },
  );

  fastify.delete<{ Querystring: { resumeId: string } }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');

      await dbClient.resumes.delete({
        where: {
          id: request.query.resumeId,
        },
      });
      reply.status(204);
    },
  );
};
export default resume;
