package main

import (
	"fmt"
	"net/http"

	"dating-app/internal/api"
	_ "dating-app/internal/db"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var router = echo.New()

func main() {
	hostname := "localhost"
	port := "8080"
	host := fmt.Sprintf("%s:%s", hostname, port)

	// Middleware
	router.Use(middleware.Logger())
	router.Use(middleware.Recover())

	// Routes
	router.GET("/", func(ctx echo.Context) error {
		return ctx.String(http.StatusOK, "Hello World!")
	})
	router.POST("/user/create", api.CreateUser)
	router.GET("/user/:id", api.GetUser)
	router.GET("/profiles", api.GetAllUser)

	router.Logger.Fatal(router.Start(host))
}
