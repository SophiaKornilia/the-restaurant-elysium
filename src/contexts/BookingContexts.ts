import { createContext } from "react";
import { IBooking } from "../models/IBooking";
import { getRestaurantBookings } from "../services/api";

const allBookings = await getRestaurantBookings();

export const AllBookings = createContext<IBooking[]>(allBookings)