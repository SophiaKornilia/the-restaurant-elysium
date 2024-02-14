import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IBooking } from "../models/IBooking";
import { Button, Modal } from "react-bootstrap";
import { CreateCustomer } from "../components/CreateCustomer";
import { Customer } from "../models/Customer";

export const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);
  let [selectedTime, setSelSelectedTime] = useState("");

  const [bookings, setBookings] = useState<IBooking[]>();
  const [counter1, setCounter1] = useState(1); // varför går det bara när vi börjar på 1? <----
  const [counter2, setCounter2] = useState(1);

  const [display, setDisplay] = useState(true);

  const [customer, setCustomer] = useState<Customer>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(parseInt(e.target.value));
  };

  const searchBooking = async () => {
    const response = await axios.get<IBooking[]>(
      "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
    );

    setBookings(response.data);
  };

  /**
   * Användare väljer datum och antal gäster.
   * då körs en get på booking
   * bookingstate mappas igenom och letar efter samma datum och tiderna.
   * varje gång den hittar en 18 tid sätts en counder till +1 samma med 21 mwen annan counter
   * när den mappat alla tider checkar coundern av om den är < eller > än 6.
   * Är den mindre visas två knappar som aktiva annars inaktiva och en alter med fullbokat syns.
   */

  /*
    skapa en bokning
    utifrån bokningen ta dess värde och skapa kunden.
    När man trycker på "create" så skapas först en bokning och sedan en kund i samma handleClick
    kunden ser sedan att boknigen är slutförd och dess id för att kunna avboka och ändra. 
  
  **/

  const handleClick = (e: FormEvent) => {
    e.preventDefault();

    bookings?.map((aBooking) => {
      console.log(aBooking.date);
      const formattedSelectedDate = selectedDate?.toISOString().slice(0, 10); //också kolla tiderna
      if (
        JSON.stringify(aBooking.date) === JSON.stringify(formattedSelectedDate)
      ) {
        if (aBooking.time === "18:00") {
          setCounter1(counter1 + 1); // uppdateras en efter <---
          console.log(counter1);
        } else if (aBooking.time === "21:00") {
          setCounter1(counter1 + 1);
          console.log(counter2);
        }
      } else if (counter1 >= 6 && counter2 >= 6) {
        alert("Its fully booked, try another day!");
      }
    });

    if (people) {
      setDisplay(!display);
    }

    setCounter1(1);
    setCounter2(1);
    return <div></div>;
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleClickTimeBtn1 = () => {
    setShow(true);
    selectedTime = "18:00";
    console.log(selectedTime);

    // useEffect(() => {
    //   setCustomer(new Customer(firstName, lastName, email, phone));
    // }, [firstName, lastName, email, phone]);

  //   const handleCreateCustomer = async () => {
  //     const response = await axios.post(
  //       "https://school-restaurant-api.azurewebsites.net/customer/create", customer
  //     );
  //     console.log(response.data);

  //     setFirstName("");
  //     setLastName("");
  //     setEmail("");
  //     setPhone("");
  //   };

  //   return <></>;
  };

  const CreateBooking = async () => {
    var bookingData = {
      restaurantId: "623b85d54396b96c57bde7c3",
      date: selectedDate,
      time: selectedTime,
      numberOfGuests: people,
    };

    const response = await axios.post(
      "https://school-restaurant-api.azurewebsites.net/booking/create",
      bookingData
    );
    console.log(response.data);

    return <></>;
  };

  function handleCreateCustomer(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
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
          <form id="form-container" onSubmit={handleClick}>
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
            <p>Click here to cancel a booking</p>
            <button type="submit">Search available tables</button>
          </form>
          <div className={display ? "display" : ""}>
            <div className="times">
              <h4>Pick a time</h4>
              <button className="time-btn" onClick={handleClickTimeBtn1}>
                18:00
              </button>
              <button className="time-btn">21:00</button>
            </div>
          </div>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Personal information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateCustomer />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">
                Book
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

