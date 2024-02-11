import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const Booking = () => {
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

return (
        <div>
        <div id="container">
<div id="text-container">
    <h2>Book</h2>
    <p>your experience</p>
</div>
<div>
<form id="form-container">
    <input type="number" 
    min={1} max={6}
    placeholder="People" 
    />
    <br></br>
     <DatePicker selected={selectedDate} 
     placeholderText="Find available tables" 
     onChange={(date) => setSelectedDate (date)} 
     dateFormat="dd-MM-yyyy"
     minDate={new Date()}
     showTimeSelect>

     </DatePicker>
     <br></br>
     <p>Klicka här för att avboka</p>
     </form>
     </div>
     </div>
     </div>
    )
}