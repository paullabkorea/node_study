const express = require('express');
const cont = require('../controller/postCont');

const router = express.Router();

router.get('/', cont.getPost);
router.get('/:id', cont.getOnePost);
router.post('/', cont.createPost);
router.put('/:id', cont.updatePost);
router.delete('/:id', cont.deletePost);

module.exports = router;