const express = require('express');
const router = express.Router();
const schema = require('../database/pageSchema');

router.get('/', async (req,res) => {
    const data = await schema.find({});
    res.status(200).json(data);
});

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    const data = await schema.findById(id);
    res.status(200).json(data.content);
})

router.post('/', async (req, res) => {
    const title = "제목을 입력하시오";
    const data = new schema ({
        title,
        content: title
    })
    try {
        await data.save();
        res.status(200).send("성공");
    } catch (error) {
        res.status(500).send("저장 실패 :"+error);
    }
});

router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const {title} = req.body;
    try {
        const data = await schema.findByIdAndUpdate(id,{
            title,
            modDate : Date.now
        },
        {
            new:true
        });
        res.status(200).json(data);
    } catch(error) {
        res.status(500).send("수정 실패:");
    }
})
router.put('/cont/:id',async (req,res)=>{
    const {id} = req.params;
    const {content} = req.body;
    try {
        const data = await schema.findByIdAndUpdate(id,{
            content,
            modDate : Date.now
        },
        {
            new:true
        });
        res.status(200).json(data);
    } catch(error) {
        res.status(500).send("수정 실패:");
    }
})

router.delete('/:id', async (req, res)=> {
    const {id} = req.params;
    try {
        const data = await schema.findByIdAndDelete(id);
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send("삭제 실패");
    }
})
module.exports = router;