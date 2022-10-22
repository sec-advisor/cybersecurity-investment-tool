FROM node:16-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarnrc .
# Copy libs folder which includes the package
COPY libs libs/

RUN yarn install --frozen-lockfile --network-timeout 1000000

COPY . .

RUN yarn build

FROM nginx:latest

COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Replace environment variable
COPY ./entryPoint.sh /
RUN chmod +x entryPoint.sh
ENTRYPOINT ["sh","/entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
