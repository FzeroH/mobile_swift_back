const { db } = require('../database')

class CommentsController {
    async createComment (req, res) {
        const date = new Date().toLocaleDateString()
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
        await db.query('SELECT cm.comment_id, cm.blog_id, cm.user_id, cm.comment_text, cm.comment_datetime, blog.blog_id, users.user_id, users.user_name FROM comment as cm JOIN blog ON cm.blog_id = blog.blog_id JOIN users ON cm.user_id = users.user_id WHERE cm.blog_id = ${ blog_id }', {
            blog_id: req.body.blog_id
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