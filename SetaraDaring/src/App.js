import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Navigations
import AuthNav from './navigations/AuthNav';

// Reducers
import rootReducers from './store/reducers';

// Store
const store = createStore(rootReducers, applyMiddleware(thunk));

const App = () => {
    return(
        <Provider store={store}>
            <AuthNav />
            
        </Provider>
    )
}
export default App;
