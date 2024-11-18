/*
  Warnings:

  - You are about to drop the column `createdAt` on the `RecruiterShortlist` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `RecruiterShortlist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RecruiterShortlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecruiterShortlist" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";
