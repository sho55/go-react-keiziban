# docker/react/Dockerfile
FROM node:20.11.0

WORKDIR /usr/src/app

# パッケージのインストール
COPY ./package*.json ./
RUN ["npm", "install"]

COPY . .

RUN npm run build

CMD ["npm", "start"]
