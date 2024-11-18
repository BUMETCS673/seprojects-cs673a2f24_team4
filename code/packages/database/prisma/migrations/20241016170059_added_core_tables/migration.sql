/*
  Warnings:

  - You are about to drop the column `archivedAt` on the `Storage` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'CANCELLED', 'INTERVIEWING', 'REJECTED', 'OFFER');

-- AlterTable
ALTER TABLE "Storage" DROP COLUMN "archivedAt";

-- CreateTable
CREATE TABLE "JobListings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "coreRequirements" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "JobListings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resumes" (
    "id" TEXT NOT NULL,
    "impactScore" DOUBLE PRECISION,
    "presentationScore" DOUBLE PRECISION,
    "competencyScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "storageId" TEXT NOT NULL,

    CONSTRAINT "Resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applications" (
    "id" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "applicantId" TEXT NOT NULL,
    "jobListingId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruiterShortlist" (
    "id" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "jobListingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RecruiterShortlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeMatch" (
    "id" TEXT NOT NULL,
    "coreRequirementScore" TEXT NOT NULL,
    "competencyScore" TEXT NOT NULL,
    "overallScore" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "resumeId" TEXT NOT NULL,
    "jobListingId" TEXT NOT NULL,

    CONSTRAINT "ResumeMatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobListings" ADD CONSTRAINT "JobListings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resumes" ADD CONSTRAINT "Resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resumes" ADD CONSTRAINT "Resumes_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_jobListingId_fkey" FOREIGN KEY ("jobListingId") REFERENCES "JobListings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruiterShortlist" ADD CONSTRAINT "RecruiterShortlist_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruiterShortlist" ADD CONSTRAINT "RecruiterShortlist_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruiterShortlist" ADD CONSTRAINT "RecruiterShortlist_jobListingId_fkey" FOREIGN KEY ("jobListingId") REFERENCES "JobListings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeMatch" ADD CONSTRAINT "ResumeMatch_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resumes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeMatch" ADD CONSTRAINT "ResumeMatch_jobListingId_fkey" FOREIGN KEY ("jobListingId") REFERENCES "JobListings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
