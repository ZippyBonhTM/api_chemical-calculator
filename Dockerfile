FROM node:lts-slim
WORKDIR /api
COPY package*.json ./
COPY .env ./
RUN npm install
COPY dist ./dist
EXPOSE 80
ENTRYPOINT ["npm", "run", "start"]