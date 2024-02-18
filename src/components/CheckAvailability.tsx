import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IBooking } from "../models/IBooking";
import axios from "axios";
import moment from "moment-timezone";
interface ICheckAvailabilityProps {
  time: (value: string) => void;
  chosenDate: (formatedDate: string) => void;
  peopleAmount: (people: number) => void;
  setShowModal: (value: boolean) => void;
}

export const CheckAvailability = (props: ICheckAvailabilityProps) => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);
  const [disableBtn6, setDisabledBtn6] = useState<boolean>(false);
  const [disableBtn9, setDisabledBtn9] = useState<boolean>(false);
  const [showTimeBtns, setShowTimeBtns] = useState<boolean>(false);
  const [formatedDate, setFormatedDate] = useState<string>(""); 
  const [time, setTime] = useState("");
  console.log(time);

  //test//
  // const [canBook, setCanBook] = useState(false);

  console.log(props.time);
  console.log(formatedDate);
  

  const getRestaurantBookings = async () => {
    const response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
    );

    return response.data;

    // console.log(response.data);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
    console.log(e.target.value);
  };

  const handleDateChange = (date: SetStateAction<Date | null>) => {
    setSelectedDate(date);
    setDisabledBtn6(false);
    setDisabledBtn9(false);
  };

  console.log("uppdaterat datum", selectedDate);

  const handleSearchClick = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handleClick");

    const timezone: string = "Europe/Stockholm";
    const formattedSelectedDate: string = moment(selectedDate)
      .tz(timezone)
      .format("YYYY-MM-DD");

      console.log("formaterat datum", formattedSelectedDate);
      setFormatedDate(formattedSelectedDate); 

    bookings?.map((aBooking) => {
      console.log(aBooking.date, formattedSelectedDate);
    });
    

    // hanterar sökningen efter lediga bord
    if (formattedSelectedDate === "" || people === undefined) {
      alert("Please select a date and number of guests");
    } else {
      // hämta alla bokningar restaurangen har och filtrera fram de med samma datum
      const totalBookings = await getRestaurantBookings();
      setBookings(totalBookings);
      console.log(totalBookings);

      const result = totalBookings.filter(
        (booking: IBooking) => booking.date === formattedSelectedDate
      );
      console.log(result);

      const tablesBooked6 = result.filter(
        (booking: IBooking) => booking.time === "18:00"
      );
      const tablesBooked9 = result.filter(
        (booking: IBooking) => booking.time === "21:00"
      );

      if (tablesBooked6.length >= 15) {
        setDisabledBtn6(true);
      }

      if (tablesBooked9.length >= 15) {
        setDisabledBtn9(true);
      }

      if (result.length > 30) {
        alert("Fully booked");
        setShowTimeBtns(false);
      } else {
        setShowTimeBtns(true);
      }
    }
  };

  const handleClickTimeBtn1 = () => {
    setTime("18:00");
    props.time("18:00");
    props.setShowModal(true);
  };

  const handleClickTimeBtn2 = () => {
    setTime("21:00");
    props.time("21:00");
    props.setShowModal(true);
  };
  console.log(time);

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
      <div className={!showTimeBtns ? "time-btns display" : "time-btns"}>
        <h4>Pick a time</h4>
        <button
          disabled={disableBtn6}
          className="time-btn"
          onClick={handleClickTimeBtn1}
        >
          18:00
        </button>
        <button
          disabled={disableBtn9}
          className="time-btn"
          onClick={handleClickTimeBtn2}
        >
          21:00
        </button>
      </div>
    </div>
  );
};
