import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

//For Form Validation:
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

//CommentForm Component:

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCommentModalOpen: false,
        };
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    toggleCommentModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }
    handleCommentSubmit(values) {
        this.toggleCommentModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

        }

    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isCommentModalOpen}
                toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}> {/* For close X button */} 
                            Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>

                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating" id="rating"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}>
                                            <option>Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model=".rating"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',                                            
                                            }} >
                                    </Errors>
                                    </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{  //for validation parameters
                                        required, minLength: minLength(3), maxLength:maxLength(15)
                                    }} >
                                    </Control.text>

                                    {/* For validation & giving error message */}
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength:'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} >
                                    </Errors>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} />
                                        <Errors
                                            className="text-danger"
                                            model=".comment"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',                                            
                                            }} >
                                    </Errors>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

    function RenderDish({dish}) {
        if(dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
            else {
                return (
                    <div>
                    </div>
                );
            }
    }

    function RenderComments({comments, addComment, dishId}) { // if using: function RenderComments({comments}){
        if(comments == null) {
            return (
                <div></div>
            );
        }
        const comnts = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>{comment.author},
                    &nbsp;
                   {/* {comment.date} */}
                   {/* Date format Changing */}
                   {
                       new Intl.DateTimeFormat('en-US',
                       {
                           year: 'numeric',
                           month: 'long',
                           day: '2-digit'
                       }).format(new Date(comment.date))
                   }
                    </p>
                </li>
            );
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <ul className="list-unstyled">
                    {comnts}
                </ul>

                {/* to display the button for toggling the modal: */} 
                <CommentForm dishId={dishId} addComment={addComment} />
                {/* <CommentForm /> */} 

            </div>
        );
    }
    
   const DishDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
            return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    
                        <RenderDish dish={props.dish} />
                    
                        <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                         />
                    </div>
                </div>
                        );
        }
    else
        return (
            <div></div>
        );
    }


export default DishDetail;