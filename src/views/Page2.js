import React, { Component } from 'react'

export default class Page2 extends Component {
    render() {
        return (
            <div>
                test: {this.props.test}<br/>
                {/* The user is {this.state.user}<br/> */}
                <input onChange={(event)=>this.props.setUser(event.target.value)}></input>
            </div>
        )
    }
}
