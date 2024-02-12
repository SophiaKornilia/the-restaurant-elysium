import axios from "axios";
import { IBooking } from "../models/Ibooking";

export const RestaurantGet = () => {
  const searchRestaurant = async () => {
    const response = await axios.get<IBooking>(
      "https://school-restaurant-api.azurewebsites.net/restaurant/65c9d9502f64dba9babc81d6"
    );

    console.log(response.data);
  };
  searchRestaurant();

  return <></>;
};
