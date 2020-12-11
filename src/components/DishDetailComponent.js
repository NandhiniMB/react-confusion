import React from 'react';
import {Card, CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';


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

    function RenderComments({comments})
    {
    // alert(comment.id);

        return comments.map((comment)=> {
            // var date=new Date(comment.date);
            // var n=date.toDateString();
            return(
            <ul id={comment.id} class="list-unstyled">
            <li>{comment.comment}</li>
            <li>--{comment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            </ul>
            );
            });
    }
    

    const DishDetail=(props)=>
    {
      
       // alert(props.comment.id);
        if (props.dish != null)
           return (
            <div className="container">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                
                <div  className="col-lg-5 col-md-5 col-sm-5  m-2"><RenderDish dish={props.dish}/> </div>
                <div  className="col-lg-5 col-md-5 col-sm-5  m-2"><h4>Comments</h4><RenderComments comments={props.comment}/></div>
           </div> 
            </div>
           
            );
        else
            return(<div></div>); 
    
   }
        



export default DishDetail;