FROM node:20.14.0-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx nx build org --prod --skipNxCache

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/dist/org/browser/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/http-server/nginx-default.conf /etc/nginx/conf.d/default.conf