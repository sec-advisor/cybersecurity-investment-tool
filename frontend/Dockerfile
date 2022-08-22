FROM node:16-alpine as build

# Copy shared library
WORKDIR /

COPY libs /libs


WORKDIR /app

COPY frontend/package.json .

COPY frontend/yarn.lock .

RUN yarn install --frozen-lockfile

COPY frontend/ .

RUN yarn build

FROM nginx:latest

COPY --from=build /app/dist/frontend /usr/share/nginx/html
