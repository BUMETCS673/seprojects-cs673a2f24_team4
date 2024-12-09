# ResumAI

## About

ResumAI is an Applicant Tracking System (ATS) designed for both applicants and recruiters. For applicants, it provides an intelligent overview of their resumes based on job descriptions and allows them to upload their resumes to apply for jobs. For recruiters, it offers a ranked list of all resumes, optimizing the recruitment process. Built with React, Fastify, PostgreSQL, Redis, and integrated with AWS and Kubernetes, ResumAI aims to streamline the hiring workflow with advanced tech solutions.

App is up on http://3.80.136.244:5173/

Recruiter side:
test_recruiter_1
password1

Appliacant side:
test_applicant_1
password1

## Setup Instructions

1. **Install Dependencies**<br >
    Navigate to the project directory and install the required dependencies:
    ```
    cd code
    yarn install
    ```

2. **Docker Setup**<br >
    Navigate to the project directory and build docker images <br /> <br />
    _**Prerequisite**: You should have Docker and Docker Desktop installed already._
    <br />
    Use the following link to download Docker Desktop: https://www.docker.com/products/docker-desktop/
    
    ```
    cd code
    docker-compose up docker-compose.yml
    ```
    This will install the preconfigured docker images for POSTGRES db, REDIS, and KEYCLOAK

3. **Set Up Keycloak**<br >
    - Make sure that the Keycloak container is running on the Docker Desktop
    - Go to `localhost:8080/`. This is where Keycloak is hosted
    - Keycloak will ask for a one-time setup asking for an admin username and password.
    - Enter any username and password you like and sign in. We recommend `username: admin@admin.com` and `password: password1`
    - In the console, use the dropdown in the top left corner to create a new realm. We recommend naming it `t4`
    - After the Realm is created, select the Realm from the same dropdown.
    - Navigate to the Clients section, click Create Client
        - Name it `t4-client` *!!! IMPORTANT*
        - Use default settings for the rest of the client
    - Navigate to Groups and create 2 new Groups
        - First Group should be named `recruiter` *!!! IMPORTANT*
        - Second Group should be named `user` *!!! IMPORTANT*
    - Navigate to Users and create a User with username and password of your choice. *We will use this later to sign in*

4. **Set Up Postgres and PGAdmin**<br >
    - Download PgAdmin from https://www.pgadmin.org/
    - Open PgAdmin and follow setup prompts
    - Once PgAdmin is running, you will see a template server and database. If server does not exist, create a new one
    - Open the Server folder -> right-click on `Login/Group Roles` -> `Create` -> `Login/Group Role`
    - A modal will open to create a user. Give it any username you want. We recommend username: `t4`
    - In the same modal, head over to Definition tab and add a password with no expiry. We recommend `password1`
    - Go to Privileges section of the same modal and make sure the following are checked:
        - Can Login?
        - Create Roles?
        - Create Databases?
        - Inherit Rights from Parent roles?
    - Click Save to create the admin role
   <br >
  
    - Next, right-click on `Databases` -> `Create` -> `Database`
    - A modal will open to create a database. Give a name for the database. We recommend `t4-db`
    - Open the *Owner* dropdown under the DB name and select the admin user you created in the previous step.
    - Click Save to create the new DB

5. **Set Up Environment Variables**<br >
   We will be creating some `.env` files to configure our project
   - Go to `code/` folder and create a `.env` file with the following contents
     
       ```
        KEYCLOAK_ADMIN={username goes here} # This is the admin username you created during the Keycloak setup
        KEYCLOAK_ADMIN_PASSWORD={password goes here} # This is the password you created during the Keycloak setup
        POSTGRES_PASSWORD={password goes here} # This is the password you created for Postgres in PgAdmin

        # Example
        KEYCLOAK_ADMIN=admin@admin.com
        KEYCLOAK_ADMIN_PASSWORD=password1
        POSTGRES_PASSWORD=password1
        ```
   - Go to `code/packages/api` folder and create a `.env` file with the following contents
     
       ```
        REDIS_HOST=localhost
        REDIS_PORT=6379
        REDIS_IP_FAMILY=4
       
        KEYCLOAK_AUTH_URL=http://localhost:8080/
        KEYCLOAK_AUTH_REALM={realm id goes here} # This is the id of the Realm you created

        #Example
        KEYCLOAK_AUTH_REALM=t4
        ```
   - Go to `code/packages/database` folder and create a `.env` file with the following contents
  
       ```
        DATABASE_URL=postgresql://{username}:{password}@localhost:5432/{db-name}?schema=public

        #Example
        DATABASE_URL=postgresql://t4:password1@localhost:5432/t4-db?schema=public
        ```
   - Go to `code/packages/web` folder and create a `.env` file with the following contents
     
       ```
        VITE_BASE_URL=http://localhost:3000/api/v1
        VITE_KEYCLOAK_URL=http://localhost:8080
        ```
6. **Start Docker**<br >
    Open Docker Desktop and start all containers under the `code/` folder

7. **Database Migration**<br >
    Run Prisma migrations to update your database schema:<br />
    ```
    cd code
    yarn prisma migrate dev
    ```

8. **Start Development Server**<br >
    ```
    cd code
    yarn dev
    ```
9. **Start Web app**<br >
    Open a new terminal, head over to the web folder, and start the web app:
    ```
    cd code/packages/web
    yarn dev
    ```
10. **View Dashboard**<br >
    - In your browser, go to `localhost:5173`
    - You will see the login page
    - Login using the **USER (Not Admin)** credentials you created while creating the user during Keycloak setup
    The starting URL is: `localhost:5173/dashboard/analytics`
    * Note: If you want to reset your password, go to Keycloak `localhost:8080` -> Users -> Select User -> Reset Password

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

