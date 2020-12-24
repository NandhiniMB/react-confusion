import React  from 'react';
import {Card, CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import CommentForm from './CommentComponent';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    
    function RenderDish({dish})
    {
        
            return(

                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                
                    <Card id={dish.id}>
                        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                        <CardBody>
        
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>

                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        
    }

    function RenderComments({comments,postComment,dishId})
    {
    // alert(comment.id);

        return (
            <div>
             <Stagger in>
            

             
            
            {
            comments.map((comment)=> {
            return(
            <Fade in>
            <ul id={comment.id} class="list-unstyled">
            <li>{comment.comment}</li>
            <li>--{comment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            </ul>
            </Fade>

            );
          })}
           </Stagger>
            <CommentForm dishId={dishId} postComment={postComment}/>

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
                <div  className="col-lg-5 col-md-5 col-sm-5  m-2"><h4>Comments</h4><RenderComments comments={props.comment} postComment={props.postComment} dishId={props.dish.id}/>
              
                </div>
           </div> 
            </div>
           
            );
        else
            return(<div></div>); 
    
   }
        



export default DishDetail;