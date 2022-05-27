require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ArticlesController } = require("./Controllers/ArticlesController");
const { CommentsController } = require("./Controllers/CommentsController");
const { UserController } = require("./Controllers/UserController");
const userController = new UserController();
const articleController = new ArticlesController();
const commentController = new CommentsController();
app.use(bodyParser.json());


app.get('/api/get_users', (req, res) => {
    userController.getUsers(res)
});

app.post('/api/create_user' ,(req, res) => {
    userController.createUser(req, res)
});

app.post('/api/login' ,(req, res) => {
    userController.login(req, res)
});

app.post('/api/get_user', (req, res) => {
    userController.getUserInfo(req, res)
});
app.post('/api/create_article', (req, res) => {
    articleController.createArticle(req, res)
});
app.get('/api/get_articles_list', (req, res) => {
    articleController.getArticlesList(res)
});
app.post('/api/get_article', (req, res) => {
    articleController.getArticle(req, res)
});
app.post('/api/create_comment', (req, res) => {
    commentController.createComment(req, res)
});
app.post('/api/get_list_comments', (req, res) => {
    commentController.getListComments(req, res)
});
app.post('/api/get_number_comments', (req, res) => {
    commentController.getNumberComments(req, res)
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
});