FROM node:20-alpine AS base

FROM base AS development 

RUN apk add --no-cache libc6-compat

WORKDIR /development

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build && \
    npm prune --production

FROM base AS runner

WORKDIR /runner

COPY --from=development /development/node_modules /runner/node_modules
COPY --from=development /development/dist /runner/dist
COPY --from=development /development/package.json /runner/package.json

EXPOSE 3000

CMD ["npm", "run", "build"]
