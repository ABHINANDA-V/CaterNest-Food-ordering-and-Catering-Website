import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminBookings,
  updateBookingStatus,
} from "../services/cateringService";
import { Container, Table, Card, Badge, Form } from "react-bootstrap";

const AdminCatering = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAdminBookings,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateBookingStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const bookings = Array.isArray(data?.data)
    ? data.data
    : data?.data?.results || [];

  return (
    <Container className="py-4">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-success text-white text-center">
          <h3>Catering Bookings </h3>
        </Card.Header>

        <Card.Body>
          <Table responsive className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Guests</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Package</th>
                <th className="px-6 py-3">Total</th>

                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="bg-white border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{b.username}</td>
                  <td className="px-6 py-4">{b.event_type}</td>
                  <td className="px-6 py-4">{b.event_date}</td>
                  <td className="px-6 py-4">{b.guest_count}</td>
                  <td className="px-6 py-4">{b.phone}</td>
                  <td className="px-6 py-4">{b.location}</td>
                  <td className="px-6 py-4">{b.package_name}</td>
                  <td className="px-6 py-4">₹{b.total_price}</td>

                  <td className="px-6 py-4">
                    <Badge bg="info">{b.status}</Badge>
                  </td>

                  <td className="px-6 py-4">
                    <Form.Select
                      size="sm"
                      value={b.status}
                      onChange={(e) =>
                        updateMutation.mutate({
                          id: b.id,
                          status: e.target.value,
                        })
                      }
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </Form.Select>
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

export default AdminCatering;
