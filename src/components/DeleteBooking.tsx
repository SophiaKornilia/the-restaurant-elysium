import { ChangeEvent, useState } from "react";
import { deleteBooking } from "../services/api";

export const DeleteBooking = () => {
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClickDelete = async () => {
    await deleteBooking(input);
    console.log("Bokningen har tagits bort!");
  };

  return (
    <>
      <h3>Do you want to delete a booking?</h3>
      <label>Enter the booking ID</label>
      <input type="text" value={input} onChange={handleChange} placeholder="Booking ID"></input>
      <button onClick={handleClickDelete}>Delete booking</button>
    </>
  );
};
