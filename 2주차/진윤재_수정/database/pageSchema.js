const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = Schema({
    title: {type: String, maxLength: 20, require: true},
    content: {type: String, maxLength: 500, require: false},
    pubDate: {type: Date, default: Date.now},
    modData : {type: Date, default: Date.now}
});

module.exports = mongoose.model("page", pageSchema);