const { db } = require('../database')


class UserController {
    async getUsers(res) {
        await db.query('SELECT * FROM users')
            .then((data) => {
                res.send(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async createUser (req, res) {
        const userData = req.body
        console.log(userData)
        if (userData.username.length !== 0 || userData.login.length !== 0 || userData.password.length !== 0) {
            await db.query('SELECT user_login from users WHERE user_login = ${ login }', {
                login: userData.login
            })
                .then((data) => {
                    console.log(data)
                    if(data.length !== 0) {
                        res.send({ message: 'Пользователь с таким именем уже существует в базе', data: data })
                    } else {
                         db.query(
                            'INSERT INTO users (user_name, user_login, user_password) VALUES (${ username }, ${ login }, ${ password })',
                            {
                                username: userData.username,
                                login: userData.login,
                                password: userData.password
                            })
                            .then(() => {
                                res.send({status: 'OK', message:'Пользователь добавлен'})
                            })
                            .catch((error) => {
                                console.error(error)
                                res.send(error)
                            })
                    }
                }
            )
        } else {
            res.send({ message: 'Заполните все поля' })
        }
    }

    async getUserInfo(req, res) {
        await db.query('SELECT user_id, user_name, user_login FROM users WHERE user_id = ${ id }' , { id: req.body.id})
            .then((data) => {
                res.send(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
}

module.exports = { UserController }