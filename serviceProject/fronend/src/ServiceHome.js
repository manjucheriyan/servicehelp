import React from 'react';
import { withRouter } from 'react-router';

class ServiceHome extends React.Component {
  
  
serviceProvider=()=>{
    this.props.history.push("/serviceProvider");
   }
serviceSeeker=()=>{
    this.props.history.push("/customer");
   }


    render() {
        return (
            <div className="container"><div className="jumbotron" >
                <h1>Home Page</h1>
                <div>

                 <button type="button" className="btn btn-success" onClick={this.serviceProvider}><h4>Are you a Service Provider?</h4></button><br></br>
                <br/><br/>

                <button type="button" className="btn btn-success" onClick={this.serviceSeeker}><h4>Are you a Service Seeker?</h4></button>

                        
                </div>
                <div>
                
                </div>
            </div>
                
            </div>            
        );
    }
}

export default withRouter(ServiceHome) ;