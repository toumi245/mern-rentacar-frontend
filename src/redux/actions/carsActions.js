import { message } from "antd";
import axios from "axios";
export const getAllCars=()=>async dispatch=>{
    dispatch({type:"LOADING",payload:true})
    try {
        const response=await axios.get("/api/cars/getAllCars")
        dispatch({type:"GET_ALL_CARS",payload:response.data})
        dispatch({type:"LOADING",payload:false})
    } catch (error) {
        dispatch({type:"LOADING",payload:false})
    }
}
export const getAllBookings=()=>async dispatch=>{
    dispatch({type:"LOADING",payload:true})
    try {
        const response=await axios.get("https://mern-rentacar-backend.onrender.com/api/bookings/getAllbookings")
        dispatch({type:"GET_ALL_BOOKINGS",payload:response.data})
        dispatch({type:"LOADING",payload:false})
    } catch (error) {
        dispatch({type:"LOADING",payload:false})
    }
}
export const addCar=(reqObj)=>async dispatch=>{
    dispatch({type:"LOADING",payload:true})
    try {
        await axios.post("https://mern-rentacar-backend.onrender.com/api/cars/addcar",reqObj)
        dispatch({type:"LOADING",payload:false})
        message.success('New Car Added Successfully')
        setTimeout(()=>{
            window.location.href="/admin"
        },500)
    } catch (error) {
        console.log(error)
        dispatch({type:"LOADING",payload:false})
    }
}
export const editCar=(reqObj)=>async dispatch=>{
    dispatch({type:"LOADING",payload:true})
    try {
        await axios.post("https://mern-rentacar-backend.onrender.com/api/cars/editcar",reqObj)
        dispatch({type:"LOADING",payload:false})
        message.success('car details updated successfuly')
        setTimeout(()=>{
            window.location.href="/admin"
        },500)
    } catch (error) {
        console.log(error)
        dispatch({type:"LOADING",payload:false})
    }
}
export const deleteCar=(reqObj)=>async dispatch=>{
    dispatch({type:"LOADING",payload:true})
    try {
        await axios.post("https://mern-rentacar-backend.onrender.com/api/cars/deletecar",reqObj)
        dispatch({type:"LOADING",payload:false})
        message.success('car deleted successfuly')
        setTimeout(()=>{
            window.location.reload()
        },500)
    } catch (error) {
        console.log(error)
        dispatch({type:"LOADING",payload:false})
    }
}