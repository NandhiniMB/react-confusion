import React, { Component } from 'react';
import {Card, CardImg,CardText,CardBody,CardTitle} from 'reactstrap';

class DishDetail extends Component
{
      
    componentDidMount()
        {
        console.log("Dish did Mount");
        }

    componentDidUpdate()
        {
          console.log("Dish did Update");
        }
    renderDish()
    {
        
        return(
            
            <Card>
                <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                <CardBody>
    
                    <CardTitle>{this.props.dish.name}</CardTitle>
                    <CardText>{this.props.dish.description}</CardText>

              
                </CardBody>
            </Card>
        );
        
    }

    renderComments(comments)
    {
     //alert(comments);

        return comments.map((comment)=> {
            // var date=new Date(comment.date);
            // var n=date.toDateString();
            return(
            <ul class="list-unstyled">
            <li>{comment.comment}</li>
            <li>--{comment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            </ul>
            );
            });
    }
    

   render(){
    console.log("dish render");
    if (this.props.dish != null)
       return (
        <div className="container">
            <div className="row">
            <div  className="col-lg-5 col-md-5 col-sm-5  m-2"> {this.renderDish()}</div>
            <div  className="col-lg-5 col-md-5 col-sm-5  m-2"><h4>Comments</h4>{this.renderComments(this.props.dish.comments)}</div>
       </div> 
        </div>
       
        );
    else
        return(<div></div>); 

   }
        
}


export default DishDetail;