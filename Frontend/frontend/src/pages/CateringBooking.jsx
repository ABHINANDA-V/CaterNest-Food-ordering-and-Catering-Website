import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { createBooking, getPackages } from "../services/cateringService";

const CateringBooking = () => {
  const [formData, setFormData] = useState({
    event_type: "",
    event_date: "",
    guest_count: "",
    special_request: "",
    phone: "",
    location: "",
    event_time: "",
    package: "",
  });
  const [error, setError] = useState({});
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getPackages().then((res) => setPackages(res.data.results || res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "package") {
      const pkg = packages.find((p) => p.id === parseInt(value));
      setSelectedPackage(pkg);
    }

    if (name === "guest_count") {
      if (selectedPackage) {
        setTotalPrice(selectedPackage.price_per_person * value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!formData.event_type.trim()) {
      errors.event_type = "Please select the event type";
    }
    if (!formData.event_date) {
      errors.event_date = "Please select the date";
    }
    if (!formData.guest_count) {
      errors.guest_count = "Please Enter the guest count";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Please Enter the phone number";
    }
    if (!formData.location.trim()) {
      errors.location = "Please enter the location";
    }
    if (!formData.event_time) {
      errors.event_time = "Please Enter the event time";
    }
    if (!formData.package) {
      errors.package = "Please Enter the package";
    }
    setError(errors);
    if (Object.keys(errors).length !== 0) return;

    try {
      await createBooking(formData);
      alert("Booking created successfully");
      setFormData({
        event_type: "",
        event_date: "",
        guest_count: "",
        special_request: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error creating booking");
    }
  };

  return (
    <div>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">
            Crafting Memorable Dining Experiences
          </h1>
          <p className="lead mt-3">
            Book exceptional catering services designed for your special
            moments.
          </p>
        </div>
      </section>

      <Container className="py-4">
        <Card className="shadow p-5 border-0 rounded-5">
          <h3 className="sectionHead">Catering Booking</h3>
          <div className="underDiv"></div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Event Type</Form.Label>
              <Form.Select
                name="event_type"
                value={formData.event_type}
                onChange={handleChange}
                className="inputbox"
              >
                <option>Select</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Corporate</option>
              </Form.Select>
              <p className="error">{error.event_type}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.event_date}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Time</Form.Label>
              <Form.Control
                type="time"
                name="event_time"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.event_time}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.location}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.phone}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Guest Count</Form.Label>
              <Form.Control
                type="number"
                name="guest_count"
                value={formData.guest_count}
                onChange={handleChange}
                className="inputbox"
              />
              <p className="error">{error.guest_count}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Special Request</Form.Label>
              <Form.Control
                as="textarea"
                name="special_request"
                value={formData.special_request}
                onChange={handleChange}
                className="inputbox"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Food Package</Form.Label>
              <Form.Select
                name="package"
                onChange={handleChange}
                className="inputbox"
              >
                <option>Select Package</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ₹{pkg.price_per_person}
                  </option>
                ))}
              </Form.Select>
              <p className="error">{error.package}</p>
            </Form.Group>

            {selectedPackage && (
              <Card className="p-3 mb-3 border-0 shadow-lg">
                <h5 className="text-success">{selectedPackage.name}</h5>

                {/* IMAGE */}
                {selectedPackage.image && (
                  <img
                    src={selectedPackage.image}
                    alt="package"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <p className="mt-2 text-warning">
                  {selectedPackage.description}
                </p>
                <p className="text-primary">
                  <strong>Price per person:</strong> ₹
                  {selectedPackage.price_per_person}
                </p>
              </Card>
            )}

            {totalPrice > 0 && (
              <h5 className="text-success">Total Price: ₹{totalPrice}</h5>
            )}

            <Button type="submit" className="button w-100">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default CateringBooking;
