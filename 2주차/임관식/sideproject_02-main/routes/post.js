const express = require('express');
const router = express.Router();
const {Posts, Comments} = require('../models');

router.post("/posts", async (req, res) => {
  try{
    let { title, summary, content } = req.body;
    await Posts.create({
      title,
      summary,
      content,
    });
    res.status(200).send({
      masseage: 'create success!!'
    });

  } catch(error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send({
      errorMessage: "형식이 잘못됐습니다.",
    })
  }
})


module.exports = router;