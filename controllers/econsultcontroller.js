var mongoose = require('mongoose'),  Client = mongoose.model('client');
module.exports ={
    Create: function(req,res){ //add data to schema
        
        var clientinfo = req.body;
        clientinfo={
            name: req.body.name,
            company:req.body.company,
            email:req.body.email,
            password: req.body.password
        }
        Client.create(clientinfo,function(err,result){//after creation redirect to addproject page 
            if(err) res.redirect("/register");
   
                res.redirect("/addproject");
                

    });
   },
   GetAll: function(req,res){                   // to retreive all data of client schema
       
    Client.find({}, function(err, results){
        if(err) throw err;
        res.render('ourclients.ejs', {client:results});
         });
    },
    GetByName: function(req,res){                   // to retreive data of client schema by given name
        
        const {name} = req.query; 
       
        Client.find({name}, function(err, results){ 
            if(err) throw err;
            res.render('ourclients.ejs', {client:results});
           
        });
    },
    GetById: function(req,res){                    // get data by given id
  
        const {_id} = req.query; 
    
        Client.findById(_id, function(err, results){
            if(err) throw err;
            res.render('editclient.ejs', {client:results});
           
        });
    },
    UpdateById: function(req,res){   // update data by given id
      
        clientinfo={
            name: req.body.name,
            company:req.body.company,
            email:req.body.email,
            password: req.body.password
        }
        Client.findByIdAndUpdate(req.body.id, clientinfo, function(err, updated){// find id first of selected row and then edit it
          
            if(err) {
                console.log(err);
            }
            else {              
                    res.redirect('/getclients');
            }
        }); 
    },
    DeleteById:function(req,res){        //delete row having particluar id select by user
        
        const {_id} = req.query._id; 
    
        Client.findByIdAndDelete(req.query._id, function(err, results){
            if(err) throw err;
            res.redirect('/getclients');
           
        });
    }
}
