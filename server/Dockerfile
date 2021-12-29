FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:alpine AS deploy

COPY --from=build /app/node_modules node_modules
COPY --from=build /app/dist dist

ENTRYPOINT ["node","dist/main"]
