require('dotenv').config();
const express = require('express');
const app = express();
var pgp = require("pg-promise")();
var db = pgp(`postgres://${ process.env.DB_LOGIN }:${ process.env.DB_PASSWORD }@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`);

app.get('/api/get_user', (req, res) => {
    getUsers(res)
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
});

const getUsers = (res) => {
    db.one("SELECT * FROM users", 123)
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((error) => {
            console.error(error)
        })
};