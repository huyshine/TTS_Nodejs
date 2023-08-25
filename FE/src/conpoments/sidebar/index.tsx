import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="col-md-4">
      <div className="sidebar">
        <div className="widget-about sidebar-widget">
          <h5>about me</h5>
          <p>
            Lorem ipsum dolor sit amet, nec ante integer eget, dolor lectus
            consequat vehicula lorem mattis, ultricies mauris elit nostra per,
            luctus sem a. Ut ligula ut arcu aenean purus, mi eget volut
          </p>
          <ul className="list-inline about-share">
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
                <i className="fa fa-globe" aria-hidden="true"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fa fa-youtube" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="widget-latest-post sidebar-widget">
          <h5>recent post</h5>
          <div className="latest-post-wrapper clearfix">
            <div className="latest-post-date">
              <span className="date-Ellipse">02</span>
            </div>
            <div className="latest-post-info">
              <a href="single.html">Leorem ipsum dolor sit amet.</a>
              <ul className="lastest-post-meta list-inline">
                <li className="list-inline-item">21 comment</li>
                <li className="list-inline-item">234 views</li>
              </ul>
            </div>
          </div>
          <div className="latest-post-wrapper clearfix">
            <div className="latest-post-date">
              <span className="date-Ellipse">02</span>
            </div>
            <div className="latest-post-info">
              <a href="single.html">Leorem ipsum dolor sit amet.</a>
              <ul className="lastest-post-meta list-inline">
                <li className="list-inline-item">21 comment</li>
                <li className="list-inline-item">234 views</li>
              </ul>
            </div>
          </div>
          <div className="latest-post-wrapper clearfix">
            <div className="latest-post-date">
              <span className="date-Ellipse">02</span>
            </div>
            <div className="latest-post-info">
              <a href="single.html">Leorem ipsum dolor sit amet.</a>
              <ul className="lastest-post-meta list-inline">
                <li className="list-inline-item">21 comment</li>
                <li className="list-inline-item">234 views</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="widget-social-profile sidebar-widget">
          <h5>social profile</h5>
          <div className="social-profile-wrapper clearfix">
            <div className="social-profile-icon">
              <a className="icon-Ellipse" href="#">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </div>
            <div className="social-post-info">
              <a href="single.html">facebook</a>
              <span>223k fans</span>
            </div>
          </div>
          <div className="social-profile-wrapper clearfix">
            <div className="social-profile-icon">
              <a className="icon-Ellipse" href="#">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div>
            <div className="social-post-info">
              <a href="single.html">twitter</a>
              <span>921k follower</span>
            </div>
          </div>
          <div className="social-profile-wrapper clearfix">
            <div className="social-profile-icon">
              <a className="icon-Ellipse" href="#">
                <i className="fa fa-youtube" aria-hidden="true"></i>
              </a>
            </div>
            <div className="social-post-info">
              <a href="single.html">youtube</a>
              <span>251k subscribe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
