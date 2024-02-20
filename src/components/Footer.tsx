import facebookLogo from "../images/Facebook.png";
import instagramLogo from "../images/Instagram.png";
import tripAdvisor from "../images/TripAdvisor.png";
import { LoginAdmin } from "./LoginAdmin";


export const Footer = () => {


  return (<>
      <div id="text-container">
        <div>
          <h3>Visit us</h3>
          <h4>
            123 Main Street <br /> Gothenburg
          </h4>
        </div>
        <div>
          <h3>Open hours</h3>
          <h4>
            Mon - Sun: 6pm - 10pm
          </h4>
        </div>
      </div>
      <div id="icon-container">
        <div>
          <a href="https://www.facebook.com"><img src={facebookLogo} alt="facebook" /></a>
        </div>
        <div>
        <a href="https://www.instagram.com/"><img src={instagramLogo} alt="instagram" /></a>
        </div>
        <div>
        <a href="https://www.tripadvisor.se/"><img src={tripAdvisor} alt="tripadvisor" /></a>
        <LoginAdmin/>
        </div>
      </div>
  </>
  );
};
