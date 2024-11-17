# Use a minimal Node.js base image
FROM node:20.9-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["yarn", "start"]
