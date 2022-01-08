const express = require('express');
const router = express.Router();
const { Posts, sequelize, Sequelize } = require('../models');

router.get("/posts", async (req, res) => {
  try {
    const sql = `
    SELECT *
    FROM Posts
    ORDER BY createdAt DESC;
    `

    await sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT})
    .then((result) => {
      res.status(200).send({result})
    });

  } catch(error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).send({
        errorMessage: "형식이 잘못됐습니다.",
    });
  }
  
})
module.exports = router;