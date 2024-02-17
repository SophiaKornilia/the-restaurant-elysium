import { useContext, useState, ChangeEvent } from "react";
import { DeleteBooking } from "../components/DeleteBooking";
import { UpdateCustomer2 } from "../components/UpdateCustomer2";
import { AllBookings } from "../Context/BookingContexts";

export const AdminPage = () => {
  const totalBookings = useContext(AllBookings);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
