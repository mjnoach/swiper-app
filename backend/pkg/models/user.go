package models

type User struct {
	ID       uint   `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Gender   string `json:"gender"`
	Age      int    `json:"age"`
}

type UserInterface interface {
	CreateUser(u *User) (int64, error)
	GetUser(id int) (*User, error)
	GetAllUser() ([]*User, error)
}
