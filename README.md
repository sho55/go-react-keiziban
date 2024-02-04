## Quick Start 

### クローン

```
git clone git@github.com:sho55/go-react-keiziban.git
```

### 環境変数を設定

```
cd go-react-keiziban
cp env.example .env
```

### node_modulesをインストール
```
cd myapp
npm instal
```

### docker composeで立ち上げ
```
docker compose up -d
```

### [Goコンテナ内]マイグレーション
```
docker exec -it [GO_CONTAINER_NAME] bash

migrate --path db/migrations --database 'mysql://my_user:my_pass@tcp(goLangMySQL:3306)/mydb?charset=utf8mb4' -verbose up
```

