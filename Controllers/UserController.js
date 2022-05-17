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
        await db.query(
            'INSERT INTO users (user_name, user_login, user_password) VALUES (${ username }, ${ login }, ${ password })',
            {
                username: userData.username,
                login: userData.login,
                password: userData.password
            })
            .then((data) => {
                console.log(data)
                res.send('OK')
            })
            .catch((error) => {
                console.error(error)
                res.send(error)
            })
        console.log(userData)
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