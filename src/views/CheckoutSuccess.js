import React, { Component } from 'react'

export default class CheckoutSuccess extends Component {

    componentDidMount(){
        this.props.clearCart();

    }
    render() {
        const styles = {
            pageStyles:{
                
                backgroundColor: "pink",
                padding:"20px",
                minHeight:"94vh",
                color:"azure"
            },
            headerStyles:{
                color:"hotpink",
                justifyContent: "center",
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'Brush Script MT'   
            },
            error:{
                color:"red"
            },
            h1:{
                color:"pink",
                justifyContent: "center",
                alignItems: 'center'
            },
            img:{
                img: "url('https://media.fashiongroup.com/fashionmag/newsletters/images/20090803/pinkdiamond77.jpg')",
                
            },
        };
        return (
            <div style={styles.pageStyles}>
                <h1 style={styles.headerStyles}>
                    <img style={styles.h1} 
                    src="https://media.fashiongroup.com/fashionmag/newsletters/images/20090803/pinkdiamond77.jpg"
                    alt="new"
                    width="130" height="130"
                />
                Thank you for shopping with Icy Aesthetics!
                     <img style={styles.h1} 
                    src="https://media.fashiongroup.com/fashionmag/newsletters/images/20090803/pinkdiamond77.jpg"
                    alt="new"
                    width="130" height="130"
                />
                
                </h1>
                
            </div>
            
        )
    }
}

