var mongoose = require('mongoose');
//model pf project schema
var projectSchema = new mongoose.Schema({
    projectname:{type: String},
    startdate:{type: String},
    enddate:{type:String},
    desc:{type:String},
});

mongoose.model('project', projectSchema);