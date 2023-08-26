import React from "react";
import { Link } from "react-router-dom";
import { useGetblogQuery } from "../../api/blog";
import { Typography } from 'antd';

const { Title } = Typography;

type Props = {};

const ListBlog = (props: Props) => {
  const { data: blogs } = useGetblogQuery();


  return (
    <div className="col-md-8">
      <div className="main-content">
        <div className="content-post-panel m-0">
          <div className="row">
            {blogs?.data?.map((blog: any) => {
              return (
                <div className="col-md-12 col-lg-6">
                  <div className="article-post">
                    <div className="article-post-thumbnail">
                      <Link to={`/blog/${blog?.slug}`}>
                        <img
                          src={blog?.image}
                          alt="post-thumbnail"
                        />
                      </Link>
                    </div>
                    <div className="article-post-intro">
                      <h5>
                        {/* <Link to={`/blog/${blog?.slug}`}>
                          {blog?.title}
                        </Link> */}
                        <Title level={4}> <Link to={`/blog/${blog?.slug}`}>
                          {blog?.title}
                        </Link></Title>
                      </h5>
                      <p>
                        {blog?.content}
                      </p>
                      <ul className="article-post-meta list-inline">
                        <li className="list-inline-item">
                          <a href="#">Tác giả : {blog?.userId?.name}</a>
                        </li>
                        <br />
                        <li className="list-inline-item">
                          <a href="#">Ngày đăng : {blog?.createdAt}</a>
                        </li>
                        <br />
                        <li className="list-inline-item">
                          <a href="#">{blog?.comments?.length} comment</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="themeix-pagination">
                <ul className="pagination justify-content-left">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
