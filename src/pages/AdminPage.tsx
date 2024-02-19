import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AllBookings } from "../contexts/BookingContexts";
import { IBooking } from "../models/IBooking";
import { Customer } from "../models/Customer";
import { getCustomer, updateBooking, updateCustomer } from "../services/api";
import { BookingClass } from "../models/BookingClass";
import axios from "axios";

export const AdminPage = () => {
  const totalBookings = useContext(AllBookings);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [customerInfo, setCustomerInfo] = useState<Customer[]>([]);

  const [newName, setNewName] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [newDate, setNewDate] = useState<string | null>(selectedDate);
  const [newTime, setNewTime] = useState<string | null>(selectedTime);
  const [newAmountOfGuests, setNewAmountOfGuests] = useState<number>();

  const [values, setValues] = useState<Customer>({
    name: newName || (customerInfo.length > 0 ? customerInfo[0].name : ""),
    lastname:
      newLastname || (customerInfo.length > 0 ? customerInfo[0].lastname : ""),
    email: newEmail || (customerInfo.length > 0 ? customerInfo[0].email : ""),
    phone: newPhone || (customerInfo.length > 0 ? customerInfo[0].phone : ""),
  });

  const [newBookingInfo, setNewBookingInfo] = useState<BookingClass>();

  useEffect(() => {
    if (selectedBooking) {
      setNewBookingInfo({
        id: selectedBooking._id,
        restaurantId: "65c9d9502f64dba9babc81d6",
        date: newDate || selectedBooking.date,
        time: newTime || selectedBooking.time,
        numberOfGuests: newAmountOfGuests || selectedBooking?.numberOfGuests,
        // customerId: selectedBooking.customerId,
        customer: values,
      });
    }
  }, [newDate, newTime, newAmountOfGuests]);

  useEffect(() => {
    const newValues = {
      name: newName || (customerInfo.length > 0 ? customerInfo[0].name : ""),
      lastname:
        newLastname ||
        (customerInfo.length > 0 ? customerInfo[0].lastname : ""),
      email: newEmail || (customerInfo.length > 0 ? customerInfo[0].email : ""),
      phone: newPhone || (customerInfo.length > 0 ? customerInfo[0].phone : ""),
    };
    setValues(newValues);
  }, [newName, newLastname, newEmail, newPhone, customerInfo]);

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTime(null); // När datum ändras ställs tiden om
  };

  const handleFilter18 = () => {
    setSelectedTime("18:00");
  };

  const handleFilter21 = () => {
    setSelectedTime("21:00");
  };

  const filteredBookings = totalBookings.filter((booking) => {
    if (selectedDate && selectedTime) {
      return booking.date === selectedDate && booking.time === selectedTime;
    } else if (selectedDate) {
      return booking.date === selectedDate;
    } else {
      return true; // visa alla bokningar om det inte finns ett valt datum
    }
  });

  const handleEdit = async (booking: IBooking) => {
    setShowEditForm(true);
    setSelectedBooking(booking);
    console.log("Selected booking:", booking);
    if (booking?.customerId) {
      const customerInfo = await getCustomer(booking.customerId);
      setCustomerInfo(customerInfo);
    }
  };


  const handleSave = async () => {
    console.log("New booking info to send:", newBookingInfo);
    console.log("New customer info to send:", values);

    // switch?
if (values && newBookingInfo) {
      const updateCustomerResponse = await axios.put(
        "https://school-restaurant-api.azurewebsites.net/customer/update/" + selectedBooking?.customerId,
        values
      );
      console.log(updateCustomerResponse);

      const updateBookingResponse = await axios.put(
        "https://school-restaurant-api.azurewebsites.net/booking/update/" +
          newBookingInfo.id,
        newBookingInfo
      );
      console.log(updateBookingResponse);
    }

    // if (selectedBooking && values) {
    //   try {
    //     const updateCustomerResponse = await axios.put(
    //       "https://school-restaurant-api.azurewebsites.net/customer/update/" +
    //         customerID,
    //       values
    //     );

    //     console.log(
    //       "Customer info has been updated:",
    //       updateCustomerResponse.data
    //     );
    //   } catch (error) {
    //     console.error("Error updating customer");
    //   }
    // }

    // if (selectedBooking && newBookingInfo) {
    //   const updateBookingResponse = await updateBooking(
    //     newBookingInfo.id,
    //     newBookingInfo
    //   );
    //   console.log("Booking info has been updated:", updateBookingResponse);
    //   console.log(selectedBooking)
    // }
  };

  const handleUpdateCustomer = async () => {
    if (selectedBooking && values) {
      try {
        const updateCustomerResponse = await axios.put(
          "https://school-restaurant-api.azurewebsites.net/customer/update/" +
            customerID,
          values
        );

        console.log(
          "Customer info has been updated:",
          updateCustomerResponse.data
        );
      } catch (error) {
        console.error("Error updating customer");
      }
    }
  };

  const updateBookingResponse = async () => {
    console.log('new:', newBookingInfo)
    if (selectedBooking && newBookingInfo) {
      const updateBookingResponse = await updateBooking(
        newBookingInfo.id,
        newBookingInfo
      );
      console.log("Booking info has been updated:", updateBookingResponse);
      console.log(selectedBooking)
    }
  };

  const handleClose = () => {
    setShowEditForm(false);
  };

  return (
    <>
      <header>
        <button>Reservations</button>
        <button>Create reservation</button>
      </header>
      <div className="main">
        <div className="calendar-container">
          <input type="date" onChange={handleDate} />
          <button onClick={handleFilter18}>18:00</button>
          <button onClick={handleFilter21}>21:00</button>
        </div>
        <div className="booking-list">
          <ul>
            {filteredBookings.map((booking) => (
              <li key={booking._id} className="booking-unit">
                {booking.time}, {booking.date}, {booking.customerId}
                <div className="btn-container">
                  <button onClick={() => handleEdit(booking)}>Edit</button>
                  <button>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {showEditForm && (
          <div className="edit-container">
            <div className="edit-form">
              <h3>Booking information</h3>
              <div className="booking-info">
                <div className="booking-info-unit">
                  <h4>Date:</h4>
                  <input
                    type="date"
                    // value={newDate || ""}
                    value={newDate || selectedBooking?.date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNewDate(e.target.value);
                    }}
                  />
                </div>
                <div className="booking-info-unit">
                  <h4>Time:</h4>
                  <div className="forn-btn-container">
                    <input
                      type="time"
                      value={newTime || selectedBooking?.time}
                      min="18:00"
                      max="21:00"
                      step="18000"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setNewTime(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="booking-info-unit">
                  <h4>Guests:</h4>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newAmountOfGuests || selectedBooking?.numberOfGuests}
                    // value={newAmountOfGuests || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNewAmountOfGuests(parseInt(e.target.value));
                    }}
                  />
                </div>
                <p>Booking ID: {selectedBooking?._id} </p>
                <p>Customer ID: {selectedBooking?.customerId} </p>
              </div>
              <div className="customer-info">
                <div className="info-unit">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={values.name || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNewName(e.target.value);
                    }}
                  />
                </div>
                <div className="info-unit">
                  <label>Lastname:</label>
                  <input
                    type="text"
                    name="lastname"
                    defaultValue={values.lastname || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNewLastname(e.target.value);
                    }}
                  />
                </div>
                <div className="info-unit">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={values.email || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNewEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="info-unit">
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={values.phone || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNewPhone(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="btn-unit">
                <button onClick={handleUpdateCustomer}>
                    Update customer
                  </button>
                  <button onClick={updateBookingResponse}>
                    Update booking
                  </button>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {" "}
        {/* La de komponenterna ni gjorde här! :) */}
        <h1>Adminpage</h1>
        {/* <DeleteBooking /> */}
        <br />
        {/* <UpdateCustomer2 /> */}
      </div>
    </>
  );
};
