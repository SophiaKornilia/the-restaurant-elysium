import axios from "axios";
import { setHours, setMinutes } from "date-fns";
import { ChangeEvent, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BookingGet } from "../components/BookingGet";
import { IBooking } from "../models/IBooking";

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);

  const [booking, setBooking] = useState<IBooking[]>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
  };

  const searchBooking = async () => {
    const response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
    );

    setBooking(response.data);
    console.log("booking", response.data)
    console.log();
    
    
    const handleClick = () => {booking?.map((booking) => {
     <p key={booking.id}>{booking.date}</p>
    } )};
    
    
    // else {
    //   alert("Fully booked, change date");
    // }
    // })
    
  };
  
  if (!booking) {
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
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              showTimeSelect
              includeTimes={[
                setHours(setMinutes(new Date(), 0), 18),
                setHours(setMinutes(new Date(), 0), 21),
              ]}
            ></DatePicker>
            <button onClick={() => {}}>Search available tables</button>
            <br></br>
            <p>Click here to cancel a booking</p>
          </form>
        </div>
      </div>
    </div>
  );
};
