import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { Customer } from "../models/Customer";
// 65c9d9502f64dba9babc81d6

export const CreateCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [customer, setCustomer] = useState<Customer>()

  console.log(customer);
  
  useEffect(() => {
    setCustomer(new Customer(firstName, lastName, email, phone));
  }, [firstName, lastName, email, phone]);

  const handleClick = async () => {
    const response = await axios.post(
      "https://school-restaurant-api.azurewebsites.net/customer/create",
      customer
    );
    console.log(response.data);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPhone(e.target.value);
            }}
          />
          <button onClick={handleClick}>Create</button>
        </div>
      </div>
    </>
  );
};
