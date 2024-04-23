import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Register } from './pages/Register';
import { Error } from './pages/Error';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';
import axios from 'axios';
import { Chat } from './pages/Chat';

axios.defaults.baseURL = 'https://api-chat.assp.my.id';
const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: "/chat",
    element: <Chat />,
    errorElement: <Error />
  },
  {
    path: '/',
    element: <Navigate to='/login' />,
    errorElement: <Error />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
  // </React.StrictMode>,
)
