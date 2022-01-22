const mongoose = require("mongoose");
const schema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 20,
        require: "제목은 필수 입니다.",
    },
    titleImg: {
        type: String,
        default: "default.png"
    },
    content: {
        type: String,
        maxLength: 5000,
        require: "내용을 입력해주세요!!",
    },
    viewer: {
        type: String,
        maxLength: 5000,
        require: false
    },
    section: {
        type: String,
        require: false,
        default: ""
    },
    view:{
        type: Number,
        default: 0
    },
    pubDate: {
        type: Date,
        default: Date.now
    },
    modData : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("post", schema);