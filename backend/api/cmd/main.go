package main

import (
	"fmt"
	"net/http"
	"os"

	"swiper-app/internal/api"
	_ "swiper-app/internal/db"
	"swiper-app/pkg/utils"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var router = echo.New()

func main() {
	godotenv.Load()
	utils.Log("Client URL:", os.Getenv("APP-URL"))

	// Middleware
	router.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))
	router.Use(middleware.Recover())
	router.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{os.Getenv("APP-URL")},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	auth := router.Group("")
	auth.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(os.Getenv("JWT-SECRET")),
	}))

	// Routes
	router.GET("/", func(ctx echo.Context) error {
		return ctx.String(http.StatusOK, "Hello Swiper App!")
	})
	router.GET("/user/create", api.CreateRandomUser)
	router.POST("/auth/register", api.Register)
	router.POST("/auth/login", api.LogIn)
	router.GET("/user/:id", api.GetUser)

	// Restricted routes
	auth.GET("/profiles", api.GetProfiles)
	auth.POST("/swipe", api.Swipe)

	host := fmt.Sprintf("%s:%s", os.Getenv("API-HOST"), os.Getenv("API-PORT"))

	// Start HTTP server
	router.Logger.Fatal(router.Start(host))
}
