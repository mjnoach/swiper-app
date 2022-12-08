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

// type Table struct {
// 	Name    string
// 	Columns []Column

// 	Indexes []*Index
// 	PrimaryKeys []*Column
// 	ForeignKeys []*ForeignKey
// 	Annotation *entsql.Annotation
// }

// var Schema = `
// CREATE TABLE user (
//     email text,
//     password text,
//     name text
//     gender text
//     age text
// );

// CREATE TABLE place (
//     country text,
//     city text NULL,
//     telcode integer
// )`
