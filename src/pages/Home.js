import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row, DatePicker} from 'antd'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer'
const { RangePicker } = DatePicker;

function Home() {

  const {cars}=useSelector(state=>state.carsReducer)
  const {loading}=useSelector(state=>state.alertsReducer)
  const [totalCars,setTotalcars]=useState([])
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllCars())
  },[])

useEffect(()=>{
  setTotalcars(cars)
},[cars])
function setFilter(values){
var selectedFrom=moment(values[0]).format("YYYY-MM-DD HH:mm")
var selectedTo=moment(values[1]).format("YYYY-MM-DD HH:mm")
var temp=[]
for(var car of totalCars){
  if (car.bookedTimeSlots.length==0){
    temp.push(car)
  }
  else{
    for (var booking of car.bookedTimeSlots){
      if(selectedFrom.isBetween(booking.from , booking.to) ||
      selectedTo.isBetween(booking.from ,booking.to)||
      moment(booking.from).isBetween(selectedFrom,selectedTo)||
      moment(booking.to).isBetween(selectedFrom,selectedTo)
      )
      {

      }
      else{
        temp.push(car)
      }
    }
  }
}
setTotalcars(temp)
}
  return (
    <DefaultLayout>
      <Row className='mt-3' justify="center">
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker onChange={setFilter}  />
        </Col>
      </Row>
      {loading == true && (<Spinner/>)}
    <Row justify='center' gutter={16} >
    {totalCars.map(car=>{
    return <Col lg={5} sm={24} xs={24}>
    <div  className="car p-2 bs1 ">
    <img src={car.image} className="carimg"/>
    <div className="car-content d-flex align-items-center justify-content-between">
    <div className='text-left pl-2' style={{backgroundColor:"#E15400",borderRadius: "15px"}}>
      <p style={{fontWeight:"bold",color:"#1134F5"}}> <FontAwesomeIcon icon={faCar} size="2x" /> {car.name}</p>
      <p style={{fontWeight:"bold",color:"#1134F5"}}> <FontAwesomeIcon icon={faDollarSign} />  rent Per Hour: {car.rentPerHour}</p>
    </div>
    <div>
      <Button variant="info" ><Link to={`/booking/${car._id}`} style={{textDecoration:"none"}}>Book Now</Link></Button>
    </div>
    </div>
    </div>
    </Col>
    })}
    </Row>
    <Footer/>
    </DefaultLayout>
  )
}

export default Home
