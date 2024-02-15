import React, { useState } from "react";
import { getRestaurantBookings } from "../services/api";
import { IBooking } from "../models/IBooking";

export const GetBookings = () => {

  const [bookings, setBookings] = useState<IBooking[] | null>();

  const handleClick = async () => {
    const allBookings = await getRestaurantBookings();
    setBookings(allBookings);
    console.log(allBookings);
  };

  return (
    <div>
      <h2>See the restaurant's bookings</h2>
      <button onClick={handleClick}>Get bookings</button>
    </div>
  );
};

