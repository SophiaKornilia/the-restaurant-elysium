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
    <div>
      <h3>Do you want to delete your booking?</h3>
      <label>Skriv in bokningsnumret</label>
      <input type="text" value={input} onChange={handleChange}></input>
      <button onClick={handleClickDelete}>Delete booking</button>
    </div>
  );
};
