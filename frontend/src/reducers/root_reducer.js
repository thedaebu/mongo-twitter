import {combineReducers} from 'redux';
import errorsReducer from './errors_reducer';
import currentUserReducer from './session_api_reducer';
import sessionReducer from './session_reducer';
import TweetsReducer from './tweets_reducer';

const RootReducer = combineReducers({
    session: sessionReducer,
    currentUser: currentUserReducer,
    tweets: TweetsReducer,
    errors: errorsReducer
});

export default RootReducer;