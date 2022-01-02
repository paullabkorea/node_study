// npm init --yes
// npm i express dotenv cors
// npm install --save-dev nodemon 
// package.json에서 
// "test": "echo \"Error: no test specified\" && exit 1"를
// "start" : "nodemon index.js"로 고치고
// npm start

const express = require("express");
const app = express();
const cors = require('cors');
const postRoute = require("./routes/posts");

app.use(express.json());
app.use(express.urlencoded( {extended : false } )); 

app.use(cors());

// 페이지 불러오기
app.get('/', function(req, res, next) {
    res.send('index');
});

app.use("/api/posts", postRoute);

app.use((req, res, next) => {
    res.sendStatus(404);
})
    
app.use((err, req, res, next) => {
    console.log('애러났음!')
    console.log(err);
    res.sendStatus(500);
})

app.listen("8080", () => {
    console.log("노드 실행 중");
});