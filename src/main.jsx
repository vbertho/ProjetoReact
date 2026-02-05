import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DailySalesReport from './pages/DailySalesReport.jsx';
import ListProducts from './pages/ListProducts.jsx';

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
    element: <DailySalesReport />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

