import React from "react";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="content">
      <div className="one">
        <h1>About Us</h1>
        <h3>Welcome to SkillsMe, a unique platform where people can exchange skills and give back to the community!</h3>
      </div>
      <div className="one"><h4>What We Do</h4>
        <p>✅At SkillsMe, we believe learning should be accessible, collaborative, and rewarding. Our platform connects individuals who want to learn new skills with those willing to teach them. Instead of money, users swap their skills—creating a dynamic learning experience for everyone.</p>
        <p>✅In addition, our Donate section allows users to post and find free items—whether it’s books, gadgets, or other useful resources—promoting sustainability and generosity within the community.</p>
      </div>
      <div className="onee">
        <div> <h4>How It Works</h4><ul>
          <li>Create a Profile – List the skills you have & the ones you want to learn</li>
          <li>Find & Swap – Connect with like-minded learners and make a skill exchange request</li>
          <li>Chat & Learn – Communicate, schedule sessions, and grow together</li>
          <li>Donate & Receive – Give away unused items or find what you need—all for free!</li>
        </ul></div>
        <div className="imagee"><img src="/assets/learn.png" alt="" /></div>



      </div>
      <div className="last">
      <div className="b2"><img src="/assets/donate.png" alt="" style={{width:"300px",height:"300px"}} /></div>

      <div className="b1"><button>Join Now</button></div></div>
    </div>
  );
};

export default AboutUs;
