import { ChangeEvent } from "react";
import { Customer } from "../models/Customer";

interface IEditCustomer {
  customerData: Customer[];
  newCustomerData: (updateData: Customer) => void;
}

export const EditCustomer = (props: IEditCustomer) => {
  const { customerData } = props; 
//   ????

  const initialValues = {
    name: customerData[0].name || "",
    lastname: customerData[0].lastname || "",
    email: customerData[0].email || "",
    phone: customerData[0].phone || "",
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    };
  

  return (
    <div id="edit-container">
      <div className="unit">
        <label>Name:</label>
        <input
          type="text"
          defaultValue={initialValues.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="unit">
        <label>Lastname:</label>
        <input
          type="text"
          defaultValue={initialValues.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className="unit">
        <label>Email:</label>
        <input
          type="text"
          defaultValue={initialValues.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="unit">
        <label>Phone:</label>
        <input
          type="text"
          defaultValue={initialValues.phone}
          onChange={handleInputChange}
        />
      </div>
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
