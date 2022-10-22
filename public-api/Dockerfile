FROM node:16-alpine

RUN apk add --no-cache --update python3 make g++

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY .yarnrc .
# Copy libs folder which includes the package
COPY libs libs/

RUN yarn install --frozen-lockfile --network-timeout 1000000

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
