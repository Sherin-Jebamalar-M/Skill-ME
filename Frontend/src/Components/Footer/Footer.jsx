import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Navbar variant="dark" style={{ backgroundColor: "#DBE2EF" }}>
        <Container className="mx-auto w-100 d-flex justify-content-center">
          <div className="text-center" style={{ fontFamily: "Montserrat, sans-serif", color: "rgb(17, 45, 78)",fontSize:"13px" }}>
            Copyright &copy; 2025 SkillME. All rights reserved.
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
