import { Layout } from "@features/UI/Layout";
import { LoginLayout } from "@features/UI/LoginLayout";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Register } from "@pages/Register";
import { RegisterOk } from "@pages/RegisterOk";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  // App Layout routes
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      }
    ]
  },
  // Login Layout routes
  {
    element: <LoginLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/register-ok',
        element: <RegisterOk />,
      },
    ]
  }
])
