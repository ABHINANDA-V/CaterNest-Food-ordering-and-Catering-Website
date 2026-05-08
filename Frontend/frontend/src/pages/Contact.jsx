import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./contact.css";

const Contact = () => {
  const [contactform, setContactform] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setContactform({
      ...contactform,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const errors = {};
    if (!contactform.name.trim()) {
      errors.name = "Please Enter the Name";
    }
    if (!contactform.email.trim()) {
      errors.email = "Please Enter the Email";
    } else if (!/\S+@\S+\.\S+/.test(contactform.email)) {
      errors.email = "Please Enter the valid Email";
    }
    if (!contactform.subject.trim()) {
      errors.subject = "Please Enter the Subject";
    }
    if (!contactform.message.trim()) {
      errors.message = "Please Enter the Message";
    }
    setError(errors);
    if (Object.keys(errors).length !== 0) return;

    emailjs
      .send(
        "service_ny3hhwb",
        "template_7t7vmsd",
        {
          name: contactform.name,
          email: contactform.email,
          subject: contactform.subject,
          message: contactform.message,
        },
        "CJbzkvrtmzSJpw9cU",
      )
      .then(() => {
        alert("Form Submitted & Email send Successfully");
        setContactform({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((err) => {
        alert("Failed to send Message");
        console.error(err);
      });
  };

  return (
    <div>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">We’d Love to Hear From You</h1>
          <p className="lead mt-3">
            We’re here to make your events delicious and memorable - reach out
            anytime!
          </p>
        </div>
      </section>

      <Container className="contactContainer px-3">
        <h2 className="sectionHead">Contact Us</h2>
        <div className="underDiv"></div>
        <p className="sectionSubhead">Have questions? We're here to help!</p>
        <Row className="g-4">
          <Col xs={12} md={6} xl={6} lg={6}>
            <Card className="contactCard h-100">
              <h3 className="contactSubhead">Get in Touch</h3>
              <div>
                <h5 className="contactSubsubhead">📍 Office Address</h5>
                <p>
                  Rajaji Nagar,2nd Street
                  <br />
                  Pavamani Road,Calicut
                </p>
              </div>

              <div>
                <h5 className="contactSubsubhead">📞 Phone Numbers</h5>
                <p>
                  Main Office: (555) 123-4567 <br />
                  Support: (555) 987-6543
                </p>
              </div>
              <div>
                <h5 className="contactSubsubhead">✉️ Email</h5>
                <p>
                  info@caternest.com
                  <br />
                  support@caternest.com
                </p>
              </div>
              <div>
                <h5 className="contactSubsubhead">🕒 Business Hours</h5>
                <p>
                  Monday - Friday: 8:00 AM - 6:00 PM
                  <br />
                  Saturday-Sunday: 9:00 AM - 10:00 PM
                  <br />
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={12} md={6} xl={6} lg={6}>
            <Card className="contactCard h-100">
              <h3 className="contactSubhead">Send us a Message</h3>
              <Form onSubmit={sendMessage}>
                <Form.Group className="mb-3">
                  <Form.Label className="contactSubsubhead">
                    Your Name:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    value={contactform.name}
                    onChange={handleChange}
                  />
                  <p className="errorPara">{error.name}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="contactSubsubhead">
                    Email Address:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={contactform.email}
                    onChange={handleChange}
                  />
                  <p className="errorPara">{error.email}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="contactSubsubhead">
                    Subject:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What is regarding"
                    name="subject"
                    value={contactform.subject}
                    onChange={handleChange}
                  />
                  <p className="errorPara">{error.subject}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="contactSubsubhead">
                    Your Message:
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="How Can We Help you"
                    name="message"
                    value={contactform.message}
                    onChange={handleChange}
                  />
                  <p className="errorPara">{error.message}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button type="submit" className="button w-100">
                    SEND MESSAGE
                  </Button>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>

        <div className="mapSection mt-5">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.853045165241!2d75.783688!3d11.2515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba659384770e4e3%3A0x7f61b7d1e9e08876!2sPavamani%20Rd%2C%20Kozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1713360000000!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CaterNest Location"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
