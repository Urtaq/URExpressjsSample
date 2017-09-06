'use restrict';

import express from 'express';
import mysql from 'mysql';

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'transportation'
});

connection.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/name', (req, res) => {
    const params = req.query;

    const name = params["name"];
    console.log(`name = ${name}`);
    if (name != undefined) {
        connection.query(`SELECT * FROM transportations WHERE name like '%${name}%'`, (err, rows) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
        });
    } else {
        res.send('No data!');
    }
});

app.get('/position', (req, res) => {
    const params = req.query;

    const y = params["lat"];
    const x = params["lng"];
    console.log(x);
    console.log(y);
    if (x != undefined && y != undefined) {
        connection.query("SELECT * FROM transportations WHERE x=" + x + " AND y=" + y, (err, rows) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
        });
    } else {
        res.send('No data!');
    }
});

app.get('/POI', (req, res) => {
    const params = req.query;

    const y = params["lat"];
    const x = params["lng"];
    const radius = params["radius"];
    console.log(x);
    console.log(y);
    console.log(radius);
    if (x != undefined && y != undefined) {
        connection.query("SELECT * FROM transportations WHERE x=" + x + " AND y=" + y, (err, rows) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
        });
    } else {
        res.send('No data!');
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});