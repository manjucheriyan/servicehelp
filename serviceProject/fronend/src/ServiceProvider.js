
import React from 'react';
import swal from 'sweetalert';
import Bank from './frontendController';
import { withRouter } from 'react-router';
import {Formik,Form,Field} from 'formik';
import *as Yup from 'yup';

const ServiceProviderSchema=Yup.object().shape({


    ServiceProviderName:Yup.string()
            .min(2,'Tooo  short')
            .max(18,'Too long')
            .required('Required'),

    ServiceProviderLocation:Yup.string()
                .min(2,'Too short')
                .max(18,'Too long')
                .required('Required')

})



class ServiceProvider extends React.Component {

    state = {
        selectValue: "NA",
        maplocation :"NA",
        latitude:"",
        longitude:""
    }

    handleChange = (event) => {
      this.setState({selectValue:event.target.value}); 
      this.getMapLocation();
    }

     getMapLocation =() =>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position=> {
               
                let lat=position.coords.latitude;
                let lon=position.coords.longitude;
                this.setState({latitude:lat}); 
                this.setState({longitude:lon}); 
                document.getElementById('latitude').textContent=lat;
                document.getElementById('longitude').textContent=lon;
           
           
                     
          });
      } else {
        console.log("location not availabale"); 
      }}

    
    
  
    onSubmit =(values)=>{
            this.getMapLocation();
            let providerName=values.ServiceProviderName; 
            let location = values.ServiceProviderLocation;
            let category = this.state.selectValue;
            let latitude=this.state.latitude;
            let longitude=this.state.longitude;
            if(category=="NA"){
                alert("Please Select a Category to Continue")
            }
            else{
                //alert(latitude+"hai"+longitude);
            // alert(this.state.maplocation)
                Bank.registration(providerName,category,location,latitude,longitude)
                .then(response=>{
                    swal("Entry Creation Success",response.data.message,"success")
                this.props.history.push("/");
                })
                .catch(error=>{
                    console.log(error)
                    swal("Entry Creation Failed","Service Person with same name already exists","error");
                })
            }
        
        
        }
    

    

    render() {
        
        return (
            <div className="container">

                <div className="row">

                    <div className="col-4"> </div>
                    <div className="col-4">
                        <h2>  Service Provider Page</h2>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-5">


                       <Formik
                        initialValues={{
                            ServiceProviderName:"",
                            ServiceProviderCategory:"",
                            ServiceProviderLocation:""
                       }}
                       validationSchema={ServiceProviderSchema}
                       onSubmit={this.onSubmit}
                        >

                       {({errors,touched})=>(
                       <Form>

                            <div className="jumbotron" >

                                <div className="form-group">
                                    <label for="">Name</label>
                                    <Field name="ServiceProviderName" />
                                    {errors.ServiceProviderName?<div>{errors.ServiceProviderName}</div>:null}
                                </div>

                                <div>
                                    Category Type <select 
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
                                    <label for="">Location</label>
                                    <Field name="ServiceProviderLocation" />
                                    {errors.ServiceProviderLocation?<div>{errors.ServiceProviderLocation}</div>:null}
                                </div>

                                <p><span>Your Location:</span><br/>Latitude:<span id="latitude"></span><br/>
                                    Longitude:<span id="longitude"></span><br/>
                                </p>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Create Service Provider</button>
                                </div>
                            </div>
                     </Form>
                     )}
                    </Formik>
                        
                        <div className="col-4"></div>
                </div></div>
                </div>
            
        );
    }
}export default withRouter(ServiceProvider) ;