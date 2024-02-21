import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="hero-image">
        <div className="hero-text">
          <h1>E L Y S I U M</h1>
          <h6>
            New flavours in the heart of Gothenburg.
            <br />
            Reserve a table and enjoy the experience.
          </h6>
        </div>
      </div>
      <div className="background-container">
        <div className="image-container">
          <div className="btn-container">
            <Link to="/booking">
              <button className="book-btn">Book a table</button>
            </Link>
            <Link to="/menu">
              <button className="menu-btn"> Menu</button>
            </Link>
          </div>
          <div className="text-container">
            <h6>
              At Elysium, we believe in creating a culinary journey that
              transcends borders. Our restaurant is a celebration of diverse
              flavors, bringing together the best elements from different
              cuisines to create a unique and unforgettable dining experience.
              <br />
              <br />From the vibrant streets of Asia to the rustic charm of
              Mediterranean kitchens, every dish at Elysium is a masterpiece
              crafted with passion and innovation.
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};
