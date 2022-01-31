const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

const multer = require('multer');
const path = require('path');

// storage or dest(저장경로 설정), limits(파일 사이즈 제한)
// fileFilter(어떤 파일을 허용할지 제어하는 함수)
// 기본 저장 값도 암호화된 문자열
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            // 여기서 여러가지 작업 가능(들어온 파일이 이미지가 아니면 바로 Out 등)
            done(null, 'imgs/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize : 10 * 1024 * 1024}, // 10MB
})

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
// 미들웨어 추가(multer에서 req.file 추가되서 뒤 미들웨어로 전달)
// single안에 들어가는 문자열은 html의 input의 name
route.post('/api/users', upload.single('image'), controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', upload.single('image'), controller.update);
// route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// 추가
route.get('/api/cafes', controller.cafefind);


module.exports = route