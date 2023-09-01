import React, { useEffect } from "react";
import { Button, Skeleton, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useGetAllCmtQuery,
  useRemoveCommentMutation,
} from "../../../api/comments";
import swal from "sweetalert";
import { checkAuth } from "../../../utitl/authenticate/checkAuth";

const ListCmt = () => {

  
  const { data: allCmt, isLoading, refetch } = useGetAllCmtQuery();
  const [removeComment] = useRemoveCommentMutation();

  useEffect(() => {
    refetch();
  }, [allCmt?.data]);
  


  const deleteCmt = (id: string) => {
    try {
      swal({
        title: "Are you sure you want to delete?",
        text: "You cannot undo after deleting!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            removeComment(id);
            swal("You have successfully deleted", {
              icon: "success",
            });
          }
        })
        .catch(() => {
          swal("Error", {
            icon: "error",
          });
        });
    } catch (error) {}
  };

  const columns = [
    {
      title: "ID Post",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Bài post",
      dataIndex: "title",
      key: "title",
      render: (title: any) => <a>{title}</a>,
    },
    {
      title: "Nội dung bình luận",
      dataIndex: "comment",
      key: "comment",
      render: (cmt: any) => <a>{cmt}</a>,
    },
    {
      title: "Người bình luận",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <a>{name}</a>,
    },
    {
      title: "Ngày bình luận",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button danger onClick={() => deleteCmt(record?.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data: any = allCmt?.data?.map((item: any) => {
    return {
      key: item?._id,
      ...item,
    };
  });
  checkAuth()


  return (
    <div>
      {/* <Table columns={columns} dataSource={data} /> */}
      {!isLoading ?  <Table columns={columns} dataSource={data} /> : <Skeleton /> }

    </div>
  );
};

export default ListCmt;
