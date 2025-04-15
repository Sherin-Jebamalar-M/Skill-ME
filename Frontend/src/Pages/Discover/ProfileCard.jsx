import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";
import "./Profileecard.scss"
const ProfileCard = ({ profileImageUrl, bio, name, skills, rating, username }) => {
  return (
    <div className="card-container" style={{
      background:"rgba(255, 255, 255, 0.2)",
      backgroundColor:"rgb(219, 226, 239)",
      borderRadius:"16px",
      boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
      backdropFilter:"blur(5px)",
      border:"1px solid rgba(255, 255, 255, 0.3)"
    }}>
      <img className="img-container" src={profileImageUrl} alt="user" />
      <h3 style={{color:"rgb(17, 45, 78)",fontWeight:"600"}}>{name}</h3>
      <h6 style={{color:"rgb(17, 45, 78)",fontWeight:"600"}}>Rating: {rating} ⭐</h6>
      <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "150px",color:"rgb(17, 45, 78)",fontWeight:"600" }}>{bio}</p>
      <div className="prof-buttons">
        {/* <button className="primary">Connect</button> */}
        <Link to={`/profile/${username}`}>
          <button className="ghost" style={{color:"white",fontWeight:"600",padding:"15px",backgroundColor:"rgb(17, 45, 78)"}}>View Profile</button>
        </Link>
      </div>
      <div className="profskills" style={{backgroundColor:"rgb(249, 247, 247)"}}>
        <h6 style={{color:"rgb(17, 45, 78)",fontWeight:"600"}}>Skills</h6>
        <div className="profskill-boxes">
          {skills.map((skill, index) => (
            <div key={index} className="profskill-box" style={{color:"white",fontWeight:"600",backgroundColor:"rgb(17, 45, 78)"}}>
              <span className="skill" style={{color:"white",fontWeight:"600",backgroundColor:"rgb(17, 45, 78)"}}>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
