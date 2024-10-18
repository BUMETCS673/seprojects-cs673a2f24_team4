import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';
import {
  validatePostJobListing,
  validatePutJobListing,
} from '../../../../validations';

const job: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { ...getRequestQueryString }, async (request, reply) => {
    const dbClient = fastify.container<PrismaClient>('PrismaClient');
    if (request.authUser.group.includes('recruiter')) {
      const jobListings = await dbClient.jobListings.findMany({
        where: { userId: request.userId },
      });
      reply.send(jobListings);
    } else {
      reply.status(400).send({ message: 'Not authorized' });
    }
  });

  type JobListingsPostBody = {
    title: string;
    description: string;
    coreRequirements: string;
  };

  fastify.post<{ Body: JobListingsPostBody }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      const body = await validatePostJobListing.validate(request.body);
      if (request.authUser.group.includes('recruiter')) {
        const newJobListing = await dbClient.jobListings.create({
          data: {
            title: body.title,
            description: body.description,
            coreRequirements: body.coreRequirements,
            user: {
              connect: {
                id: request.userId,
              },
            },
          },
        });
        reply.status(201).send(newJobListing);
      } else {
        reply.status(400).send({ message: 'Not authorized' });
      }
    },
  );

  type JobListingsPutBody = {
    title?: string;
    description?: string;
    coreRequirements?: string;
  };

  fastify.put<{ Body: JobListingsPutBody; Querystring: { jobListingId: string } }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      const body = await validatePutJobListing.validate(request.body);
      if (request.authUser.group.includes('recruiter')) {
        const jobListings = await dbClient.jobListings.update({
          where: { id: request.query.jobListingId, userId: request.userId },
          data: {
            title: body.title,
            description: body.description,
            coreRequirements: body.coreRequirements,
          },
        });
        reply.send(jobListings);
      } else {
        reply.status(400).send({ message: 'Not authorized' });
      }
    },
  );
};
export default job;
