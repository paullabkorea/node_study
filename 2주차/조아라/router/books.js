const express = require('express');
const router = express.Router();
let books = require('../database/Books');

router.get('/', (req, res, next) => {
  console.log(req.query);
  res.render('books.html', { books });
});

router.get('/write', (req, res, next) => {
  res.render('write.html');
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const book = books.find((book) => book.id == id);
  res.render('bookDetail.html', { book });
});

router.get('/edit/:id', (req, res, next) => {
  console.log(req.params);
  const id = req.params.id;
  const book = books.find((book) => book.id == id);

  res.render('edit.html', { book });
});

router.post('/edit/:id', (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  const book = books.find((book) => book.id == id);
  
  if (book) {
    book.title = req.body.title;
    book.author = req.body.author;
    book.star = req.body.star;
    book.review = req.body.review;
    book.reviewDate = new Date();
    res.redirect('/books');
  } else {
    res.status(404);
  }
});

router.post('/', (req, res, next) => {
  console.log(req.body);

  // 분해구조할당으로 좀 더 깔끔하게 유지 가능
  // const {title, author, star} = req.body;
  const id = books.length + 1;
  const title = req.body.title;
  const author = req.body.author;
  const star = req.body.star;
  const review = req.body.review;
  const reviewDate = new Date();

  const book = { id, title, author, star, review, reviewDate };
  books.push(book);
  res.redirect('/books');
});


// delete와 put이 form에 없는데 어떻게 해결?
// 마이크로 서비스 : fetch에 put, delete
// 모놀리식 서비스 :
// 1. post를 delete나 put으로 변경해주는 모듈 사용
// 2. post로 일괄 처리
// 3. url로 구분(생성, 수정, 삭제는 로그인 인증이 들어가기 때문에)
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  books = books.filter((book) => book.id != id);
  res.redirect('/books');
})

module.exports = router;
