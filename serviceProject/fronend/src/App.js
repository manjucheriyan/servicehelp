import React from 'react';
import logo from './logo.svg';
import ServiceHome from './ServiceHome';
import ServiceCustomer from './ServiceCustomer';
import ServiceProvider from './ServiceProvider';
import './App.css';
import{
  BrowserRouter,
  Switch,
  Route,
  Link
}
from 'react-router-dom';
class App extends React.Component {
  render(){
  return (
   <div className="App">
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>{"       "}
        <Link to="/customer">Customer</Link>{"       "}
        <Link to="/serviceProvider">ServiceProvider</Link>{""   }    
      </div>
      <div>
        <Switch>
          <Route path="/" exact={true}>
              <ServiceHome />
          </Route>
          <Route path="/customer" >
              <ServiceCustomer />
          </Route>
          <Route path="/serviceProvider">
              <ServiceProvider />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
   </div>
  );
}
}
export default App;
