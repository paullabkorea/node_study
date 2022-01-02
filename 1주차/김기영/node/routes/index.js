const express = require("express");
const router = express.Router();
const Board = require("../model/board");
const formatDate = (date) => {
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

/* home */
router.get("/", async (req, res) => {
  const boards = await Board.find({});
  res.render("index", { board: boards });
});

/* data write */
router.get("/write", (req, res) => {
  res.render("write", {});
});

/* data save */
router.post("/board/write", async (req, res) => {
  const { title, contents, author } = req.body;
  const board = new Board({
    title: title,
    contents: contents,
    author: author,
    board_date: formatDate(new Date()),
  });

  try {
    await board.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("upload error!");
  }
});

/* data find by id */
router.get("/board/:id", async (req, res) => {
  const { id } = req.params;
  const board = await Board.findById(id);
  res.render("board", { board: board });
});

module.exports = router;
