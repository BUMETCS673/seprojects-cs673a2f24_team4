import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';
import {
  validatePostApplications,
  validatePutApplications,
} from '../../../../validations';

const applications: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { ...getRequestQueryString }, async (request, reply) => {
    const dbClient = fastify.container<PrismaClient>('PrismaClient');
    const applicationsData = await dbClient.applications.findMany({
      where: {
        applicantId: request.userId,
      },
    });
    reply.send(applicationsData);
  });

  type applicationPostBody = {
    jobListingId: string;
    resumeId: string;
  };

  fastify.post<{ Body: applicationPostBody }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      const body = await validatePostApplications.validate(request.body);
      const newApplication = await dbClient.applications.create({
        data: {
          applicant: {
            connect: {
              id: request.userId,
            },
          },
          jobListing: {
            connect: {
              id: body.jobListingId,
            },
          },
          resume: {
            connect: {
              id: body.resumeId,
            },
          },
        },
      });
      reply.status(201).send(newApplication);
    },
  );

  enum ApplicationStatus {
    APPLIED = 'APPLIED',
    CANCELLED = 'CANCELLED',
    INTERVIEWING = 'INTERVIEWING',
    REJECTED = 'REJECTED',
    OFFER = 'OFFER',
  }

  type applicationPutBody = {
    status: ApplicationStatus;
  };

  fastify.put<{ Querystring: { applicationId: string }; Body: applicationPutBody }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      if (request.authUser.group.includes('recruiter')) {
        const body = await validatePutApplications.validate(request.body);
        const updatedApplication = await dbClient.applications.update({
          where: {
            id: request.query.applicationId,
          },
          data: {
            status: body.status,
          },
        });
      } else {
        reply.status(400).send({ message: 'Not authorized' });
      }
    },
  );

  fastify.delete<{ Querystring: { applicationId: string } }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      await dbClient.applications.update({
        where: {
          id: request.query.applicationId,
          applicantId: request.userId,
        },
        data: {
          RecruiterShortlist: {
            deleteMany: {},
          },
        },
      });
      await dbClient.applications.delete({
        where: {
          id: request.query.applicationId,
          applicantId: request.userId,
        },
      });
      reply.status(204);
    },
  );
};
export default applications;
