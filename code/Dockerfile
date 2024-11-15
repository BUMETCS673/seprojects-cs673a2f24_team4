FROM node:20.9-alpine
# Install Python and other necessary build dependencies
RUN apk add --no-cache python3 make g++ 
WORKDIR /app
COPY . /app/
RUN yarn install
CMD [ "yarn, start" ]