var Jejucafedb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new cafe
    const cafe = new Jejucafedb({
        name : req.body.name,
        summary : req.body.summary,
        contents : req.body.contents,
        lat : req.body.lat,
        lon : req.body.lon,
        tag : req.body.tag?req.body.tag.split(','):['태그없음']
    });

    // save cafe in the database
    cafe
        .save(cafe)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
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

        Jejucafedb.findById(id)
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

    }else{
        Jejucafedb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
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
    Jejucafedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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
    console.log('delete');
    const id = req.params.id;

    Jejucafedb.findByIdAndDelete(id)
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




// 과제 부분
exports.cafefind = (req, res)=>{
    console.log('cafefind');
    // console.log(req.query);
    console.log(req.query.name);

    //http://localhost:8080/api/cafes?name=fixcoffee
    if(req.query.name){
        // 정규표현식을 만드는 방법 2가지
        // var re = /ab+c/;
        // var re = new RegExp("ab+c");
        const namefield = req.query.name;
        // console.log(`/%${namefield}%/`);
        Jejucafedb.find().where('name').equals(namefield)
        // Jejucafedb.find().regex('name', $/{namefield}/)
        // Jejucafedb.find({"name":{ $regex: /${namefield}/, $options: 'i' } })
            .then(data =>{
                // console.log(data)
                if(!data){
                    res.status(404).send({ message : "Not found "+ search})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    } else {
        Jejucafedb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}