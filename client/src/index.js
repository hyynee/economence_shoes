import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import './index.css';
import { store } from './redux/conFigstore';
import ToastifyProvider from './util/ToastifyProvider';

// User
import NotFound from './components/404NotFound/NotFound';
import Detail from './components/Detail/Detail';
import Services from './components/Service/Services';
import TableCart from './components/TableCart/TableCart';
import Work from './components/Work/Work';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import HomeTemplate from './template/HomeTemplate';

// Admin
import MyOrders from './components/Order/MyOrders';
import OrderDetail from './components/Order/OrderDetail';
import AdminPrivateRoute from './components/PrivateRoute/PrivateRoute';
import ScrollToTop from './customhooks/useScrollToTop';
import Brand from './pages/admin/Brand/Brand';
import Category from './pages/admin/Category/Category';
import Customer from './pages/admin/Customer/Customer';
import Goodsreceipt from './pages/admin/Goodsreceipt/Goodsreceipt';
import Order from './pages/admin/Order/Order';
import Overview from './pages/admin/Overview/Admin';
import Products from './pages/admin/Products/Products';
import Supplier from './pages/admin/Supplier/Supplier';

export const history = createBrowserHistory();

const App = () => {
  const { loading } = useLoading();
  return (
    <>
      {loading && <Loading />}
      <ToastifyProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <ScrollToTop />
            <Routes>
              <Route path='' element={<HomeTemplate />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='work' element={<Work />} />
                <Route path='service' element={<Services />} />
                <Route path='detail'>
                  <Route path=':id' element={<Detail></Detail>}></Route>
                </Route>
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<OrderDetail />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='profile' element={<Profile />} />
                <Route path='tablecart' element={<TableCart />} />
                <Route path='reset-password' element={<ResetPassword />} />
              </Route>
              {/* Admin */}
              <Route path='admin' element={<AdminPrivateRoute />}>
                <Route index element={<Overview />} />
                <Route path='product' element={<Products />} />
                <Route path='category' element={<Category />} />
                <Route path='brand' element={<Brand />} />
                <Route path='orders' element={<Order />} />
                <Route path='customers' element={<Customer />} />
                <Route path='supplier' element={<Supplier />} />
                <Route path='goodsreceipt' element={<Goodsreceipt />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </ToastifyProvider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
