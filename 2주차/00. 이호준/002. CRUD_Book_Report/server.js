// npm init --yes
// npm i exrpess morgan nodemon ejs body-parser dotenv mongoose axios
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// 로그 옵션으로 tiny와 dev 등의 옵션 제공
app.use(morgan('tiny')); 

// mongodb 연결
connectDB();

// body-parser (post 등으로 들어왔을 때 json처럼 처리를 해주기 위함)
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine(pug를 사용할 때에는'pug', 넌적스를 사용하고 싶을 때에는 'html')
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// 정적 데이터 로드
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// 모든 request는 /에서 처리
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});