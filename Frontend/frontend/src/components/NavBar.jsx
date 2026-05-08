import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/dashboardService";

function MyNavbar() {
  const { user, logout } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const role = user?.role;

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    enabled: role === "admin",
    refetchInterval: 5000,
  });

  // cart count
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQty);
    };

    updateCart();

    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary navBar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navBrand">
          <span style={{ color: "green" }}>Cater</span>
          <span style={{ color: "orange" }}>Nest </span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {/* home */}
            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/" className="navLink">
                  Home
                </Nav.Link>

                <Nav.Link as={NavLink} to="/contact" className="navLink">
                  Contact
                </Nav.Link>

                <Nav.Link as={NavLink} to="/about" className="navLink">
                  About
                </Nav.Link>

                <Nav.Link as={NavLink} to="/login" className="navLink">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="navLink">
                  Register
                </Nav.Link>
              </>
            ) : role === "admin" ? (
              <>
                {/* admin navbar */}
                <Nav.Link as={NavLink} to="/admin" className="navLink">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/add-food" className="navLink">
                  Add Food
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/foods" className="navLink">
                  Manage Food
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/orders" className="navLink">
                  Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/catering" className="navLink">
                  Catering
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/packages" className="navLink">
                  Packages
                </Nav.Link>

                <div style={{ position: "relative", marginRight: "15px" }}>
                  <span style={{ fontSize: "20px" }}>🔔</span>

                  {data?.data?.new_bookings > 0 && (
                    <Badge
                      bg="danger"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-10px",
                        fontSize: "10px",
                      }}
                    >
                      {data.data.new_bookings}
                    </Badge>
                  )}
                </div>

                <Nav.Link onClick={logout} className="navLink">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                {/* user navbar */}
                <Nav.Link as={NavLink} to="/userdashboard" className="navLink">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact" className="navLink">
                  Contact
                </Nav.Link>
                <Nav.Link as={NavLink} to="/about" className="navLink">
                  About
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cart" className="navLink">
                  Cart {cartCount > 0 && <Badge bg="danger">{cartCount}</Badge>}
                </Nav.Link>

                <Nav.Link as={NavLink} to="/myorders" className="navLink">
                  My Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/catering" className="navLink">
                  Catering
                </Nav.Link>
                <Nav.Link as={NavLink} to="/my-bookings" className="navLink">
                  My Bookings
                </Nav.Link>

                <Nav.Link onClick={logout} className="navLink">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
