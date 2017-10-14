import React, { Component } from 'react';
import './Request.css';
import { Modal, Form, FormControl, FormGroup, Col, ControlLabel, Checkbox, Button, ButtonToolbar } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout';
import stripe from './Stripekey'; 
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import VueCoreImageUpload from 'vue-core-image-upload';


class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentAmt: 2500,
      show: false,
      quote: {
        name:"",
        phoneNumber:"",
        email:"",
        designType:"",
        size:"",
        color:"",
        sides:"",
        singleDouble:"",
        quantity:"",
        dueDate:"",
        comments:"",
        image:""
      }
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.send = this.send.bind(this);
    this.close = this.close.bind(this);
    this.submitQuotesToDatabase = this.submitQuotesToDatabase.bind(this);
  }

  submitQuotesToDatabase () {
    console.log(this.state.quote.image)
    const body = {
      name: this.state.quote.name,
      email: this.state.quote.email,
      phonenumber:this.state.quote.phoneNumber,
      designtype:this.state.quote.designType,
      size:this.state.quote.size,
      color:this.state.quote.color,
      sides:this.state.quote.sides,
      sides2:this.state.quote.singleDouble,
      duedate:this.state.quote.dueDate,
      quantity:this.state.quote.quantity,
      comments:this.state.quote.comments,
      image:this.state.quote.image,
      
    }
    console.log(body)
    axios.post('api/quote/addquote', body).then(response => {
      alert('Your quote has been submitted')
    })
  }

  send () {
    const body = {
      phoneNumber:this.state.quote.phoneNumber,
      designType:this.state.quote.designType,
      size:this.state.quote.size,
      color:this.state.quote.color,
      sides:this.state.quote.sides,
      singleDouble:this.state.quote.singleDouble,
      dueDate:this.state.quote.dueDate,
      phoneNumber:this.state.quote.phoneNumber,
      quantity:this.state.quote.quantity,
      comments:this.state.quote.comments,
      email: this.state.quote.email,
      name: this.state.quote.name,
      image: this.state.quote.image,
      to: "kangeb1992@gmail.com",
      subject: "Request Quote"
    }
    axios.post ('/api/send_quote', body )
  }

  close () {
    this.setState({ show: false});
  }

  showModal() {
    this.setState({show: true});
  }
  
  hideModal() {
    this.setState({show: false});
  }

  onToken = (token) => {
    token.card = void 0;
    console.log('token', token);
    axios.post('/api/payment', { token, amount: this.state.paymentAmt } ).then(response => {
      alert('Payment has been completed')
    });
  }
  render() {


    return (
      <div className='request_container'>
        <h1>Request</h1>
      <div>


        {     /* get a quote form */   }
        
        <ButtonToolbar>
            <div className="message_button_container">
        <Button className="quote_button" bsStyle="primary" onClick={this.showModal}>
          Get A Quote
        </Button>
        </div>
          <Modal   
          {...this.props}
          
          aria-labelledby="contained-modal-title-lg"
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal2" >
          <Modal.Header className= "modal_header" closeButton>
            <Modal.Title id="contained-modal-title">Quote Form</Modal.Title>
          </Modal.Header>
          <div className="contact_form">
          <Form horizontal className="Quote_Form">
          <Modal.Body>

{/* name */}
    <FormGroup controlId="formHorizontalName" >
      <Col componentClass={ControlLabel} sm={1} className="title_input">
        Name
      </Col>
      <Col sm={10}>
        <FormControl onChange={(e)=>{this.setState({
          quote:{...this.state.quote, name:e.target.value}
          })}} type="text" placeholder="Name" />
      </Col>
    </FormGroup>

{/* phonenumber */}
    <FormGroup controlId="formHorizontal" >
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Phone Number
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, phoneNumber:e.target.value}
          })}} type="tel" placeholder="Phone #" />
      </Col>
    </FormGroup>
{/* email */}
    <FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Email
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, email:e.target.value}
          })}} type="email" placeholder="Email" />
      </Col>
    </FormGroup>

{/* design type */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
      Design Type 
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, designType:e.target.value}
          })}} type="text" placeholder="Design Type" />
      </Col>
    </FormGroup>

{/* size */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Size
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, size:e.target.value}
          })}} type="text" placeholder="Size" />
      </Col>
    </FormGroup>

{/* color */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Color
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, color:e.target.value}
          })}} type="color" placeholder="Color" />
      </Col>
    </FormGroup>

{/* printed shirts - front/back/both */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Sides
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, sides:e.target.value}
          })}} type="text"  placeholder="Front/Back/Both (Shirts)" />
      </Col>
    </FormGroup>        

{/* single/double */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Single/Double
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, singleDouble:e.target.value}
          })}} type="text" placeholder="Single/Double" />
      </Col>
    </FormGroup>

{/* how many */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Quantity
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, quantitiy:e.target.value}
          })}} type="number" placeholder="Quantity" />
      </Col>
    </FormGroup>

{/* Due date */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Due Date
      </Col>
      <Col sm={10}>
        <FormControl  onChange={(e)=>{this.setState({
          quote:{...this.state.quote, dueDate:e.target.value}
          })}} type="date" placeholder="Due Date (Rushed job costs extra)" />
      </Col>
    </FormGroup>

{/* Details */}
<FormGroup controlId="formHorizontal">
      <Col componentClass={ControlLabel} sm={1}className="title_input">
        Comments
      </Col>
      <Col sm={10}>
        <FormControl className="comments" onChange={(e)=>{this.setState({
          quote:{...this.state.quote, comments:e.target.value}
          })}} type="text" placeholder="Write any comments here.." />
      </Col>
    </FormGroup>

   {/* image */}
   <FormGroup controlId="formHorizontal">
    <Col componentClass={ControlLabel} sm={1}className="title_input">
        Image
      </Col>
      <Col sm={10}>
      <FormControl type="file" id="fileInput" onChange={(e)=>{
        let fileUpload = document.getElementById('fileInput');
        console.log(this.state);
        console.log(e.target);
        console.log(fileUpload.value)
        this.setState({
          quote:{...this.state.quote, image:e.target.value}}
          )}
          }/>
      </Col> 
   </FormGroup>
   
    <FormGroup >
      <Col smOffset={1} sm={4}>
        <Button onClick = {()=>{this.send(this.state.email); this.close(); this.submitQuotesToDatabase()}} className="messageSubmitbutton" type="submit">
          SUBMIT
        </Button>
      </Col>
    </FormGroup>
    </Modal.Body>

  </Form>
          </div>
    </Modal>
    </ButtonToolbar>

   
       
    </div>


       {        /* paycard form */       }


    <div className="payform_container"> 
       <div className="pay_form">
       <Form horizontal>
    <FormGroup controlId="formHorizontalInvoice">
      <Col componentClass={ControlLabel} sm={5}>
        Invoice
      </Col>
      <Col sm={5}>
        <FormControl placeholder="Invoice #" />
      </Col>
    </FormGroup>
   
    <FormGroup controlId="formHorizontalEmail2">
      <Col componentClass={ControlLabel} sm={5}>
        Email
      </Col>
      <Col sm={5}>
        <FormControl placeholder="Email" />
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalPay">
      <Col componentClass={ControlLabel} sm={11}>
      <StripeCheckout className="pay_button"
          token={this.onToken}
          stripeKey={ stripe.pub_key }
          amount={this.state.paymentAmt}/>
      </Col>
    </FormGroup>
    <FormGroup>
      <Col componentClass={ControlLabel} sm={11}>
      <Button className="check_button">Proceed to Payment</Button>
      </Col>
    </FormGroup>
        </Form>
        </div>
       </div>
       <NavLink className="Admin_button" activeClassName='active' to='/Login'>ADMIN LOGIN</NavLink>
      </div>
    );
  }
}



export default Request;