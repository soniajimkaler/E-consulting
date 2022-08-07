var mongoose = require('mongoose');
//model of client schema
var clientSchema = new mongoose.Schema({
    name: String,
    company:String,
    email:String,
    password: String,
    
},{ strict: true });

mongoose.model('client', clientSchema);