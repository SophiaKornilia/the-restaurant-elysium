import axios from "axios";

export const BookingGet = () => {
  const searchBooking = async () => {
    const response = await axios.get(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
    );

    console.log(response);
  };
  searchBooking();

  return <></>;
};
