FROM golang
WORKDIR /go/src
COPY . .
RUN go mod download
EXPOSE 8080
CMD [ "go", "run", "cmd/main.go" ]
