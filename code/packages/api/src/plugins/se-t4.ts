import { Prisma, PrismaClient } from '@se-t4/database';
import fp from 'fastify-plugin';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import multer from 'fastify-multer';
import slugify from 'slugify';
import { ValidationError } from 'yup';
import container from '../container';

const path = require('path');

export interface SeT4PluginOptions {
  // Specify plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SeT4PluginOptions>(async (fastify, _opts) => {
  fastify.decorate('container', container);

  /**
   * Upload Multer
   */
  const uploadDir = path.join(__dirname, '..', '..', 'public/uploads/');
  const upload = multer({
    limits: {
      fieldSize: 1024 * 1024 * 1024,
    },
    storage: multer.diskStorage({
      destination: uploadDir,
      filename: (_req, file, cb) => {
        const name = slugify(file.originalname, { lower: true });
        cb(null, `${new Date().getTime()}-${name}`);
      },
    }),
  });
  fastify.register(multer.contentParser);
  fastify.decorate('upload', upload);

  //Static
  fastify.register(fastifyStatic, {
    root: uploadDir,
  });

  // Cors
  fastify.register(fastifyCors, {});

  // Prisma Middleware to overwrite URL with aws token
  /**
   * this not the best solution, but it works for now
   * TODO: find a better solution
   * Prisma does have option to work with computed fields, but it does not have middle ware support
   * I wanted to have solution which will work with all the queries
   */
  const prisma = container<PrismaClient>('PrismaClient');

  prisma.$use(async (params, next) => {
    if (params.action == 'findUnique') {
      params.action = 'findFirst';
      const where = params.args.where;
      params.args.where = {};
      for (const arg of Object.entries(where)) {
        if (typeof arg[1] !== 'object') {
          params.args.where[arg[0]] = arg[1];
        } else {
          for (const subarg of Object.entries(arg[1] as Record<string, unknown>)) {
            params.args.where[subarg[0]] = subarg[1];
          }
        }
      }
      params.args.where['deletedAt'] = null;
    }
    if (params.action == 'findMany') {
      if (!params.args) {
        params.args = {};
      }
      if (params.args?.where != undefined) {
        if (params.args.where.deletedAt == undefined) {
          params.args.where['deletedAt'] = null;
        }
      } else {
        params.args['where'] = { deletedAt: null };
      }
    }
    return next(params);
  });

  prisma.$use(async (params, next) => {
    if (params.action == 'updateMany' || params.action == 'update') {
      if (!params.args) {
        params.args = {};
      }
      if (!params.args.data) {
        params.args.data = {};
      }
      params.args.data['updatedAt'] = new Date();
    }
    return next(params);
  });

  prisma.$use(async (params, next) => {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args['data'] = { deletedAt: new Date() };
    }
    if (params.action == 'deleteMany') {
      if (!params.args) {
        params.args = {};
      }
      params.action = 'updateMany';
      if (params.args?.data != undefined) {
        params.args.data['deletedAt'] = new Date();
      } else {
        params.args['data'] = { deletedAt: new Date() };
      }
    }
    return next(params);
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    container<T>(serviceName: string): T;
    upload: ReturnType<typeof multer>;
  }
  export interface FastifyRequest {
    file?: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size?: number;
      destination?: string;
      filename?: string;
      path?: string;
      buffer?: Buffer;
      stream?: NodeJS.ReadableStream;
    };
  }
}
