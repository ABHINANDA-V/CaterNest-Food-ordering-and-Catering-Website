const OrderSuccess = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className="text-success"> Order Placed Successfully!</h1>
      <p>Your food is on the way </p>
      <a href="/userdashboard">Go Back</a>
    </div>
  );
};
export default OrderSuccess;
