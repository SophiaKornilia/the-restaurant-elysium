import axios from "axios";
import { Customer } from "../models/Customer";

interface ICreateBookingProps {
  chosenTime: string;
  chosenDate: Date;
  peopleAmount: number;
  customer: Customer;

}

export const CreateBooking = (props: ICreateBookingProps) => {
  const bookingData = {
    restaurantId: "623b85d54396b96c57bde7c3",
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

  const handleClick = async () => {
    if (bookingData) {
      const response = await axios.post(
        "https://school-restaurant-api.azurewebsites.net/customer/create",
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
          <h4>
            Date and time:  {bookingData.time}
          </h4>
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
