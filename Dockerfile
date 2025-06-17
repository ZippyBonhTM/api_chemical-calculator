FROM node:lts-slim
WORKDIR /api
COPY package*.json .
COPY .env .
RUN npm install --production --omit=dev
COPY dist ./dist
EXPOSE 3010
ENTRYPOINT ["npm", "run", "start"]