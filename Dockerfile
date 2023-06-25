FROM node:18 AS build
WORKDIR /app
ADD . /app

RUN npm install && npm install -g grunt && npm install -g sass && grunt
FROM nginx:1.25.1 as nginx
COPY --from=build /app/dist /usr/share/nginx/html