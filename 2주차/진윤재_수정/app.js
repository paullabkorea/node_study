const express = require('express');
const indexRouter = require('./router/index');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on('error',()=>{
    console.log("DB연결 실패");
})

db.once('open',()=> {
    console.log("DB연결 성공");
})

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', indexRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log('애러났음!')
    console.log(err);
    res.sendStatus(500);
})

app.listen(8080);