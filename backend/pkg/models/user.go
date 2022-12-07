package models

type User struct {
	ID       uint   `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Gender   string `json:"gender"`
	Age      int    `json:"age"`
}

type UserRepository interface {
	CreateUser() (int64, error)
	GetAllUser() ([]*User, error)
}
