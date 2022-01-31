const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    summary : String,
    contents : String, 
    lat : Number,
    lon : Number,
    img : String,
    tag : {
        type: Array,
        required:false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now },
});

const Jejucafedb = mongoose.model('jejucafedb', schema);

module.exports = Jejucafedb;