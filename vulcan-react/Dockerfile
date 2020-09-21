FROM node:alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV CHOKIDAR_USEPOLLING=true

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --silent

COPY . .

RUN yarn patch:storybook


CMD ["yarn", "run", "start"]


