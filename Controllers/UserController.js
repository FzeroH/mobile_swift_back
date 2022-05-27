const { db } = require('../database')


class UserController {
    async getUsers(res) {
        await db.query('SELECT * FROM users')
            .then((data) => {
                res.send(data[0])
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
                        res.send({ message: 'Пользователь с таким именем уже существует в базе', data: data[0] })
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
                db.query('SELECT (SELECT count(user_id) FROM comment WHERE user_id = ${ id }) as comment_count, (SELECT count(blog_id) FROM blog WHERE user_id = ${ id }) as blog_count',
                    { id:data[0].user_id })
                    .then((count) => {
                        res.send({ ...data[0], ...count[0]})
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async login (req, res) {
        const userData = req.body
        await db.query('SELECT user_id, user_login, user_password FROM users WHERE user_login = ${ login }',
            { login: userData.login } )
            .then((data) => {
                if(userData.login === data[0].user_login && userData.password === data[0].user_password) {
                    res.send({ message: 'Успешное подключение', user_id: data[0].user_id })
                } else {
                    res.send({ message:'Неправильное имя пользователя или пароль' })
                }
            })
            .catch((error) => {
                console.error(error)
                res.send(error)
            })
    }
}

module.exports = { UserController }