import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';
import {
  validatePostApplications,
  validatePutApplications,
} from '../../../../validations';
import * as path from 'path';
import * as fs from 'fs';
import Anthropic from '@anthropic-ai/sdk';
import { BetaTextBlock } from '@anthropic-ai/sdk/resources/beta/messages/messages';

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

      const jobListing = await dbClient.jobListings.findUnique({
        where: {
          id: body.jobListingId,
        },
      });

      const resume = await dbClient.resumes.findUnique({
        where: {
          id: body.resumeId,
        },
        include: {
          storage: true,
        },
      });

      let matchScore = null;

      if (jobListing && resume) {
        const uploadDir = path.join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '..',
          'public/uploads/',
        );
        const fileName = resume?.storage.name ?? '';
        const fileData = fs.readFileSync(path.join(uploadDir, fileName));

        const buffer = Buffer.from(fileData).toString('base64');

        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const response = await anthropic.beta.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          betas: ['pdfs-2024-09-25'],
          max_tokens: 1024,
          messages: [
            {
              content: [
                {
                  type: 'document',
                  source: {
                    media_type: 'application/pdf',
                    type: 'base64',
                    data: buffer,
                  },
                },
                {
                  type: 'text',
                  text: `I have uploaded a resume that I need to match against a job description (provided at the end) with matchScore out of 100. Please provide the response in the following JSON format { matchScore: 23.0 }. Here is the job description. Title: ${jobListing?.title}, Description: ${jobListing?.description}, Core Requirements: ${jobListing?.coreRequirements}. I only want the JSON and nothing else`,
                },
              ],
              role: 'user',
            },
          ],
        });

        const anthropicContent = response.content;

        console.log(anthropicContent);
        if (anthropicContent.length > 0) {
          const content = anthropicContent[0] as BetaTextBlock;
          const scores = JSON.parse(content.text);
          matchScore = scores['matchScore'];
        }
      }

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
          matchScore: matchScore,
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
