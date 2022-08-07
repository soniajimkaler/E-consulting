var mongoose = require('mongoose');
//model of consultants schema
var consultantSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    qualification:String
    
},{ strict: true });

mongoose.model('consultant', consultantSchema);