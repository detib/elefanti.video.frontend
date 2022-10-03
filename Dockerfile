FROM node:18.10-alpine3.15 AS build


WORKDIR /elefanti.video.frontend 

COPY /elefanti.video.frontend/package.json ./
COPY /elefanti.video.frontend/package-lock.json ./

RUN npm install

COPY /elefanti.video.frontend .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY --from=build /elefanti.video.frontend/build /usr/share/nginx/html

COPY /elefanti.video.frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
