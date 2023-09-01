import React, { useEffect } from "react";
import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDeleteBlogMutation, useGetblogQuery } from "../../../api/blog";
import { Link } from "react-router-dom";
import { checkAuth } from "../../../utitl/authenticate/checkAuth";
import swal from "sweetalert";
import { Skeleton } from 'antd';



const List = () => {
  const { data: blogs, isLoading , refetch} = useGetblogQuery();
  useEffect(()=>{
    refetch()
  },[blogs?.data?.comments])

  // console.log("blogs", blogs);
  


  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = (id: string) => {
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
            deleteBlog(id);
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
    } catch (error) {
      alert(error);
    }
  };

  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (text: any) => <img width={150} src={text} alt="" />,
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
    },
    // {
    //   title: "Số comments",
    //   dataIndex: "comments",
    //   key: "comments",
    //   render: (comment: any) => <p>{comment?.length}</p>,
    // },
    {
      title: "Người đăng bài",
      dataIndex: "name",
      key: "name",
      render: (auth: any) => <p>{auth}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/blog/edit/${record?.id}`}>Edit</Link>
          </Button>
          <Button danger onClick={() => handleDelete(record?.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = blogs?.data.map((blog: any) => {
    return {
      key: blog?._id,
      ...blog,
    };
  });

  checkAuth();

  return (
    <div>
      <Button>
        <Link to={`/admin/blog/add`}>Add Blogs</Link>
      </Button>
      {!isLoading ?  <Table columns={columns} dataSource={data} /> : <Skeleton /> }
      
    </div>
  );
};


export default List;
