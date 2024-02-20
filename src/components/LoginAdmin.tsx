import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export const LoginAdmin = () => {
    const navigate = useNavigate(); 
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validUsername = "admin";
    const validPassword = "admin123";

const handleLogin = () => {
 if (username === validUsername && password === validPassword) {
 console.log("Användaren är inloggad");
 setLoginError("");
 navigate("/admin_page");
 handleClose();
 } else {
 setLoginError("Wrong username or password, please try again.");
}
};

return (
<div>
<Button  
variant="link"
id="link-light"
onClick={handleShow}
style={{ color: '#A0A0A0', textDecoration: 'none' }}
 >
Admin
</Button>
 <Modal show={show} 
 onHide={handleClose} 
 centered>
<Modal.Header closeButton>
<Modal.Title>Log in to handle bookings</Modal.Title>
 </Modal.Header>
<Modal.Body>
<input
    type="text"
    placeholder="Username"
    value={username}
     onChange={(e) => setUsername(e.target.value)}
      />
<input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
      />
     {loginError && <p>{loginError}</p>}
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
    Close
</Button>
<Button variant="primary" onClick={handleLogin}>
    Log in to adminpage
</Button>
</Modal.Footer>
</Modal>
 </div>
 );
};
