import React, { useState, useContext } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!form.username.trim()) {
      errors.username = "Please Enter the Username";
    }
    if (!form.password.trim()) {
      errors.password = "Please Enter the Password";
    }
    setError(errors);

    if (Object.keys(errors).length !== 0) return;

    try {
      const res = await loginUser(form);

      // store token
      login(res.data.access, res.data.role);

      //  store role
      localStorage.setItem("role", res.data.role);

      alert("Login successful");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/userdashboard");
      }
    } catch (error) {
      console.log(error.response?.data);
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <Container className="registerContainer">
        <Card className="registerCard shadow-sm border-0 rounded-5">
          <div className="registerHeader">
            <h2 className="sectionHead">Login to Your Account</h2>
            <div className="underDiv"></div>
            <p className="sectionSubhead">
              Login to access your account and continue finding services.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.username}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.password}</p>
            </Form.Group>

            <Button type="submit" className="w-100 button">
              Login
            </Button>

            <p className="mt-4 text-center text-success fs-6 fst-italic">
              Don't have an account?{" "}
              <a href="/register" className="text-warning">
                Register
              </a>
            </p>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
