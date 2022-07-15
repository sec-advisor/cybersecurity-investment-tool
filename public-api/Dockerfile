FROM node:16-alpine

WORKDIR /usr/src/app

COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
