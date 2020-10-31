import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import UsersReducer from './usersReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    users: UsersReducer
});

export default rootReducer