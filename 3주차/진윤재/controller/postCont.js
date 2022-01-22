const postModel = require('../model/postService');

const createPost = async (req, res) => {
    const { title, content, viewer, section, titleImg} = req.body;
    try {
        const data = await postModel.createPost(title, content, viewer, section, titleImg);
        res.status(200).json(data);
    } catch(error) {
        res.status(error).json({ "message" : "post fail" })
    }
}

const getPost = async (req, res) => {
    try{
        const data = await postModel.getPost();
        res.status(200).json(data);
    } catch(error){
        res.status(error).json({ "message" : "get fail" });
    }
}

const getOnePost = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await postModel.getOnePost(id);
        res.status(200).json(data);
    } catch(error) {
        res.status(error).json({ "message" : "get fail" });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, viewer, section, titleImg} = req.body;
    try {
        const data = await postModel.updatePost(id, title, titleImg, content, viewer ,section);
        res.status(200).json(data);
    } catch (error) {
        res.status(error).json({ "message" : "update fail" })
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await postModel.deletePost(id);
        res.status(200).json({ "message" : "delete success" });
    } catch (error) {
        res.status(404).json({ "message" : "not find"});
    }
}
module.exports = {createPost, getPost, updatePost, deletePost, getOnePost}