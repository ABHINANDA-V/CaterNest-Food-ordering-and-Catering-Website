import React, { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { registerUser } from "../services/authService";
import "./register.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!form.username.trim()) {
      errors.username = "Please Enter the Username";
    }
    if (!form.email.trim()) {
      errors.email = "Please Enter the Email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid Email ID";
    }
    if (!form.password.trim()) {
      errors.password = "Please Enter the Password";
    } else if (form.password.length < 6) {
      errors.password = "Password must be atleast 6 characters";
    }
    if (!form.phone.trim()) {
      errors.phone = "Please Enter the Phone Number";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      errors.phone = "Invalid phonenumber";
    }
    setError(errors);
    if (Object.keys(errors).length !== 0) return;

    try {
      await registerUser(form);
      alert("Registration Successfull");
    } catch (error) {
      console.log("Register Error:", error.response?.data);
      alert("Error Registering user");
    }
  };
  return (
    <div>
      <Container className="registerContainer">
        <Card className="registerCard shadow-sm border-0 rounded-5">
          <div className="registerHeader">
            <h2 className="sectionHead">Create Account</h2>
            <div className="underDiv"></div>
            <p className="sectionSubhead">
              Join our community of professionals and clients
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter the Username"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.username}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter the Email"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.email}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter the Password"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.password}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="phone"
                name="phone"
                placeholder="Enter the Phone number"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.phone}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="submit" className="w-100 button">
                Register
              </Button>
              <p className="mt-4 text-center text-success fst-italic fs-6">
                Already have an account?{" "}
                <a href="/login" className="text-warning">
                  Login
                </a>
              </p>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
