import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../services/dashboardService";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  if (isLoading) return <Spinner />;

  const stats = data?.data;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#198754" }}>
          Admin <span style={{ color: "#fd7e14" }}>Dashboard</span>
        </h2>
        <div className="text-muted small fw-bold text-uppercase tracking-wider">
          Real-time Overview
        </div>
      </div>

      <Row className="g-4">
        <Col md={3}>
          <Card
            className="border-0 shadow-sm rounded-4 text-white"
            style={{ backgroundColor: "#198754" }}
          >
            <Card.Body className="p-4">
              <h6 className="text-uppercase opacity-75 fw-bold small">
                Total Orders
              </h6>
              <h2 className="display-6 fw-bold mb-0">{stats.total_orders}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card
            className="border-0 shadow-sm rounded-4 text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            <Card.Body className="p-4">
              <h6 className="text-uppercase opacity-75 fw-bold small">
                Total Users
              </h6>
              <h2 className="display-6 fw-bold mb-0">{stats.total_users}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card
            className="border-0 shadow-sm rounded-4 text-white"
            style={{ backgroundColor: "#198754" }}
          >
            <Card.Body className="p-4">
              <h6 className="text-uppercase opacity-75 fw-bold small">
                Food Items
              </h6>
              <h2 className="display-6 fw-bold mb-0">
                {stats.total_food_items}
              </h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card
            className="border-0 shadow-sm rounded-4 text-white"
            style={{ backgroundColor: "#fd7e14" }}
          >
            <Card.Body className="p-4">
              <h6 className="text-uppercase opacity-75 fw-bold small">
                Catering Bookings
              </h6>
              <h2 className="display-6 fw-bold mb-0">{stats.total_bookings}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-2 g-4">
        <Col md={6}>
          <Card
            className="border-0 shadow-sm rounded-4 border-start border-4"
            style={{ borderColor: "#fd7e14 !important" }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center p-4">
              <h5 className="mb-0 fw-bold text-muted">Pending Orders</h5>
              <h3 className="fw-bold mb-0" style={{ color: "#fd7e14" }}>
                {stats.pending_orders}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card
            className="border-0 shadow-sm rounded-4 border-start border-4"
            style={{ borderColor: "#198754 !important" }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center p-4">
              <h5 className="mb-0 fw-bold text-muted">Delivered Orders</h5>
              <h3 className="fw-bold mb-0 text-success">
                {stats.delivered_orders}
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold" style={{ color: "#198754" }}>
                Recent Orders 🧾
              </h5>
            </Card.Header>
            <Card.Body className="pt-0">
              {stats.recent_orders.map((order) => (
                <div
                  key={order.id}
                  className="d-flex justify-content-between align-items-center py-3 border-bottom"
                >
                  <div>
                    <div className="fw-bold text-dark">
                      #{order.id} - {order.user}
                    </div>
                    <small className="text-muted">₹{order.total}</small>
                  </div>
                  <span
                    className={`badge rounded-pill ${order.status === "Delivered" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold" style={{ color: "#fd7e14" }}>
                Recent Catering 🎉
              </h5>
            </Card.Header>
            <Card.Body className="pt-0">
              {stats.recent_bookings.map((b) => (
                <div
                  key={b.id}
                  className="d-flex justify-content-between align-items-center py-3 border-bottom"
                >
                  <div>
                    <div className="fw-bold text-dark">{b.event}</div>
                    <small className="text-muted">
                      {b.user} | {b.date}
                    </small>
                  </div>
                  <span className="badge bg-light text-dark border">
                    {b.status}
                  </span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
