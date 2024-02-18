import axios from "axios";
import { Customer } from "../models/Customer";
import { useState } from "react";

interface ICreateBookingProps {
  chosenTime: string;
  chosenDate: string;
  peopleAmount: number;
  customer: Customer;
}

export const CreateBooking = (props: ICreateBookingProps) => {
  console.log(props.customer.name);
  console.log(props.customer.lastname);
  console.log(props.customer.email);
  console.log(props.customer.phone);

  console.log(props.chosenTime);
  console.log(props.peopleAmount);

  // const formatedChosenDate = props.chosenDate?.toISOString().slice(0, 10);
  const [isButtonClicked, setIsButtonClicked] = useState(true);

  console.log("är det rätt datum", props.chosenDate);

  const bookingData = {
    restaurantId: "65c9d9502f64dba9babc81d6",
    date: props.chosenDate,
    time: props.chosenTime,
    numberOfGuests: props.peopleAmount,
    customer: {
      name: props.customer.name,
      lastname: props.customer.lastname,
      email: props.customer.email,
      phone: props.customer.phone,
    },
  };

  console.log(bookingData);

  const handleClick = async () => {
    if (bookingData) {
      const response = await axios.post(
        "https://school-restaurant-api.azurewebsites.net/booking/create",
        bookingData
      );

      console.log(response);
    }
    setIsButtonClicked(false);
  };
  return (
    <div className={isButtonClicked ? "" : "display"}>
      {bookingData && (
        <div>
          <h3>
            {bookingData.customer.name}", press confirm to confirm your
            booking."
          </h3>
          <h4>Date: {bookingData.date}</h4>
          <h4>Time: {bookingData.time}</h4>
          <button onClick={handleClick}>Confirm</button>
        </div>
      )}
      <div className={isButtonClicked ? "display" : ""}>
        <h3>
          "You have booked a table at Elysium {bookingData.date} on{" "}
          {bookingData.time} for {bookingData.numberOfGuests} people.
        </h3>
      </div>
    </div>
  );
};
