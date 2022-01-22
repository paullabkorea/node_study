const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {Users} = require('../models');
const {Op} = require('sequelize');
const crypto = require("crypto");

// 정규 표현식 대체 라이브러리
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    nickname: Joi.string().required(),
    password: Joi.string().required(),
})

router.post("/user", async (req, res) => {
    try {
        // req.body
        const { email, nickname, password} = await signupSchema.validateAsync(req.body);
        
        //비밀번호 암호화
        const cryptoPass = crypto
            // 인자로 사용할 알고리즘을 넣어준다. sha256과 sha512가 있는데 sah512를 더 많이 사용함 이유는 길지만 안전하기 때문에.
            .createHash("sha512") 
            .update(password)
            .digest("base64"); //다이게스트는 base64, hex, latin1 3개 방식이 있는데 base64가 짧아서 더 선호한다 한다.

        // 동일한 닉네임과 이메일이 있는지 찾는다.
        const existUsers = await Users.findOne({
            where: {
                [Op.or]: [{email}, {nickname}],
            },
        })
        if(existUsers) {
            res.status(400).send({
                errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
            })
            return;
        }

        //동일한 이메일이 없으면 생성함.
        await Users.create({
            email, nickname, password: cryptoPass
        })
        res.status(200).send({});

    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send({
            errorMessage: "형식이 잘못됐습니다."
        })
    }
})

module.exports = router;