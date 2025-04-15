
import Button from "react-bootstrap/Button";

import "./Login.scss"
const Login = () => {
// State for hover effect

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };




  return (
    <div className="bigdiv">

      <div className="insidediv">
        <div><h1 style={{ textAlign: "center" }}>Empower Yourself</h1>
          <h1 style={{ textAlign: "center" }}>Learn & Share with SkillsMe!</h1></div>
        <p>Give what you have, get what you need – skill swapping made easy</p>
        <div className="maindiv">
          <Button
            onClick={handleGoogleLogin}
          >
            <img src="/assets/google.png" style={{ width: "40px", height: "40px", backgroundColor: "white", padding: "3px", borderRadius: "7px" }} alt="" /> Continue with Google
          </Button>
        </div>
        <div className="lastdiv" > <span>By Continuing, you agree to our</span>
          <span className="sp">Terms & Conditions <span className="s">and</span> Privacy Policy</span></div>

      </div>
    </div>
  );
};

export default Login;
