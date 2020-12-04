import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay,CardTitle} from 'reactstrap';

class Menu extends Component {

componentDidMount()
{
  console.log("Menu did Mount");
}
componentDidUpdate()
        {
          console.log("menu did Update");
        }
              
render() {
  console.log("menu render");
  const menu = this.props.dishes.map((dish) => {
      return (
        <div  className=" col-lg-5 col-md-5 col-sm-5  m-2 ">
          <Card key={dish.id}
            onClick={() => this.props.onClick(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
  });


  return (
    <div className="container">
        <div className="row">
            {menu}
        </div>     
    </div>
);
}
}

export default Menu;