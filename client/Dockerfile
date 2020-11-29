# Multi step
FROM node:alpine as builder
WORKDIR '/app/client'
COPY ./client/package.json .
RUN yarn
COPY ./client .
COPY ./types ./src/types
CMD ["yarn", "start"]