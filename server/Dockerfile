FROM node:lts-alpine

ENV NODE_ENV=development

WORKDIR /opt/notebook-server
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN npm run build

ENV NODE_ENV=production

RUN npm prune

COPY ./dist .
EXPOSE $PORT

RUN chown -R node /opt/notebook-server
USER node
CMD ["npm", "start"]
