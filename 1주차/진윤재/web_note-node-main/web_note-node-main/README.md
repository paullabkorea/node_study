# web_note
## pakage
- express / express-generator
- mongoose
## path
![img](zimg/경로1.png)<br/>
![img](zimg/경로.png)<br/>
## path2
![img](zimg/경로2-1.png)<br/>
![img](zimg/경로2-2.png)<br/>
## 기능
- CRUD
```js
const Ctr= {
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
            res.status(500).send("create error");
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
```
## 탬플릿
![img](zimg/노트화면.png)
[참고](https://github.com/bbarksse/noteApp)
## Schema
![img](zimg/database.png)
```json
{
    "title":"String",
    "content":"String"
}
```