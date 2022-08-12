FROM node:16-alpine

# Copy shared library
WORKDIR /

COPY libs /usr/src/libs


WORKDIR /usr/src/app

COPY  public-api/package.json .

COPY public-api/yarn.lock .

RUN yarn install --frozen-lockfile

COPY public-api/ .

RUN yarn build

CMD ["yarn", "start:container"]
