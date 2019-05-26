FROM node:10.15.0

RUN mkdir -p /moana
RUN apt-get update
COPY . /moana
WORKDIR /moana
RUN npm run build
RUN npm run start
