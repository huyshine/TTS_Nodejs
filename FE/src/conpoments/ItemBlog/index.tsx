import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  useAddCommentMutation,
  useGetCmtByPostQuery,
} from "../../api/comments";
import { Link, useParams } from "react-router-dom";
import { useGetBlogDetailQuery } from "../../api/blog";
import type Icon from "@ant-design/icons";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Skeleton, Switch } from "antd";
const { Title } = Typography;

import io from "socket.io-client";

const socket = io("http://localhost:8080");

interface IconTextProps {
  icon: typeof Icon;
  text: React.ReactNode;
}

const listData = Array.from({ length: 3 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i + 1}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </>
);

const ItemBlog = () => {
  const [addComment] = useAddCommentMutation();

  const { slug } = useParams();
  const { data: blog } = useGetBlogDetailQuery(slug || "");
  const [form] = Form.useForm();

  const { data: Alldata, isLoading , refetch } = useGetCmtByPostQuery(
    blog?.data?._id || ""
  );
    // console.log(Alldata);
    
  const [loading, setLoading] = useState(true);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    socket.on("newComment", (data: any) => {
      // refetch();
      setTimeout(() => refetch(), 100)
    });
  }, [Alldata?.data]);

  const onFinish = (values: any) => {
    // console.log("Success:", values);
    const data = {
      comment: values.comment,
      blogId: blog?.data?._id,
      userId: JSON.parse(localStorage.getItem("auth"))?.user?.id,
    };
    addComment(data);
    socket.emit("newComment", data);
    form.setFieldsValue({
      comment: "",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="col-md-8">
      <div className="main-content themeix-blog-post">
        <div className="blog-post-img">
          {/* <img src="./public/images/blog-post-img.jpg" alt="blog post img" /> */}
          <img src={blog?.data?.image} alt="" />
        </div>
        <ul className="blog-post-meta list-inline">
          <li className="list-inline-item">
            <a href="#">Ngày đăng {blog?.data?.createdAt}</a>
          </li>
          <br />
          <li className="list-inline-item">
            <a href="#">Số comment {blog?.data?.comments?.length}</a>
          </li>
          <li className="list-inline-item">{/* <a href="#">2 like</a> */}</li>
        </ul>
        <br />
        <h2>
          {/* <Link to={`/blog/${blog?.data?.slug}`}>{blog?.data?.title}</Link> */}
          <Title level={2}>{blog?.data?.title}</Title>

        </h2>
        <br />
        <p>{blog?.data?.content}</p>
        <div className="blog-post-panel">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="blog-post-social text-left">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="blog-post-pagination text-right">
                <a href="#">
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                  previous
                </a>
                <a href="#">
                  next
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="blog-post-comment">
          <h3 className="blog-post-title">
            Số comment {Alldata?.data?.length}
          </h3>
          {isLoading ? (
            <>
              <Switch
                checked={!loading}
                onChange={onChange}
                style={{ marginBottom: 16 }}
              />
              <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                renderItem={(item :any) => (
                  <List.Item
                    key={item.title}
                    actions={
                      !loading
                        ? [
                            <IconText
                              icon={StarOutlined}
                              text="156"
                              key="list-vertical-star-o"
                            />,
                            <IconText
                              icon={LikeOutlined}
                              text="156"
                              key="list-vertical-like-o"
                            />,
                            <IconText
                              icon={MessageOutlined}
                              text="2"
                              key="list-vertical-message"
                            />,
                          ]
                        : undefined
                    }
                    extra={
                      !loading && (
                        <img
                          width={272}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      )
                    }
                  >
                    <Skeleton loading={loading} active avatar>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                      {item.content}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </>
          ) : (
            ""
          )}
          {Alldata?.data?.map((item: any) => {
            return (
              <div key={item?._id} className="blog-post-comment-box">
                <div className="blog-post-comment-thum">
                  <img
                    width="50px"
                    src={item.userId?.avatar || ""}
                    alt="Ảnh người bình luận"
                  />
                </div>
                <div className="blog-post-comment-post">
                  <h4>
                    <a href="#">{item.userId?.name}</a>
                  </h4>
                  <span>{item.createdAt}</span>
                  <p>{item.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="blog-post-contact-form text-left">
          <h3 className="blog-post-title">write your comment</h3>

          {/* <form action="#">
            <div className="form-row">
              <div className="form-group url col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name*"
                />
              </div>
              <div className="form-group email col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail*"
                  required
                />
              </div>
            </div>
            <div className="form-group comment">
              <textarea
                placeholder="write your comment"
                id="textarea"
                // rows="8"
                rows={8}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post comment
            </button>
          </form> */}
          <Form
            form={form}
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
              label="comment"
              name="comment"
              rules={[
                { required: true, message: "Please input your comment!" },
              ]}
            >
              <TextArea rows={5} placeholder="maxLength is 6" minLength={1} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button danger type="primary" htmlType="submit">
                Post comment
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ItemBlog;
