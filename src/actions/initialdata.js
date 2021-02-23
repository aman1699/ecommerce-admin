import { initialDataConstants, categoryConstants,productConstants} from "./constants"
import axiosInstance from './../helper/axios';
export const getInitialData = () => {
    return async dispatch => {

        const res = await axiosInstance.post('/initialdata');
       console.log(res.data.products)
        if (res.status == 200) {
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories
                }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload: {
                    products
                }
            })
        } 
        console.log(res)
    }
}