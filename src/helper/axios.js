import axios from 'axios';
import { api } from './../urlconfig';
const token=window.localStorage.getItem('token')
const axiosInstance = axios.create({
    baseURL: api,
   headers: {
      'Authorization':token ? token:''
   //  'Content-Type': 'multipart/form-data; '
 }
   
    
});

export default axiosInstance;