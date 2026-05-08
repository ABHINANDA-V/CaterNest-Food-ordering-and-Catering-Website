import React from "react";
import "./about.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">Know More About Our Catering</h1>
          <p className="lead mt-3">
            Delivering exceptional taste and unforgettable experiences for every
            occasion.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img
              src="/images/aboutimage.webp"
              alt="Catering"
              className="img-fluid rounded-4 shadow"
            />
          </div>

          <div className="col-lg-6">
            <h2 className="fw-bold mb-3 sectionHead">Who We Are</h2>
            <div className="underDiv"></div>
            <p className="text-muted fs-5">
              We are a professional catering service committed to delivering
              high-quality food with exceptional service. Our journey started
              with a passion for cooking and has grown into a trusted catering
              brand for all types of events. From intimate gatherings to large
              celebrations, we ensure every dish is crafted with care, fresh
              ingredients, and authentic flavors.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-2 sectionHead">Our Services</h2>
          <div className="underDiv"></div>

          <div className="row g-4">
            {[
              {
                title: "Wedding Catering",
                desc: "Elegant and traditional catering for your special day.",
              },
              {
                title: "Corporate Events",
                desc: "Professional food services for meetings and conferences.",
              },
              {
                title: "Private Parties",
                desc: "Customized menus for birthdays and celebrations.",
              },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card border-0 shadow-xl h-100 p-4 rounded-4">
                  <h5 className="subsubhead fw-semibold">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-3 sectionHead">Why Choose Us</h2>
        <div className="underDiv"></div>

        <div className="row g-4 text-center mt-4">
          {[
            "Fresh Ingredients",
            "Expert Chefs",
            "On-Time Delivery",
            "Customized Menus",
          ].map((item, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="p-3 border rounded-4 h-100 shadow-xl bg-warning">
                <h6 className="fw-semibold text-white">{item}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="heroSection text-white py-5">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-3">
              <h2 className="fw-bold">500+</h2>
              <p>Events Completed</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold">10+</h2>
              <p>Years Experience</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold">100%</h2>
              <p>Customer Satisfaction</p>
            </div>
            <div className="col-md-3">
              <h2 className="fw-bold">50+</h2>
              <p>Menu Items</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-3 sectionHead">Make Your Event Special</h2>
          <div className="underDiv"></div>
          <p className="text-muted sectionSubhead mb-4">
            Let us handle the food while you enjoy the moment.
          </p>
          <Button className="button" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
};

export default About;
