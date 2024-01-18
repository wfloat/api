FROM node:18.17-slim

RUN npm i npm@9.6 -g

RUN apt-get update && apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

# install dependencies first, in a different location for easier app bind mounting for local development
# WORKDIR now sets correct permissions if you set USER first
WORKDIR /opt/node_app

COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Add the prisma schema
COPY --chown=node:node prisma ./prisma
# Run the prisma generate command
RUN npm run generate

ENV PATH /opt/node_app/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
# copy in as node user, so permissions match what we need
WORKDIR /opt/node_app/api
COPY --chown=node:node . .

CMD [ "npm", "start" ]