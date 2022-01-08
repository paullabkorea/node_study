const express = require('express');
const router = express.Router();
const {Comments, sequelize, Sequelize} = require('../models');

router.get("/:postId", async (req, res) => {
  try{
    const {postId} = req.params;
    const sql = `
      SELCET c.commentId, c.comment, c.createdAt, c.updatedAt
      FROM Comments AS c
      WHERE c.postId = ${postId}
      ORDER BY createdAt DESC;
    `
    await sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT})
      .then(result => {
          res.status(200).send({result});
      });
  } catch(error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send(
        {errorMessage: "댓글 조회에 실패하였습니다."}
    );
  }
});

router.post("/:postId", async (req, res) => {
  try {
    const {postId} = req.params;
    const {comment} = req.body;

    if(!comment) {
    res.status(412).send({
      errorMessage: '게시글을 작성하여 주세요.',
    });
    return;
  }

    await Comments.create({postId, comment});
    res.status(201).send({
      message: "create comment!!"
    });
  } catch(error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send(
        {errorMessage: "댓글 조회에 실패하였습니다."}
    );
  }
  
})

module.exports = router;