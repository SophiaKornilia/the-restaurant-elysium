import facebookLogo from "../images/Facebook.png";
import instagramLogo from "../images/Instagram.png";
import tripAdvisor from "../images/TripAdvisor.png";
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
          {" "}
          <img src={facebookLogo} alt="facebook" />
        </div>
        <div>
          {" "}
          <img src={instagramLogo} alt="instagram" />
        </div>
        <div>
          {" "}
          <img src={tripAdvisor} alt="tripadvisor" />
        </div>
      </div>
  </>);
};