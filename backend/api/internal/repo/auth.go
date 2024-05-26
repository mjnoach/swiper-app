package repo

import (
	"database/sql"
	db "swiper-app/internal/db"
	"swiper-app/pkg/models"
)

func LogIn(user *models.User) (*models.User, error) {
	row := db.Client.QueryRow(`
		SELECT * FROM profile 
		WHERE email = ?
		AND password = ?
	`, user.Email, user.Password)
	var u models.User
	err := row.Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Gender, &u.Age)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &u, nil
}
