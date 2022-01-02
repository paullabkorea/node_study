// routes/index.js

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yoojin:11191119@memo.jqlj2.mongodb.net/memo?retryWrites=true&w=majority', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
	console.log("DB connected");
});

let Schema = mongoose.Schema;

let Memo = new Schema({
	author: String,
	contents: String,
	date: String
});

let memoModel = mongoose.model('Memo', Memo);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/load', function(req, res, next) {
	memoModel.find({}, function(err, data){
		res.json(data);
	});
});

router.post('/write', function(req,res,next) {
	let author = req.body.author;
	let contents = req.body.contents;
	let date = new Date();
  	let year = date.getFullYear();
  	let month = date.getMonth()+1;
  	let today= date.getDate();
  	let todayDate = year + '년' + month +'월' + today +'일';
	
	let memo = new memoModel();
	
	memo.author = author;
	memo.contents = contents;
	memo.date = todayDate;
	memo.comments = [];
	

	memo.save(function (err) {
		if (err) {
			throw err;
		}
		else {
			res.json({status: "SUCCESS"});
		}
	});
});

module.exports = router;