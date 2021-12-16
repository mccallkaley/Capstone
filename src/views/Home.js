import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';
import Carousel from 'react-bootstrap/Carousel'
import {Col, Row, Button} from 'react-bootstrap'
//import { ReactVideo } from "reactjs-media";

const formSchema = Yup.object().shape({
    "firstName": Yup.string(),
    "lastName": Yup.string(),
    "email": Yup.string().required("Required"),
    "message": Yup.string()

});

const initialValues = {
    firstName: '',
    lastName:'',
    email:'',
    message:'',
    error:'',
    redirect:false
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            firstName: '',
            lastName:'',
            email:'',
            message:''
        };
    }

    handleSubmit=(e)=>{
 
            e.preventDefault();
          
            fetch('http://localhost:3000/send', {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              }).then(
              (response) => (response.json())
                ).then((response)=> {
              if (response.status === 'success') {
                alert("Message Sent.");
                this.resetForm()
              } else if(response.status === 'fail') {
                alert("Message failed to send.")
              }
            })
          }

          resetForm(){
            this.setState({firstName: '',lastName: '', email: '', message: ''})
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
                Welcome To Icy Aesthetics
                     <img style={styles.h1} 
                    src="https://media.fashiongroup.com/fashionmag/newsletters/images/20090803/pinkdiamond77.jpg"
                    alt="new"
                    width="130" height="130"
                />
                </h1>
          

                        <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSseJUrUHw9gRrujT5m_eF3UKN4MG9YNQxdg&usqp=CAU"
                            alt="First slide"
                            height="350"
                            
                            />
                            <Carousel.Caption>
                            <h3>Clean-Vegan-Gluten Free</h3>
                            <p> Our formulas are designed with ingredients to ensure the right balance between efficiency, safety and responsibility, producing formulations that are more restrictive than
                                regulations in the US, Canada, EU and beyond.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMpT9p3_Gt-zsN9jK1LfjXC7FzNXd01ExzQ&usqp=CAU"
                            alt="Second slide"
                            height="350"
                            />

                            <Carousel.Caption>
                            <h3></h3>
                            <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src="https://media.istockphoto.com/photos/shiny-rose-gold-background-dripping-glitter-texture-picture-id1317656069?b=1&k=20&m=1317656069&s=170667a&w=0&h=KZOE9bnWXPCvZMh2F-NANuwhA2hbr52XORNNHgf2s8c="
                            alt="Third slide"
                            height="350"
                            />

                            <Carousel.Caption>
                            <h3>Interested in working with us?</h3>
                            <p>Send us an email through our contact form below!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>                
                <h1>Contact us!</h1>
               
                <Formik initialValues={initialValues}
                        validationSchema={formSchema}
                        onSubmit={
                            (values, {resetForm})=>{
                                this.handleSubmit(values);
                                resetForm(initialValues);
                            }
                        }
                        >
                        {
                            ({errors, touched})=>(
                                <Form>
                                <label style={styles.formLabels} htmlFor="firstName" className="form-label">First Name</label>
                                <Field name="firstName" type="firstName" className="form-control" />
                                {errors.firstName && touched.firstName ? (<div style={styles.error}>{errors.firstName}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="lastName" className="form-label">Last Name</label>
                                <Field name="lastName" type="lastName" className="form-control" />
                                {errors.lastName && touched.lastName ? (<div style={styles.error}>{errors.lastName}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="email" className="form-label">email</label>
                                <Field name="email" className="form-control" />
                                {errors.email && touched.email ? (<div style={styles.error}>{errors.email}</div>):null}
                                
                                <label style={styles.formLabels} htmlFor="message" className="form-label">message</label>
                                <Field name="message" className="form-control" />
                                {errors.message && touched.message ? (<div style={styles.error}>{errors.message}</div>):null}
                                    
                                    <button  type="submit" className="btn btn-primary">Send</button>

                                </Form>
                            )
                        }

                </Formik>
                <br/>
                <br/>
                <>
                <Button size="lg" style={{backgroundColor:"black", border:'light blue', color:'white',fontFamily: 'Brush Script MT'}} href="http://localhost:3000/shop">Shop</Button> 

                 </>
 

            </div>
        )
    }
}
