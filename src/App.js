import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Page2 from "./views/Register";
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
import CreateItems from "./views/CreateItems";
import EditItems from "./views/EditItems";
import Cart from "./views/Cart";
import { Container } from 'react-bootstrap';
import CheckoutSuccess from './views/CheckoutSuccess';
import DashboardPage from "./views/DashboardPage";
import Register from "./views/Register";
import SocialFollow from "./components/SocialFollow";




export default class App extends Component {
  constructor() {
    super();
    this.state = {
      test: "This is a test",
      user: "",
      token: "",
      foods: [],
      isAdmin: false,
      cart:{}
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return { 
      token: localStorage.getItem("token"),
      cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):{}
    };
  };

  componentDidMount() {
    if (this.state.token) {
      this.getIsAdmin();
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage",(e)=>{
        this.setState({cart:JSON.parse(localStorage.getItem("cart"))})
      })
    }
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

  getIsAdmin=()=>{
    const isAdmin=async ()=>{
      let res=await getIsAdmin(localStorage.getItem('token'))
      if (res === 500 || res ===400){res=false}
      console.log("isAdmin",res)
      this.setState({isAdmin:res})
    }
    isAdmin()
  }

  doLogout=()=>{
    console.log("Logged out")
    localStorage.clear();
    this.setToken('');
    this.setState({isAdmin:false, cart:{}});

  }

  // cart section

  // {
  //   "Red Shoes":{name:"red shoes",desc:"the desc",price:"price", quantity:""}
  // }
  addToCart=(item)=>{
    let cart = this.state.cart
    if (cart[item.name]){
      cart[item.name].quantity++
    }else{
      cart[item.name]={...item,quantity:1}
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`Thanks for adding ${item.name} to your cart`)
  }
  
  //The total number of items in the cart
  getCartItemTotal=()=>{
    let total=0
    for (const item in this.state.cart){
      total+=this.state.cart[item].quantity
    }
    return total
  }

  // the total price of all items in cart
  getCartTotalPrice=()=>{
    let total=0
    for (const item in this.state.cart){
      total+=this.state.cart[item].quantity*this.state.cart[item].price
    }
    return total
  }

  removeFromCart = (item)=>{
    let cart=this.state.cart;
    if (cart[item.name].quantity >1){
      cart[item.name].quantity--
    }else if (cart[item.name].quantity === 1){
      delete cart[item.name]
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`You remove ${item.name} from your cart`)
  }

  removeAllFromCart=(item)=>{
    let cart=this.state.cart;
    if(cart[item.name]){
      delete cart[item.name];
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`You remove all of ${item.name}s from your cart`)
  }

  clearCart=()=>{
    this.setState({cart:{}})
    localStorage.removeItem("cart")
  }

  render() {
    return (
      <div>
        <NavBar token={this.state.token} isAdmin={this.state.isAdmin} getCartTotalPrice={this.getCartTotalPrice} getCartItemTotal={this.getCartItemTotal} />
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
            <ProtectedRoute exact path ="/dashboardpage" token={this.state.token} 
                render={()=><DashboardPage/>} />
            <ProtectedRoute exact path ="/shop" token={this.state.token} 
                render={()=><Shop addToCart={this.addToCart}/>} />
            <ProtectedRoute exact path ="/item/:id" token={this.state.token} 
                render={(props)=><SingleItem {...props}/>} />

            <ProtectedRoute exact path ="/cart" token={this.state.token} 
                render={()=><Cart 
                            cart={this.state.cart} 
                            removeFromCart={this.removeFromCart} 
                            removeAllFromCart={this.removeAllFromCart}
                            getCartItemTotal={this.getCartItemTotal}
                            getCartTotalPrice={this.getCartTotalPrice}
                            />} />

              <ProtectedRoute exact path ="/checkoutSuccess" token={this.state.token} 
                render={()=><CheckoutSuccess clearCart={this.clearCart}/>} />
           
           
            <AdminRoute exact path ="/createcats" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><CreateCats/>} />
            <AdminRoute exact path ="/editcats" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><EditCats/>} />

            <AdminRoute exact path ="/createitems" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><CreateItems/>} />
            <AdminRoute exact path ="/edititems" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><EditItems/>} />

 
            <Route exact path ="/login" 
                render={()=><Login setToken={this.setToken}/>} />
            <Route exact path ="/socialfollow" 
                render={()=><SocialFollow setToken={this.setToken}/>} />            
            <Route exact path ="/register" 
                render={()=><Register setToken={this.setToken}/>} />
            <ProtectedRoute exact path ="/logout"
                token={this.state.token}
                render={()=><Logout doLogout={this.doLogout}/>}/>
          </Switch>
        </Container>
        <SocialFollow />
      </div>
    );
  }
}