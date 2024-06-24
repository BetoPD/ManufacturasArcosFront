import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UploadAvatar from './components/user/UploadAvatar';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import PaymentMethod from './components/cart/PaymentMethod';
import MyOrders from './components/order/MyOrders';
import OrderDetails from './components/order/OrderDetails';
import Invoice from './components/invoice/Invoice';
import AdminRoutes from './components/admin/AdminRoutes';
import Dashboard from './components/admin/Dashboard';
import ListProducts from './components/admin/ListProducts';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import UploadImages from './components/admin/UploadImages';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/me/profile" element={<Profile />} />
              <Route path="/me/update_profile" element={<UpdateProfile />} />
              <Route path="/me/upload_avatar" element={<UploadAvatar />} />
              <Route path="/me/update_password" element={<UpdatePassword />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/confirm_order" element={<ConfirmOrder />} />
              <Route path="/payment_method" element={<PaymentMethod />} />
              <Route path="/me/orders" element={<MyOrders />} />
              <Route path="/me/orders/:id" element={<OrderDetails />} />
              <Route path="/invoice/order/:id" element={<Invoice />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ListProducts />} />
              <Route path="product/new" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route
                path="products/:id/upload_images"
                element={<UploadImages />}
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
