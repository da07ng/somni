FROM node:10.16.0-alpine

RUN mkdir -p /data/project/somni
WORKDIR /data/project/somni

COPY package*.json /data/project/somni
RUN npm install

COPY . /data/project/somni

EXPOSE 4000

CMD ["node", "server.js"]
