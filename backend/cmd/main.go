package main

import (
	"fmt"
	"net/http"
	"os"

	"dating-app/internal/api"
	_ "dating-app/internal/db"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var router = echo.New()

func main() {
	godotenv.Load()
	hostname := os.Getenv("APIHOST")
	port := os.Getenv("APIPORT")
	host := fmt.Sprintf("%s:%s", hostname, port)

	// Middleware
	router.Use(middleware.Logger())
	router.Use(middleware.Recover())

	// Routes
	router.GET("/", func(ctx echo.Context) error {
		return ctx.String(http.StatusOK, "Hello World!")
	})
	router.GET("/user/create", api.CreateRandomUser)
	router.POST("/user/create", api.CreateUser)
	router.GET("/user/:id", api.GetUser)
	router.GET("/profiles", api.GetAllUser)

	router.Logger.Fatal(router.Start(host))
}
