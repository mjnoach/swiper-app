package service

import (
	"dating-app/internal/repo"
	"dating-app/pkg/models"
)

func CreateUser(u *models.User) (int64, error) {
	id, err := repo.CreateUser(u)
	if err != nil {
		return 0, err
	}
	return id, nil
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
