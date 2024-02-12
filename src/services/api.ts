import axios from "axios";
import { IBooking } from "../models/IBooking";

const API_BASE_URL = 'https://school-restaurant-api.azurewebsites.net';

export const getRestaurant = async (restaurantId: string) => {
    return await axios.get(API_BASE_URL + '/restaurant/' + restaurantId)
};

export const getBooking = async (bookingId: string) => {
    return await axios.get(API_BASE_URL + '/booking/' + bookingId)
};

export const getRestaurantBookings = async (restaurantId: string) => {
    return await axios.get(API_BASE_URL + '/booking/restaurant/' + restaurantId)
};

export const createBooking = async (bookingData: IBooking) => {
    return await axios.post(API_BASE_URL + '/booking/create/', bookingData)
};

export const updateBooking = async (bookingId: string, bookingData: IBooking) => {
    return await axios.put(API_BASE_URL + '/booking/update/' + bookingId, bookingData)
};

export const deleteBooking = async (bookingId: string) => {
    return await axios.delete(API_BASE_URL + '/booking/delete/' + bookingId)
};

export const getCustomer = async (customerId: string) => {
    return await axios.get(API_BASE_URL + '/customer/update/' + customerId)
};

export const createCustomer = async (customerData: any) => {
    return await axios.post(API_BASE_URL + '/customer/create/', customerData)
};

export const updateCustomer = async (customerId: string, updateData: any) => {
    return await axios.put(API_BASE_URL + '/customer/update/' + customerId, updateData)
};


// Ändra Any till ett interface(?)