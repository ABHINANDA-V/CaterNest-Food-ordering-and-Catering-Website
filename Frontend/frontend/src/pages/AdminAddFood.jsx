import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFoodItem, getCategories } from "../services/menuService";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { createCategory } from "../services/menuService";

const AdminAddFood = () => {
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState({});

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const [fooderror, setfoodError] = useState({});

  const queryClient = useQueryClient();

  const { data, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      alert("Category added successfully");

      queryClient.invalidateQueries(["categories"]);

      setCategoryForm({
        name: "",
        description: "",
        image: null,
      });
    },
  });

  const mutation = useMutation({
    mutationFn: createFoodItem,
    onSuccess: () => {
      alert("Food added successfully");
      queryClient.invalidateQueries(["foods"]);

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
      });
    },
  });

  const handleCategoryChange = (e) => {
    if (e.target.name === "image") {
      setCategoryForm({ ...categoryForm, image: e.target.files[0] });
    } else {
      setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });

      setError({
        ...error,
        [e.target.name]: "",
      });
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!categoryForm.name.trim()) {
      errors.name = "Please Enter the Category name";
    }
    if (!categoryForm.description.trim()) {
      errors.description = "Please Enter the description";
    }
    if (!categoryForm.image) {
      errors.image = "Please upload an image";
    }
    setError(errors);
    if (Object.keys(errors).length !== 0) return;

    const formData = new FormData();
    formData.append("name", categoryForm.name);
    formData.append("description", categoryForm.description);
    if (categoryForm.image) {
      formData.append("image", categoryForm.image);
    }

    categoryMutation.mutate(formData);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
      setfoodError({
        ...fooderror,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fooderrors = {};
    if (!form.name.trim()) {
      fooderrors.name = "Please Enter the name of the food";
    }
    if (!form.price.trim()) {
      fooderrors.price = "Please Enter the price";
    }
    if (!form.category.trim()) {
      fooderrors.category = "Please select the category";
    }
    if (!form.description.trim()) {
      fooderrors.description = "Please Enter the description ";
    }
    if (!form.image) {
      fooderrors.image = "Please upload an image";
    }
    setfoodError(fooderrors);
    if (Object.keys(fooderrors).length !== 0) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);
    mutation.mutate(formData);
  };

  const categories = data?.data?.results || [];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Header className="bg-success text-white text-center py-3 rounded-top-4">
              <h4>Add Category 🗂️</h4>
            </Card.Header>

            <Card.Body className="p-4">
              <Form onSubmit={handleCategorySubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={categoryForm.name}
                    onChange={handleCategoryChange}
                  />
                  <p className="error">{error.name}</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Enter category description..."
                    value={categoryForm.description}
                    onChange={handleCategoryChange}
                  />
                  <p className="error">{error.description}</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Category Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleCategoryChange}
                  />
                  <p className="error">{error.image}</p>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="success"
                    type="submit"
                    className="button"
                    disabled={categoryMutation.isPending}
                  >
                    {categoryMutation.isPending ? "Adding..." : "Add Category"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Header className="bg-success text-white text-center py-3 rounded-top-4">
              <h3 className="mb-0">Add New Food Item 🍔</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Food Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter food name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <p className="error">{fooderror.name}</p>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Price ($)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="0.00"
                        value={form.price}
                        onChange={handleChange}
                      />
                      <p className="error">{fooderror.price}</p>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        disabled={categoriesLoading}
                      >
                        <option value="">
                          {categoriesLoading
                            ? "Loading categories..."
                            : "Select Category"}
                        </option>
                        {!categoriesLoading &&
                          categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                      </Form.Select>
                      <p className="error">{fooderror.category}</p>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Briefly describe the dish..."
                    value={form.description}
                    onChange={handleChange}
                  />
                  <p className="error">{fooderror.description}</p>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Food Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <p className="error">{fooderror.image}</p>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="warning"
                    type="submit"
                    size="lg"
                    className="fw-bold text-white custom-btn"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Adding...
                      </>
                    ) : (
                      "Add Food Item"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddFood;
