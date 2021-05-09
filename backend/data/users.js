import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin Shay Sarussi',
    email: 'shaysarussi@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Yabi Cohen',
    email: 'gabicohen@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Yossi Levi',
    email: 'yossilevy@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
