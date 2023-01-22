package db

import (
	"database/sql"
	"dating-app/pkg/utils"
	"fmt"
	"log"
	"os"

	mysql "github.com/go-sql-driver/mysql"
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
	var DBADDR = os.Getenv("DBADDR")
	if len(DBADDR) == 0 {
		DBADDR = fmt.Sprintf("%s:%s", os.Getenv("DB-HOST"), os.Getenv("DB-PORT"))
	}
	var config = mysql.Config{
		User:                 os.Getenv("DB-USER"),
		Passwd:               os.Getenv("DB-PASS"),
		Net:                  "tcp",
		Addr:                 DBADDR,
		DBName:               os.Getenv("DB-NAME"),
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	var err error
	Client, err = sql.Open("mysql", config.FormatDSN())
	utils.CheckPanic(err, "error opening database")
	err = Client.Ping()
	utils.CheckPanic(err, "error pinging database")
	log.Printf("Database connection initialized!")
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
