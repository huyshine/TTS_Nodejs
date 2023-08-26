import React from "react";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useLoginMutation } from "../../../api/user";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../../../utitl/authenticate/checkAuth";


const Signin = () => {
  const [login , {error}] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();


  const onLogin = (values: any) => {
    // console.log("Success:", values);
    login(values)
    .unwrap()
    .then((res:any) => {
      // console.log(res);
      messageApi.open({
        type: 'success',
        content: res?.message,
      });
      localStorage.setItem("auth", JSON.stringify(res?.data));
      setTimeout(() => {
        navigate("/blog");
        // checkAuth();
      }, 1500);
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
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input your email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button danger type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <Button style={{marginLeft : "30px"}}><Link to={`/auth/register`}>Đăng ký</Link></Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
