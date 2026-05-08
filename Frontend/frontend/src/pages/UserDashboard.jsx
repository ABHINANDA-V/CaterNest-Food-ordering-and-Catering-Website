import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    API.get("/menu/categories/")
      .then((res) => setCategories(res.data.results || res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (food) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find((item) => item.id === food.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      updatedCart = [...existingCart, { ...food, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Added to cart ");
    window.dispatchEvent(new Event("storage"));
  };

  // load foods by category
  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    setSearchTerm("");

    API.get(`menu/foods/?category=${id}&search=${searchTerm}&page=1`)
      .then((res) => {
        setFoods(res.data.results || res.data);
        setHasMore(!!res.data.next);
        setPage(2);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!selectedCategory) return;
    {
      API.get(
        `menu/foods/?category=${selectedCategory}&search=${searchTerm}&page=1`,
      ).then((res) => {
        setFoods(res.data.results || res.data);
        setHasMore(!!res.data.next);
        setPage(2);
      });
    }
  }, [searchTerm, selectedCategory]);

  const loadMore = () => {
    API.get(
      `menu/foods/?category=${selectedCategory}&search=${searchTerm}&page=${page}`,
    ).then((res) => {
      setFoods((prev) => [...prev, ...(res.data.results || res.data)]);
      setHasMore(!!res.data.next);
      setPage(page + 1);
    });
  };

  return (
    <Container className="py-4">
      <div className="bg-success p-4 rounded-4 mb-4 border-start border-5 border-warning shadow-sm">
        <h3 className="fw-bold mb-0 text-warning">
          Welcome, {user.username || "User"}{" "}
        </h3>
        <p className="text-white mb-0">What would you like to order today?</p>
      </div>

      {/* category view */}
      {!selectedCategory && (
        <>
          <div className="text-center mb-5">
            <h2 className="sectionHead">Choose Category</h2>
            <div className="underDiv"></div>
            <p className="sectionSubhead">
              Explore delicious options by category
            </p>
          </div>

          <Row>
            {categories.map((cat) => (
              <Col md={4} sm={6} key={cat.id} className="mb-4">
                <Card
                  className="category-card shadow-sm border-0"
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {/* image */}
                  <div className="cat-img-wrapper">
                    <Card.Img src={cat.image} alt={cat.name} />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="cat-title">{cat.name}</Card.Title>
                    <small className="text-muted">Explore items →</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {selectedCategory && (
        <>
          <Button
            variant="secondary"
            className="mb-3 bg-warning border-0 text-success fw-bold"
            onClick={() => {
              setSelectedCategory(null);
              setSearchTerm("");
            }}
          >
            ← Back
          </Button>

          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by food name or price..."
              className="inputbox mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          <Row>
            {foods.map((food) => (
              <Col md={4} sm={6} key={food.id} className="mb-4">
                <Card className="food-card shadow-sm border-0">
                  {/* image */}
                  <div className="img-wrapper">
                    <Card.Img src={food.image} />
                    <span className="wishlist">❤️</span>
                  </div>

                  <Card.Body>
                    <Card.Title className="food-title">{food.name}</Card.Title>

                    <Card.Text className="food-desc">
                      {food.description}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h6 className="food-price">₹{food.price}</h6>

                      {/* quantity buttons */}
                      <button
                        className="btn btn-success"
                        onClick={() => addToCart(food)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {hasMore && (
            <div className="text-center mt-3">
              <Button onClick={loadMore}>Show More</Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default UserDashboard;
