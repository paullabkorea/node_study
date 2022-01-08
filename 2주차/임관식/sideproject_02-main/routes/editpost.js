const express = require('express');
const router = express.Router();
const {Posts} = require('../models');
const {Op} = require('sequelize');

router.get('/:postId', async (req, res) => {
  const {postId} = req.params;
  const posts = await Posts.findByPk(postId);
  res.render('editpost', {posts});
});

router.put("/:postId", async (req, res) => {
  try{
    const { postId } = req.params;
    let { title, summary, content} = req.body;
    await Posts.update(
    {
      title,
      summary,
      content,
    },
    {
      where: {
        postId
      }
    },
    );
    res.status(201).send({
      alert: "게시글이 수정되었습니다."
    });
  } catch(error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
      res.status(400).send({
      errorMessage: '게시글 수정에 실패하였습니다.',
  })
}
});

router.delete("/:postId", async (req, res) => {
  try{
    const {postId} = req.params;
    await Posts.destroy({
      where: {
        postId
      }
    })
    res.status(201).send({})
  } catch(error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send({
    errorMessage: '게시글 삭제에 실패하였습니다.',
})
  }
})

module.exports = router;