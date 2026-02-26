import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SalesReport from './pages/SalesReport.jsx';
import ListProducts from './pages/ListProducts.jsx';
import CatalogManager from './pages/CatalogManager.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/stock",
    element: <ListProducts />,
  },
  {
    path: "/report",
    element: <SalesReport />,
  },
  {
    path: "/management",
    element: <CatalogManager />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

