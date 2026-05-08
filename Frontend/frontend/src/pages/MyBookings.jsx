import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../services/cateringService";
import { Container, Table, Badge, Card } from "react-bootstrap";
import { FiCalendar, FiMapPin, FiPackage, FiUsers } from "react-icons/fi";

const MyBookings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: getMyBookings,
  });

  if (isLoading) return <p>Loading...</p>;

  const bookings = data?.data?.results || data?.data || [];

  return (
    <div>
      <section className="heroSection text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-5">Booking Overview</h1>
          <p className="lead mt-3">
            A complete record of your catering experiences, all neatly organized
            for you.
          </p>
        </div>
      </section>

      <Container className="py-4">
        {bookings.length === 0 ? (
          <div className="emptyState text-center py-5">
            <h4 className="fw-bold mb-3">No Bookings Yet</h4>
            <p className="text-muted mb-4">
              You haven’t made any catering bookings yet. Start planning your
              special event now!
            </p>

            <a href="/catering" className="btn btn-success px-4 py-2">
              Book Catering
            </a>
          </div>
        ) : (
          bookings.map((b) => (
            <Card
              key={b.id}
              className="mb-4 shadow-sm border-0 rounded-4 overflow-hidden"
            >
              <Card.Body className="p-4 position-relative">
                {/* Top Right Badge */}
                <div className="position-absolute top-0 end-0 mt-3 me-3">
                  <Badge
                    className="text-white"
                    pill
                    bg={
                      b.status.toLowerCase() === "completed"
                        ? "success"
                        : b.status.toLowerCase() === "confirmed"
                          ? "primary"
                          : b.status.toLowerCase() === "pending"
                            ? "warning"
                            : b.status.toLowerCase() === "cancelled"
                              ? "danger"
                              : "secondary"
                    }
                    text="dark"
                    style={{ fontSize: "0.85rem", padding: "0.5em 1em" }}
                  >
                    {b.status}
                  </Badge>
                </div>

                {/* Card Content */}
                <h5 className="fw-bold mb-3" style={{ color: "#198754" }}>
                  {b.event_type}
                </h5>

                <div className="row g-2">
                  <div className="col-6">
                    <p className="mb-1 text-muted small uppercase fw-semibold">
                      Date & Location
                    </p>
                    <p className="mb-0 text-dark d-flex align-items-center gap-2">
                      <FiCalendar className="icon" /> {b.event_date}
                    </p>
                    <p className="text-dark d-flex align-items-center gap-2">
                      <FiMapPin className="icon" /> {b.location}
                    </p>
                  </div>

                  <div className="col-6">
                    <p className="mb-1 text-muted small uppercase fw-semibold">
                      Details
                    </p>
                    <p className="mb-0 text-dark d-flex align-items-center gap-2">
                      <FiPackage className="icon" /> {b.package_name}
                    </p>
                    <p className="text-dark d-flex align-items-center gap-2">
                      <FiUsers className="icon" /> {b.guest_count} Guests
                    </p>
                  </div>
                </div>

                <hr className="my-3 opacity-10" />

                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted fw-medium">Total Amount</span>
                  <span className="fs-5 fw-bold" style={{ color: "#e67e22" }}>
                    ₹{b.total_price.toLocaleString()}
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
};

export default MyBookings;
