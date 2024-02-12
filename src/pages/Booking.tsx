import axios from "axios";
import { ChangeEvent, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IBooking } from "../models/IBooking";

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);

  const [bookings, setBookings] = useState<IBooking[]>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
  };

  const searchBooking = async () => {
    const response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
    );

    setBookings(response.data);
  };

  const handleClick = () => {
   
    bookings?.map((aBooking) => {
      console.log(aBooking.date);
      const formattedSelectedDate = selectedDate?.toISOString().slice(0, 10);
      if (JSON.stringify(aBooking.date) === JSON.stringify(formattedSelectedDate)) {
        console.log("Det fungerar");
      } else {
        console.log("Nope de fungerar inte");
        
      }
    });
    return <div></div>;
  };

  if (!bookings) {
    searchBooking();
  }

  return (
    <div>
      {/* <BookingGet booking={} /> */}
      <div id="container">
        <div id="text-container">
          <h2>Book</h2>
          <p>your experience</p>
        </div>
        <div>
          <form id="form-container">
            <input
              type="number"
              min={1}
              max={6}
              placeholder="People"
              value={people}
              onChange={handleChange}
            />
            <br></br>
            <DatePicker
              selected={selectedDate}
              placeholderText="Find available tables"
              onChange={(date: SetStateAction<Date | null>) =>
                setSelectedDate(date)
              }
              dateFormat="yyyy-MM-DD"
              minDate={new Date()}
              // showTimeSelect
              // includeTimes={[
              //   setHours(setMinutes(new Date(), 0), 18),
              //   setHours(setMinutes(new Date(), 0), 21),
              // ]}
            ></DatePicker>
            <br></br>
            <p>Click here to cancel a booking</p>
          </form>
          <button onClick={handleClick}>Search available tables</button>
        </div>
      </div>
    </div>
  );
};
