import React from "react";
import "./Box.css";

const Box = ({ head, date, spec, desc, skills, score }) => {
  return (
    <div className="box">
      <h5 style={{ margin: "0.6rem" }}>{head}</h5>
      <div className="details">
        <p>{spec}</p>
        <p>{date}</p>
      </div>

      <p className="desc">{desc}</p>
      {skills && (
        <>
          <p className="details">
            <i>Skills Used:</i>
          </p>
          <div className="boxskill-boxes">
            {skills?.map((skill, index) => (
              <div key={index} className="skill-box">
                <span className="skill">{skill}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {score && (
        <p className="details">
          Grade / Percentage: {score}        </p>
      )}
    </div>
  );
};

export default Box;
