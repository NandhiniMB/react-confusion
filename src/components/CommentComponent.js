import React,{Component} from 'react';
import {Control,LocalForm,Errors} from 'react-redux-form'
import {Button,Field, Row,Col,Label,Modal,  ModalBody, ModalHeader} from 'reactstrap';
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

    export default CommentForm;