import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Page2 from './views/Page2';
import Page3 from './views/Page3';
import Login from './views/Login';
import Logout from './views/Logout';
import Example from './views/Example';
import SingleItem from './views/SingleItem';
import Shop from './views/Shop';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getIsAdmin} from './api/apiAdmin';
import AdminRoute from './components/AdminRoute';
import CreateCats from './views/CreateCats';
import EditCats from './views/EditCats';

export default class App extends Component {

  constructor(){
    super();
    this.state={
      test:"This is a test",
      user:'',
      token:'',
      foods:[],
      isAdmin:false
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
      this.getIsAdmin()
  }


  static getDerivedStateFromProps = (props,state)=>{
    return {"token":localStorage.getItem('token')}
  }

  componentDidMount(){
    if(this.state.token){
      this.getIsAdmin()
    }
  }

  getIsAdmin=async()=>{
    const isAdmin=async ()=>{
      let res=await getIsAdmin(localStorage.getItem('token'))
      if (res === 500 || res ===400){res=false}
      console.log("isAdmin",res)
      this.setState({isAdmin:res})
    }
    isAdmin()

  }


  render() {
    return (
      <div>
        <NavBar token={this.state.token}/>
        <Routes>

          <Route path='/' element={
            <ProtectedRoute token={this.state.token}>
              <Home />
            </ProtectedRoute>
            }/>

          <Route path='/page2' element={
            <ProtectedRoute token={this.state.token}>
              <Page2 addFood = {this.addFood} setUser={this.setUser} test = {this.state.test} />
            </ProtectedRoute>
            }/>

          <Route path='/page3' element={
            <ProtectedRoute token={this.state.token}>
              <Page3 user = {this.state.user} foods={this.state.foods}/>
            </ProtectedRoute>
            }/>

          <Route path='/example' element={
            <ProtectedRoute token={this.state.token}>
              <Example />
            </ProtectedRoute>
            }/>

          <Route path='/logout' element={
            <ProtectedRoute token={this.state.token}>
              <Logout setToken={this.setToken}/>
            </ProtectedRoute>
            }/>

          <Route path='/shop' element={
            <ProtectedRoute token={this.state.token}>
              <Shop/>
            </ProtectedRoute>
            }/>

          <Route path='/item/:id' element={
            <ProtectedRoute token={this.state.token}>
              <SingleItem/>
            </ProtectedRoute>
            }/>

          <Route path='/createcats' element={
            <ProtectedRoute isAdmin = {this.state.isAdmin} token={this.state.token}>
              <CreateCats/>
            </ProtectedRoute>
            }/>


          <Route path='/editcats' element={
            <ProtectedRoute isAdmin = {this.state.isAdmin} token={this.state.token}>
              <EditCats/>
            </ProtectedRoute>
            }/>


          <Route path = '/login' element ={ <Login setToken={this.setToken}/> }/>
        </Routes>
      </div>
    )
  }
}
