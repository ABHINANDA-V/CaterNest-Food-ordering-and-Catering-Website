import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminOrders, updateOrderStatus } from "../services/orderService";
import {
  Container,
  Table,
  Badge,
  Button,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Modal, Image } from "react-bootstrap";
import { useState } from "react";

const AdminOrders = () => {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAdminOrders,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const orders = Array.isArray(data?.data)
    ? data.data
    : data?.data?.results || [];

  return (
    <Container fluid className="py-4 px-md-5">
      <Row className="justify-content-center">
        <Col xs={12} md={11} lg={10} xl={9}>
          <Card className="shadow border-0 rounded-3">
            <Card.Header className="bg-success text-white py-3">
              <div className="d-flex justify-content-between">
                <h3 className="mb-0">Manage Orders 🧾</h3>
                <Badge bg="light" text="dark">
                  Total: {orders.length}
                </Badge>
              </div>
            </Card.Header>

            <Card.Body className="p-2 p-md-3">
              <Table responsive hover className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="py-3 ps-4">ID</th>
                    <th className="py-3">User</th>
                    <th className="py-3">Total</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Payment</th>
                    <th className="text-center py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-3 ps-4">{order.id}</td>
                      <td className="py-3">{order.username}</td>
                      <td className="py-3">₹{order.total_price}</td>

                      <td>
                        <Badge
                          bg={
                            order.status === "Pending"
                              ? "warning"
                              : order.status === "Confirmed"
                                ? "info"
                                : order.status === "Out for Delivery"
                                  ? "primary"
                                  : "success"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>

                      <td>{order.payment_method}</td>

                      <td className="text-center">
                        <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
                          <Button
                            size="sm"
                            variant="primary"
                            className="me-2"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowModal(true);
                            }}
                          >
                            View
                          </Button>

                          <Form.Select
                            size="sm"
                            value={order.status}
                            onChange={(e) =>
                              updateMutation.mutate({
                                id: order.id,
                                status: e.target.value,
                              })
                            }
                          >
                            <option>Pending</option>
                            <option>Confirmed</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                          </Form.Select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Total:</strong> ₹{selectedOrder.total_price}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.phone || "N/A"}
              </p>

              <p>
                <strong>Address:</strong> {selectedOrder.address || "N/A"}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.created_at).toLocaleString()}
              </p>

              <hr />

              <h5>Items:</h5>

              {selectedOrder.items.length === 0 ? (
                <p>No items</p>
              ) : (
                selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center mb-3 border-bottom pb-2"
                  >
                    {item.food_image && (
                      <Image
                        src={item.food_image}
                        width="60"
                        height="60"
                        rounded
                        className="me-3"
                      />
                    )}

                    <div>
                      <p className="mb-1 fw-bold">{item.food_name}</p>
                      <small>
                        Qty: {item.quantity} | Price: ₹{item.price}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminOrders;
