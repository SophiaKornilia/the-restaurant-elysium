import { ChangeEvent, useState } from "react";
import { getBooking } from "../services/api";
import { IBooking } from "../models/IBooking";

export const SearchBooking = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [bookingData, setBookingData] = useState<IBooking[]>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomerId(e.target.value);
  };

  const handleSearch = async (customerId: string) => {
    const specificBooking = await getBooking(customerId);
    console.log(specificBooking);
    setBookingData(specificBooking); 
    setCustomerId('')
  };

  return (
    <div>
      <h2>Look up your booking</h2>
      <input
        type="text"
        placeholder="Booking ID"
        onChange={handleChange}
        value={customerId}
      />
      <button onClick={() => handleSearch(customerId)}>Get booking</button>
      {bookingData && (
        <div>
          <h4>Customer ID: {bookingData[0].customerId}</h4>
          <h4>
            Date and time: {bookingData[0].date}, {bookingData[0].time}
          </h4>
          <h4>Number of guests: {bookingData[0].numberOfGuests}</h4>
        </div>
      )}
    </div>
  );
};
