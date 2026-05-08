import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Don't allow quantity less than 1

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price * item.quantity),
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 50 ? 0 : 5.99; // Free delivery over $50
  const total = subtotal + tax + deliveryFee;

  return (
    <>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5"> Shopping Cart</h1>
          <p className="lead mt-3">Review your items before checkout</p>
        </div>
      </section>

      <Container className="py-5">
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <h2
              style={{
                fontSize: "2rem",
                color: "#d1d40a",
                marginBottom: "20px",
              }}
            >
              Your cart is empty
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#adb5bd",
                marginBottom: "30px",
              }}
            >
              Start adding delicious items to your cart!
            </p>
            <Button
              href="/userdashboard"
              variant="primary"
              className=" button"
              size="lg"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  Cart Items ({cartItems.length})
                </h4>
              </div>

              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="mb-3 shadow-sm"
                  style={{
                    border: "none",
                    borderRadius: "15px",
                  }}
                >
                  <Row className="g-0">
                    <Col xs={4} md={3}>
                      <Card.Img
                        src={item.image}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: "15px",
                          borderBottomLeftRadius: "15px",
                        }}
                      />
                    </Col>
                    <Col xs={8} md={9}>
                      <Card.Body style={{ padding: "20px" }}>
                        <Card.Title
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          {item.name}
                        </Card.Title>
                        <Card.Text
                          style={{
                            color: "#28a745",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                            marginBottom: "15px",
                          }}
                        >
                          ₹{Number(item.price).toFixed(2)}
                        </Card.Text>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{ fontWeight: "bold", color: "#495057" }}
                          >
                            Quantity:
                          </span>
                          <InputGroup style={{ maxWidth: "150px" }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <Form.Control
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="text-center"
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </InputGroup>

                          <Button
                            variant="link"
                            onClick={() => removeItem(item.id)}
                            style={{
                              color: "#dc3545",
                              textDecoration: "none",
                              marginLeft: "auto",
                            }}
                          >
                            🗑️ Remove
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))}

              <Button
                href="/userdashboard"
                variant="outline-dark"
                className="button mt-3"
                style={{ borderRadius: "25px", padding: "10px 30px" }}
              >
                ← Continue Shopping
              </Button>
            </Col>

            <Col lg={4}>
              <Card
                className="shadow-sm"
                style={{
                  border: "none",
                  borderRadius: "15px",
                  position: "sticky",
                  top: "20px",
                }}
              >
                <Card.Body style={{ padding: "25px" }}>
                  <Card.Title
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Order Summary
                  </Card.Title>

                  <div style={{ marginBottom: "15px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        fontSize: "1rem",
                      }}
                    >
                      <span style={{ color: "#495057" }}>Subtotal:</span>
                      <span style={{ fontWeight: "bold" }}>
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        fontSize: "1rem",
                      }}
                    >
                      <span style={{ color: "#495057" }}>Tax (8%):</span>
                      <span style={{ fontWeight: "bold" }}>
                        ₹{tax.toFixed(2)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        fontSize: "1rem",
                      }}
                    >
                      <span style={{ color: "#495057" }}>Delivery:</span>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: deliveryFee === 0 ? "#28a745" : "#dc3545",
                        }}
                      >
                        {deliveryFee === 0
                          ? "FREE"
                          : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    {deliveryFee > 0 && (
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#6c757d",
                          marginBottom: "10px",
                          fontStyle: "italic",
                        }}
                      >
                        Add ${(50 - subtotal).toFixed(2)} more for FREE delivery
                      </div>
                    )}
                  </div>

                  <hr style={{ margin: "20px 0" }} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "25px",
                    }}
                  >
                    <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                      Total:
                    </span>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#28a745",
                      }}
                    >
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    href="/checkout"
                    variant="success"
                    size="lg"
                    className="w-100 mb-3"
                    style={{
                      borderRadius: "30px",
                      padding: "15px",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Proceed to Checkout
                  </Button>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "0.85rem",
                      color: "#6c757d",
                    }}
                  >
                    🔒 Secure Checkout
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Cart;
