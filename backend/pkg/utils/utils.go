package utils

import (
	"fmt"
	"log"
)

func CheckErr(err error, message string) {
	if err != nil {
		_ = fmt.Errorf("* %s\n%s", message, err)
	}
}

func CheckFatal(err error, message string) {
	if err != nil {
		log.Fatalf("* %s\n%s", message, err)
	}
}

func CheckPanic(err error, message string) {
	if err != nil {
		log.Panicf(fmt.Sprintf("* %s\n%s", message, err))
	}
}
