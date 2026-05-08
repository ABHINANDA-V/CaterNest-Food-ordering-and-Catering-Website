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
  Badge,
} from "react-bootstrap";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/orders/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setOrders(res.data.results || res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge bg="warning"> Pending</Badge>;

      case "Confirmed":
        return <Badge bg="info"> Confirmed</Badge>;

      case "Out for Delivery":
        return <Badge bg="primary"> Out for Delivery</Badge>;

      case "Delivered":
        return <Badge bg="success">✓ Delivered</Badge>;

      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading orders...</div>;
  }
  return (
    <>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">My Orders</h1>
          <p className="lead mt-3">Track your delicious orders</p>
        </div>
      </section>

      {/* Orders List */}
      <Container className="py-5">
        <Row className="g-4">
          {orders.map((order) => (
            <Col key={order.id} xs={12}>
              <Card className="order-card shadow-sm border-0 p-3">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <div className="fw-bold">Order #{order.id}</div>
                    <div className="text-muted small">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-end">
                    {getStatusBadge(order.status)}
                    <div className="fw-bold text-success mt-1">
                      ₹{order.total_price}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <Row className="g-3">
                  {order.items.map((item, index) => (
                    <Col key={index} xs={6} md={3} lg={2}>
                      <div className="text-center">
                        <img
                          src={item.food_image}
                          alt={item.food_name}
                          className="img-fluid rounded"
                          style={{
                            height: "100px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />

                        <div className="small fw-bold mt-2">
                          {item.food_name}
                        </div>

                        <div className="small text-muted">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          ))}

          {orders.length === 0 && (
            <div className="emptyState text-center py-5">
              <h4 className="fw-bold mb-3">No Orders Yet</h4>
              <p className="text-muted mb-4">
                You haven’t made any ordering yet. Start planning your special
                order now!
              </p>

              <a href="/userdashboard" className="btn btn-success px-4 py-2">
                Order Now
              </a>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}

export default MyOrders;
