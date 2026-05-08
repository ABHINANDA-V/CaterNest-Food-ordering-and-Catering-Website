import React, { useState } from "react";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../services/cateringService";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Table, Button, Form, Card } from "react-bootstrap";

const AdminPackages = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    price_per_person: "",
    description: "",
  });

  const [error, setError] = useState({});

  const [editId, setEditId] = useState(null);

  const { data } = useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  });

  const packages = data?.data?.results || data?.data || [];

  const saveMutation = useMutation({
    mutationFn: (data) => {
      if (editId) {
        return updatePackage(editId, data);
      }
      return createPackage(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      setFormData({ name: "", price_per_person: "", description: "" });
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Please Enter the package name";
    }
    if (!formData.price_per_person.trim()) {
      errors.price_per_person = "Please Enter the price";
    }
    if (!formData.description.trim()) {
      errors.description = "Please Enter the description";
    }
    setError(errors);
    if (Object.keys(errors).length !== 0) return;

    saveMutation.mutate(formData);
  };

  return (
    <Container className="py-4">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-success text-white text-center py-3 rounded-top-4">
          <h3 className="mb-0">Manage Catering Packages </h3>
        </Card.Header>

        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Package Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Package Name"
                className="mb-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <p className="error">{error.name}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Price per person</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                type="number"
                className="mb-2"
                value={formData.price_per_person}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price_per_person: e.target.value,
                  })
                }
              />
              <p className="error">{error.price_per_person}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                className="mb-2"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <p className="error">{error.description}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="submit" className="w-100 button">
                {editId ? "Update Package" : "Add Package"}
              </Button>
            </Form.Group>
          </Form>
          <hr className="my-4" />
          <Table hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="fw-semibold">{pkg.name}</td>
                  <td className="text-success fw-bold">
                    ₹{pkg.price_per_person}
                  </td>
                  <td className="text-muted">{pkg.description}</td>

                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => {
                        setEditId(pkg.id);
                        setFormData({
                          name: pkg.name,
                          price_per_person: pkg.price_per_person,
                          description: pkg.description,
                        });
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => deleteMutation.mutate(pkg.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminPackages;
