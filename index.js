const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const path = require('path');

const app = express();

const posts = require('./posts.js');

mongoose.connect('mongodb+srv://joaopeedroothiago_db_user:WvAm6UitRFufSbB5@cluster0.nipiig4.mongodb.net/?appName=Cluster0',{}).then(()=>{
    console.log('conectado ao banco!');
}).catch((err)=>{
    console.log(err.message);
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/',(req,res)=>{
    
    if(req.query.busca == null){
        posts.find({}).sort({'_id': -1}).exec(function(err,posts){
            console.log(posts[1]);
            res.render('home',{posts: posts});
        });
        
    }else{
        res.render('busca',{});
    }

  
});


app.get('/:slug',(req,res)=>{
    //res.send(req.params.slug);
    res.render('single',{});
})



app.listen(3000,()=>{
    console.log('server rodando!');
})