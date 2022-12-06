package mariadb

import (
	"database/sql"
	"fmt"
	"log"

	mysql "github.com/go-sql-driver/mysql"
)

var config = mysql.Config{
	User:                 "admin",
	Passwd:               "admin",
	Net:                  "tcp",
	Addr:                 "localhost:3306",
	DBName:               "dating_app",
	AllowNativePasswords: true,
}

var (
	Client *sql.DB
)

func init() {
	Client, err := sql.Open("mysql", config.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	err = Client.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database connection initialized!")
}
