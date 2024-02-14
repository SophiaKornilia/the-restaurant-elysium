import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CreateCustomer } from "./CreateCustomer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IBooking } from "../models/IBooking";
import axios from "axios";
interface ICheckAvailabilityProps {
    itWorks: (value: boolean) => void; 
  }

export const CheckAvailability = (props: ICheckAvailabilityProps) => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [counter1, setCounter1] = useState(1); // varför går det bara när vi börjar på 1? <----
  const [counter2, setCounter2] = useState(1);
  const [people, setPeople] = useState<number>(1);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(true);

  //test//
  // const [canBook, setCanBook] = useState(false); 
    

  
  let [selectedTime, setSelectedTime] = useState("");

  const handleClose = () => setShow(false);

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

      if (counter1 >= 6 && counter2 >= 6) {
        alert("Its fully booked, try another day!");
      }
    });

    setCounter1(1);
    setCounter2(1);
  };

  const handleClickTimeBtn1 = () => {
    setShow(true);
    selectedTime = "18:00";
    console.log(selectedTime);
  };

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
  );
};
