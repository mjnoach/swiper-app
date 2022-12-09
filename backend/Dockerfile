FROM golang:latest
COPY . /go/src/
WORKDIR /go/src
RUN go mod download
EXPOSE 8080

ENV DBUSER admin
ENV DBPASS admin
ENV DBHOST localhost
ENV DBPORT 3306
ENV DBNAME dating_app

ENV APIHOST localhost
ENV APIPORT 8080

ENTRYPOINT [ "go", "run", "cmd/main.go" ]
# RUN go run cmd/main.go
