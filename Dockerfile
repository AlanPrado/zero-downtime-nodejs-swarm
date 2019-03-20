FROM node:alpine

RUN apk add --update \
    curl --no-cache tini

ENV TINI_VERSION v0.18.0
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV NODE_ENV=production

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY server.js ./

EXPOSE 3000
HEALTHCHECK --start-period=10s CMD curl --fail http://localhost:3000/status || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "npm", "start" ]
