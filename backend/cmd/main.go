package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "dating-app/internal/db"
	"dating-app/internal/service"
	"dating-app/pkg/models"
	"dating-app/pkg/utils"
)

func index(w http.ResponseWriter, r *http.Request) {
	log.Printf("/")
	fmt.Fprintf(w, "Hello World!")
}

func createUser(w http.ResponseWriter, r *http.Request) {
	log.Printf("/createUser")
	user := models.User{
		Email:    "test@mail.com",
		Name:     "test@mail.com",
		Password: "password",
		Gender:   "M",
		Age:      21,
	}
	id, error := service.CreateUser(&user)
	utils.CheckFatal(error, "")
	json.NewEncoder(w).Encode(id)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	log.Printf("/getUser")
	user, error := service.GetUser(1)
	utils.CheckFatal(error, "")
	json.NewEncoder(w).Encode(user)
}

func profiles(w http.ResponseWriter, r *http.Request) {
	log.Printf("/profiles")
	profiles, error := service.GetAllUser()
	utils.CheckFatal(error, "")
	json.NewEncoder(w).Encode(profiles)
}

func handleRequests() {
	http.HandleFunc("/createUser", createUser)
	http.HandleFunc("/getUser", getUser)
	http.HandleFunc("/profiles", profiles)
	http.HandleFunc("/", index)
}

func main() {
	hostname := "localhost"
	port := "8080"
	host := fmt.Sprintf("%s:%s", hostname, port)

	handleRequests()
	log.Printf("Starting server on " + host)
	log.Fatal(http.ListenAndServe(host, nil))
}
