import { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
;import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


const mapStateToProps = state =>{
  return{
    dishes :state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders :state.leaders
  }
}
class Main extends Component
{
  constructor(props) {
    super(props);

    // this.state = {
    //   dishes: DISHES,
    //   comments : COMMENTS,
    //   leaders : LEADERS,
    //   promotions : PROMOTIONS
    // };

  }

  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId});}
  
  render(){
    const HomePage = ()=>{
      return (
       <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]} 
       promotion={this.props.promotions.filter((promotion)=>promotion.featured)[0]} 
       leader={this.props.leaders.filter((leader)=>leader.featured)[0]} 
       />
      );
    };

    const DishWithId = ({match}) =>{
      return (
      <DishDetail dish={this.props.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
       comment = {this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}/>
      );
    };


    return (

      
      <div className="App">
        <Header/>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId)=> this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/> */}
        <Switch>
        <Route path='/home' component={HomePage}/>
        <Route exact path='/contactus' component={Contact}/>
        <Route exact path='/about' component={()=> <About leaders={this.props.leaders}/>}/>
        <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes}/>}/>
        <Route path='/menu/:dishId' component={DishWithId}/>
        <Redirect to='/home'/>
        </Switch>
        
        <Footer/>
      </div>
    );
  }
}
//export default Main;
export default withRouter(connect(mapStateToProps)(Main));
