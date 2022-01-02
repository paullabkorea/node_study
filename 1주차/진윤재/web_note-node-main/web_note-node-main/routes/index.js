var express = require('express');
var router = express.Router();
const Note = require("../schema/note");
const ctr = require("../controller/note");

/* GET home page. */
router.get('/', ctr.read);

router.post('/', ctr.create);

router.post('/update/:id', ctr.update);

router.get('/delete/:id',ctr.delete);
module.exports = router;
