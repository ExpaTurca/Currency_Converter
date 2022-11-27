FROM node:18.12.1 as build
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY ./ /api/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /api/dist/api/ /usr/share/nginx/html
