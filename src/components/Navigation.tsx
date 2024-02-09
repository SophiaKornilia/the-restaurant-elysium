import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <div>
          <h2 id="nav-logo">
            <NavLink to="/">Elysium</NavLink>
          </h2>
        </div>
        <div className="pagesContainer">
          <ul className="navPages">
            <li>
              <NavLink to="/">Start</NavLink>
            </li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/booking">Book a table</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
      </nav>
    </>
  );
};
