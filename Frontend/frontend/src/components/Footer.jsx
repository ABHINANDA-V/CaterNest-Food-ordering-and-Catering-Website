import React from "react";
import "./footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footerClass">
      <Container>
        <Row>
          <Col xs={12} md={3} xl={3} lg={3} className="mb-3">
            <h1 className="footerHead fst-italic">
              {" "}
              <span style={{ color: "green" }}>Cater</span>
              <span style={{ color: "orange" }}>Nest</span>
              <GiChefToque />
            </h1>
            <p>
              From delicious food to flawless event planning, we create
              memorable experiences tailored to your special occasions.
            </p>
          </Col>
          <Col xs={12} md={3} xl={3} lg={3} className="mb-3">
            <h4 className="footerSubhead">Quick Links</h4>
            <ul>
              <li>
                <Link className="footerLink" as={NavLink} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="footerLink" as={NavLink} to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="footerLink" as={NavLink} to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="footerLink" as={NavLink} to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="footerLink" as={NavLink} to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={3} xl={3} lg={3} className="mb-5">
            <h4 className="footerSubhead">Contact Info</h4>
            <p>Rajaji Nagar,2nd Street </p>
            <p>Pavamani Road,Calicut</p>
            <p>Email:info@caternest.com</p>

            <div className="d-flex gap-3 mt-3">
              <a href="#" className="footerIcon">
                <FaFacebook />
              </a>
              <a href="#" className="footerIcon">
                <FaInstagram />
              </a>
              <a href="#" className="footerIcon">
                <FaTwitter />
              </a>
              <a href="#" className="footerIcon">
                <FaYoutube />
              </a>
            </div>
          </Col>
          <Col xs={12} md={3} xl={3} lg={3} className="mb-3">
            <h4 className="footerSubhead">Our Features</h4>
            <p>Delicious & Diverse Menu</p>
            <p>Customized Event Planning</p>
            <p>Professional Team</p>
            <p>On-Time Delivery</p>
          </Col>
        </Row>
        <Row className="pt-4 mt-4 border-top">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} CaterNest. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
