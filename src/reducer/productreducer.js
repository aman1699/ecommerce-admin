import { productConstants } from './../actions/constants';

const initialState={
    products : []
};

const productreducer=(state=initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    return state;
}
export default productreducer;