import React, { useEffect } from "react";
import { navigate, useLocation } from "@reach/router";
import { Layout, Form, Input } from "antd";
import Button from "antd-button-color";

import AuthService from "../../services/auth.service";

import "./Login.css";

const { Content } = Layout;

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (values) => {
    //console.log(values);
    await AuthService.login(values);
    navigate(location.state?.from ? location.state.from : "/");
  };

  return (
    <Layout className="site-layout-background login-layout">
      <Content>
        <h1>Introduzca usuario y contraseña</h1>
        <Form
          layout="horizontal"
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item name="username" label="Usuario">
            <Input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Contraseña">
            <Input type="password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              span: 14,
              offset: 4
            }}
          >
            <Button type="success" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
