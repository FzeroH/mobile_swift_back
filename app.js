require('dotenv').config();
const express = require('express');
const { UserController } = require("./Controllers/UserController");
const app = express();
const bodyParser = require('body-parser')
const userController = new UserController();
app.use(bodyParser.json());


app.get('/api/get_users', (req, res) => {
    userController.getUsers(res)
});

app.post('/api/create_user' ,(req, res) => {
    userController.createUsers(req, res)
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
});