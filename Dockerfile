FROM node:18.17

RUN apt-get update -y && \
    apt-get install -y sudo postgresql-client curl build-essential git inotify-tools libstdc++6 openssl libncurses5 locales ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*_*

USER node

WORKDIR /usr/src/api

COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

COPY --chown=node:node prisma ./prisma
RUN npm run generate

ENV PATH /usr/src/api/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
# copy in as node user, so permissions match what we need
COPY --chown=node:node . .

CMD [ "npm", "start" ]