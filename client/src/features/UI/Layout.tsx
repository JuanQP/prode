import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#20c997" />
      </Helmet>
      <Navbar />
      <Outlet />
    </>
  )
}
