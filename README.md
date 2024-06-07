# Dating App

  .                        | .                         | .                     
:-------------------------:|:-------------------------:|:-------------------------:
![](/assets/app-screen-1.png)         |  ![](/assets/app-screen-2.png)       |  ![](/assets/app-screen-3.png)       


## `🚀 start`

```console
// set up the environment

cd backend/api; cp .env.example .env; cd ../..;
cd backend/db; cp .env.example .env; cd ../..;
cd frontend; cp .env.example .env; cd ..;


// run the backend
// this script recreates the db container which results in data loss

yarn backend


// install & run the frontend

yarn frontend
```

## `db`

```console
// run the db

yarn db


// build & run the db container

docker build -t swiper-app/db ./backend/db;
docker run -d -p 3306:3306 --name swiper-app_db --env-file ./backend/db/.env swiper-app/db;
```

## `api`

ENV options:  
  - `MIGRATE=down`

```console
// run the api

yarn api


// build & run the api container

docker build -t swiper-app/api ./backend/api;
docker run -d -p 8080:8080 --name swiper-app_api --env-file ./backend/api/.env --env DB-HOST=172.17.0.1 swiper-app/api;


// OR run directly

cd backend/api; go run cmd/main.go; cd ../..;


// with hot reload

cd backend/api; nodemon --exec go run cmd/main.go --signal SIGTERM; cd ../..


// build

cd backend/api;
go build -o bin/swiper-app cmd/main.go
bin/swiper-app .; 
cd ../..;
```

## `frontend`

```console
// install & run the frontend

yarn frontend
```
