import React, { Component } from 'react'
import {Route, Navigate} from 'react-router-dom';

export default class ProtectedRoute extends Component {
    render() {
        return this.props.token ?(
            <Route {...this.props}/>
        ):(
            <Navigate to={{pathname:"/login"}}/>
        )
            
        
    }
}
