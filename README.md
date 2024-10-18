# ResumAI

## About

ResumAI is an Applicant Tracking System (ATS) designed for both applicants and recruiters. For applicants, it provides an intelligent overview of their resumes based on job descriptions and allows them to upload their resumes to apply for jobs. For recruiters, it offers a ranked list of all resumes, optimizing the recruitment process. Built with React, Fastify, PostgreSQL, Redis, and integrated with AWS and Kubernetes, ResumAI aims to streamline the hiring workflow with advanced tech solutions.

## Execution Instructions

1. **Install Dependencies**
    Navigate to the project directory and install the required packages:
    ```
    cd code
    yarn install
    ```

2. **Set Up Environment Variables**
    Create `.env` files according to the examples provided in `packages/*/` to configure your environment:
    ```
    cp packages/example.env packages/development.env
    # Edit development.env with your specific settings
    ```

3. **Database Migration and Start Development Server**
    Run Prisma migrations to update your database schema and start the development server:
    ```
    yarn prisma migrate dev
    yarn dev
    ```

## Developer Instructions

### HUSKY SETUP
To ensure that Git hooks are properly set up for running checks before commits, execute the following commands in your project root:

Run these commands in the project root 

```
git config core.hooksPath code/.husky 
chmod ug+x code/.husky/*
```

## Jira Integration
Track project tasks and progress using Jira:
[Jira Link](https://bu-se-team-4.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog)

