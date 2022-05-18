const { db } = require('../database')
// blog_id | user_id | comment_text | comment_datetime
class CommentsController {
    async createComment (req, res) {
        const date = new Date()
        await db.query('INSERT INTO comment (blog_id, user_id, comment_text, comment_datetime) VALUES (${ blog_id }, ${ user_id }, ${ comment_text }, ${ comment_datetime })',
            {
                blog_id: req.body.blog_id,
                user_id: req.body.user_id,
                comment_text: req.body.comment_text,
                comment_datetime: date
            })
            .then((data) => {
                res.send(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    async getListComments (req, res) {
        await db.query('SELECT * FROM comment WHERE blog_id = ${ blog_id }', {
            blog_id: req.body.blog_id
        })
            .then((data) => {
            res.send(data)
        })
            .catch((error) => {
                console.error(error)
            })
    }

    async getNumberComments (req, res) {
        await db.query('SELECT count(comment_id) FROM comment WHERE user_id = ${ user_id }', {
            user_id: req.body.user_id
        })
            .then((data) => {
                res.send(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

}

module.exports = { CommentsController }