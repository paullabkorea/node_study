var express = require('express');
var router = express.Router();
const { Posts, Sequelize } = require('../models');
const {Op} = Sequelize;

//게시글 전부 불러오기
router.get("/get", async (req, res) => {
  const posts = await Posts.findAll({
    order: [
      ["createdAt", "DESC"]
  ],
  });
  res.json(posts);
});

module.exports = router;
