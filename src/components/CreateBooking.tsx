import axios from "axios";
import { Customer } from "../models/Customer";

interface ICreateBookingProps {
  chosenTime: string;
  chosenDate: Date;
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

  const formatedChosenDate = props.chosenDate?.toISOString().slice(0, 10);

  console.log(formatedChosenDate);

  const bookingData = {
    restaurantId: "623b85d54396b96c57bde7c3",
    date: formatedChosenDate,
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
  };
  return (
    <div>
      <button onClick={handleClick}>Confirm</button>
      {bookingData && (
        <div>
          <h4>Date and time: {bookingData.time}</h4>
        </div>
      )}
    </div>
  );
};

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
