import axios from "axios";
import { useState } from "react";
import { NewCustomer } from "../models/NewCustomer";

interface ICreateBookingProps {
  chosenTime: string;
  chosenDate: string;
  peopleAmount: number;
  customer: NewCustomer;
  hide: boolean;
}

export const CreateBooking = (props: ICreateBookingProps) => {
  console.log(props.customer.name);
  console.log(props.customer.lastname);
  console.log(props.customer.email);
  console.log(props.customer.phone);

  console.log(props.chosenTime);
  console.log(props.peopleAmount);
  console.log(props.hide);

  // const formatedChosenDate = props.chosenDate?.toISOString().slice(0, 10);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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
    setIsButtonClicked(true);
    try {
      if (bookingData) {
        const response = await axios.post(
          "https://school-restaurant-api.azurewebsites.net/booking/create",
          bookingData
        );

        console.log(response);
      }

      console.log(isButtonClicked);
    } catch (error) {
      console.error("An error occured while createing a booking");
    }
  };

  return (
    <div>
      {bookingData && (
        <div className={props.hide ? (isButtonClicked ? "display" : "") : "display"}>
          <h3>
            {bookingData.customer.name}, press confirm to confirm your
            booking.
          </h3>
          <h5>Date: {bookingData.date}</h5>
          <h5>Time: {bookingData.time}</h5>
          <button onClick={handleClick}>Confirm</button>
        </div>
      )}
      <div className={isButtonClicked ? "" : "display"}>
        <h3>
          You have booked a table at Elysium on {bookingData.date} at{" "}
          {bookingData.time} for {bookingData.numberOfGuests} people.
        </h3>
      </div>
    </div>
  );
};
