import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IBooking } from "../models/IBooking";
import axios from "axios";
interface ICheckAvailabilityProps {
    itWorks: (value: boolean) => void; 
    chosenDate : (selectedDate : Date) => void
    peopleAmount : (people : number) => void
  }

export const CheckAvailability = (props: ICheckAvailabilityProps) => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); //flytta till booking
  const [counter1, setCounter1] = useState(0); // varför går det bara när vi börjar på 1? <----
  const [counter2, setCounter2] = useState(0);
  const [people, setPeople] = useState<number>(1);
  const [display, setDisplay] = useState(true);
 

  //test//
  // const [canBook, setCanBook] = useState(false); 
    

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (people) {
      setDisplay(!display);
    }
    setPeople(parseInt(e.target.value));
    console.log(e.target.value);
  };

    const searchBooking = async () => {
    const response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
    );

    setBookings(response.data);
    console.log(response.data);
    
  };

  const handleClick = (e: FormEvent) => {
    searchBooking();

    e.preventDefault();
    console.log("handleClick");
    
    bookings?.map((aBooking) => {

      console.log("datumet du valde var", aBooking.date);
      const formattedSelectedDate = selectedDate?.toISOString().slice(0, 10); //också kolla tiderna
      if (
        JSON.stringify(aBooking.date) === JSON.stringify(formattedSelectedDate)
      ) {
        console.log("Vi måste kolla bokningar");
        if (aBooking.time === "18:00") {
          setCounter1(counter1 + 1); // uppdateras en efter <---
          console.log("counter1", counter1);
        } else if (aBooking.time === "21:00") {
          setCounter1(counter2 + 1);
          console.log("counter2", counter2);
        }
      } else {
        console.log("Du kan boka"); 
        props.itWorks(true)
        console.log();
        
      }

    });
    
    setCounter1(1);
    setCounter2(1);
  };

  if (counter1 >= 15 && counter2 >= 15) {
    alert("Its fully booked, try another day!");
  }

  return (
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
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        ></DatePicker>
        <br></br>
        <button onClick={handleClick}>Search available tables</button>
      </form>
    </div>
  );
};
