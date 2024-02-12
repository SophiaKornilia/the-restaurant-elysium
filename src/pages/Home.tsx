import { RestaurantGet } from "../components/RestaurantGet";


export const Home = () => {
  return (
    <>
    <RestaurantGet /> 
      <div className="hero-image">
        <div className="hero-text">
          <h1>E L Y S I U M</h1>
          <h5>
            At Elysium, we believe in creating a culinary journey that
            transcends borders. Our restaurant is a celebration of diverse
            flavors, bringing together the best elements from different cuisines
            to create a unique and unforgettable dining experience. From the
            vibrant streets of Asia to the rustic charm of Mediterranean
            kitchens, every dish at Elysium is a masterpiece crafted with
            passion and innovation.
          </h5>
        </div>
      </div>
      <div className="background-container">
        <div className="image-container">
          <button className="book-btn">Book a table</button>
          <button className="menu-btn">Menu</button>
        </div>
      </div>
    </>
  );
};
