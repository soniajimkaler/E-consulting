var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
//models
require('./models/clientmodel');
require('./models/projectmodel');
require('./models/consultantmodel');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
//controllers
var clientController = require('./controllers/econsultcontroller.js');
var projectController = require('./controllers/projectcontroller.js');
var consultantController = require('./controllers/consultantcontroller.js');
//database connectivity
mongoose.connect('mongodb://localhost:27017/e-consult',{useUnifiedTopology:true}, {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log("We are connected on mongoose!");
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req,res) =>{
    res.render("home");
})

app.get("/consultant",(req,res)=>{
    res.render('consultant.ejs');
});
//client crud path
app.get('/getclients',clientController.GetAll);
app.get('/clientlist', clientController.GetByName);
app.post('/register', clientController.Create);
app.get('/editclient', clientController.GetById);
app.get('/deleteclient', clientController.DeleteById);
app.post('/editclient', clientController.UpdateById);
//prject crud paths
app.get('/getall',projectController.GetAll);
app.get('/projectlist', projectController.GetByName);
app.get('/', function(req,res){
    res.render('home.ejs');
});
app.get('/editproject', projectController.GetById);
app.post('/editproject', projectController.UpdateById);
app.get('/deleteproject', projectController.DeleteById);
app.get('/about',function(req,res) {
    res.render('about.ejs');
});
app.post('/addproject', projectController.Create);
app.get('/addproject', function(req,res){
    res.render('addproject.ejs');
});
//consultant crud paths
app.get('/getconsultant',consultantController.GetAll);
app.get('/consultantlist', consultantController.GetByName);
app.post('/consultant', consultantController.Create);
app.get('/editconsultant', consultantController.GetById);
app.get('/deleteconsultant', consultantController.DeleteById);
app.post('/editconsultant', consultantController.UpdateById);
//to register client
app.get('/register', function(req,res){ 
    res.render('register.ejs');   
});
//for home page
app.get('/home',function(req,res){
    res.render('home.ejs');
});
app.listen('4000');