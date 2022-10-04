FROM node:18.10-alpine3.15 AS build


WORKDIR /elefanti.video.frontend 

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY --from=build ./elefanti.video.frontend/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
