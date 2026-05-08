import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaGlassCheers } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoCheckmarkCircle } from "react-icons/io5";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="mainSection">
      <section className="introSection">
        <Container>
          <Row>
            <Col xs={12} lg={7} md={9}>
              <h1 className="introhead mb-3">
                Delicious Catering, <br />
                <span style={{ color: "#ff8c00" }}>Perfectly Delivered</span>
              </h1>
              <p
                className="lead mb-4 text-dark fw-medium"
                style={{ maxWidth: "550px" }}
              >
                Experience gourmet-quality dishes, curated menus, and seamless
                service for unforgettable occasions.
              </p>
              <Button
                className="introSectionButton shadow button"
                onClick={() => navigate("/menu")}
              >
                View Our Menu
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="sectionHead">Our Specialities</h2>
            <div className="underDiv"></div>
            <p className="sectionSubhead">
              Crafted with passion, served with perfection
            </p>
          </div>
          <Row className="g-4">
            {[
              { title: "Corporate Events", icon: <FaBriefcase /> },
              { title: "Weddings", icon: <GiBigDiamondRing /> },
              { title: "Private Parties", icon: <FaGlassCheers /> },
            ].map((service, idx) => (
              <Col key={idx} xs={12} md={4}>
                <Card className="h-100  border-0 shadow-lg p-4 text-center">
                  <div
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "15px",
                      color: "green",
                    }}
                  >
                    {service.icon}
                  </div>
                  <Card.Body>
                    <Card.Title
                      className="fw-bold"
                      style={{ color: "#10860c" }}
                    >
                      {service.title}
                    </Card.Title>
                    <Card.Text className="text-muted small">
                      Premium catering solutions designed for your specific
                      needs and guest count.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ backgroundColor: "#f9faf7" }}>
        <Container>
          <Row className="g-5 align-items-center">
            <Col xs={12} lg={6}>
              <Card className="border-0 shadow-lg overflow-hidden rounded-4">
                <img
                  src="/images/noodles.webp"
                  alt="Food Quality"
                  className="img-fluid"
                />
              </Card>
            </Col>
            <Col xs={12} lg={6}>
              <h2 className="sectionHead text-lg-start mb-4">
                Why Choose CaterNest?
              </h2>
              <ul className="list-unstyled">
                {[
                  "Fresh Ingredients",
                  "Hygienic Preparation",
                  "Customized Menus",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="mb-3 d-flex align-items-center fw-bold"
                  >
                    <span
                      className="me-2"
                      style={{ color: "#1a4d2e", fontSize: "1.2rem" }}
                    >
                      <IoCheckmarkCircle />
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  );
};

export default Home;
