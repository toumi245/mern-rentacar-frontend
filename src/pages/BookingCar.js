import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { Col, Row,Divider, Checkbox ,Modal,Space} from 'antd'
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions'
import StripeCheckout from 'react-stripe-checkout';
import { DatePicker} from 'antd'
const { RangePicker } = DatePicker;

function BookingCar() {
  const dispatch=useDispatch()
  const {carid}=useParams()
const {cars}=useSelector(state=>state.carsReducer)
const {loading}=useSelector(state=>state.alertsReducer)
const [car,setCar]=useState({})
const [from,setFrom]=useState()
const [to,setTo]=useState()
const [totalHours,setTotalHours]=useState(0)
const [driver,setDriver]=useState(false)
const [totalAmount,setTotalAmount]=useState(0)
const [showModal,setShowModal]=useState(false)
useEffect(() => {
  if (cars.length === 0) {
    dispatch(getAllCars());
  } else {
    const foundCar = cars.find((o) => o._id === carid);
    if (foundCar) {
      setCar(foundCar);
    } else {
      // Handle case when car is not found or loading
      setCar(null);
    }
  }
}, [cars]);
function SelectTimeSlots(values) {
  setFrom(moment(values[0]).format('YYYY-MM-DD HH:mm'))
 setTo(moment(values[1]).format('YYYY-MM-DD HH:mm'))

 setTotalHours(values[1].diff(values[0],'hours'))
     }



useEffect(()=>{
  setTotalAmount((totalHours* parseInt(car.rentPerHour)))
  if (driver)
  {
    setTotalAmount(totalAmount+(30 * totalHours))
  }
},[driver,totalHours])



function onToken(token){
  if (!car || !car._id) {
    console.error("Car information not available or invalid.");
    return;
  }

  const reqObj={
    token,
    user:JSON.parse(localStorage.getItem('user'))._id,
    car:car._id,
    totalHours,
    totalAmount,
    driverRequired:driver,
    bookedTimeSlots:{
      from,
      to  }
  }
  dispatch(bookCar(reqObj))
}

  return (
  <DefaultLayout>
    {loading && (<Spinner/>) }
    <Row justify="center" className='d-flex align-items-center' style={{minHeight:"90vh"}}>
      <Col lg={10} sm={24} xs={24}>
        <img src={car.image} alt='dacia' className='carimg2 bs1'/>
      </Col>
      <Col lg={10} sm={24} xs={24} style={{marginLeft:"120px"}}>
        <Divider type='horizontal' dashed><p style={{color:'#0C55F4'}}>Car Info</p></Divider>
      <div style={{textAlign:"right"}}>
        <p><b>{car.name}</b></p>
        <p><b>Rent Per Hour :</b> {car.rentPerHour} TND</p>
        <p><b>Fuel:</b> {car.fuelType}</p>
        <p><b>Max Persons:</b> {car.capacity}</p>
      </div>
      
        
        <Divider type='horizontal' dashed><p style={{color:'#0C55F4'}}>Select Time Slots</p></Divider>
        <Space direction="vertical" size={12}>
        <RangePicker
  showTime={{format: 'HH:mm'}}
  format='YYYY-MM-DD HH:mm'
  onChange={SelectTimeSlots}
/>
</Space>
          <br/>
          <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}>see booked time slots</button>
          <div>
          <p><b>Total Hours:</b> {totalHours}</p>
          <p><b>Rent Per Hour :</b> {car.rentPerHour}</p>
          <Checkbox onChange={(e)=>{
            if(e.target.checked){
              setDriver(true)
            }else{
              setDriver(false)
            }
          }}>driver Required</Checkbox>
          <h3>TotalAmount: {totalAmount}</h3>
          <StripeCheckout
          shippingAddress
        token={onToken}
        currency='inr'
        amount={totalAmount * 100}
        stripeKey="pk_test_51NQZodLucVp5DJybkS5kUh6A6NfsL49wFbrf15qc89q6hAfZUClEWTmXygkgPW9iSyjfnuWnP9ouBz7u6L6nKzkc00VPMMyc6H"
      ><button className='btn1' >Book Now</button>
      </StripeCheckout>
        
        </div>
      </Col>
    </Row>
    <Modal closable={false} footer={false} title='Booked Time Slots' visible={showModal} onCancel={() => setShowModal(false)}>
        {car && car.bookedTimeSlots && (<div className='p-2'>{car.bookedTimeSlots.map((slot, index) => (
          <button className='btn1 mt-2' key={index}>{slot.from} - {slot.to}</button>
        ))}
        <div className='text-right mt-5'>
          <button className='btn1' onClick={()=>{setShowModal(false)}}>close</button>
        </div>
        </div>)}
      </Modal>

  </DefaultLayout>
  )
}

export default BookingCar
