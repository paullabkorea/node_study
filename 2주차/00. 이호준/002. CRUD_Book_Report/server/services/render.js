const axios = require('axios');


exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:8080/api/blogs')
        .then(function(response){
            // console.log(response);
            res.send(response.data);
            // res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })    
}

exports.add_blog = (req, res) =>{
    res.render('add_blog');
}

exports.update_blog = (req, res) =>{
    axios.get('http://localhost:8080/api/blogs', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}