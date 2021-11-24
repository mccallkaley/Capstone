import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Page2 from "./views/Page2";
import Page3 from "./views/Page3";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Example from "./views/Example";
import SingleItem from "./views/SingleItem";
import Shop from "./views/Shop";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getIsAdmin } from "./api/apiAdmin";
import AdminRoute from "./components/AdminRoute";
import CreateCats from "./views/CreateCats";
import EditCats from "./views/EditCats";
import { Container } from 'react-bootstrap'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      test: "This is a test",
      user: "",
      token: "",
      foods: [],
      isAdmin: false,
    };
  }

  setUser = (user) => {
    this.setState({ user }, () => console.log("User is", this.state.user));
  };

  addFood = (food) => {
    let foods = this.state.foods;
    foods.push(food);
    this.setState({ foods });
  };

  setToken = (token) => {
    localStorage.setItem("token", token);
    this.setState({ token }, this.getIsAdmin);
    
  };

  static getDerivedStateFromProps = (props, state) => {
    return { token: localStorage.getItem("token") };
  };

  componentDidMount() {
    if (this.state.token) {
      this.getIsAdmin();
    }
  }

  getIsAdmin=()=>{
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
        <NavBar token={this.state.token} isAdmin={this.state.isAdmin}/>
        <Container>
          <Switch> 
            <ProtectedRoute exact path ="/" token={this.state.token} 
                render={()=><Home/>} />
            <ProtectedRoute exact path ="/page2" token={this.state.token} 
                render={()=><Page2 addFood = {this.addFood} setUser={this.setUser} test = {this.state.test} />} />
            <ProtectedRoute exact path ="/page3" token={this.state.token} 
               render={()=><Page3 user={this.state.user} foods={this.state.foods}/>} />
            <ProtectedRoute exact path ="/example" token={this.state.token} 
                render={()=><Example/>} />
            <ProtectedRoute exact path ="/shop" token={this.state.token} 
                render={()=><Shop/>} />
            <ProtectedRoute exact path ="/item/:id" token={this.state.token} 
                render={(props)=><SingleItem {...props}/>} />
           
            <AdminRoute exact path ="/createcats" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><CreateCats/>} />
            <AdminRoute exact path ="/editcats" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><EditCats/>} />

 
            <Route exact path ="/login" 
                render={()=><Login setToken={this.setToken}/>} />
            <ProtectedRoute exact path ="/logout" setToken={this.setToken} 
                render={()=><Logout doLogout={this.doLogout}/>}/>
          </Switch>
        </Container>
      </div>
    );
  }
}
