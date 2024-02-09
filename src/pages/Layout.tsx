import { Outlet } from "react-router-dom";

import "../styles/main.scss";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
