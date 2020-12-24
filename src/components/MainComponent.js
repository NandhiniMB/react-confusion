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
import { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state =>{
  return{
    dishes :state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders :state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) =>{dispatch(postComment(dishId, rating, author, comment))},
  postFeedback: (feedback) => {dispatch(postFeedback(feedback))},
  fetchDishes: () =>{ dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}

});

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
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  
  render(){
    
    const HomePage = ()=>{
      return (
       <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} 
       dishesLoading = { this.props.dishes.isLoading}
       dishesErrMsg = {this.props.dishes.errMsg}

       promotion={this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]} 
       promosLoading = { this.props.promotions.isLoading}
       promosErrMSg = {this.props.promotions.errMsg}

       leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]} 
       leadersLoading = { this.props.leaders.isLoading}
       leadersErrMsg = {this.props.leaders.errMsg}
       />
       
      );
      
    };

    const DishWithId = ({match}) =>{
      return (
      <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
       dishesLoading={this.props.dishes.isLoading}
       dishesErrMsg={this.props.dishes.errMsg}

       comment = {this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
       commentsLoading =  { this.props.comments.isLoading}
       commentsErrMSg = {this.props.comments.errMsg}

       postComment={this.props.postComment}/>
      );
    };


    return (

      
      <div className="App">
        <Header/>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId)=> this.onDishSelect(dishId)}/>
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/> */}
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage}/>
                <Route exact path='/contactus' component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                <Route exact path='/about' component={()=> <About leaders={this.props.leaders}/>}/>
                <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes}/>}/>
                <Route path='/menu/:dishId' component={DishWithId}/>
                <Redirect to='/home'/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        
        <Footer/>
      </div>
    );
  }
}
//export default Main;
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
