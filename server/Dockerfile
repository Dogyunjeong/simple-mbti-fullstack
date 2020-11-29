# Multi step
FROM node:alpine as builder
WORKDIR '/app/server'
COPY ./server/package.json .
RUN npm install
COPY ./server ./
COPY ./types ./src/types
RUN npm run build