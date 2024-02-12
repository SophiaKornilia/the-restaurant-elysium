import axios from "axios";
import { setHours, setMinutes } from "date-fns";
import { ChangeEvent, MouseEvent, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);

  console.log(people, selectedDate);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
  };

  const handleSearch = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault;
    // Här ska det visas vilka bord som inte är upptagna (!bookings) Man kanske kan göra CONTEXT av lediga bord?
    const availableTables = axios.get();
    console.log(availableTables);
  };

  return (
    <div>
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
            <button onClick={() => handleSearch}>
              Search available tables
            </button>
            <br></br>
            <p>Click here to cancel a booking</p>
          </form>
        </div>
      </div>
    </div>
  );
};
