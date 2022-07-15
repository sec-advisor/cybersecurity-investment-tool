FROM node:16-alpine as build

WORKDIR /app

COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:latest

COPY --from=build /app/dist/hr-frontend /usr/share/nginx/html

EXPOSE 80
