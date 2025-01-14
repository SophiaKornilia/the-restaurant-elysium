import { useState } from "react";
import facebookLogo from "../images/Facebook.png";
import instagramLogo from "../images/Instagram.png";
import tripAdvisor from "../images/TripAdvisor.png";
import { ThreeCircles} from "react-loader-spinner";

export const Contact = () => {
  const [mapLoading, setMapLoading] = useState(true);

  const handleMapLoad = () => {
    setMapLoading(false);
  };

  return (
    <div id="contactContainer">
      <div id="textContainer">
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
              <a href="#">
                <img src={facebookLogo} alt="facebook" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={instagramLogo} alt="instagram" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={tripAdvisor} alt="tripadvisor" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="formContainer">
        {mapLoading && <ThreeCircles color="#A0A0A0" />}
        <iframe
          width="520"
          height="400"
          src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=G%C3%B6teborg%20+(Elysium)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          onLoad={handleMapLoad} 
        ></iframe>
      </div>
    </div>
  );
};
