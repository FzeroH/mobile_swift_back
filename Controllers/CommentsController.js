const { db } = require('../database')

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
                res.send(data[0])
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
            res.send(data[0])
        })
            .catch((error) => {
                console.error(error)
            })
    }
}

module.exports = { CommentsController }