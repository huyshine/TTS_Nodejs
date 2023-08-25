import React from "react";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRegisterMutation } from "../../../api/user";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [register , {error}] = useRegisterMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();


  const onLogin = (values: any) => {
    // console.log("Success:", values);
    register(values)
    .unwrap()
    .then((res:any) => {
      // console.log(res);
      messageApi.open({
        type: 'success',
        content: res?.message,
      });
      setTimeout(() => {
        navigate("/auth/signin");
      }, 1000);
    })
  };
  if(error){
    if("data" in error as any){
      messageApi.open({
        type: 'error',
        content: error?.data?.message,
      });
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <div>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto", marginTop:"8%"}}
        initialValues={{ remember: true }}
        onFinish={onLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            { whitespace: true, message: "Please input your name!" }
            // { type: "email", message: "Please input your email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input your email!" },
            { whitespace: true, message: "Please input your email!"}
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Please input your password!" }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="confimPassword"
          name="confimPassword"
          rules={[
            { required: true, message: "Please input your confimPassword!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>



        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button danger type="primary" htmlType="submit">
            Đăng ký
          </Button>
          <Button style={{marginLeft : "30px"}}><Link to={`/auth/signin`}>Đăng nhập</Link></Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
