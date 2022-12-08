package main

import (
	"fmt"
	"log"
	"net/http"

	_ "dating-app/internal/db"
)

func home(w http.ResponseWriter, r *http.Request) {
	log.Printf("home")
	fmt.Fprintf(w, "Hello World!")
}

func test(w http.ResponseWriter, r *http.Request) {
	log.Printf("test")
	// var userRepo repo.UserRepository
	// useRepo = &repo.User{}
	// users, error := userRepo.CreateUser()
	// utils.CheckErr(error, "")
	// log.Printd("users: ", users)
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
