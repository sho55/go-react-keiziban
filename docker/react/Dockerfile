FROM node:21.6

WORKDIR /usr/src/app

# パッケージのインストール
COPY package.json .
COPY yarn.lock .
# パッケージをインストール
RUN yarn install
# コンテナを起動する際に実行されるコマンド
RUN apt-get update