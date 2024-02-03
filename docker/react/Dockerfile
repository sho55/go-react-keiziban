FROM node

# WORKDIR /usr/src/app
RUN pwd
# COPY ["package.json", "yarn.lock", "./"]
COPY package.json ./
# パッケージをインストール
# RUN yarn install
# ファイルを全部作業用ディレクトリにコピー
# コンテナを起動する際に実行されるコマンド
# ENTRYPOINT [ "yarn", "start" ]
RUN apt-get update