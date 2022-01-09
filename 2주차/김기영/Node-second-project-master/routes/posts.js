const express = require("express");
const Post = require("../model/post");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json({ result: "success", posts });
});

router.post("/", async (req, res, next) => {
  const { title, content } = req.body;
  const create_date = new Date().toString();
  const modify_date = new Date().toString();
  const post = new Post({
    title: title,
    content: content,
    create_date: create_date,
    modify_date: modify_date,
  });
  try {
    await post.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("upload error!");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findById(id);
    res.status(200).json({
      message: "detail success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await Post.findByIdAndUpdate(
      id,
      {
        title: title,
        content: content,
      },
      // new: true가 없으면 기존의 데이터가 result에 할당됨
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "update success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      message: "delete success",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
