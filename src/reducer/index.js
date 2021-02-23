import { combineReducers } from 'redux';
import authReducer from './authreducer';
import userReducer from './userReducer';
import productReducer from './productreducer';
import categoryReducer from './categoryreducer';
import orderReducer from './orderreducer';
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order:orderReducer
});

export default rootReducer;
