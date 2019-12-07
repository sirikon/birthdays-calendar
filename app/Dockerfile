FROM node:12.13-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY main.js .
COPY src ./src
CMD npm start
