# Dating App

1. create `backend/.env` file

```console
cp .env.example .env
```
  
2. build db container image

```console
docker build -t mjnoach/dating_app/db internal/db
```
  
3. start up db container

```console
docker run -d -p 3306:3306 mjnoach/dating_app/db
```

<!-- 4. ?? export $PATH with `go` and `sql-migrate` ? -->

4. run the backend

- env options:
  - MIGRATE=down

```console
go run cmd/main.go
```

