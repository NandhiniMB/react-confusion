import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from './LoadingComponent';

function RenderCard({item,isLoading,errMsg})
{
    if (isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (errMsg) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{errMsg}</h4>
                </div>
            </div>
        );
    }
    else
        return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
        </Card>
        );
}
function Home(props)
{
    return(
     <div className="Container">
         <img width="100%" src="assets/images/cover.jpg" alt="Cover.jpg" />
         <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMsg={props.errMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
         
     </div>
    );
}

export default Home;