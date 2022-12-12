package api

import (
	"dating-app/internal/service"
	"dating-app/pkg/models"
	"dating-app/pkg/utils"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type User = models.User

func CreateRandomUser(ctx echo.Context) error {
	user := new(models.User)
	ctx.Bind(user)
	id, err := service.CreateRandomUser()
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	res, err := service.GetUser(id)
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusCreated, res)
}

func CreateUser(ctx echo.Context) error {
	user := new(models.User)
	ctx.Bind(user)
	res, err := service.CreateUser(user)
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusCreated, res)
}

func GetUser(ctx echo.Context) error {
	id, _ := strconv.Atoi(ctx.Param("id"))
	res, err := service.GetUser(id)
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusOK, res)
}

func GetAllUser(ctx echo.Context) error {
	res, err := service.GetAllUser()
	if err != nil {
		utils.CheckErr(err, "")
		return ctx.JSON(http.StatusInternalServerError, "Internal Server Error")
	}
	return ctx.JSON(http.StatusOK, res)
}
