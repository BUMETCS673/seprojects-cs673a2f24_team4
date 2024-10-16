import { PrismaClient } from '@se-t4/database';
import { FastifyPluginAsync } from 'fastify';
import { getRequestQueryString } from '../../../../swagger/schema';

import * as path from 'path';

const storage: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    '/',
    { preHandler: fastify.upload.single('file') },
    async (request, reply) => {
      if (request.file) {
        const { mimetype, filename, originalname } = request.file;
        const dbClient = fastify.container<PrismaClient>('PrismaClient');
        const storage = await dbClient.storage.create({
          data: {
            mimetype: mimetype,
            name: filename || originalname,
            url: `/api/v1/storage/${filename || originalname}`,
            user: {
              connect: {
                id: request.userId,
              },
            },
          },
        });
        reply.send(storage);
      } else {
        reply.badRequest();
      }
    },
  );

  fastify.get<{ Params: { fileName: string } }>(
    '/:fileName',
    { ...getRequestQueryString },
    async (request, reply) => {
      const uploadDir = path.join(__dirname, '..', '..', 'public/uploads/');
      const fileName = request.params.fileName;
      const dbClient = fastify.container<PrismaClient>('PrismaClient');
      const fileData = await dbClient.storage.findUniqueOrThrow({
        where: {
          url: request.url,
          userId: request.userId,
        },
      });
      reply.header('Content-Disposition', 'attachment; filename=example.pdf');
      return reply.sendFile(fileName);
    },
  );
};

export default storage;
