import fp from 'fastify-plugin';
import redis, { FastifyRedisPluginOptions, type FastifyRedis } from '@fastify/redis';
import { PrismaClient } from '@se-t4/database';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<any>(async (fastify, opts) => {
  fastify.register(redis, {
    ...opts,
    host: process.env.REDIS_HOST,
    // username: process.env.REDIS_USERNAME,
    // password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT || 6379, // Redis port
    family: process.env.REDIS_IP_FAMILY || 4, // 4 (IPv4) or 6 (IPv6)
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    redis: FastifyRedis;
    refreshCaseCache: (userId: string) => void;
  }
}
