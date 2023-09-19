import axios from "axios"
import { message } from "antd"
export const userLogin=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response=await axios.post('https://mern-rentacar-backend.onrender.com/api/users/login',reqObj)
        localStorage.setItem('user',JSON.stringify(response.data))
        message.success('login success')
        dispatch({type:'LOADING',payload:false})

        setTimeout(()=>{
            window.location.href="/"
        },500)
    } catch (error) {
        message.error('something want wrong')
        dispatch({type:'LOADING',payload:false})
    }
}
export const userRegister=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response=await axios.post('https://mern-rentacar-backend.onrender.com/api/users/register',reqObj)
        
        message.success("registration successful")
        setTimeout(()=>{
            window.location.href="/login"
        },500)
    } catch (error) {
        message.error('something want wrong')
        dispatch({type:'LOADING',payload:false})
    }
}