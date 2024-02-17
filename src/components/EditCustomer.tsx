import { ChangeEvent, useEffect, useState } from "react";
import { Customer } from "../models/Customer";

interface IEditCustomerProps {
  customerData: Customer[];
  handleSave: () => void;
  inputValue: string;
}

export const EditCustomer = ({ customerData, handleSave, inputValue }: IEditCustomerProps) => {

  const [newName, seNewName] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [values, setValues] = useState<Customer[]>([{
    name: newName || customerData[0].name,
      lastname: newLastname || customerData[0].lastname,
      email: newEmail || customerData[0].email,
      phone: newPhone || customerData[0].phone,
  }])

  useEffect(() => {
    const newValues = {
      name: newName || customerData[0].name,
      lastname: newLastname || customerData[0].lastname,
      email: newEmail || customerData[0].email,
      phone: newPhone || customerData[0].phone,
    };
    setValues([newValues]);
  }, [newName, newLastname, newEmail, newPhone, customerData]);

  // const initialValues = {
  //   name: customerData[0].name || "",
  //   lastname: customerData[0].lastname || "",
  //   email: customerData[0].email || "",
  //   phone: customerData[0].phone || "",
  // };

  // const newValues = {
  //   name: newName || customerData[0].name,
  //   lastname: newLastname || customerData[0].lastname,
  //   email: newEmail || customerData[0].email,
  //   phone: newPhone || customerData[0].phone,
  // };

  const handleLog = () => {
    console.log("New Values:", values[0]);
    console.log(values);
  };

  return (
    <div id="edit-container">
      <div className="unit">
        <label>Name:</label>
        <input
          type="text"
          defaultValue={values[0].name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            seNewName(e.target.value);
          }}
        />
      </div>
      <div className="unit">
        <label>Lastname:</label>
        <input
          type="text"
          defaultValue={values[0].lastname}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewLastname(e.target.value);
          }}
        />
      </div>
      <div className="unit">
        <label>Email:</label>
        <input
          type="text"
          defaultValue={values[0].email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewEmail(e.target.value);
          }}
        />
      </div>
      <div className="unit">
        <label>Phone:</label>
        <input
          type="text"
          defaultValue={values[0].phone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewPhone(e.target.value);
          }}
        />
      </div>
      <div className="unit">
        <label>Customer ID:</label>
        <input
          type="text"
          defaultValue={inputValue}
          disabled
        />
      </div>
      <button
        onClick={handleLog}
      >
        Save
      </button>
    </div>
  );
};

// {
//     "id": "623b85d54396b96c57bde7c3",
//     "name": "Franzén",
//     "lastname": "Sebastian",
//     "email": "someone@somedomain.com",
//     "phone": "070-1112233"
//   }

// if(newName === customerData[0].name) {
//   console.log('same name')
// } if(newLastname === customerData[0].lastname) {
//   console.log('same lastname')
// } if(newEmail === customerData[0].email) {
//   console.log('same email')
// } if(newPhone === customerData[0].phone) {
//   console.log('same phone')
// }
