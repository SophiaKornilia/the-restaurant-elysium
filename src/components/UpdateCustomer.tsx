import { useState } from "react";
import { updateCustomer } from "../services/api"

const [aState, setAState] = useState(); 

export const UpdateCustomer = () => {

    const fixedCustomer = async (customerId: string, updateData: any)  => {
        const enVariabel = await updateCustomer(customerId = "65cc7c5a9019008165590dbe",
        updateData = {
            "id": "623b85d54396b96c57bde7c3",
            "name": "Franzén",
            "lastname": "Sebastian",
            "email": "someone@somedomain.com",
            "phone": "070-1112233"
          });
          setAState(enVariabel);
          
    }

    console.log(fixedCustomer);
    
 //65cc7c5a9019008165590dbe
   
  
    return (
        <></> 
    )
}


const search = async (searchText: string) => {
    const omdbMovies = await searchMovies(searchText);
    setMovies(omdbMovies);
    localStorage.setItem("movies", JSON.stringify(omdbMovies));
  };


  export const updateCustomer = async (customerId: string, updateData: any) => {
    customerId = "65cc7c5a9019008165590dbe"
    updateData = {
        "id": "623b85d54396b96c57bde7c3",
        "name": "Franzén",
        "lastname": "Sebastian",
        "email": "someone@somedomain.com",
        "phone": "070-1112233"
      }
    const response = await axios.put(
      API_BASE_URL + "/customer/update/" + customerId,
      updateData
    );
    return response.data
  };


  export const getCustomer = async (customerId: string) => {
    const response = await axios.get(
      API_BASE_URL + "/customer/" + customerId
    );
    return response.data
  };