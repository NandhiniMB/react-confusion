import React , {Component} from 'react';

import {Card, CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Field, Row,Col,Label,Modal,  ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form'
import { addComment } from '../redux/ActionCreators';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component
    {

        constructor(props){
            super(props);

        this.state={
            isModalOpen : false
        };
       
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen : !this.state.isModalOpen
            });
        }
        
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            console.log("Current state is : "+JSON.stringify(values));
            alert("Current state is : "+JSON.stringify(values));
        }

        render()
        {
            return(
                 <div>
                 <Button   onClick={this.toggleModal} type="submit" color="secondary"><span className="fa fa-edit fa-lg"></span>Comment </Button>
                 <Modal isOpen={this.state.isModalOpen}>
                 <ModalHeader toggle={this.toggleModal}>Add Comments</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="Rating" md={2}>Rating</Label>
                            <Col md={10}>
                            <Control.select model=".rating" name="rating" placeholder="rating" 
                            className="form-control">
    
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                             </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="Name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="Comment" md={2}>Add Comment</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    placeholder="Add Comment" className="form-control" rows="6"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                    </ModalBody>
                 </Modal>
                 </div>
            );
                
        }
    }
    
    function RenderDish({dish})
    {
        
            return(
                
                <Card id={dish.id}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
    
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>

                
                    </CardBody>
                </Card>
            );
        
    }

    function RenderComments({comments,addComment,dishId})
    {
    // alert(comment.id);

        return (
            <div>
            {
            comments.map((comment)=> {
            return(
            <ul id={comment.id} class="list-unstyled">
            <li>{comment.comment}</li>
            <li>--{comment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            </ul>
            );
          })}
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
        );
            
           
        
    }
    

    const DishDetail=(props)=>
    {
      
       // alert(props.comment.id);
    if (props.dishesLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading/>
                </div>
            </div>
        );
    }
    else if (props.dishesErrMsg) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.dishesErrMsg}</h4>
                </div>
            </div>
        );
    }
    else
        if (props.dish != null)
           return (
            <div className="container">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                
                <div  className="col-lg-5 col-md-5 col-sm-5  m-2"><RenderDish dish={props.dish} isLoading={props.dishesLoading} errMsg={props.dishesErrMsg}/> </div>
                <div  className="col-lg-5 col-md-5 col-sm-5  m-2"><h4>Comments</h4><RenderComments comments={props.comment} addComment={props.addComment} dishId={props.dish.id}/>
              
                </div>
           </div> 
            </div>
           
            );
        else
            return(<div></div>); 
    
   }
        



export default DishDetail;