const post = require('./Schema/postSchema');

const createPost = (title, content, viewer, section, titleImg) => {
    const data = new post({
        title,
        titleImg,
        content,
        viewer,
        section,
        pubDate : new Date(),
        modDate : new Date()
    })
    return data.save();
}

const getPost = (section) => {
    return section
    ?post.find({ section })
    :data = post.find();
}

const getOnePost = (id) => {
    return post.findByIdAndUpdate(
        id,
        {
            $inc: {view:+1}
        },
        {
            new:true
        }
    )
}

const updatePost = (id, title, titleImg, content, viewer, section) => {
    return post.findByIdAndUpdate(
        id,
        {
            title,
            titleImg,
            content,
            viewer,
            section,
            modDate : new Date()
        },
        {
            new: true,
        }
    )
}

const deletePost = (id) => {
    return post.findByIdAndDelete(id);
}

module.exports = {createPost, getPost, updatePost, deletePost, getOnePost}

