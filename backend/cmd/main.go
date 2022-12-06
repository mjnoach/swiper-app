package main

import (
	"fmt"
	"log"
	"net/http"

	_ "dating-app/internal/database/mariadb"
)

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!")
	fmt.Println("Endpoint Hit: home")
}

func handleRequests() {
	http.HandleFunc("/", home)
}

func main() {
	hostname := "localhost"
	port := "8080"
	host := fmt.Sprintf("%s:%s", hostname, port)

	handleRequests()
	fmt.Println("Starting server on " + host)
	log.Fatal(http.ListenAndServe(host, nil))
}
