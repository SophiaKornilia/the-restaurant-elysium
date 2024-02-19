import { Customer } from "./Customer";

export class CostumerToSend {
  constructor(
    public id: string,
    public customer: Customer
  ) {}
};
