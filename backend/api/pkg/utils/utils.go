package utils

import (
	"log"
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
