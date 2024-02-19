import axios from "axios";
import { IBooking } from "../models/IBooking";
import { Customer } from "../models/Customer";
import { BookingClass } from "../models/BookingClass";

const API_BASE_URL = "https://school-restaurant-api.azurewebsites.net";

export const getRestaurant = async () => {
  const response = await axios.get(API_BASE_URL + "/restaurant/65c9d9502f64dba9babc81d6");
  return response.data
};

export const getBooking = async (customerId: string) => {
  const response = await axios.get(API_BASE_URL + "/booking/" + customerId);
  return response.data
};

export const getRestaurantBookings = async () => {
  const response = await axios.get(
    API_BASE_URL + "/booking/restaurant/65c9d9502f64dba9babc81d6"
  );
  return response.data
};

export const createBooking = async (bookingData: IBooking) => {
  const response = await axios.post(
    API_BASE_URL + "/booking/create",
    bookingData
  );
  return response.data
};

export const updateBooking = async (
  bookingId: string,
  newBookingInfo: BookingClass
) => {
  const response = await axios.put(
    API_BASE_URL + "/booking/update/" + bookingId,
    newBookingInfo
  );
  return response.data
};

export const deleteBooking = async (bookingId: string) => {
  const response = await axios.delete(
    API_BASE_URL + "/booking/delete/" + bookingId
  );
  return response.data
};

export const getCustomer = async (customerId: string) => {
  const response = await axios.get(
    API_BASE_URL + "/customer/" + customerId
  );
  return response.data
};

export const createCustomer = async (customerData: any) => {
  const response = await axios.post(
    API_BASE_URL + "/customer/create",
    customerData
  );
  return response.data
};

export const updateCustomer = async (customerID: string, values: Customer) => {
  const response = await axios.put(
    API_BASE_URL + "/customer/update/" + customerID,
    values
  );
  return response.data
};

// Ändra Any till ett interface(?)
