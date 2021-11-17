import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Page2 from './views/Page2';
import Page3 from './views/Page3';
import Example from './views/Example';

import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

  constructor(){
    super();
    this.state={
      test:"This is a test",
      user:''
    }
  }
  
  setUser = (user) =>{
    this.setState({user},()=>console.log("User is", this.state.user))
  }

  render() {
    return (
      <div>
        <NavBar/>

        <Routes>
          <Route path = '/' element={<Home />}/>
          <Route path = '/page2' element={<Page2 setUser={this.setUser} test = {this.state.test} />}/>
          <Route path = '/page3' element={<Page3 user = {this.state.user}/>}/>
          <Route path = '/example' element={<Example />}/>
        </Routes>
      </div>
    )
  }
}
