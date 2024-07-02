package utils

import (
	"encoding/json"
	"log"

	"github.com/labstack/echo/v4"
)

func Log(message string, obj interface{}) {
	log.Printf("– %s %v", message, obj)
}

func LogErr(err error, message string) {
	log.Printf("❗️ %s %v", message, err)
}

func LogFatal(err error, message string) {
	if err != nil {
		log.Fatalf("❗️ %s %v", message, err)
	}
}

func LogPanic(err error, message string) {
	if err != nil {
		log.Panicf("❗️ %s %v", message, err)
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
