import React from 'react';
import { Button, Col, Dropdown, Row, Space } from 'antd';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="bookings" href="/userbookings" style={{ textDecoration: 'none' }}>
          Bookings
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="admin" href="/admin" style={{ textDecoration: 'none' }}>
          admin
        </a>
      ),
    },
    {
      key: '3',
      label: (<a onClick={handleLogout} style={{ textDecoration: 'none' }}>LogOut</a>),
    },
  ];

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><span style={{color:"#1EF488"}}>Easy</span><span style={{color:"#15E6FA"}}>Car</span></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">      <FontAwesomeIcon icon={faHome} />  Home</Nav.Link>
            <Nav.Link href="/contact"><FontAwesomeIcon icon={faAddressBook} /> Contact Us</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          <div style={{ padding: '10px' }}>
            {user ? (
              <Dropdown menu={{ items }} placement="bottom" >
              <div>
                {user && <Button>{user.username}</Button>}
              </div>
            </Dropdown>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="/login"> <FontAwesomeIcon icon={faUser} /> Login</Nav.Link>
                <Nav.Link href="/register"> <FontAwesomeIcon icon={faRightToBracket} />  Sign up</Nav.Link>
              </Nav>
            )}
          </div>
        </Container>
      </Navbar>

      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
