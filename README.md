# Dating App

## `🚀 start`

```console
// create `backend/.env` file

cd backend; cp .env.example .env; cd ..;


// run the db

yarn db


// run the api

yarn api


// run the frontend

yarn frontend
```

## `db`

```console
// build & run the db container

docker build -t dating_app/db ./backend/db;
docker run -d -p 3306:3306 --name dating_app_db --env-file ./backend/db/.env dating_app/db;
```

## `api`

ENV options:  
  - `MIGRATE=down`

```console
// build & run the api container

docker build -t dating_app/api ./backend/api;
docker run -d -p 8080:8080 --name dating_app_api --env-file ./backend/api/.env --env DBHOST=172.17.0.1 dating_app/api;


// OR run directly

cd backend/api; go run cmd/main.go; cd ../..;


// with hot reload

cd backend/api; nodemon --exec go run cmd/main.go --signal SIGTERM; cd ../..


// build

cd backend/api;
go build -o bin/dating_app cmd/main.go
bin/dating_app .; 
cd ../..;
```

## `frontend`

```console
yarn frontend
```


<!-- TODO -->
<!-- - ?? export $PATH with `go` and `sql-migrate` ? -->
