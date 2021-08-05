import React from 'react';
import swal from 'sweetalert';
import Bank from './frontendController';
import { withRouter } from 'react-router';
import {Formik,Form,Field} from 'formik';
import *as Yup from 'yup';

const ServiceCustomerSchema=Yup.object().shape({
    serviceCategory:Yup.string()
    
})
class ServiceCustomer extends React.Component {
  
    state = {
        providerObject:[],
        providerName:"",
        location:"",
        selectValue: "NA",
        customerLatitude:"",
        customerLongitude:""
    }

    handleChange = (event) => {
        this.setState({selectValue:event.target.value});
    }
    onSubmit =(values)=>{   
        this.getMapLocation();
        let category = this.state.selectValue
        if(category=="NA"){
            alert("Please Select a Category to Continue")
        }
        else{     
        Bank.loadServiceProvidersList(category)
        .then(data=>{
            this.setState({
                providerObject:data.data.providers
            });
        }); 
        } 
    }

    getMapLocation =() =>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position=> {               
                let lat=position.coords.latitude;
                let lon=position.coords.longitude;   
                this.setState({customerLatitude:lat}); 
                this.setState({customerLongitude:lon}); 

                                  
          });
      } else {
        console.log("location not availabale"); 
      }}


    render() {

        return (
            <div className="container">

                <div className="row">
                    <div className="col-4"> </div>
                    <div className="col-4">
                        <h2>Customer Page</h2>
                    </div>
                    <div className="col-4"></div>
                </div>

                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                       <Formik
                            initialValues={{
                                
                                serviceCategory:""
                            }}
                            validationSchema={ServiceCustomerSchema}
                            onSubmit={this.onSubmit}
                        >
                            {({errors,touched})=>(
                            <Form>
                                <div className="jumbotron" >
                                    <div>
                                        Service Category <select 
                                            value={this.state.selectValue} 
                                            onChange={this.handleChange} 
                                        >
                                            <option value="NA">Please Select Category</option>
                                            <option value="Plumber">Plumber</option>
                                            <option value="Carpentar">Carpentar</option>
                                            <option value="Driver">Driver</option>
                                            <option value="Electrician">Electrician</option>
                                        </select>
                                        <br></br> <br></br>
                                    </div>
                                    
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success">Search</button>
                                    </div>

                                    <h2>Service Providers</h2>
                                    <table class="table">
                                        <tr>
                                            <th>Provider</th>                                            
                                            <th>Distance</th>
                                            <th>Location</th>
                                            <th>CustomerLatitude</th>
                                            <th>CustomerLongitude</th>
                                            <th>ProviderLatitude</th>
                                            <th>ProviderLongitude</th>                                             
                                        </tr>                
                                            {
                                                this.state.providerObject.map(providerObject=><tr>                                                    
                                                    <td>{providerObject.providerName}</td>                                                    
                                                    <td></td>
                                                    <td>{providerObject.location}</td>
                                                    <td>{this.state.customerLatitude}</td>
                                                    <td>{this.state.customerLongitude}</td>
                                                    <td>{providerObject.latitude}</td>
                                                    <td>{providerObject.longitude}</td>
                                
                                        </tr>)
                                            }                                    
                                    </table>                                    
                                </div>
                            </Form>
                            )}

                        </Formik>
                        
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>            
        );
    }
}

export default withRouter(ServiceCustomer) ;