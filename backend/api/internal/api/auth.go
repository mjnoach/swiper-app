package api

import (
	"net/http"
	"os"
	"swiper-app/internal/service"
	"swiper-app/pkg/models"
	"swiper-app/pkg/utils"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type jwtCustomClaims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

func getToken(user *models.User) (string, error) {
	claims := &jwtCustomClaims{
		user.Email,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(os.Getenv("JWT-SECRET")))
	if err != nil {
		return t, err
	}
	return t, nil
}

func Register(ctx echo.Context) error {
	user := new(models.User)
	ctx.Bind(user)
	user, err := service.Register(user)
	if err != nil {
		utils.LogErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	if user == nil {
		return ctx.JSON(http.StatusConflict, "User already exists")
	}
	jwt, err := getToken(user)
	if err != nil {
		utils.LogErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusCreated, echo.Map{
		"jwt":  jwt,
		"user": user,
	})
}

func LogIn(ctx echo.Context) error {
	user := new(models.User)
	ctx.Bind(user)
	user, err := service.LogIn(user)
	if err != nil {
		utils.LogErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	if user == nil {
		return ctx.JSON(http.StatusNotFound, "Invalid email or password")
	}
	jwt, err := getToken(user)
	if err != nil {
		utils.LogErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusOK, echo.Map{
		"jwt":  jwt,
		"user": user,
	})
}
