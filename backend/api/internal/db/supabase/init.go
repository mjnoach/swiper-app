package db

import (
	"dating-app/pkg/utils"
	"os"

	"github.com/joho/godotenv"
	supa "github.com/nedpals/supabase-go"
)

var Client *supa.Client

func init() {
	godotenv.Load()
	initDbConnection()
	performSchemaMigration()
}

func initDbConnection() {
	supabaseUrl := os.Getenv("SUPABASE-URL")
	supabaseKey := os.Getenv("SUPABASE-KEY")
	utils.Print("supabaseUrl", supabaseUrl)
	utils.Print("supabaseKey", supabaseKey)
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)
	utils.Print("supabase", supabase)

	// var results map[string]interface{}
	// err := supabase.DB.From("profile").Select("*").Single().Execute(&results)
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(results)
}

func performSchemaMigration() {
}
