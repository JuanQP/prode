import { Layout } from "@features/UI/Layout";
import { LoginLayout } from "@features/UI/LoginLayout";
import { AddPrediction } from "@pages/AddPrediction";
import { CompetitionDetail } from "@pages/CompetitionDetail";
import { Competitions } from "@pages/Competitions";
import { CreateLeague } from "@pages/CreateLeague";
import { Home } from "@pages/Home";
import { LeagueDetail } from "@pages/LeagueDetail";
import { Leagues } from "@pages/Leagues";
import { Login } from "@pages/Login";
import { MyLeagueDetail } from "@pages/MyLeagueDetail";
import { MyLeagues } from "@pages/MyLeagues";
import { MyParticipations } from "@pages/MyParticipations";
import { PredictionDetail } from "@pages/PredictionDetail";
import { Predictions } from "@pages/Predictions";
import { Register } from "@pages/Register";
import { RegisterOk } from "@pages/RegisterOk";
import { UpdateLeague } from "@pages/UpdateLeague";
import { RequireAuth } from "react-auth-kit";
import { createBrowserRouter, Outlet } from "react-router-dom";

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
        path: '/leagues',
        element: <Leagues />,
      },
      {
        path: '/leagues/:id',
        element: <LeagueDetail />,
      },
      // Login required routes
      {
        element: (
          <RequireAuth loginPath="/login">
            <Outlet />
          </RequireAuth>
        ),
        children: [
          {
            path: '/leagues/:id/predictions',
            element: <Predictions />,
          },
          {
            path: '/leagues/:id/add-prediction',
            element: <AddPrediction />,
          },
          {
            path: '/leagues/create',
            element: <CreateLeague />,
          },
          {
            path: '/predictions/:id',
            element: <PredictionDetail />,
          },
          {
            path: '/my-participations',
            element: <MyParticipations />,
          },
          {
            path: '/my-leagues',
            element: <MyLeagues />,
          },
          {
            path: '/my-leagues/:id',
            element: <MyLeagueDetail />,
          },
          {
            path: '/leagues/update/:id',
            element: <UpdateLeague />,
          },
        ]
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
