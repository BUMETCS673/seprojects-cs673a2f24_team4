import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';
import { validatePostResume } from '../../../../validations';
import Anthropic from '@anthropic-ai/sdk';
import { BetaTextBlock } from '@anthropic-ai/sdk/resources/beta/messages/messages';

const resume: FastifyPluginAsync = async (fastify): Promise<void> => {
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
    base64Data: string;
  };

  fastify.post<{ Body: ResumePostBody }>(
    '/',
    { ...getRequestQueryString },
    async (request, reply) => {
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      const body = await validatePostResume.validate(request.body);

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
                  data: request.body.base64Data,
                },
              },
              {
                type: 'text',
                text: 'I need to review the resume that is uploaded. The resume will be scored on three metrics in double values between 0.0 and 100.0, impact score, presentation score and competency score. I also need a short paragraph for the review and improvements. You have to return the response in the following JSON format: { impactScore: 20.0, presentationScore: 20.0, competencyScore: 20.0, review: sometext}. I only need the JSON in the response and nothing else',
              },
            ],
            role: 'user',
          },
        ],
      });
      let impactScore = 0.0;
      let presentationScore = 0.0;
      let competencyScore = 0.0;
      let review = '';
      const anthropicContent = response.content;
      if (anthropicContent.length > 0) {
        const content = anthropicContent[0] as BetaTextBlock;
        const scores = JSON.parse(content.text);
        impactScore = scores['impactScore'];
        presentationScore = scores['presentationScore'];
        competencyScore = scores['competencyScore'];
        review = scores['review'];
      }

      const createdResume = await dbClient.resumes.create({
        data: {
          impactScore: impactScore,
          presentationScore: presentationScore,
          competencyScore: competencyScore,
          review: review,
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
          userId: request.userId,
        },
      });
      reply.status(204);
    },
  );
};
export default resume;
