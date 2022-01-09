const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoutes);
route.get('/add-blog', services.add_blog)
route.get('/update-blog', services.update_blog)

route.post('/api/blogs', controller.create);
route.get('/api/blogs/', controller.find);
route.get('/api/blogs/:id', controller.findOne);
route.put('/api/blogs/:id', controller.update);
route.delete('/api/blogs/:id', controller.delete);


module.exports = route