import React, { Component } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import Page2 from './views/Page2'
import Example from './views/Example'
export default class App extends Component {

  render() {
    return (
      <div>
        Hello this is in my App.js
        <Routes>
          <Route exact path = '/page' element={<Home />}/>
          <Route exact path = '/page2' element={<Page2 />}/>
          <Route exact path = '/example' element={<Example />}/>
        </Routes>
      </div>
    )
  }
}
