const express = require('express');
const router = express.Router();
const {Users} =require('../models');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const loginSchema = Joi.object({
email: Joi.string().email().required(),
password: Joi.string().required(),
})

router.post("/", async (req, res) => {
    try{
        const { email, password} = await loginSchema.validateAsync(req.body);
        const cryptoPass = crypto.createHash('sha512').update(password).digest('base64')

        const user = await Users.findOne({
            where: {
                email, password: cryptoPass
                }
        });
        if(!user) {
            res.status(400).send({
                errorMessage: "이메일 또는 비밀번호가 잘못되었습니다."
            });
            return;
    }
    const token = jwt.sign({userId: user.userId }, process.env.MY_SECRET);
    res.status(200).send({token});

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send({
            errorMessage: "형식이 잘못됐습니다."
        })
    }
    
})

module.exports = router;