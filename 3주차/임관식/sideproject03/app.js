const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const nunjucks = require('nunjucks');

require('dotenv').config();

const app = express();
const port = 8080;
const router = require('./routes/router');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(__dirname + "/public"));
app.use("/api", router)

app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});


// 페이지 랜더링
app.get("/", (req, res) => {
    res.render("login");
})

app.get("/signup", (req, res) => {
    res.render("signup");
})

app.get("/main", (req, res) => {
    res.render("main");
})

app.get("/post", (req, res) => {
    res.render("post");
})

app.listen(port, () => {
    console.log(`서버 접속 http://localhost:${port}`)
})