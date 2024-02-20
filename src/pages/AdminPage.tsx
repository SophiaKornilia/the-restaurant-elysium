import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AllBookings } from "../contexts/BookingContexts";
import { IBooking } from "../models/IBooking";
import { Customer } from "../models/Customer";
import { deleteBooking, getBooking, getCustomer } from "../services/api";
import { BookingClass } from "../models/BookingClass";
import axios from "axios";
import { DeleteBooking } from "../components/DeleteBooking";
import { NewCustomer } from "../models/NewCustomer";

export const AdminPage = () => {
  const totalBookings = useContext(AllBookings);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showCustomerEdit, setShowCustomerEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showCreateBooking, setShowCreateBooking] = useState<boolean>(false)

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [customerInfo, setCustomerInfo] = useState<Customer[]>();

  const [newName, setNewName] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [newDate, setNewDate] = useState<string | null>(selectedDate);
  const [newTime, setNewTime] = useState<string | null>(selectedTime);
  const [newAmountOfGuests, setNewAmountOfGuests] = useState<number>();

  const [bookingToDelete, setBookingToDelete] = useState<IBooking>();
  const [customerToDelete, setCustomerToDelete] = useState<NewCustomer>();

  const [customerValuesToSend, setcustomerValuesToSend] = useState<Customer>({
    id: selectedBooking?.customerId!,
    name: newName,
    lastname: newLastname,
    email: newEmail,
    phone: newPhone,
  });

  const [newBookingInfo, setNewBookingInfo] = useState<BookingClass>({
    id: selectedBooking?._id!,
    restaurantId: selectedBooking?.restaurantId!,
    date: newDate!,
    time: newTime!,
    numberOfGuests: newAmountOfGuests!,
    customerId: selectedBooking?.customerId!,
    customer: customerValuesToSend,
  });

  useEffect(() => {
    if (selectedBooking) {
      const newBookingValues = {
        id: selectedBooking._id ?? "",
        restaurantId: selectedBooking.restaurantId ?? "",
        date: newDate ?? selectedBooking?.date,
        time: newTime ?? selectedBooking?.time,
        numberOfGuests: newAmountOfGuests ?? selectedBooking?.numberOfGuests,
        customerId: selectedBooking.customerId!,
        customer: customerValuesToSend,
      };
      setNewBookingInfo(newBookingValues);
    }
    const newValues = {
      id: selectedBooking?.customerId!,
      name: newName || (customerInfo ? customerInfo[0].name : ""),
      lastname: newLastname || (customerInfo ? customerInfo[0].lastname : ""),
      email: newEmail || (customerInfo ? customerInfo[0].email : ""),
      phone: newPhone || (customerInfo ? customerInfo[0].phone : ""),
    };
    setcustomerValuesToSend(newValues);
  }, [
    newDate,
    newTime,
    newAmountOfGuests,
    newName,
    newLastname,
    newEmail,
    newPhone,
    customerInfo,
  ]);

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
      console.log("booking customer:", customerInfo);
    }
  };

  // const checkValues = () => {
  //   console.log("Personal info:", customerValuesToSend);
  //   console.log("Booking info:", newBookingInfo);
  //   console.log(customerValuesToSend.id);
  // };

  const handleBookingUpdate = async () => {
    try {
      const updateBookingResponse = await axios.put(
        "https://school-restaurant-api.azurewebsites.net/booking/update/" +
          newBookingInfo.id,
        newBookingInfo
      );
      console.log(updateBookingResponse);
      setShowEditForm(false);
    } catch {
      alert("Something went wrong when updating the booking");
    }
  };

  const handleSaveCustomer = async () => {
    if (customerValuesToSend) {
      try {
        const updateCustomerResponse = await axios.put(
          "https://school-restaurant-api.azurewebsites.net/customer/update/" +
            customerValuesToSend.id,
          customerValuesToSend
        );
        console.log("response:", updateCustomerResponse);
        setShowCustomerEdit(false);
      } catch (error) {
        alert("Something went wrong when updating the customer");
      }
    }
  };

  const handleDeleteBtn = async (booking: IBooking) => {
    setShowDeleteConfirm(true);
    // setSelectedBooking(booking)
    if (booking._id && booking.customerId) {
      const bookingToDeleteResponse = await getBooking(booking._id);
      setBookingToDelete(bookingToDeleteResponse[0]);
      console.log(bookingToDeleteResponse[0]);
      const customerOfBooking = await getCustomer(booking.customerId);
      setCustomerToDelete(customerOfBooking[0]);
      console.log(customerOfBooking[0]);
    }
  };

  const handleDeleteBooking = async () => {
    if(bookingToDelete) {
      const deletedBooking = await deleteBooking(bookingToDelete._id)
      console.log('deleted booking', deletedBooking)
    }
    setShowDeleteConfirm(false)
    location.reload()
  }

  const handleClose = () => {
    if (showEditForm === true && showCustomerEdit === false) {
      setShowEditForm(false);
    } else if (showEditForm === true && showCustomerEdit === true) {
      setShowCustomerEdit(false);
    }
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };


  const handleCreateBooking = () => {
    setShowCreateBooking(true)
  }



  return (
    <>
      <header>
        <button onClick={handleCreateBooking}>Create reservation</button>
      </header>
      {showCreateBooking && (
        <div className="create-booking-container">
          
        </div>
      )}
      <div className="main">
        <div className="side-bar">
          <div className="calendar-container">
            <input type="date" onChange={handleDate} />
            <button onClick={handleFilter18}>18:00</button>
            <button onClick={handleFilter21}>21:00</button>
          </div>
          <div className="quick-actions">
            <button onClick={() => setShowDelete(true)}>
              Delete booking by booking ID
            </button>
          </div>
        </div>
        <div className="booking-list">
          <ul>
            {filteredBookings.map((booking) => (
              <li key={booking._id} className="booking-unit">
                {booking.time}, {booking.date}, {booking.customerId}
                <div className="btn-container">
                  <button onClick={() => handleEdit(booking)}>Edit</button>
                  <button onClick={() => handleDeleteBtn(booking)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {showDeleteConfirm && (
          <div className="delete-confirm-container">
            <div className="delete-confirm-box">
              <h5>
                Are you sure you want to delete booking {bookingToDelete?._id}?
              </h5>
              <h6>{bookingToDelete?.date}, {bookingToDelete?.time}, {bookingToDelete?.numberOfGuests} guests</h6>
              <h6>
                {customerToDelete?.name} {customerToDelete?.lastname}
                <br />
                {customerToDelete?.email}
                <br />
                {customerToDelete?.phone}
              </h6>
              <div className="delete-box-btns">
                <button onClick={handleDeleteBooking}>Confirm</button>
                <button>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {showEditForm && (
          <div className="edit-container">
            <div className="edit-form">
              <h3>Booking information</h3>
              <div className="booking-info">
                <div className="booking-info-unit">
                  <h4>Date:</h4>
                  <input
                    type="date"
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
                  <p>{newName || customerInfo?.[0].name}</p>
                </div>
                <div className="info-unit">
                  <label>Lastname:</label>
                  <p>{newLastname || customerInfo?.[0].lastname}</p>
                </div>
                <div className="info-unit">
                  <label>Email:</label>
                  <p>{newEmail || customerInfo?.[0].email}</p>
                </div>
                <div className="info-unit">
                  <label>Phone:</label>
                  <p>{newPhone || customerInfo?.[0].phone}</p>
                </div>
                <button onClick={() => setShowCustomerEdit(true)}>
                  Edit customer
                </button>
              </div>
              {showCustomerEdit && (
                <div className="edit-container">
                  <div className="edit-customer">
                    <h3>Change personal information</h3>
                    <div className="edit-info-unit">
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={customerInfo?.[0].name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setNewName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="edit-info-unit">
                      <label>Lastname:</label>
                      <input
                        type="text"
                        name="lastname"
                        defaultValue={customerInfo?.[0].lastname}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setNewLastname(e.target.value);
                        }}
                      />
                    </div>
                    <div className="edit-info-unit">
                      <label>Email:</label>
                      <input
                        type="text"
                        name="email"
                        defaultValue={customerInfo?.[0].email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setNewEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="edit-info-unit">
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        defaultValue={customerInfo?.[0].phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setNewPhone(e.target.value);
                        }}
                      />
                    </div>
                    <button onClick={handleSaveCustomer}>Save changes</button>
                    <button onClick={handleClose}>Cancel</button>
                  </div>
                </div>
              )}
              <div className="btn-unit">
                {/* <button onClick={checkValues}>Check values to send</button> */}
                {/* <button onClick={handleCustomerUpdate}>Update customer</button> */}
                <button onClick={handleBookingUpdate}>Update booking</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showDelete && (
        <div className="delete-container">
          <div className="delete-box">
            <DeleteBooking />
            <button onClick={handleCloseDelete}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};
