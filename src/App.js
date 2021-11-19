import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Page2 from './views/Page2';
import Page3 from './views/Page3';
import Login from './views/Login';
import Logout from './views/Logout';
import Example from './views/Example';
import Shop from './views/Shop';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  constructor(){
    super();
    this.state={
      test:"This is a test",
      user:'',
      token:'',
      foods:[]
    }
  }
  
  setUser = (user) =>{
    this.setState({user},()=>console.log("User is", this.state.user))
  }

  addFood = (food) =>{
    let foods = this.state.foods
    foods.push(food)
    this.setState({foods})
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

          <Route exact path='/' element={
            <ProtectedRoute token={this.state.token}>
              <Home />
            </ProtectedRoute>
            }/>

          <Route exact path='/page2' element={
            <ProtectedRoute token={this.state.token}>
              <Page2 addFood = {this.addFood} setUser={this.setUser} test = {this.state.test} />
            </ProtectedRoute>
            }/>

          <Route exact path='/page3' element={
            <ProtectedRoute token={this.state.token}>
              <Page3 user = {this.state.user} foods={this.state.foods}/>
            </ProtectedRoute>
            }/>

          <Route exact path='/example' element={
            <ProtectedRoute token={this.state.token}>
              <Example />
            </ProtectedRoute>
            }/>

          <Route exact path='/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout setToken={this.setToken}/>
            </ProtectedRoute>
            }/>

          <Route exact path='/shop' element={
            <ProtectedRoute token={this.state.token}>
              <Shop/>
            </ProtectedRoute>
            }/>




          <Route path = '/login' element ={ <Login setToken={this.setToken}/> }/>
        </Routes>
      </div>
    )
  }
}
