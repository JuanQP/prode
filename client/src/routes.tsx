import { Layout } from "@features/UI/Layout";
import { LoginLayout } from "@features/UI/LoginLayout";
import { AddPrediction } from "@pages/AddPrediction";
import { CompetitionDetail } from "@pages/CompetitionDetail";
import { Competitions } from "@pages/Competitions";
import { Home } from "@pages/Home";
import { LeagueDetail } from "@pages/LeagueDetail";
import { Login } from "@pages/Login";
import { PredictionDetail } from "@pages/PredictionDetail";
import { Predictions } from "@pages/Predictions";
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
      },
      {
        path: '/competitions',
        element: <Competitions />,
      },
      {
        path: '/competitions/:id',
        element: <CompetitionDetail />,
      },
      {
        path: '/leagues/:id',
        element: <LeagueDetail />,
      },
      {
        path: '/leagues/:id/predictions',
        element: <Predictions />,
      },
      {
        path: '/leagues/:id/add-prediction',
        element: <AddPrediction />,
      },
      {
        path: '/predictions/:id',
        element: <PredictionDetail />,
      },
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
