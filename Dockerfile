FROM node:10.14-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY index.js .
COPY src ./src
CMD npm start
