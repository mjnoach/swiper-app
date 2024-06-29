package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"swiper-app/pkg/utils"

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
	var ADDR = os.Getenv("DB-ADDR")
	if len(ADDR) == 0 {
		ADDR = fmt.Sprintf("%s:%s", os.Getenv("DB-HOST"), os.Getenv("DB-PORT"))
	}
	var config = mysql.Config{
		User:                 os.Getenv("DB-USER"),
		Passwd:               os.Getenv("DB-PASS"),
		Net:                  "tcp",
		Addr:                 ADDR,
		DBName:               os.Getenv("DB-NAME"),
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	var err error
	Client, err = sql.Open("mysql", config.FormatDSN())
	utils.LogPanic(err, "error opening database")
	err = Client.Ping()
	utils.LogPanic(err, "error pinging database")
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
	utils.LogPanic(err, "")
	log.Printf("Applied %d migrations!", n)
}
