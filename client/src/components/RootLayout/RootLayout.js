import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import ScrollToTop from "../ScrollToTop";

export default function RootLayout() {
  return (
    <Fragment>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
