import React, { Component } from 'react'

export default class Page3 extends Component {
    render() {
        return (
            <div>
                page3<br/>
                The user is {this.props.user}
            </div>
        )
    }
}
