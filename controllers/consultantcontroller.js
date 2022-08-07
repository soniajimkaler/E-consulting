var mongoose = require('mongoose'), Consultant = mongoose.model('consultant');
module.exports ={
    Create: function(req,res){                    // function to add data to  consultant schema
        var consultantinfo = req.body;
        consultantinfo={
            name: req.body.name,
            email:req.body.email,
            password: req.body.password,
            qualification:req.body.qualification
        }
        Consultant.create(consultantinfo,function(err,result){
            if(err) res.redirect("/consultant");
                res.redirect("/getconsultant");
    });
   },
   GetAll: function(req,res){  // function to fetch data of  consultant schema
       
    Consultant.find({}, function(err, results){
        if(err) throw err;
        res.render('ourconsultants.ejs', {consultant:results});
         });
    },
    GetByName: function(req,res){    // function to fetch data from consultant schema according to given name
        
        const {name} = req.query; 
       
        Consultant.find({name}, function(err, results){ 
            if(err) throw err;
            res.render('ourconsultants.ejs', {consultant:results});
           
        });
    },

    GetById: function(req,res){  // function to fetch data from  consultant schema according to id
  
        const {_id} = req.query; 
    
        Consultant.findById(_id, function(err, results){
            if(err) throw err;
            res.render('editconsultant.ejs', {consultant:results});
           
        });
    },
    UpdateById: function(req,res){ //function to edit data of consultant according to id
    
        consultantinfo={
            name: req.body.name,
            company:req.body.company,
            email:req.body.email,
            password: req.body.password
        }
        Consultant.findByIdAndUpdate(req.body.id, consultantinfo, function(err, updated){//update data of consultant schema
            console.log(consultantinfo);
            if(err) {
                console.log(err);
            }
            else {              
                    res.redirect('/getconsultant');
            }
        }); 
    },
    DeleteById:function(req,res){
        const {_id} = req.query._id; 
    
        Consultant.findByIdAndDelete(req.query._id, function(err, results){//delete particular consultant from schema
            if(err) throw err;
            res.redirect('/getconsultant');
           
        });
    }
}
