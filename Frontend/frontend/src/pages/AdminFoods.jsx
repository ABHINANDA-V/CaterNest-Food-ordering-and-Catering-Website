import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFoodItems,
  deleteFoodItem,
  updateFoodItem,
  getCategories,
} from "../services/menuService";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Badge,
  Card,
  Spinner,
  Image,
  Modal,
  Form,
  Pagination,
} from "react-bootstrap";

const AdminFoods = () => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoodItems,
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = Array.isArray(categoryData?.data)
    ? categoryData.data
    : categoryData?.data?.results || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updateFoodItem(id, formData),
    onSuccess: () => {
      alert("Food updated successfully");

      queryClient.invalidateQueries({ queryKey: ["foods"] });
      queryClient.refetchQueries({ queryKey: ["foods"] });
      setShowModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFoodItem,
    onSuccess: () => {
      alert("Deleted successfully");
      queryClient.invalidateQueries(["foods"]);
    },
  });

  const foods = Array.isArray(data?.data)
    ? data.data
    : data?.data?.results || [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFoods = foods.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(foods.length / itemsPerPage);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    deleteMutation.mutate(id);
  };
  const handleEditSubmit = () => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("price", editForm.price);
    formData.append("description", editForm.description);
    formData.append("category", editForm.category);
    formData.append("available", true);

    if (editForm.image) {
      formData.append("image", editForm.image);
    }

    updateMutation.mutate({
      id: selectedFood.id,
      formData,
    });
  };

  const handleEditChange = (e) => {
    if (e.target.name === "image") {
      setEditForm({ ...editForm, image: e.target.files[0] });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  if (isLoading)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
      </Container>
    );

  if (error)
    return (
      <Container className="text-center py-5">
        <p className="text-danger">
          Error loading foods. Please try again later.
        </p>
      </Container>
    );

  return (
    <Container className="py-4 px-md-5">
      <Row className="justify-content-center">
        <Col md={11} lg={10} xl={12}>
          <Card className="shadow border-0 rounded-3 mx-auto">
            <Card.Header className="bg-success text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Manage Food 🍔</h3>
                <Badge bg="light" text="dark" className="px-3">
                  Total: {foods.length}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {" "}
              {foods.length === 0 ? (
                <div className="p-5 text-center text-muted">
                  No food items found.
                </div>
              ) : (
                <>
                  <Table responsive hover className="mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-5 py-3">Item</th>
                        <th className="py-3">Price</th>
                        <th className="py-3">Category</th>
                        <th className="text-center py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedFoods.map((food) => (
                        <tr key={food.id}>
                          <td className="ps-5">
                            <div className="d-flex align-items-center">
                              {food.image && (
                                <Image
                                  src={food.image}
                                  alt={food.name}
                                  rounded
                                  width="50"
                                  height="50"
                                  className="me-3 object-fit-cover shadow-sm"
                                />
                              )}
                              <span className="fw-semibold">{food.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="text-dark">₹{food.price}</span>
                          </td>
                          <td>
                            <Badge
                              bg="info"
                              className="text-dark bg-opacity-10"
                              style={{ color: "#055160" }}
                            >
                              {food.category_name}
                            </Badge>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="px-3 rounded-pill"
                                onClick={() => {
                                  setSelectedFood(food);
                                  setEditForm({
                                    name: food.name,
                                    price: food.price,
                                    description: food.description || "",
                                    category: food.category,
                                    image: null,
                                  });
                                  setShowModal(true);
                                }}
                              >
                                Edit
                              </Button>

                              <Button
                                variant="warning"
                                size="sm"
                                className="text-white fw-bold px-3 rounded-pill shadow-sm"
                                onClick={() => handleDelete(food.id)}
                                disabled={deleteMutation.isPending}
                              >
                                {deleteMutation.isPending ? "..." : "Delete"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </Card.Body>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 border-top">
              <small className="text-muted">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, foods.length)} of{" "}
                {foods.length} items
              </small>

              <Pagination className="mb-0">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                    linkStyle={
                      index + 1 === currentPage
                        ? { backgroundColor: "#fd7e14", borderColor: "#fd7e14" }
                        : { color: "#28a745" }
                    }
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </Pagination>
            </div>
          </Card>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton className="bg-success text-white">
              <Modal.Title>Edit Food Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>

                  <Form.Select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    disabled={categoryLoading}
                  >
                    <option value="">
                      {categoryLoading ? "Loading..." : "Select Category"}
                    </option>

                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>

              <Button
                variant="success"
                onClick={handleEditSubmit}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminFoods;
