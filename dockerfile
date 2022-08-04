FROM node:14

WORKDIR /app

COPY /app/package.json .

COPY /app .

EXPOSE 8000

