FROM node:18.17

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