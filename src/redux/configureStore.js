import {createStore,combineReducers,applyMiddleware} from 'redux';
import { Reducer, initialState } from './reducer'
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
          dishes:Dishes,
          comments : Comments,
          promotions: Promotions,
          leaders:Leaders
        }), // reducer
        applyMiddleware(thunk,logger)
       
    );

    return store;
}