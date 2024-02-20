import { ChangeEvent, FormEvent, SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IBooking } from "../models/IBooking";
import axios from "axios";
import moment from "moment-timezone";
import { Modal, Button } from "react-bootstrap";
// import { CreateBooking } from "./CreateBooking";
// import { CreateCustomer } from "./CreateCustomer";
interface ICheckAvailabilityProps {
  time: (value: string) => void;
  chosenDate: (formatedDate: string) => void;
  peopleAmount: (people: number) => void;
  setShowModal: (value: boolean) => void;
}

export const CheckAvailability = (props: ICheckAvailabilityProps) => {
  const [bookings, setBookings] = useState<IBooking[] | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);
  const [disableBtn6, setDisabledBtn6] = useState<boolean>(false);
  const [disableBtn9, setDisabledBtn9] = useState<boolean>(false);
  const [showTimeBtns, setShowTimeBtns] = useState<boolean>(false);
  const [formatedDate, setFormatedDate] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState(true); 
  const [datePickerDisabled, setDatePickerDisabled] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState("");
  console.log(time);

  //test//
  // const [canBook, setCanBook] = useState(false);

  console.log(props.time);
  console.log(formatedDate);

  const getRestaurantBookings = async () => {
    try {
      const response = await axios.get<IBooking[]>(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred while getting booking data", error);
    }
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

  useEffect(() => {
    if (selectedDate !== null) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true); 
    }
  },[selectedDate])

  const reset = () => {
    setPeople(1);
    setSelectedDate(new Date());
    setButtonDisabled(true);
    setDatePickerDisabled(false);
  }

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
    props.chosenDate(formattedSelectedDate);
    props.peopleAmount(people);

    bookings?.map((aBooking) => {
      console.log(aBooking.date, formattedSelectedDate);
    });

    // hanterar sökningen efter lediga bord
    if (formattedSelectedDate === "" || people === undefined) {
      alert("Please select a date and number of guests");
    } else {
      try {
        // hämta alla bokningar restaurangen har och filtrera fram de med samma datum
        const totalBookings = await getRestaurantBookings();
        setBookings(totalBookings);
        console.log(totalBookings);

        const result = totalBookings?.filter(
          (booking: IBooking) => booking.date === formattedSelectedDate
        );
        console.log(result);

        const tablesBooked6 = result?.filter(
          (booking: IBooking) => booking.time === "18:00"
        );
        const tablesBooked9 = result?.filter(
          (booking: IBooking) => booking.time === "21:00"
        );

        if (tablesBooked6 && tablesBooked6.length >= 15) {
          setDisabledBtn6(true);
        }

        if (tablesBooked9 && tablesBooked9.length >= 15) {
          setDisabledBtn9(true);
        }

        if (result && result.length > 30) {
          alert("Fully booked");
          setShowTimeBtns(false);
        } else {
          setShowTimeBtns(true);
          setDatePickerDisabled(true);
          setButtonDisabled(true);
          setShowModal(true);
        }
      } catch (error) {
        console.error("An error occurred while getting booking data", error);
      }
    }
    
  };

  const handleClickTimeBtn1 = () => {
    setTime("18:00");
    props.time("18:00");
    props.setShowModal(true);
    setShowModal(false);
    reset();
  };

  const handleClickTimeBtn2 = () => {
    setTime("21:00");
    props.time("21:00");
    props.setShowModal(true);
    setShowModal(false);
    reset();
  };
  console.log(time);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 28);

  // const logCopy1 = () => {
  //   console.log(formatedDate);
  //   console.log(time);
  //   console.log(people);
  // }; 

  const handleClose = () => {
    setShowModal(false);
    reset(); 
  } 

  return (
    <div id="form-container">
      {/* <button onClick={logCopy1}>Logga kopia</button> */}
      <div>
        <h1>Welcome to Elysium</h1>
        <h3>Make a reservation </h3>
      </div>
      <form>
        <label htmlFor="amountOfPeople">Choose number of guests and <br/> date for you reservation</label><br />
        <input
          id="amountOfPeople"
          type="number"
          min={1}
          max={6}
          placeholder="Press to chose number of guests"
          value={people}
          onChange={handleFormChange}
          disabled={datePickerDisabled}
        />
        <br></br>
        <DatePicker
          selected={selectedDate}
          placeholderText="Press to chose a date"
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          maxDate={maxDate}
          disabled={datePickerDisabled}
        ></DatePicker>
        <br />
        <br />
        <button onClick={handleSearchClick} disabled={buttonDisabled}>Search available tables</button>
      </form>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose a time for your reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className={!showTimeBtns ? "time-btns display" : "time-btns"}>
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
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary">Book</Button> */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  );
};
