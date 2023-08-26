import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineUser,
    AiOutlineComment,
    AiFillHome
} from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { BsFillPeopleFill, BsFillTrashFill } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <AiOutlineUser />,
                            label: <Link to="/admin/dashboard">Thống kê</Link>,
                        },
                        {
                            key: "2",
                            icon: <ImBlog />,
                            label: <Link to="/admin/blog">Bài viết</Link>,
                        },
                        {
                            key: "3",
                            icon: <AiOutlineComment />,
                            label: <Link to="/admin/comment">Comment</Link>,
                        },
                        {
                            key: "4",
                            icon: <BsFillPeopleFill />,
                            label: <Link to="/admin/auth">Authen</Link>,
                        },
                        {
                            key: "5",
                            icon: <BsFillTrashFill />,
                            label: <Link to="/admin/comment/trash">Trash</Link>,
                        },
                        {
                            key: "6",
                            icon: <AiFillHome />,
                            label: <Link to="/blog/">Home</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
