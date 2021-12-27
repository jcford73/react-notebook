FROM node:lts-alpine

ENV NODE_ENV=development

WORKDIR /opt/notebook-server
COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production

ENV NOTEBOOK_DB_HOST=notebook-db.crrfthqir0s7.us-west-1.rds.amazonaws.com
ENV NOTEBOOK_REDIS_HOST=clustercfg.notebook-cache.774mfm.memorydb.us-west-1.amazonaws.com

RUN npm prune

RUN rm -rf src
RUN rm *.*

EXPOSE 10001

RUN chown -R node /opt/notebook-server
USER node
CMD ["node", "dist/main"]
