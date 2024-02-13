
import axios from "axios";
import { useState, ChangeEvent } from "react";

// 65c9d9502f64dba9babc81d6

export const ApiComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    var customerData = {
        "name": firstName,
        "lastname": lastName,
        "email": email,
        "phone": phone,
    }

console.log(customerData)

const handleClick = async () => {
    // POST request using axios with async/await
    const customer = { name: "Customer2", lastname: "lastname2", email: "customer@customer.se", phone: "0707112233"};
    const response = await axios.post('https://school-restaurant-api.azurewebsites.net/customer/create', customer);
  
    console.log(response.data);
}

  return (
    <>
      <div>
        <form>
            <input type="text" placeholder="Firstname" value={firstName} onChange={(e: ChangeEvent<HTMLInputElement>) => {setFirstName(e.target.value)}}/>
            <input type="text" placeholder="Lastname" value={lastName} onChange={(e: ChangeEvent<HTMLInputElement>) => {setLastName(e.target.value)}}/>
            <input type="text" placeholder="Email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}/>
            <input type="text" placeholder="Phone" value={phone} onChange={(e: ChangeEvent<HTMLInputElement>) => {setPhone(e.target.value)}}/>
            <button onClick={handleClick}>Create</button>
        </form>
      </div>
    </>
  );
};
