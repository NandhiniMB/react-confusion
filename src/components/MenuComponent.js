import React from 'react';
import {Card, CardImg, CardImgOverlay,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
function RenderMenu({dish}){
  return (
      <Card key={dish.id}>
      <Link to = {`/menu/${dish.id}`}>
        
      {/* onClick={() => onClick(dish.id)}> */}
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
      </Link>
    </Card>
  );
}


const Menu=(props)=>{
  const menu = props.dishes.map((dish) => {
    return (
      <div  id={dish.id} className=" col-lg-5 col-md-5 col-sm-5  m-2 ">
      <RenderMenu dish={dish}/>
      </div>
    );
  });


return (
  <div className="container">
      <div className="row">
          <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          {menu}
      </div>     
  </div>
);

}

export default Menu;