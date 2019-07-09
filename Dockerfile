FROM node:10.15.0
WORKDIR /moana
COPY . /moana
RUN npm install
RUN npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

EXPOSE 3000
CMD /wait && npm run start && ts-node ./node_modules/typeorm/cli.js migration:run
