import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Col, Row,Form,Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { editCar, getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
function EditCar() {
    
    const {cars}=useSelector(state=>state.carsReducer)
    const dispatch=useDispatch()
    const {carid}=useParams()
    const {loading}=useSelector(state=>state.alertsReducer)
    const [car,setCar]=useState()
    const [totalCars,setTotalcars]=useState([])
    
    function onFinish(values){
        values._id=car._id
        dispatch(editCar(values))
    }
    useEffect(()=>{
        if(cars.length==0)
        {
          dispatch(getAllCars())
        }
      else {
            setTotalcars(cars)
            setCar(cars.find(o=>o._id==carid))
      }
      },[totalCars])
  return (
   <DefaultLayout>
    {loading && (<Spinner/>)}
    <Row justify="center mt-5">
        <Col lg={12} sm={24}>
        {totalCars.length > 0 &&(<Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
            <h3>Edit Car</h3>
            {car.name}
            {cars.length}
            <hr/>
            <Form.Item name="name" label='car name' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="image" label='image url' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="rentPerHour" label='rent per hour' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="capacity" label='capacity' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="fuelType" label='Fuel Type' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <div className='text-right'>
            <button className='btn1' >Edit Car</button>
            </div>
        </Form>)}
        </Col>
    </Row>
   </DefaultLayout>
  )
}

export default EditCar
