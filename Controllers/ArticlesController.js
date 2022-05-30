const { db } = require('../database')

class ArticlesController {
    async createArticle(req, res) {
        const articleData = req.body
        const date = new Date().toLocaleDateString()
        db.query('INSERT INTO blog (user_id, blog_title, blog_text, blog_datetime) VALUES (${userId}, ${blogTitle}, ${blogText}, ${blogDateTime})',{
            userId: articleData.userId,
            blogTitle: articleData.blogTitle,
            blogText: articleData.blogText,
            blogDateTime: date
        })
            .then((data) => {
                res.send(data[0])
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async getArticlesList(res) {
        await db.query('SELECT users.user_name, blog.blog_id, blog.user_id, blog.blog_datetime, blog.blog_title, blog.blog_text FROM blog JOIN users ON blog.blog_id = users.user_id')
            .then((data) => {
                res.send(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async getArticle(req, res) {
        await db.query('SELECT users.user_name, blog.blog_id, blog.user_id, blog.blog_datetime, blog.blog_title, blog.blog_text FROM blog JOIN users ON blog.blog_id = users.user_id WHERE blog_id = ${ blog_id }' , { blog_id: req.body.blog_id})
            .then((data) => {
                res.send(data[0])
            })
            .catch((error) => {
                console.error(error)
            })
    }

}

module.exports = { ArticlesController }