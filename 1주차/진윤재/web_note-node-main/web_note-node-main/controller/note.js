const Note = require('../schema/note');

const Ctr = {
    create: async (req, res)=> {
        const {title, content} = req.body;
        const note = new Note({
            title: title,
            content: content
        });
        try {
            await note.save();
            res.redirect('/');
        } catch (error) {
            res.status(500).send("create faol!!");
        }
    },

    read: async (req, res)=> {
        const notes = await Note.find({});
        res.render("index",{note: notes});
    },

    update: async (req, res)=> {
        const {id} = req.params;
        const {title, content} = req.body;
        try{
            await Note.findByIdAndUpdate(id,
                { 
                    title:title,
                    content:content
                },
                {new: true});
            res.redirect('/');
        } catch(error){
            res.status(500).send("update error");
        } 
    },
    delete: async (req,res)=> {
        const {id} = req.params;
        try{
            await Note.findByIdAndDelete(id);
            res.redirect('/');
        } catch(error) {
            res.status(500).send("delete error");
        }
    }
}
module.exports = Ctr;