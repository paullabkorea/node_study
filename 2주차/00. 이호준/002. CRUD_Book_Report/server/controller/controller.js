var Blogdb = require('../model/model');

// 생성 후 저장
exports.create = (req,res)=>{
    // 데이터 유효성 검사
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // blog
    const blog = new Blogdb({
        title : req.body.title,
        contents : req.body.contents,
        autor: req.body.autor,
        categories : req.body.categories.split(', '),
        createdAt: new Date(),
        updatedAt: new Date()
    })

    // save user in the database
    blog
        .save(blog)
        .then(data => {
            res.send(data)
            // res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Blogdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    } else {
        Blogdb.find()
            .then(blog => {
                res.send(blog)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }    
}

exports.findOne = (req, res)=>{
    console.log(req.params.id);
    if(req.params.id){
        const id = req.params.id;

        Blogdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    } 
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;

    console.log(req.body);
    if(req.body.categories){
        req.body.categories = req.body.categories.split(', ');
    }
    req.body.updatedAt = new Date();
    Blogdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Blogdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}