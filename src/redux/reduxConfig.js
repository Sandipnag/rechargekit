import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/index';

const middleware = [
    thunk
]

export default configReduxStore = (initialState = {}) => {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware)))
}
