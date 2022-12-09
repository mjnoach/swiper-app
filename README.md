# Dating App


## `🔧 dev`

- backend hot reload  
  `nodemon --exec go run cmd/main.go --signal SIGTERM`

---

## `🚀 start`

- create `backend/.env` file

```console
cd backend; cp .env.example .envX; cd ..;
```
  
- build & run the db container

```console
docker build -t mjnoach/dating_app/db backend/internal/db;
docker run -d -p 3306:3306 mjnoach/dating_app/db;
```

- run the backend

  - env options  
    `MIGRATE=down`

```console
cd backend; go run cmd/main.go; cd ..;
```

<!-- TODO -->

<!-- 
- build

```console
go build -o bin/dating_app cmd/main.go
``` -->

<!-- 
```console
docker-compose up
```
 -->
  
<!-- - ?? export $PATH with `go` and `sql-migrate` ? -->


<!-- - build & run the backend container

```console
docker build -t mjnoach/dating_app/backend backend;
docker run -d -p 8080:8080 mjnoach/dating_app/backend;
``` -->