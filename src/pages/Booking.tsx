import { useState } from "react";
import { CheckAvailability } from "../components/CheckAvailability";
import { Customer } from "../models/Customer";
import axios from "axios";
import { CreateBooking } from "../components/CreateBooking";
import { CreateCustomer } from "../components/CreateCustomer";
import { Modal, Button } from "react-bootstrap";

export const Booking = () => {
  const [itWorks, setItWorks] = useState(false);
  console.log(itWorks);

  // const [customerCopy, setCustomerCopy] = useState<Customer>();

  const [bookingCustomer, setBookingCustomer] = useState<Customer | null>(null);

  const handleCustomerCreated = (customer: Customer) => {
    setBookingCustomer(customer);
  };

  const handleClickTimeBtn1 = () => {
    setShow(true);
    setSelectedTime("18:00");
    console.log(selectedTime);
  };

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  let [selectedTime, setSelectedTime] = useState("");

  // Säkerställa kopia
  const logCopy = () => {
    console.log(bookingCustomer)
  }

  return (
    <div>
      <CheckAvailability itWorks={setItWorks} />
      <div>
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
          <CreateCustomer onCustomerCreated={handleCustomerCreated} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Book</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <button onClick={logCopy}>Logga kopia</button>
    </div>
  );
};

//   MouseEvent,

//   useState,
// } from "react";

// import "react-datepicker/dist/react-datepicker.css";

// import { Customer } from "../models/Customer";

// export const Booking = () => {
//   const [customer, setCustomer] = useState<Customer>();

//   // const searchBooking = async () => {
//   //   const response = await axios.get<IBooking[]>(
//   //     "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6"
//   //   );

//   //   setBookings(response.data);
//   // };

//   /**
//    * Användare väljer datum och antal gäster.
//    * då körs en get på booking
//    * bookingstate mappas igenom och letar efter samma datum och tiderna.
//    * varje gång den hittar en 18 tid sätts en counder till +1 samma med 21 mwen annan counter
//    * när den mappat alla tider checkar coundern av om den är < eller > än 6.
//    * Är den mindre visas två knappar som aktiva annars inaktiva och en alter med fullbokat syns.
//    */

//   /*
//     skapa en bokning
//     utifrån bokningen ta dess värde och skapa kunden.
//     När man trycker på "create" så skapas först en bokning och sedan en kund i samma handleClick
//     kunden ser sedan att boknigen är slutförd och dess id för att kunna avboka och ändra.

//   **/

//     // useEffect(() => {
//     //   setCustomer(new Customer(firstName, lastName, email, phone));
//     // }, [firstName, lastName, email, phone]);

//   //   const handleCreateCustomer = async () => {
//   //     const response = await axios.post(
//   //       "https://school-restaurant-api.azurewebsites.net/customer/create", customer
//   //     );
//   //     console.log(response.data);

//   //     setFirstName("");
//   //     setLastName("");
//   //     setEmail("");
//   //     setPhone("");
//   //   };

//   //   return <></>;
//   };

//   const CreateBooking = async () => {
//     var bookingData = {
//       restaurantId: "623b85d54396b96c57bde7c3",
//       date: selectedDate,
//       time: selectedTime,
//       numberOfGuests: people,
//     };

//     const response = await axios.post(
//       "https://school-restaurant-api.azurewebsites.net/booking/create",
//       bookingData
//     );
//     console.log(response.data);

//     return <></>;
//   };

//   function handleCreateCustomer(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div>
//       {/* <BookingGet booking={} /> */}
//       <div id="container">
//         <div id="text-container">
//           <h2>Book</h2>
//           <p>your experience</p>
//         </div>

//       </div>
//     </div>
//   );
// };
