import React, { useEffect } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useFeaturesCommentMutation,
  useGetAllTrashCmtQuery,
  useRestoreCommentMutation,
} from "../../../api/comments";
import swal from "sweetalert";

const Comment = () => {
  const { data: allCmt, isLoading, refetch } = useGetAllTrashCmtQuery();
  console.log("allCmt", allCmt);
  
  const [featuresComment] = useFeaturesCommentMutation();
  const [restoreComment] = useRestoreCommentMutation();

  useEffect(() => {
    refetch();
  }, [allCmt?.data]);

  const restoreCmt = (id: string) => {
      try {
        restoreComment(id)
        .unwrap()
        .then(() => {
          swal("You have successfully restored", {
            icon: "success",
          });
        })
      } catch (error) {
        
      }
  }

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
            featuresComment(id);
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
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Bài post",
      dataIndex: "blogId",
      key: "blogId",
      render: (blog: any) => <a>{blog?.title}</a>,
    },
    {
      title: "Nội dung bình luận",
      dataIndex: "comment",
      key: "comment",
      render: (cmt: any) => <a>{cmt}</a>,
    },
    {
      title: "Người bình luận",
      dataIndex: "userId",
      key: "userId",
      render: (user: any) => <a>{user?.name}</a>,
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
          <Button danger onClick={() => restoreCmt(record?._id)}>
            Khôi phục
          </Button>
          <Button danger onClick={() => deleteCmt(record?._id)}>
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

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Comment;
