const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    contents : {
        type: String,
        required: true,
    },
    autor : {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required:false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now }
});

const Blogdb = mongoose.model('blogdb', schema);

module.exports = Blogdb;