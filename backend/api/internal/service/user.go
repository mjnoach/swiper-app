package service

import (
	"dating-app/internal/repo"
	"dating-app/pkg/models"

	"github.com/brianvoe/gofakeit/v6"
)

func CreateRandomUser() (int, error) {
	user := models.User{
		Email:    gofakeit.Email(),
		Name:     gofakeit.Name(),
		Password: gofakeit.Password(true, true, true, true, false, 32),
		Gender:   gofakeit.Gender(),
		Age:      gofakeit.Number(18, 100),
	}
	id, err := repo.CreateUser(&user)
	if err != nil {
		return 0, err
	}
	user.ID = int(id)
	return user.ID, nil
}

func CreateUser(u *models.User) (int, error) {
	id, err := repo.CreateUser(u)
	if err != nil {
		return 0, err
	}
	u.ID = int(id)
	return u.ID, nil
}

func GetUser(id int) (*models.User, error) {
	u, err := repo.GetUser(id)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func GetAllUser() ([]*models.User, error) {
	users, err := repo.GetAllUser()
	if err != nil {
		return nil, err
	}
	return users, nil
}
