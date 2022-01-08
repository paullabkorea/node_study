const express = require('express');
const router = express.Router();

const indexRouter = require('./index');
const postRouter = require('./post');
const commentRouter = require('./comment');
const editpostRouter = require('./editpost');

router.use('/', indexRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/editpost', editpostRouter);

module.exports = router;