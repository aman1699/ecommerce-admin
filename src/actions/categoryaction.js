import axiosInstance from './../helper/axios';
import { categoryConstants, } from './constants';


export const getAllCategory = () => {
    return async dispatch => {
        dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST})
        const res = await axiosInstance.get('/category/getcategory');
        console.log(res);
        if (res.status === 200) {
            const { categoryList }  = res.data;   
            console.log(categoryList);
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload: {
                categories:categoryList
            }
            })
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error:res.data.error
                }
            })
        }
    }
}
const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
}
export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQUEST })
        console.log('aman');

        const res = await axiosInstance.post('/category/create', form, config);
        
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
                payload: { category: res.data.category }
            })
        } else {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
                payload: {
                  error:  res.data.error
                }
            })
        }
    }
}