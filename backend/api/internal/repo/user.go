package repo

import (
	"database/sql"
	db "swiper-app/internal/db"
	"swiper-app/pkg/models"
	"swiper-app/pkg/utils"
)

type UserRepository models.UserInterface

func checkUserExists(u *models.User) (int, error) {
	row := db.Client.QueryRow(`
		SELECT id FROM profile WHERE email = ?
	`, u.Email)
	var user models.User
	err := row.Scan(&user.ID)
	if err == sql.ErrNoRows {
		return -1, nil
	}
	if err != nil {
		return -1, err
	}
	return user.ID, nil
}

func CreateUser(u *models.User) (int, error) {
	existingUserId, err := checkUserExists(u)
	if existingUserId != -1 {
		return -1, nil
	}
	if err != nil {
		return -1, err
	}
	utils.Print("Creating user:", u)
	res, err := db.Client.Exec(`
		INSERT INTO profile (email, password, name, gender, age) 
		VALUES (?,?,?,?,?)
	`, u.Email, u.Password, u.Name, u.Gender, u.Age)
	utils.CheckErr(err, "")
	if err != nil {
		return -1, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return -1, err
	}
	idInt := int(id)
	return idInt, nil
}

func GetUser(id int) (*models.User, error) {
	row := db.Client.QueryRow(`
		SELECT * FROM profile WHERE id = ?
	`, id)
	var u models.User
	err := row.Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Gender, &u.Age)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func GetAllUser() ([]*models.User, error) {
	rows, err := db.Client.Query(`
		SELECT * FROM profile
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var users []*models.User
	for rows.Next() {
		var u models.User
		err = rows.Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Gender, &u.Age)
		if err != nil {
			return nil, err
		}
		users = append(users, &u)
	}
	err = rows.Err()
	if err != nil {
		return users, err
	}
	return users, nil
}

func GetProfiles(id int) ([]*models.User, error) {
	rows, err := db.Client.Query(`
		SELECT * FROM profile 
		WHERE profile.id != ? AND
		profile.id NOT IN (SELECT profile FROM swipe WHERE user = ?)
	`, id, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var profiles []*models.User
	for rows.Next() {
		var u models.User
		err = rows.Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Gender, &u.Age)
		if err != nil {
			return nil, err
		}
		profiles = append(profiles, &u)
	}
	err = rows.Err()
	if err != nil {
		return profiles, err
	}
	return profiles, nil
}

func Swipe(s *models.Swipe) (int, error) {
	res, err := db.Client.Exec(`
		INSERT INTO swipe (user, profile, preference) 
		VALUES (?,?,?)
	`, s.User, s.Profile, s.Preference)
	if err != nil {
		return -1, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return -1, err
	}
	idInt := int(id)
	return idInt, nil
}

func GetMatchStatus(s *models.Swipe) (bool, error) {
	row := db.Client.QueryRow(`
		SELECT preference FROM swipe 
		WHERE user = ? AND 
		profile = ?
	`, s.Profile, s.User)
	var correspondingSwipe models.Swipe
	err := row.Scan(&correspondingSwipe.Preference)
	if err == sql.ErrNoRows {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	if s.Preference == "yes" && correspondingSwipe.Preference == "yes" {
		return true, nil
	}
	return false, nil
}
