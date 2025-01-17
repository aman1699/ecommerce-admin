import axios from "axios"
import { authConstants } from "./constants"
import axiosInstance from './../helper/axios';
export const login = (user) => {
    console.log(user)
    return async (dispatch) => {
       dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axiosInstance.post('/admin/signin', {
             ...user
        })
        console.log(res);
        
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token ,user
                },
            })
        } else if (res.status === 400) {
            
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload:{error:res.data.error}
            })
        }
   }
}



export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload: {
                    token,user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const SignOut = () => {
    return async (dispatch) => {
        window.localStorage.clear();
        dispatch({
            type: authConstants.LOGOUT_SUCCESS        })
    }
}