FROM golang:1.21.5
RUN apt-get update && apt-get install -y build-essential make

RUN go install golang.org/x/tools/gopls@latest #Language Server Protocol
RUN go install github.com/ramya-rao-a/go-outline@latest #JSON simplify
RUN go install github.com/cosmtrek/air@latest #enable hot reload
RUN go install github.com/joho/godotenv/cmd/godotenv@latest
#　migration
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.11.0/migrate.linux-amd64.tar.gz | tar xvz
RUN mv ./migrate.linux-amd64 /usr/bin/migrate

WORKDIR /go/src/app

# /go/src copy
COPY . .

# Live Reload
RUN go install github.com/cosmtrek/air@latest

# CMD ["air", "-c", ".air.toml"]
