import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Col, Row,Form,Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addCar } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
function AddCar() {
    const dispatch=useDispatch()
    const {loading}=useSelector(state=>state.alertsReducer)
    function onFinish(values){
        values.bookedTimeSlots=[]
        dispatch(addCar(values))
    }
  return (
   <DefaultLayout>
    {loading && (<Spinner/>)}
    <Row justify="center mt-5">
        <Col lg={12} sm={24}>
        <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
            <h3>Add New Car</h3>
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
            <button className='btn1' >Add Car</button>
            </div>
        </Form>
        </Col>
    </Row>
   </DefaultLayout>
  )
}

export default AddCar
