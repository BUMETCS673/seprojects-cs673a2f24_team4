import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';
import { validatePostShortlist } from '../../../../validations';

const shortList: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<{ Querystring: { jobListingId: string } }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      if (request.authUser.group && request.authUser.group?.includes('recruiter')) {
        const shortlistedApplications = await dbClient.recruiterShortlist.findMany({
          where: {
            recruiterId: request.userId,
            jobListingId: request.query.jobListingId,
          },
          include: {
            application: { include: { resume: true } },
          },
        });
        reply.send(shortlistedApplications);
      } else {
        reply.status(400).send({ message: 'Not authorized' });
      }
    },
  );

  type shortListPostBody = {
    applicationId: string;
    jobListingId: string;
  };

  fastify.post<{ Body: shortListPostBody }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      if (request.authUser.group && request.authUser.group?.includes('recruiter')) {
        const body = await validatePostShortlist.validate(request.body);
        const newShortlist = await dbClient.recruiterShortlist.create({
          data: {
            recruiter: {
              connect: {
                id: request.userId,
              },
            },
            application: {
              connect: {
                id: body.applicationId,
              },
            },
            jobListing: {
              connect: {
                id: body.jobListingId,
              },
            },
          },
        });
        reply.status(201).send(newShortlist);
      } else {
        reply.status(400).send({ message: 'Not authorized' });
      }
    },
  );

  fastify.delete<{ Querystring: { shortlistId: string } }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      if (request.authUser.group && request.authUser.group?.includes('recruiter')) {
        await dbClient.recruiterShortlist.delete({
          where: {
            id: request.query.shortlistId,
            recruiterId: request.userId,
          },
        });
        reply.status(204);
      } else {
        reply.status(400).send({ message: 'Not authorized' });
      }
    },
  );
};
export default shortList;
