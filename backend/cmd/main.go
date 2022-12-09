package main

import (
	"fmt"
	"log"
	"net/http"

	_ "dating-app/internal/db"
	"dating-app/internal/repo"
	"dating-app/pkg/models"
	"dating-app/pkg/utils"
)

func home(w http.ResponseWriter, r *http.Request) {
	log.Printf("home")
	fmt.Fprintf(w, "Hello World!")
}

func test(w http.ResponseWriter, r *http.Request) {
	log.Printf("test")
	user := models.User{
		Name: "test@mail.com",
	}
	res, error := repo.CreateUser(&user)
	utils.CheckFatal(error, "")
	log.Printf("users: %v", res)
}

func handleRequests() {
	http.HandleFunc("/test", test)
	http.HandleFunc("/", home)
}

func main() {
	hostname := "localhost"
	port := "8080"
	host := fmt.Sprintf("%s:%s", hostname, port)

	handleRequests()
	log.Printf("Starting server on " + host)
	log.Fatal(http.ListenAndServe(host, nil))
}
