import React from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import DefaultLayout from "../components/DefaultLayout";
import styles from "./Register.module.scss";
import stylesLogin from "./Login.module.scss";
import Footer from "../components/Footer";

const Register = () => {
  const dispatch = useDispatch();

  function onFinish(values) {
    dispatch(userRegister(values))
    console.log(values)
  }
  

  return (
    <React.Fragment>
      <DefaultLayout>
        <main className={stylesLogin["login-bg"]}>
          <div className={`container-fluid ${stylesLogin["transparan-bg"]}`}>
            <section className={`container ${stylesLogin["content-register"]}`}>
              <div className="row">
                <div className={`col-sm ${stylesLogin["guest-form"]}`}>
                  <h1 className={stylesLogin["explore-world"]}>
                    Le&#x2019;ts Explore The World
                  </h1>
                  <p className={stylesLogin["guest"]}>Have an account?</p>
                  <Link to="/login">
                    <button className={stylesLogin["btn-gray"]}>Login</button>
                  </Link>
                </div>
                <div className={`col-sm ${stylesLogin["line-center"]}`}>
                  <span
                    className={`${stylesLogin["dotup"]} ${stylesLogin["dotup"]}`}
                  ></span>
                  <span
                    className={`${stylesLogin["dotdown"]} ${stylesLogin["dotdown"]}`}
                  ></span>
                </div>
                <div className="col-sm">
                  <Form
                    layout="vertical"
                    onFinish={onFinish}
                    className={stylesLogin["input-form"]}
                  >
                    <Form.Item
                      name="username"
                      
                      rules={[{ required: true }]}
                    >
                      <Input style={{ width: "500px" }} placeholder="name" className={stylesLogin["input"]}/>
                    </Form.Item>
                    <Form.Item
                      name="password"
                      
                      rules={[
                        { required: true, type: "password", message: "Invalid email format" },
                      ]}
                    >
                      <Input placeholder="password" className={stylesLogin["input"]}/>
                    </Form.Item>
                    <Form.Item name="Confirm password"  rules={[{ required: true }]}>
                      <Input className={stylesLogin['input']} type="Confirm password" placeholder="Confirm password" required />
                    </Form.Item>
                    <button
                      type="submit"
                      className={stylesLogin["btn-yellow"]}
                    >
                      Sign Up
                    </button>
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
};

export default Register;
