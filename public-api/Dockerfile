FROM node:16-alpine

RUN apk add --no-cache --update python3 make g++

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
