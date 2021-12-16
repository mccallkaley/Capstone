import React, { Component } from 'react'
import ItemCard from '../components/ItemCard'
import {getItem} from '../api/apiItems'
import {Col, Row, Container} from 'react-bootstrap'

export default class SingleItem extends Component {
    constructor() {
        super();
        this.state={
            item:false
        }
    }

    componentDidMount() {
        this.getSingleItem()
    }

    getSingleItem = async () =>{
        const item = await getItem(localStorage.getItem('token'), this.props.match.params.id)
        if(item === 400){this.setState({tokenError:true})}
        if(item===500){this.setState({serverError:true})}
        if(item!==500 && item !==400){
            this.setState({item})
        }
    }


    render() {

        const styles = {
            pageStyles:{
                backgroundImage: "url('https://i.pinimg.com/originals/eb/a0/17/eba017eb313b5e9d02191baffdb2b978.jpg')",
                backgroundColor: "beige",
                
            },
            headerStyles:{
                color:"#eb144c",
                justifyContent: "center",
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'Brush Script MT'   
            },
        }
        return (
            <div style={styles.pageStyles}>
                <h1 style={styles.headerStyles}>
                    Scroll Down for Reviews xoxo
                </h1>
                <Container className="d-flex vh-100">
                    <Row className="m-auto align-self-center">
                        <Col>
                {
                    this.state.item ? 
                        <ItemCard item={this.state.item}/>
                        :
                        ''
                }
                        </Col>
                    </Row>
                </Container>
                <Container className="d-flex vh-100">
                <Row className="m-auto align-self-center">
                    <Col>
                        <img        
                        src="https://flowingdata.com/wp-content/uploads/2019/11/Sephora-reviews-750x428.png"
                        alt="Reviews"
                         />
                        </Col>
                    </Row>
                    </Container>
            </div>
        )
    }
}
