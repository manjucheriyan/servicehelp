var express = require('express');
var router = express.Router();
var Provider = require('../services/controller');


function authMiddleware(req,res,next){
  console.log("Inside authMiddleware");
  if(req.session.currentUser){
    next();
  }
  else{    
    res.staus(401).send({message:"Please login"});
  }
}
/* GET providers listing. */

router.get('/list', function(req, res) {
  Provider.getUsersFullList()
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,providers:data.providers});
  });
});


router.post('/categoryList', function(req, res) {
  console.log("In CategorList");
  let category=req.body.category;
  
  Provider.getProvidersByCategory(category)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,providers:data.providers});
  });
});

router.post('/register',function(req, res) {
  
      console.log("In Register+kl");
      let providerName=req.body.providerName;       
      let category = req.body.category;
      let location = req.body.location  ;
      let latitude=req.body.latitude;
      let longitude=req.body.longitude;
      if(providerName==""){
        res.status(400).send({message:"field cant be null"});
      }
      else{
        Provider.addUser(providerName,category,location,latitude,longitude)
        .then(data=>{
          res.status(data.statusCode).send({message:data.message});
        }) 
      }

})







module.exports = router;