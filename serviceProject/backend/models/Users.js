const mongoose=require('mongoose');

const User = mongoose.model('User',{    
    providerName:String,
    category:String,
    location:String,
    latitude:Number,
    longitude:Number    
})

module.exports ={
    User
}