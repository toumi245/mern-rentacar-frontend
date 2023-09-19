import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../redux/actions/carsActions';
import { Col, Row } from 'antd';
import moment from 'moment';
import Spinner from '../components/Spinner';

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading}=useSelector((state)=>state.alertsReducer)
  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <DefaultLayout>

      <div>
        {loading && (<Spinner/>)}
        <h3 className='text-center mt-2'>My Bookings</h3>
        <Row justify='center'>
          <Col lg={20} sm={24}>
            {bookings.map((booking) => {
              const { car, totalHours, totalAmount, transactionId, bookedTimeSlots,image } = booking;

              return (
                <Row className='bs1 m-2 text-left' key={booking._id}>
                  <Col lg={7} sm={24}>
                    <p><b>{car?.name}</b></p>
                    <p>Total hours: <b>{totalHours}</b></p>
                    <p>Total amount: <b>{totalAmount}</b></p>
                    <p>Rent per Hour: <b>{car?.rentPerHour}</b></p>
                  </Col>
                  <Col lg={10} sm={24}>
                    <p>Transaction Id: <b>{transactionId}</b></p>
                    <p>From: <b>{bookedTimeSlots.from}</b></p>
                    <p>To: <b>{bookedTimeSlots.to}</b></p>
                    <p>Date of booking <b>{moment(booking.createdAt).format("YYYY-MM-DD")}</b></p>

                  </Col>
                  <Col lg={7} sm={24}>
                    <img style={{borderRadius:3}} src={booking.car?.image} height="140" className='p-2'/>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default UserBookings;
