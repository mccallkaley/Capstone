import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Page2 from './views/Page2';
import Page3 from './views/Page3';
import Login from './views/Login';
import Logout from './views/Logout';
import Example from './views/Example';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  constructor(){
    super();
    this.state={
      test:"This is a test",
      user:'',
      token:''
    }
  }
  
  setUser = (user) =>{
    this.setState({user},()=>console.log("User is", this.state.user))
  }

  setToken = (token) =>{
      this.setState({token})
      localStorage.setItem('token',token)
  }


  static getDerivedStateFromProps = (props,state)=>{
    return {"token":localStorage.getItem('token')}
  }

  render() {
    return (
      <div>
        <NavBar token={this.state.token}/>
        <Routes>
        <Route exact path='/' element={<ProtectedRoute token={this.state.token}/>}>
          <Route path = '/' element={<Home />}/>
        </Route>
          {/* <ProtectedRoute path = '/page2' element={<Page2 setUser={this.setUser} test = {this.state.test} />}/>
          <ProtectedRoute path = '/page3' element={<Page3 user = {this.state.user}/>}/>
          <ProtectedRoute path = '/example' element={<Example />}/>
          <ProtectedRoute path = '/logout' element ={ <Logout setToken={this.setToken}/> }/> */}

          <Route path = '/login' element ={ <Login setToken={this.setToken}/> }/>
        </Routes>
      </div>
    )
  }
}
