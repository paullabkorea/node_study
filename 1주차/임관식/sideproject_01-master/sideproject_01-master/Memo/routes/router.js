const express = require('express');
const router = express.Router();

// 모듈화한 router들 불러오기
const indexRouter = require('./index');
const postsRouter = require('./posts');

router.use('/', indexRouter);
router.use('/posts', postsRouter);

module.exports = router;