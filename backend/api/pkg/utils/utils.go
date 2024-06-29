package utils

import (
	"encoding/json"
	"log"

	"github.com/labstack/echo/v4"
)

func Print(message string, obj interface{}) {
	log.Printf("\n\n🚀 %s \n%v\n\n", message, obj)
}

func LogErr(err error, message string) {
	log.Printf("\n\n🚀 %s \n%v\n\n", message, err)
}

func LogFatal(err error, message string) {
	if err != nil {
		log.Fatalf("\n\n🚀 %s \n%v\n\n", message, err)
	}
}

func LogPanic(err error, message string) {
	if err != nil {
		log.Panicf("\n\n🚀 %s \n%v\n\n", message, err)
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
