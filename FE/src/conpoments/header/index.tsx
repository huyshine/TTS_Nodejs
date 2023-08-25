import React from "react";

type Props = {};

const Header = () => {
  return (
    <header className="header-section">
      <div className="header-top clearfix">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline header-author-share float-left">
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
              <div className="sidebar-author float-right">
                <a href="#" className="menu-btn">
                  <i className="fa fa-navicon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom clearfix">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="themeix-brand float-left">
                <a href="index.html">
                  <img src="./public/images/navbar-brand.png" alt="brand logo" />
                </a>
              </div>
              <div className="themeix-main-menu float-right">
                <div className="button_container" id="toggle">
                  <span className="top"></span>
                  <span className="middle"></span>
                  <span className="bottom"></span>
                </div>
                <div className="overlay-close">
                  <nav className="overlay-menu">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about.html">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="page.html">
                          page
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="category.html">
                          Sports
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="search.html">
                          search
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="guideline.html">
                          style guide
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="contact.html">
                          Contact
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#"
                          data-toggle="modal"
                          data-target="#mymodal"
                        >
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div
                  className="modal fade themeix-modal"
                  id="mymodal"
                //   tabIndex="-1"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Your search here</h4>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form action="https://demo.themeix.com/html/nextblog/search.html">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search for..."
                              aria-label="Search for..."
                            />
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-primary modal-btn"
                            >
                              search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
