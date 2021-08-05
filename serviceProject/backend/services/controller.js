const {User}= require("../models/Users");

let currentUser;


function getUsersFullList(){
    return User.find({})    
    .then (users=>{
            return{
                statusCode:200,
                providers:users
            }
    })
}


function getProvidersByCategory(category){
    return User.find({
        category
    })  
    .then (users=>{
            return{
                statusCode:200,
                providers:users
            }
    })
}

function addUser(providerName,category,location,latitude,longitude){
    return User.findOne({
        providerName
        
    })
    .then (user=>{
        
        if(user){
            console.log(user);
            return {
                statusCode:400,
                message:"Record already exists"
            }
        }
        const newUser= new User({
            providerName,category,location,latitude,longitude
        });
        newUser.save();

        return {
            statusCode:200,
            message:"Record created successfully"
        }
    })
}





module.exports={
    getUsersFullList:getUsersFullList,
    getProvidersByCategory:getProvidersByCategory,
    addUser:addUser,
    
   
    }