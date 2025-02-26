import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AllBookings } from "../contexts/BookingContexts";
import { IBooking } from "../models/IBooking";
import { Customer } from "../models/Customer";
import {
  createCustomer,
  deleteBooking,
  getBooking,
  getCustomer,
} from "../services/api";
import { BookingClass } from "../models/BookingClass";
import axios from "axios";
import { NewCustomer } from "../models/NewCustomer";
import "react-datepicker/dist/react-datepicker.css";
import { ThreeDots } from "react-loader-spinner";
import { DeleteBooking } from "../components/DeleteBooking";

export const AdminPage = () => {
  const totalBookings = useContext(AllBookings);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showCustomerEdit, setShowCustomerEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showCreateBooking, setShowCreateBooking] = useState<boolean>(false);
  const [createCustomerForm, setCreateCustomerForm] = useState<boolean>(false);
  const [showTimeBtns, setShowTimeBtns] = useState<boolean>(false);
  const [showConfirmBooking, setShowConfirmBooking] = useState<boolean>(false);

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const customerId = selectedBooking?.customerId || "";
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

  // Dessa borde man kunnabyta ut till de liknande staten över
  const [newBookingDate, setNewBookingdate] = useState<string>();
  const [newBookingAmount, setNewBookingAmount] = useState<number>();
  const [newBookingTime, setNewBookingTime] = useState<string>();
  const [disableBtn6, setDisabledBtn6] = useState<boolean>(true);
  const [disableBtn9, setDisabledBtn9] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);

  const [customerValuesToSend, setcustomerValuesToSend] = useState<Customer>({
    id: customerId,
    name: newName,
    lastname: newLastname,
    email: newEmail,
    phone: newPhone,
  });

  const [newBookingInfo, setNewBookingInfo] = useState<BookingClass>({
    id: customerId,
    restaurantId: customerId,
    date: newDate!,
    time: newTime!,
    numberOfGuests: newAmountOfGuests!,
    customerId: customerId,
    customer: customerValuesToSend,
  });

  const [newCustomerValues, setNewCustomerValues] = useState<NewCustomer>({
    name: newName,
    lastname: newLastname,
    email: newEmail,
    phone: newPhone,
  });

  const bookingData = {
    restaurantId: "623b85d54396b96c57bde7c3",
    date: newBookingDate!,
    time: newBookingTime!,
    numberOfGuests: newBookingAmount!,
    customer: {
      name: newName,
      lastname: newLastname,
      email: newEmail,
      phone: newPhone,
    },
  };

  useEffect(() => {
    if(customerId) {
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
      id: customerId,
      name: newName || (customerInfo ? customerInfo[0].name : ""),
      lastname: newLastname || (customerInfo ? customerInfo[0].lastname : ""),
      email: newEmail || (customerInfo ? customerInfo[0].email : ""),
      phone: newPhone || (customerInfo ? customerInfo[0].phone : ""),
    };
    setcustomerValuesToSend(newValues);
    const newCustomerInfo = {
      name: newName,
      lastname: newLastname,
      email: newEmail,
      phone: newPhone,
    };
    setNewCustomerValues(newCustomerInfo);
  }}, [
    newDate,
    newTime,
    newAmountOfGuests,
    newName,
    newLastname,
    newEmail,
    newPhone,
    customerInfo,
    customerValuesToSend,
    selectedBooking,
    customerId
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


  const handleBookingUpdate = async () => {
    try {
      const updateBookingResponse = await axios.put(
        "https://school-restaurant-api.azurewebsites.net/booking/update/" +
          newBookingInfo.id,
        newBookingInfo
      );
      console.log(updateBookingResponse);
      setShowEditForm(false);
      setLoading(true);
    } catch {
      alert("Something went wrong when updating the booking");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomer = async () => {
    if (customerValuesToSend) {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteBtn = async (booking: IBooking) => {
    setShowDeleteConfirm(true);
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
    if (bookingToDelete) {
      setLoading(true);
      try {
        const deletedBooking = await deleteBooking(bookingToDelete._id);
        console.log("deleted booking", deletedBooking);
      } catch (error) {
        console.error("Error occurred while deleting booking:", error);
      } finally {
        setLoading(false);
      }
    }
    setShowDeleteConfirm(false);
    location.reload();
  };

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
    setShowCreateBooking(true);
  };

  const handleCloseBooking = () => {
    setShowCreateBooking(false);
    setNewBookingdate("");
    setNewBookingAmount(0);
    setShowTimeBtns(false);
  };

  const handleCloseCustomer = () => {
    setCreateCustomerForm(false);
    setShowCreateBooking(true);
  };

  const handleNewBookingAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBookingAmount(parseInt(e.target.value));
  };

  const handleSearch = async () => {
    if (newBookingDate === "" || newBookingAmount === undefined) {
      alert("Please select a date and number of guests");
      return;
    }
    setLoading(true);
    try {
      const result = totalBookings?.filter(
        (booking: IBooking) => booking.date === newBookingDate
      );

      if (result && result.length >= 30) {
        alert("Fully booked");
        setShowTimeBtns(false);
      } else {
        setShowTimeBtns(true);
      }

      const tablesBooked6 = result?.filter(
        (booking: IBooking) => booking.time === "18:00"
      );

      const tablesBooked9 = result?.filter(
        (booking: IBooking) => booking.time === "21:00"
      );

      setDisabledBtn6(tablesBooked6 && tablesBooked6.length >= 15);
      setDisabledBtn9(tablesBooked9 && tablesBooked9.length >= 15);
    } catch (error) {
      console.error("An error occurred while getting booking data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickTimeBtn1 = () => {
    setNewBookingTime("18:00");
    console.log(newBookingTime);
    setCreateCustomerForm(true);
    setShowCreateBooking(false);
  };

  const handleClickTimeBtn2 = () => {
    setNewBookingTime("21:00");
    console.log(newBookingTime);
    setCreateCustomerForm(true);
    setShowCreateBooking(false);
  };

  const handleSaveNewCustomer = async () => {
    const newCustomerResponse = await createCustomer(newCustomerValues);
    console.log(newCustomerResponse);
    setCreateCustomerForm(false);
    setShowConfirmBooking(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  const handleMakeBooking = async () => {
    if (bookingData) {
      const response = await axios.post(
        "https://school-restaurant-api.azurewebsites.net/booking/create",
        bookingData
      );
      console.log(response);
      setShowConfirmBooking(false);
    } else {
      alert(
        "Something went wrong when registrating the reservation. Please try again"
      );
    }
  };
  

  return (
    <>
      <header>
        <button onClick={handleCreateBooking}>Create reservation</button>
      </header>
      {loading && <ThreeDots color="#A0A0A0" />}
      {showCreateBooking && (
        <div className="create-booking-container">
          <div className="create-booking-box">
            <h3>Booking details</h3>
            <input
              type="date"
              value={newBookingDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewBookingdate(e.target.value);
              }}
            />
            <input
              id="amountOfPeople"
              type="number"
              min={1}
              max={6}
              placeholder="0"
              value={newBookingAmount}
              onChange={handleNewBookingAmount}
            />
            <div className="btns">
              <button onClick={handleSearch}>Search for available times</button>
              <button onClick={handleCloseBooking}>Cancel</button>
            </div>
            {showTimeBtns && (
              <div className="time-btn">
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
            )}
          </div>
        </div>
      )}
      {createCustomerForm && (
        <div className="customer-form-container">
          <div className="customer-form">
            <h3>Create customer profile</h3>
            <h5>Booking details:</h5>
            <p>
              {newBookingDate}, {newBookingTime}
              <br />
              {newBookingAmount} guests
            </p>
            <input
              type="text"
              placeholder="Firstname"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Lastname"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewLastname(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Phone"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewPhone(e.target.value);
              }}
            />
            <div className="btn-container">
              <button onClick={handleSaveNewCustomer}>Save</button>
              <button onClick={handleCloseCustomer}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showConfirmBooking && (
        <div className="confirm-backdrop">
          <div className="confirm-box">
            <h3>Booking details:</h3>
            <h5>
              Make a reservation for {newBookingAmount} guests, the{" "}
              {newBookingDate} at {newBookingTime}.
            </h5>
            <h6>
              {newName} {newLastname}
            </h6>
            <p>
              {newEmail}
              <br />
              {newPhone}
            </p>
            <div className="new-customer-btn">
              <button onClick={handleMakeBooking}>Confirm</button>
              <button>Cancel</button>
            </div>
          </div>
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
          {filteredBookings.length === 0 ? (
            <p>No reservations on the selected time and day</p>
          ) : (
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
          )}
        </div>
        {showDeleteConfirm && (
          <div className="delete-confirm-container">
            <div className="delete-confirm-box">
              <h5>
                Are you sure you want to delete booking {bookingToDelete?._id}?
              </h5>
              <h6>
                {bookingToDelete?.date}, {bookingToDelete?.time},{" "}
                {bookingToDelete?.numberOfGuests} guests
              </h6>
              <h6>
                {customerToDelete?.name} {customerToDelete?.lastname}
                <br />
                {customerToDelete?.email}
                <br />
                {customerToDelete?.phone}
              </h6>
              <div className="delete-box-btns">
                <button onClick={handleDeleteBooking}>Confirm</button>
                <button onClick={handleCancelDelete}>Cancel</button>
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
