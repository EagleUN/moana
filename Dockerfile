FROM node:10.15.0
WORKDIR /moana
COPY . /moana
RUN npm install
RUN npm run build
CMD ["npm", "run" "start"]