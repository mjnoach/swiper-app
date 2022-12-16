package api

import (
	"dating-app/internal/service"
	"dating-app/pkg/models"
	"dating-app/pkg/utils"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func CreateRandomUser(ctx echo.Context) error {
	user := new(models.User)
	ctx.Bind(user)
	user, err := service.CreateRandomUser()
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	if user == nil {
		return ctx.JSON(http.StatusConflict, "User already exists")
	}
	return ctx.JSON(http.StatusCreated, user)
}

func GetUser(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))
	user, err := service.GetUser(id)
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusOK, user)
}

func GetAllUser(ctx echo.Context) error {
	users, err := service.GetAllUser()
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusOK, users)
}

func GetProfiles(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.QueryParam("id"))
	profiles, err := service.GetProfiles(id)
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusOK, profiles)
}

func Swipe(ctx echo.Context) error {
	swipe := new(models.Swipe)
	ctx.Bind(swipe)
	hasMatch, err := service.Swipe(swipe)
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusOK, hasMatch)
}
