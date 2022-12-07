package database

import (
	"database/sql"
	"dating-app/pkg/utils"
	"fmt"
	"os"

	mysql "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var (
	Client *sql.DB
)

func init() {
	godotenv.Load()

	var config = mysql.Config{
		User:                 os.Getenv("DBUSER"),
		Passwd:               os.Getenv("DBPASS"),
		Net:                  "tcp",
		Addr:                 fmt.Sprintf("%s:%s", os.Getenv("DBHOST"), os.Getenv("DBPORT")),
		DBName:               os.Getenv("DBNAME"),
		AllowNativePasswords: true,
	}

	Client, err := sql.Open("mysql", config.FormatDSN())
	utils.CheckFatal(err, "error opening database")
	err = Client.Ping()
	utils.CheckFatal(err, "error pinging database")
	fmt.Println("Database connection initialized!")
}
