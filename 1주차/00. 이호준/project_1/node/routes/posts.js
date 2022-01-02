const express = require('express');
const posts = require('../models/Post');

const router = express.Router();

router.get('/', (req, res, next) => {
    const section = req.query.section;
    console.log(section);
    // console.log(typeof posts)
    // console.log(posts)
    const data = section ? posts.posts.filter(b => b.section === section) : posts;
    res.json({ result: "success", data });
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    // console.log(typeof posts)
    // console.log(posts)
    const post = posts.posts.find(b => b.id == id); //타입이 number와 string이라서 ===이면 안됨.
    res.json({ post });
})

// posts로 localhost:8080/api/posts
// {
//     "title" : "hello world title",
//     "content" : "hello world content",
//     "section" : "hello world section"
// }
router.post('/', (req, res, next) => {
    console.log(req.body);
    const id = posts.posts.length + 1;
    const title = req.body.title;
    const content = req.body.content;
    const section = req.body.section;
    const pubDate = new Date().toString();
    const modDate = new Date().toString();
    let post = {id, title, content, section, pubDate, modDate};
    posts.posts.push(post);
    res.status(201).json(post);
})

module.exports = router;