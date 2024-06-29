package models

import "time"

type User struct {
	ID       	int    		`json:"id"`
	Email    	string 		`json:"email"`
	Password 	string 		`json:"password"`
	Name     	string 		`json:"name"`
	Gender   	string 		`json:"gender"`
	Age      	int    		`json:"age"`
	CreatedAt time.Time	`json:"createdAt"`
}

type UserInterface interface {
	CreateUser(u *User) (int, error)
	GetUser(id int) (*User, error)
	GetAllUser() ([]*User, error)
	GetProfiles(id int) ([]*User, error)
}

type Swipe struct {
	ID         int    `json:"id"`
	SwipeFrom  int    `json:"swipeFrom"`
	SwipedUser int    `json:"swipedUser"`
	Preference string `json:"preference"`
}
