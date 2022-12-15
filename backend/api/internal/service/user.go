package service

import (
	"dating-app/internal/repo"
	"dating-app/pkg/models"

	"github.com/brianvoe/gofakeit/v6"
)

func CreateRandomUser() (*models.User, error) {
	user := models.User{
		Email:    gofakeit.Email(),
		Name:     gofakeit.Name(),
		Password: gofakeit.Password(true, true, true, true, false, 32),
		Gender:   gofakeit.Gender(),
		Age:      gofakeit.Number(18, 50),
	}
	id, err := repo.CreateUser(&user)
	if err != nil {
		return nil, err
	}
	u, err := repo.GetUser(id)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func CreateUser(user *models.User) (*models.User, error) {
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

func GetProfiles(id int) ([]*models.User, error) {
	users, err := repo.GetProfiles(id)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func Swipe(swipe *models.Swipe) (bool, error) {
	_, err := repo.Swipe(swipe)
	if err != nil {
		return false, err
	}
	hasMatch, err := repo.GetMatchStatus(swipe)
	if err != nil {
		return false, err
	}
	return hasMatch, nil
}

func LogIn(user *models.User) (*models.User, error) {
	user, err := repo.LogIn(user)
	if err != nil {
		return nil, err
	}
	return user, nil
}
