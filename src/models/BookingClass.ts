import { Customer } from "./Customer";

export class BookingClass {
  constructor(
    public restaurantId: string,
    public date: string,
    public time: string,
    public numberOfGuests: number,
    public customer: Customer
  ) {}
};
