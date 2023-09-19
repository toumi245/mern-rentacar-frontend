
import React from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Button from 'react-bootstrap/Button';
import styles from './Login.module.scss'; 
import Footer from '../components/Footer';
function Login() {
  const dispatch = useDispatch();

  function onFinish(values) {
    dispatch(userLogin(values));
  }

  return (
    <React.Fragment>
      <DefaultLayout>
        <main className={styles['login-bg']}>
          <div className={`container-fluid ${styles['transparan-bg']}`}>
            <section className={`container ${styles['content-login']}`}>
              <div className="row">
                <div className={`col-sm ${styles['guest-form']}`}>
                  <h1 className={styles['explore-world']}>Le&#x2019;ts Explore The World</h1>
                  <p className={styles['guest']}>Don&#x2019;t have an account?</p>
                  <Link to="/register">
                    <button className={styles['btn-gray']}>Sign Up</button>
                  </Link>
                </div>
                <div className={`col-sm ${styles['line-center']}`}>
                  <span className={styles.dotup}></span>
                  <span className={styles.dotdown}></span>
                </div>
                <div className="col-sm">
                  <Form className={styles['input-form-login']} onFinish={onFinish}>
                    <Form.Item name="username"  rules={[{ required: true }]} style={{ color: 'blue' }}>
                      <Input className={styles['input']} placeholder="Username" required />
                    </Form.Item>
                    <Form.Item name="password"  rules={[{ required: true }]}>
                      <Input className={styles['input']} type="password" placeholder="Password" required />
                    </Form.Item>
                    <Link to="/forgot/password" className={styles['forgot-pass']}>
                      <p className="forgot-pass">Forgot Password?</p>
                    </Link>
                    <Button type="submit" className={styles['btn-yellow']} block>
                      Login
                    </Button>
                  </Form>
                </div>
              </div>
            </section>
          </div>
        </main>
      </DefaultLayout>
      <Footer/>
    </React.Fragment>
  );
}

export default Login;
