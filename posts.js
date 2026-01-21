var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    titulo: String,
    imagem: String,
    conteudo: String,
    slug: String
});

var posts = mongoose.model('posts', PostSchema);
module.exports = posts;