import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IBooking } from "../models/IBooking";
import axios from "axios";
import moment from "moment-timezone";
interface ICheckAvailabilityProps {
  itWorks: (value: boolean) => void;
  chosenDate: (selectedDate: Date) => void;
  peopleAmount: (people: number) => void;
}

export const CheckAvailability = (props: ICheckAvailabilityProps) => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [counter1, setCounter1] = useState(0); // varför går det bara när vi börjar på 1? <----
  const [counter2, setCounter2] = useState(0);
  const [people, setPeople] = useState<number>(1);
  const [display, setDisplay] = useState(true);

  //test//
  // const [canBook, setCanBook] = useState(false);

  const searchBooking = async () => {
    const response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
    );

    setBookings(response.data);

    // console.log(response.data);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if (people) {
    //   setDisplay(!display);
    // }
    setPeople(parseInt(e.target.value));
    console.log(e.target.value);
  };

  const handleDateChange = (date: SetStateAction<Date | null>) => {
    setSelectedDate(date);
    searchBooking();
  };

  // Detta gör att tidzonenr är rätt
  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  //   if (date) {
  //     const timezoneOffset = date.getTimezoneOffset();
  //     const adjustedDate = new Date(date.getTime() + timezoneOffset * 60000);
  //     setSelectedDate(adjustedDate);
  //   }
  // };

  console.log("uppdaterat datum", selectedDate);

  const handleSearchClick = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handleClick");

    const timezone: string = "Europe/Stockholm";

    bookings?.map((aBooking) => {
      const formattedSelectedDate: string = moment(selectedDate)
        .tz(timezone)
        .format("YYYY-MM-DD");
      // const formattedSelectedDate = selectedDate?.toISOString().slice(0, 10); //också kolla tiderna
      console.log(aBooking.date, formattedSelectedDate);
      // const formattedSelectedDate = selectedDate?.toDateString();
      console.log("formaterad", formattedSelectedDate);

      if (
        (aBooking.date) === (formattedSelectedDate)
      ) {
        console.log(selectedDate);
        console.log("Vi måste kolla bokningar");

        // if (aBooking.time === "18:00") {
        //   console.log("bokning 18");

        //   setCounter1(counter1 + 1); // uppdateras en efter <---
        //   console.log("counter1", counter1);
        // } else if (aBooking.time === "21:00") {
        //   console.log("bokning 21");

        //   setCounter1(counter2 + 1);
        //   console.log("counter2", counter2);
        // }
      } else {
        console.log("Du kan boka");
        props.itWorks(true);
      }
    });

    setCounter1(1);
    setCounter2(1);
  };

  if (counter1 >= 15 && counter2 >= 15) {
    alert("Its fully booked, try another day!");
  }

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 28);

  return (
    <div>
      <form id="form-container">
        <input
          type="number"
          min={1}
          max={6}
          placeholder="People"
          value={people}
          onChange={handleFormChange}
        />
        <br></br>
        <DatePicker
          selected={selectedDate}
          placeholderText="Find available tables"
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          maxDate={maxDate}
        ></DatePicker>
        <br></br>
        <button onClick={handleSearchClick}>Search available tables</button>
      </form>
    </div>
  );
};
