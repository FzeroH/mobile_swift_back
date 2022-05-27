const { db } = require('../database')

class ArticlesController {
    async createArticle(req, res) {
        const articleData = req.body
        const date = new Date ()
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
        await db.query('SELECT * FROM blog')
            .then((data) => {
                res.send(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async getArticle(req, res) {
        await db.query('SELECT * FROM blog WHERE blog_id = ${ blog_id }' , { blog_id: req.body.blog_id})
            .then((data) => {
                res.send(data[0])
            })
            .catch((error) => {
                console.error(error)
            })
    }

}

module.exports = { ArticlesController }