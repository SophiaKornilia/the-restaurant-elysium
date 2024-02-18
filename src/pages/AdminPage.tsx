import { useContext, useState, ChangeEvent, useEffect } from "react";
import { DeleteBooking } from "../components/DeleteBooking";
import { UpdateCustomer2 } from "../components/UpdateCustomer2";
import { AllBookings } from "../Context/BookingContexts";
import { Customer } from "../models/Customer";
import { IBooking } from "../models/IBooking";
import { getCustomer, updateCustomer, updateBooking } from "../services/api";

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

  const [values, setValues] = useState<Customer[]>([
    {
      name: newName || (customerInfo.length > 0 ? customerInfo[0].name : ""),
      lastname:
        newLastname ||
        (customerInfo.length > 0 ? customerInfo[0].lastname : ""),
      email: newEmail || (customerInfo.length > 0 ? customerInfo[0].email : ""),
      phone: newPhone || (customerInfo.length > 0 ? customerInfo[0].phone : ""),
    },
  ]);

  useEffect(() => {
    const newValues = {
      name: newName || (customerInfo.length > 0 ? customerInfo[0].name : ""),
      lastname:
        newLastname ||
        (customerInfo.length > 0 ? customerInfo[0].lastname : ""),
      email: newEmail || (customerInfo.length > 0 ? customerInfo[0].email : ""),
      phone: newPhone || (customerInfo.length > 0 ? customerInfo[0].phone : ""),
    };
    setValues([newValues]);
  }, [newName, newLastname, newEmail, newPhone, customerInfo]);

  const [newBookingInfo, setNewBookingInfo] = useState<IBooking[]>([
    {
      _id: "",
      restaurantId: "65c9d9502f64dba9babc81d6",
      date: "",
      time: "",
      numberOfGuests: 0,
      customerId: "",
    },
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
    }

    setNewBookingInfo([
      {
        _id: booking._id,
        restaurantId: booking.restaurantId,
        date: booking.date,
        time: booking.time,
        numberOfGuests: booking.numberOfGuests,
        customerId: booking.customerId,
      },
    ]);
  };

  const handleSave = async () => {
    try {
      const updatedCustomer = await updateCustomer(
        selectedBooking?.customerId || "",
        {
          name: newName,
          lastname: newLastname,
          email: newEmail,
          phone: newPhone,
        }
      );

      const updatedBooking = await updateBooking(selectedBooking?._id || "", {
        _id: selectedBooking?._id || "",
        restaurantId: selectedBooking?.restaurantId || "",
        date: selectedBooking?.date || "",
        time: selectedBooking?.time || "",
        numberOfGuests: selectedBooking?.numberOfGuests || 0,
        customerId: selectedBooking?.customerId || "",
      });

      setShowEditForm(false);

      console.log("Updated customer:", updatedCustomer);
      console.log("Updated booking:", updatedBooking);
    } catch (error) {
      alert("Error updating customer or booking");
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
                  <h4>Date: {selectedBooking?.date}</h4>
                  <input type="date" />
                </div>
                <div className="booking-info-unit">
                  <h4>Time: {selectedBooking?.time}</h4>
                  <div className="forn-btn-container">
                    <button>18:00</button>
                    <button>21:00</button>
                  </div>
                </div>
                <div className="booking-info-unit">
                  <h4>Guests: {selectedBooking?.numberOfGuests}</h4>
                  <input type="number" min={1} max={6} />
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
                    defaultValue={values[0]?.name || ""}
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
                    defaultValue={values[0]?.lastname || ""}
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
                    defaultValue={values[0]?.email || ""}
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
                    defaultValue={values[0]?.phone || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setNewPhone(e.target.value);
                    }}
                  />
                </div>
                <div className="btn-unit">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleClose}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div> {/* La de komponenterna ni gjorde här! :) */}
        <h1>Adminpage</h1>
        <DeleteBooking />
        <br />
        <UpdateCustomer2 />
      </div>
    </>
  );
};
