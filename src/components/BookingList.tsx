import { useState } from "react";
import { IBooking } from "../models/Ibooking";

export const BookingList = () => {
    const [booking, setBooking] = useState<IBooking[]>(

    ); 

    console.log(booking);
    
    return (
        <>
       
        </> 
    )
}