import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { addToCart } from "../services/cartService";
import { AuthContext } from "../context/AuthContext";

const FoodCard = ({ food }) => {
  const { user } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addToCart(food.id, 1);
      alert("Added to cart");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);
      console.log("STATUS:", error.response?.status);
      alert("Error adding to cart");
    }
  };

  return (
    <Card className="m-2" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={food.image || "https://via.placeholder.com/150"}
        alt={food.name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        <Card.Text>₹{food.price}</Card.Text>
        <Card.Text>{food.description}</Card.Text>

        <Button variant="primary" onClick={handleAddToCart}>
          ADD TO CART
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
