import axios from "axios";
import { IBooking } from "../models/IBooking";

const API_BASE_URL = "https://school-restaurant-api.azurewebsites.net";

export const getRestaurant = async (restaurantId: string) => {
  const response = await axios.get(API_BASE_URL + "/restaurant/" + restaurantId);
  return response.data
};

// export const searchAvailableTables = (date: string, numberOfPeople: number) => {
//   // Placeholder: Simulate search for available tables based on the number of people and date
//   const availableTimes = ["18:00", "21:00"]; // Replace with actual data from the API
//   return Promise.resolve({ data: availableTimes });
// };

export const getBooking = async (bookingId: string) => {
  const response = await axios.get(API_BASE_URL + "/booking/" + bookingId);
  return response.data
};

export const getRestaurantBookings = async (restaurantId: string) => {
  const response = await axios.get(
    API_BASE_URL + "/booking/restaurant/" + restaurantId
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
  bookingData: IBooking
) => {
  const response = await axios.put(
    API_BASE_URL + "/booking/update/" + bookingId,
    bookingData
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
    API_BASE_URL + "/customer/update/" + customerId
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

export const updateCustomer = async (customerId: string, updateData: any) => {
  const response = await axios.put(
    API_BASE_URL + "/customer/update/" + customerId,
    updateData
  );
  return response.data
};

// Ändra Any till ett interface(?)
