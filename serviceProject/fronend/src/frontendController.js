import axios from 'axios';
const baseUrl = "http://localhost:4000";

class Bank{

    static registration(providerName,category,location,latitude,longitude){
        return axios.post(baseUrl+"/providers/register",{
            providerName,
            category,
            location ,
            latitude,
            longitude          
        })
    }

    static loadServiceProvidersList(category){
        return axios.post(baseUrl+"/providers/categoryList",{
            category,
        })
    }
    

}

export default Bank;