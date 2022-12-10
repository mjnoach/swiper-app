# Dating App

## `🚀 start`

```console
// create `backend/.env` file

cd backend; cp .env.example .env; cd ..;


// run the db

yarn db


// run the api

yarn api
```

## `db`

```console
// build & run the db container

docker build -t dating_app/db ./backend/internal/db;
docker run -d -p 3306:3306 --name dating_app_db --env-file ./backend/.env dating_app/db;
```

## `api`

ENV options:  
  - `MIGRATE=down`

```console
// build & run the api container

docker build -t dating_app/api ./backend;
docker run -d -p 8080:8080 --name dating_app_api --env-file ./backend/.env dating_app/api;


// OR run directly

cd backend; go run cmd/main.go; cd ..;


// with hot reload

cd backend; nodemon --exec go run cmd/main.go --signal SIGTERM; cd ..


// build

cd backend;
go build -o bin/dating_app cmd/main.go
bin/dating_app .; 
cd ..;
```

<!-- TODO -->
<!-- - ?? export $PATH with `go` and `sql-migrate` ? -->
