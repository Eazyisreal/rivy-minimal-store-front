FROM node:18-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

COPY ca.pem ./ca.pem

EXPOSE 5000

CMD ["npm", "run", "dev"]
