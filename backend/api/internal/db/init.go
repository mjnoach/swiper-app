package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"swiper-app/pkg/utils"

	mysql "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	migrate "github.com/rubenv/sql-migrate"

	pgx "github.com/jackc/pgx/v5"
)

var Client *sql.DB

func init() {
	godotenv.Load()
	var DB_TYPE = os.Getenv("DB-TYPE")
	if DB_TYPE == "sql" {
		initSqlConnection()
		performSchemaMigration()
	}
	if DB_TYPE == "pg" {
		initPgConnection()
	}
}

func initPgConnection() {
		conn, err := pgx.Connect(context.Background(), os.Getenv("DB-URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())
}

func initSqlConnection() {
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
