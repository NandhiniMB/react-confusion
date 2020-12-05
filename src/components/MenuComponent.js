import React from 'react';
import {Card, CardImg, CardImgOverlay,CardTitle} from 'reactstrap';

function RenderMenu({dish,onClick}){
  return (
      <Card key={dish.id}
      onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}


const Menu=(props)=>{
  const menu = props.dishes.map((dish) => {
    return (
      <div  id={dish.id} className=" col-lg-5 col-md-5 col-sm-5  m-2 ">
      <RenderMenu dish={dish} onClick={props.onClick}/>
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

export default Menu;