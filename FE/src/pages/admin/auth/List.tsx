import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAlluserQuery } from "../../../api/user";

const ListAuth = () => {
  const { data:auth , isLoading } = useGetAlluserQuery();
    // console.log("auth", auth);
    
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text:any) => <a>{text}</a>,
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (image:any) => <img width={40} src={image} alt="" />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tương tác",
      dataIndex: "comments",
      key: "comments",
      render: (tt:any) => <a>{tt.length}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_:any, record:any) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a>
          <a>Delete</a> */}
        </Space>
      ),
    },
  ];

  const data:any = auth?.data?.map((item:any) => {
    return {
      key: item.id,
      ...item,
    };
  });
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ListAuth;
