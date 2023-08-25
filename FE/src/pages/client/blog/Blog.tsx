import React from "react";
import ListBlog from "../../../conpoments/listBlog";
import Sidebar from "../../../conpoments/sidebar";

type Props = {};

const Blog = (props: Props) => {
  return (
    <div className="row">
      <ListBlog />
      <Sidebar />
    </div>
  );
};

export default Blog;
