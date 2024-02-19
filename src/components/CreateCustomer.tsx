import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { Customer } from "../models/Customer";
// 65c9d9502f64dba9babc81d6

interface ICreateCustomerProps {
  onCustomerCreated: (customer: Customer) => void;
}

export const CreateCustomer = (props: ICreateCustomerProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [customer, setCustomer] = useState<Customer>();
  const [checked, setChecked] = useState(false);

  console.log(customer);

  useEffect(() => {
    setCustomer(new Customer(firstName, lastName, email, phone));
  }, [firstName, lastName, email, phone]);

  const handleClick = async () => {
    if (!checked) {
      alert("Du måste godkänna behandlingen av personuppgifter enligt GDPR.");
      return;
    }
    if (customer) {
      // Kontrollera om customer inte är undefined
      const response = await axios.post(
        "https://school-restaurant-api.azurewebsites.net/customer/create",
        customer
      );
      console.log(response.data);

      props.onCustomerCreated(customer);

      setIsButtonClicked(true);
    }
  };

  return (
    <>
      <div className={isButtonClicked ? "display" : ""}>
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
          <br />
          <div  >
            <input
            type="checkbox"
            id="GDPRBox"
            onChange={() => setChecked(!checked)}
            checked={checked}
            required
          />
          <label htmlFor="GDPRBOX">
            "Jag godkänner behandlingen av mina personuppgifter enligt GDPR"
          </label>
          </div>
          
          <button onClick={handleClick}>Create</button>
        </div>
      </div>
    </>
  );
};
