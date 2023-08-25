import React from "react";

type Props = {};

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-widget-main">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-widget float-left">
                <div className="footer-widget-box">
                  <h5 className="footer-title">about us</h5>
                  <p>
                    Dolor eros cubilia velit fusce. Porttitor molestie leo
                    quisque placeat, netus bhger hryyu.
                  </p>
                  <ul className="list-inline footer-share">
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
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="footer-widget float-right">
                <div className="footer-widget-box">
                  <h5 className="footer-title">newsletter</h5>
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="E-mail"
                        aria-label="Search for"
                      />
                      <span className="input-group-btn">
                        <button className="btn btn-secondary" type="submit">
                          Signup
                        </button>
                      </span>
                    </div>
                  </form>
                  <p>Dolor eros cubilia velit fusce</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center">
        <p>
          Copyright - 2017 Next Blog - HTML Template. Designed by
          <a href="themeix.html">Themeix</a>
        </p>
      </div>
      <a href="#" id="back-to-top" title="Back to top">
        <i className="fa fa-angle-double-up" aria-hidden="true"></i>
      </a>
    </footer>
  );
};

export default Footer;
