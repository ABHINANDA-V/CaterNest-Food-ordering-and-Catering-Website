import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  Form,
  InputGroup,
} from "react-bootstrap";
import "./checkoutpage.css";
import UPIPayment from "./UPIPayment";
import CardPayment from "./CardPayment";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showUPI, setShowUPI] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [deliveryOption] = useState("standard");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleUPISuccess = async () => {
    await createOrder();
    setShowUPI(false);
    navigate("/order-success");
  };

  const handleCardSuccess = async () => {
    await createOrder();
    setShowCard(false);
    navigate("/order-success");
  };

  const placeOrder = async () => {
    try {
      if (
        !deliveryDetails.name ||
        !deliveryDetails.phone ||
        !deliveryDetails.address ||
        !deliveryDetails.city ||
        !deliveryDetails.zipCode
      ) {
        alert(" Please fill all delivery details");
        return;
      }

      if (cartItems.length === 0) {
        alert(" Cart is empty");
        return;
      }

      if (paymentMethod === "cod") {
        await createOrder();
        alert(" Order placed successfully (Cash on Delivery)");
        navigate("/order-success");
      } else if (paymentMethod === "upi") {
        setShowUPI(true);
      } else if (paymentMethod === "card") {
        setShowCard(true);
      }
    } catch (error) {
      console.error(error);
      alert(" Failed");
    }
  };

  const createOrder = async () => {
    const orderData = {
      items: cartItems.map((item) => ({
        food_item: item.id,
        quantity: item.quantity,
      })),
      payment_method: paymentMethod,
      address: `${deliveryDetails.address}, ${deliveryDetails.city}, ${deliveryDetails.zipCode}`,
      phone: deliveryDetails.phone,
    };

    await axios.post("http://localhost:8000/api/orders/place/", orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const deliveryFee =
    deliveryOption === "express" ? 9.99 : subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + deliveryFee;

  return (
    <>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">Secure Checkout</h1>
          <p className="lead mt-3">Complete your order in just a few steps</p>
        </div>
      </section>

      {/* main checkout form */}
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={8}>
            {/* delivery details */}
            <Card className="checkout-card mb-4 shadow-lg border-0 rounded-4">
              <Card.Body>
                <div className="section-title mb-4">
                  <span className="section-icon me-2">🧾</span>
                  <h4 className="section-heading fw-bold mb-0">
                    Delivery Details
                  </h4>
                </div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={deliveryDetails.name}
                      onChange={handleDeliveryChange}
                      placeholder="Name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={deliveryDetails.phone}
                      onChange={handleDeliveryChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      Street Address *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={deliveryDetails.address}
                      onChange={handleDeliveryChange}
                      placeholder="123 Main Street"
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">City *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={deliveryDetails.city}
                          onChange={handleDeliveryChange}
                          placeholder="New York"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">ZIP Code *</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={deliveryDetails.zipCode}
                          onChange={handleDeliveryChange}
                          placeholder="10001"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            {/* payment method */}
            <Card className="checkout-card mb-4 shadow-lg border-0 rounded-4">
              <Card.Body>
                <div className="section-title mb-4">
                  <span className="section-icon me-2">💳</span>
                  <h4 className="section-heading fw-bold mb-0">
                    Payment Method
                  </h4>
                </div>

                <div
                  onClick={() => setPaymentMethod("cod")}
                  className="payment-option-card mb-3 p-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => {}}
                      className="payment-radio"
                    />
                    <div className="d-flex align-items-center gap-2">
                      <span>💵</span>
                      <div>
                        <div className="fw-bold">Cash on Delivery</div>
                        <div className="text-muted small">
                          Pay when you receive your order
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("upi")}
                  className="payment-option-card mb-3 p-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => {}}
                      className="payment-radio"
                    />
                    <div className="d-flex align-items-center gap-2">
                      <span>📱</span>
                      <div>
                        <div className="fw-bold">UPI Payment</div>
                        <div className="text-muted small">
                          Google Pay, PhonePe, Paytm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("card")}
                  className="payment-option-card mb-3 p-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => {}}
                      className="payment-radio"
                    />
                    <div className="d-flex align-items-center gap-2">
                      <span>💳</span>
                      <div>
                        <div className="fw-bold">Credit/Debit Card</div>
                        <div className="text-muted small">
                          All major cards accepted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="security-badge bg-success bg-opacity-10 rounded p-3 mt-3 d-flex align-items-center gap-3">
                  <span>🔒</span>
                  <div>
                    <div className="fw-bold text-success">Secure Payment</div>
                    <div className="text-success small">
                      Your transaction is protected with SSL encryption
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Button
              variant="success"
              size="lg"
              className="place-order-btn w-100 mb-3"
              onClick={placeOrder}
            >
              Place Order - ${total.toFixed(2)}
            </Button>

            <div className="trust-badges d-flex justify-content-center gap-4 flex-wrap">
              <span className="text-muted small">🔒 Secure Transaction</span>
              <span className="text-muted small">✓ Quality Guaranteed</span>
              <span className="text-muted small">📞 24/7 Support</span>
            </div>
          </Col>

          {/* order summary */}
          <Col lg={4}>
            <Card className="order-summary-card shadow-lg border-0 rounded-4">
              <Card.Body>
                <h4 className="fw-bold mb-4">Order Summary</h4>

                <div
                  className="summary-cart-items mb-4"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="summary-item d-flex gap-3 mb-3 pb-3 border-bottom"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="summary-item-img rounded"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-bold mb-1">{item.name}</div>
                        <div className="text-muted small mb-1">
                          Qty: {item.quantity}
                        </div>
                        <div className="text-success fw-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="price-breakdown mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal:</span>
                    <span className="fw-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax (8%):</span>
                    <span className="fw-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Delivery:</span>
                    <span
                      className={`fw-bold ${deliveryOption === "express" ? "text-danger" : deliveryFee === 0 ? "text-success" : "text-danger"}`}
                    >
                      {deliveryOption === "express"
                        ? "$9.99"
                        : deliveryFee === 0
                          ? "FREE"
                          : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <hr />

                <div className="total-section bg-light rounded p-3 mb-4 d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5">Total:</span>
                  <span
                    className="text-success fw-bold"
                    style={{ fontSize: "1.8rem" }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="text-center text-muted small mt-3">
                  📞 Need help? Call (555) 123-4567
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {showUPI && (
        <UPIPayment
          amount={total.toFixed(2)}
          onClose={() => setShowUPI(false)}
          onSuccess={handleUPISuccess}
        />
      )}

      {showCard && (
        <CardPayment
          amount={total}
          onClose={() => setShowCard(false)}
          onSuccess={handleCardSuccess}
        />
      )}
    </>
  );
}

export default CheckoutPage;
