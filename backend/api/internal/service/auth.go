package service

import (
	"dating-app/internal/repo"
	"dating-app/pkg/models"

	"github.com/brianvoe/gofakeit/v6"
)

func Register(user *models.User) (*models.User, error) {
	user.Name = gofakeit.Name()
	user.Gender = gofakeit.Gender()
	user.Age = gofakeit.Number(18, 50)
	id, err := repo.CreateUser(user)
	if err != nil || id == -1 {
		return nil, err
	}
	u, err := repo.GetUser(id)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func LogIn(user *models.User) (*models.User, error) {
	user, err := repo.LogIn(user)
	if err != nil {
		return nil, err
	}
	return user, nil
}
