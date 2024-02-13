import { ApiComponent } from "../components/CreateCustomer";
import facebookLogo from "../images/Facebook.png";
import instagramLogo from "../images/Instagram.png";
import tripAdvisor from "../images/TripAdvisor.png";

export const Contact = () => {
  return (
    <div id="contactContainer">
      <div id="textContainer">
        <ApiComponent />
        <h2>Contact</h2>
        <p>
          Address: 123 Main Street <br />
          Email:info@elysiumrestaurant.com <br />
          Phone Number: +1 (555) 123-4567
        </p>
        <div id="iconContainer">
          <h3>Follow us</h3>
          <div id="iconImgContainer">
            <div>
              <img src={facebookLogo} alt="facebook" />
            </div>
            <div>
              <img src={instagramLogo} alt="instagram" />
            </div>
            <div>
              <img src={tripAdvisor} alt="tripadvisor" />
            </div>
          </div>
        </div>
      </div>
      <div id="formContainer">
        <form>
          <label>Name</label>
          <input type="text" />
          <label>Email</label>
          <input type="text" />
          <label>Title</label>
          <input type="text" />
          <label>Message</label>
          <textarea rows={15} />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};
