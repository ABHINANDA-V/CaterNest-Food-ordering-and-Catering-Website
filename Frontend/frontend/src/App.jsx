import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Layout from "./layouts/Layout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import UserDashboard from "./pages/UserDashboard";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminFoods from "./pages/AdminFoods";
import AdminAddFood from "./pages/AdminAddFood";
import AdminOrders from "./pages/AdminOrders";
import CateringBooking from "./pages/CateringBooking";
import MyBookings from "./pages/MyBookings";
import AdminCatering from "./pages/AdminCatering";
import AdminPackages from "./pages/AdminPackages";
import Menu from "./pages/Menu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/myorders" element={<MyOrders />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-food" element={<AdminAddFood />} />
        <Route path="/admin/foods" element={<AdminFoods />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/catering" element={<CateringBooking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/catering" element={<AdminCatering />} />
        <Route path="/admin/packages" element={<AdminPackages />} />
      </Route>
    </Routes>
  );
}

export default App;
