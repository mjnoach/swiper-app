package db

import (
	"database/sql"
	"dating-app/pkg/utils"
	"log"
	"os"

	"github.com/joho/godotenv"
	migrate "github.com/rubenv/sql-migrate"
)

var Client *sql.DB

func init() {
	godotenv.Load()
	initDbConnection()
	performSchemaMigration()
}

func initDbConnection() {
	// connStr := "user=pqgotest dbname=pqgotest sslmode=verify-full"
	// db, err := sql.Open("postgres", connStr)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// age := 21
	// rows, err := db.Query("SELECT name FROM users WHERE age = $1", age)
}

func performSchemaMigration() {
	migrations := &migrate.FileMigrationSource{
		Dir: "internal/db/migrations",
	}
	var n int
	var err error
	switch os.Getenv("MIGRATE") {
	case "down":
		n, err = migrate.Exec(Client, "mysql", migrations, migrate.Down)
	default:
		n, err = migrate.Exec(Client, "mysql", migrations, migrate.Up)
	}
	utils.CheckPanic(err, "")
	log.Printf("Applied %d migrations!", n)
}
