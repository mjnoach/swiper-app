package utils

import (
	"encoding/json"
	"log"

	"github.com/labstack/echo/v4"
)

func CheckErr(err error, message string) {
	if err != nil {
		log.Printf("🚀 %s \n%v", message, err)
	}
}

func CheckFatal(err error, message string) {
	if err != nil {
		log.Fatalf("🚀 %s \n%v", message, err)
	}
}

func CheckPanic(err error, message string) {
	if err != nil {
		log.Panicf("🚀 %s \n%v", message, err)
	}
}

func GetReqBodyJson(ctx echo.Context) (map[string]interface{}, error) {
	jsonMap := make(map[string]interface{})
	err := json.NewDecoder(ctx.Request().Body).Decode(&jsonMap)
	if err != nil {
		return nil, err
	}
	return jsonMap, nil
}
