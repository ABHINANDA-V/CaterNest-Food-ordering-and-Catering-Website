import React, { useState } from "react";
import API from "../services/api";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const isLoggedIn = !!localStorage.getItem("token");

  const { data: categories = [], isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await API.get("/menu/categories/");
      return res.data.results || res.data;
    },
  });

  const {
    data: foods = [],
    isLoading: foodLoading,
    error,
  } = useQuery({
    queryKey: ["foods", search, selectedCategory],
    queryFn: async () => {
      let url = "/menu/foods/?";

      if (search) {
        url += `search=${search}&`;
      }

      if (selectedCategory) {
        url += `category=${selectedCategory}`;
      }

      const res = await API.get(url);
      return res.data.results || res.data;
    },
    keepPreviousData: true,
  });

  return (
    <div>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">Discover Our Delicious Menu</h1>
          <p className="lead mt-3">
            Browse through handpicked dishes made fresh for your special
            moments.
          </p>
        </div>
      </section>

      <Container className="py-5">
        {/* search and filter */}
        <Row className="mb-5 g-3 justify-content-center">
          <Col lg={5} md={6}>
            <div className="p-2 bg-white rounded shadow-sm border">
              <Form.Control
                type="text"
                className="border-0 shadow-none ps-3"
                placeholder="Search food, category, price..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(8);
                }}
              />
            </div>
          </Col>

          <Col lg={3} md={4}>
            <div className="p-2 bg-white rounded shadow-sm border">
              <Form.Select
                className="border-0 shadow-none"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setVisibleCount(8);
                }}
              >
                <option value="">All Categories</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>
        </Row>

        {/* loading */}
        {(foodLoading || categoryLoading) && (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        )}

        {error && (
          <div className="text-danger text-center mb-4">
            Failed to load menu items.
          </div>
        )}

        {/* food items */}
        {!foodLoading && (
          <Row>
            {foods.slice(0, visibleCount).map((food) => (
              <Col md={3} sm={6} key={food.id} className="mb-5">
                <Card className="border-0 shadow-sm h-100 card-hover-effect">
                  <div className="ratio ratio-4x3 overflow-hidden rounded-top">
                    <Card.Img
                      src={food.image}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <Card.Body className="d-flex flex-column p-4">
                    <div className="mb-2">
                      <span className="badge bg-light text-dark border fw-normal">
                        {food.category_name}
                      </span>
                    </div>
                    <Card.Title className="fw-bold mb-2">
                      {food.name}
                    </Card.Title>

                    <Card.Text className="text-muted small flex-grow-1">
                      {food.description}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                      <h5 className="mb-0 fw-bold text-success">
                        ₹{food.price}
                      </h5>

                      {isLoggedIn ? (
                        <Button
                          variant="success"
                          className="rounded-pill px-3 shadow-sm btn-sm"
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button
                          variant="outline-success"
                          className="rounded-pill px-3 btn-sm"
                          onClick={() => {
                            alert("Please login to order");
                            navigate("/login");
                          }}
                        >
                          Order Now
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* no data */}
        {!foodLoading && foods.length === 0 && (
          <div className="text-center py-5">No food items found.</div>
        )}

        {/* show more */}
        {visibleCount < foods.length && (
          <div className="text-center mt-4">
            <Button
              variant="success"
              onClick={() => setVisibleCount((prev) => prev + 8)}
            >
              Show More
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Menu;
