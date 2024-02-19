import { useState } from "react";
import { CheckAvailability } from "../components/CheckAvailability";
import { Customer } from "../models/Customer";
import { CreateCustomer } from "../components/CreateCustomer";
import { Modal, Button } from "react-bootstrap";
import { CreateBooking } from "../components/CreateBooking";

export const Booking = () => {
  const [bookingCustomer, setBookingCustomer] = useState<Customer>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [selectedDateCopy, setSelectedDateCopy] = useState<string>("");
  const [peopleCopy, setPeopleCopy] = useState<number>(1);
  const [timeCopy, setTimeCopy] = useState("");
  const [show, setShow] = useState(false);

  const handleCustomerCreated = (customer: Customer) => {
    if (!customer) {
      console.log("No customer information available");
    } else {
      setBookingCustomer(customer);
    }
  };

  const handleSelectedDateCopy = (formatedDate: string) => {
    setSelectedDateCopy(formatedDate); // det är fortfarande en tom sträng
  };

  const handlePeopleCopy = (people: number) => {
    setPeopleCopy(people);
  };

  const handleTimeCopy = (time: string) => {
    setTimeCopy(time);
  };

  const handleShowModal = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Säkerställa kopia
  const logCopy = () => {
    console.log(bookingCustomer);
    console.log(selectedDateCopy);
    console.log(peopleCopy);
    console.log(timeCopy);
  };

  return (
    <div id="container">
      <CheckAvailability
        time={handleTimeCopy}
        chosenDate={handleSelectedDateCopy}
        peopleAmount={handlePeopleCopy}
        setShowModal={handleShowModal}
      />
      <div></div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Personal information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCustomer onCustomerCreated={handleCustomerCreated} />
          <CreateBooking
            chosenTime={timeCopy}
            chosenDate={selectedDateCopy}
            peopleAmount={peopleCopy}
            customer={bookingCustomer}
          />
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
