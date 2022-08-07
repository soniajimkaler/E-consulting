var mongoose = require('mongoose'), Project = mongoose.model('project');

module.exports ={
    GetAll: function(req,res){         // get all data of project schema 
        Project.find({}, function(err, results){
            if(err) throw err;
            res.render('projectlist.ejs', {project:results});
             });
        },
        GetByName: function(req,res){
            
            const {projectname} = req.query; 
           
            Project.find({projectname}, function(err, results){ 
                if(err) throw err;
                res.render('projectlist.ejs', {project:results});
               
            });
        },
Create: function(req,res){    // create and add data to project schema
   
    var projectinfo = req.body;
    projectinfo={
        projectname : req.body.projectname,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        desc:req.body.desc,
        assigned:req.body.assigned,
        feedback:req.body.feedback
    }
    Project.create(projectinfo,function(err,result){   
        if(err) throw err;
        res.redirect('/getall');
    });
},
GetById: function(req,res){                    //  get data by given id
  
    const {_id} = req.query; 

    Project.findById(_id, function(err, results){
        if(err) throw err;
        res.render('editproject.ejs', {project:results});
       
    });
},
UpdateById: function(req,res){                       // update according to id
  
    projectinfo={
        projectname : req.body.projectname,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        desc:req.body.desc,
        assigned:req.body.assigned,
        feedback:req.body.feedback
    }
    Project.findByIdAndUpdate(req.body.id, projectinfo, function(err, updated){   // find the data and update it base on given id
        
        if(err) {
            console.log(err);
        }
        else {
                res.redirect('/getall');
        }
    }); 
},
DeleteById:function(req,res){   // to delete selected data by user
  
    const {_id} = req.query._id; 

    Project.findByIdAndDelete(req.query._id, function(err, results){
        if(err) throw err;
        res.redirect('/getall');
       
    });
  
}
}
