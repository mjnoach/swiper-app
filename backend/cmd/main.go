package main

import (
	"fmt"
	"log"
	"net/http"

	_ "dating-app/internal/database"
	repo "dating-app/internal/repo"
)

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Println("home")
	fmt.Fprintf(w, "Hello World!")
}

func test(w http.ResponseWriter, r *http.Request) {
	fmt.Println("test")
	var userRepo repo.User
	// var userRepo = &user
	// userRepo.GetAllUser()

	// var userRepo repo.UserRepository
	users, err := userRepo.GetAllUser()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("users: ", users)
}

func handleRequests() {
	http.HandleFunc("/", home)
	http.HandleFunc("/test", test)
}

func main() {
	hostname := "localhost"
	port := "8080"
	host := fmt.Sprintf("%s:%s", hostname, port)

	handleRequests()
	fmt.Println("Starting server on " + host)
	log.Fatal(http.ListenAndServe(host, nil))
}
