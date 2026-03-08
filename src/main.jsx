import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import SalesReport from './pages/SalesReport.jsx';
import ListProducts from './pages/ListProducts.jsx';
import CatalogManager from './pages/CatalogManager.jsx';
import AuthPage from './pages/AuthPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage mode="login" />,
  },
  {
    path: "/register",
    element: <AuthPage mode="register" />,
  },
  {
    path: "/",
    element: <PrivateRoute><App /></PrivateRoute>,
  },
  {
    path: "/stock",
    element: <PrivateRoute><ListProducts /></PrivateRoute>,
  },
  {
    path: "/report",
    element: <PrivateRoute><SalesReport /></PrivateRoute>,
  },
  {
    path: "/management",
    element: <PrivateRoute><CatalogManager /></PrivateRoute>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)