//     import axios from "axios";
// import { useState } from "react";
// import { IBooking } from "../models/IBooking";

//  export interface IBookingProps {
//   booking: IBooking;
// }

// export const BookingGet = (props: IBookingProps) => {
//   // const [booking, setBooking] = useState<IBooking>();

//  const searchBooking = async () => {
//     const response = await axios.get<IBooking>(
//       "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c9d9502f64dba9babc81d6")

//     setBooking(response.data);

//     console.log("booking", response.data);
//   };

//   if (!booking) {
//     searchBooking();
//   }

//   return <div></div>;
// };
