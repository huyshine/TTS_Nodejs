import React from "react";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { useAddBlogMutation } from "../../../api/blog";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const { TextArea } = Input;


const Add = () => {
  const [addBlog  ] = useAddBlogMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const userId = JSON.parse(localStorage.getItem('auth'))?.user?.id

    const data = {
      title : values.title,
      content : values.content,
      userId : userId,
    }
    addBlog(data)
    .unwrap()
    .then((res:any) => {
    
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });      
      setTimeout(() => {
        navigate("/admin/blog");
      }, 1000);
    })

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <header>
        <Title level={2}>Đăng bài viết</Title>
      </header>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="title"
          name="title"
          rules={[
            { required: true, message: "Please input your title!" },
            { type: "string", message: "Please input your title!"},
            { min: 6, message: "Please input your min is 6!"}
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="content"
          name="content"
          rules={[{ required: true, message: "Please input your content!" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button danger type="primary" htmlType="submit">
            Đăng bài
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Add;
