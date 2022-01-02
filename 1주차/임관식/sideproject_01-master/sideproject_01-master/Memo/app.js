var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = 3000;
const router = require('./routes/router');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// 모듈화한 route 불러오기
app.use("/api", router);

// 페이지 불러오기
app.get('/', function(req, res, next) {
  res.render('index');
});

app.get("/posts", async (req, res) => {
  res.render("post");
})

// 3000번 포트로 연결
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
