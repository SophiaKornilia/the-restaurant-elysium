import { ChangeEvent, useEffect, useState } from "react";
import { getCustomer, updateCustomer } from "../services/api";
// import { IBooking } from "../models/IBooking";
import { Customer } from "../models/Customer";
import { Modal, Button } from "react-bootstrap";
import { CreateBooking } from "./CreateBooking";
import { CreateCustomer } from "./CreateCustomer";
import { EditCustomer } from "./EditCustomer";

export const UpdateCustomer2 = () => {
  const [inputValue, setInputValue] = useState("");
  const [customerData, setCustomerData] = useState<Customer[]>();
  const [show, setShow] = useState(false);

  const handleClick = async (inputValue: string) => {
    const customer = await getCustomer(inputValue);
    setCustomerData(customer);
    setShow(true);
  };

  useEffect(() => {
    console.log("Updated customerData:", customerData);
  }, [customerData]);

  const handleClose = () => setShow(false);


  const [updatedData, setUpdatedData] = useState<Customer>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const handleSave = async () => {
    const updatedCustomer = await updateCustomer(inputValue, updatedData);
    console.log("Updated Data:", updatedCustomer);
    handleClose();
    console.log(inputValue)
    console.log(customerData)
  };

  // const updateToNewData = (updatedData: Customer) => {
  //   setUpdatedData(updatedData);
  // };

  return (
    <>
      <div>
        <h4>Update customer or booking</h4>
        <h6>65cf4071996d2a6e0625a5d1</h6>
        <input
          type="text"
          placeholder="Customer ID"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handleClick(inputValue);
          }}
        >
          Search
        </button>
        <div>
          {customerData && (
            <div>
              <h5>Customer ID: {inputValue}</h5>
              <h5>
                Name: {customerData[0].name} {customerData[0].lastname}
              </h5>
              <h5>Email: {customerData[0].email}</h5>
              <h5>Phone: {customerData[0].phone}</h5>
            </div>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Customer information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCustomer
            customerData={customerData || []}
            handleSave={handleSave}
            inputValue={inputValue}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// 65cf4071996d2a6e0625a5d1 customerId

//   const [customerId, setCustomerId] = useState<string>("");
//   const [bookingData, setBookingData] = useState<IBooking[]>();

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCustomerId(e.target.value);
//   };

//   const handleSearch = async (customerId: string) => {
//     const specificBooking = await getBooking(customerId);
//     console.log(specificBooking);
//     setBookingData(specificBooking);
//     setCustomerId('')

//     // Användningen av bookingData är enbart för det visuella på skärmen
//   };

//   return (
//     <div>
//       <h2>Look up your booking</h2>
//       <input
//         type="text"
//         placeholder="Booking ID"
//         onChange={handleChange}
//         value={customerId}
//       />
//       <button onClick={() => handleSearch(customerId)}>Get booking</button>
//       {bookingData && (
//         <div>
//           <h4>Customer ID: {bookingData[0].customerId}</h4>
//           <h4>
//             Date and time: {bookingData[0].date}, {bookingData[0].time}
//           </h4>
//           <h4>Number of guests: {bookingData[0].numberOfGuests}</h4>
//         </div>
//       )}
//     </div>
//   );
