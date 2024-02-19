import { Customer } from "./Customer";

export class BookingClass {
  constructor(
    public id: string,
    public restaurantId: string,
    public date: string,
    public time: string,
    public numberOfGuests: number,
    // public customerId: string,
    public customer: Customer
  ) {}
};
