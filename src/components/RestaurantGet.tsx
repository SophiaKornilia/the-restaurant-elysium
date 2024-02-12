import axios from "axios";

export const RestaurantGet = () => {
  const searchRestaurant = async () => {
    const response = await axios.get(
      "https://school-restaurant-api.azurewebsites.net/restaurant/65c9d9502f64dba9babc81d6"
    );

    console.log(response);
  };
  searchRestaurant();

  return <></>;
};
