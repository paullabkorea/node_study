const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/posts", postRoute);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", function () {
  console.log("연결 실패");
});

db.once("open", function () {
  console.log("연결 성공");
});

app.get("/", (req, res, next) => {
  res.writeHead(200);
  res.end("hello db!");
});

app.use((req, res, next) => {
  res.status(404).send("못찾음!");
});

app.listen(process.env.DB_PORT);
