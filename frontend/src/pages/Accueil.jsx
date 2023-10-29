import styled from "styled-components";
import React, { useState } from "react";
import Login from "../components/Accueil/Login";
import Signup from "../components/Accueil/Signup";
import "../styles/reset.css";
import colors from "../utils/colors.js";
import logo from "../assets/logo_white.png";

const ImgResize = styled.img`
  position: absolute;
  top: 0px;
  width: 300px;
  height: auto;
`;

const MenuButton = styled.button`
    border: 2px solid white;
    border-radius: 10px;
    background: ${colors.tertiary}
    color: black;
    margin: 0 10px;
    padding: 5px 15px ;
    &:hover {
        cursor: pointer;
        font-weight: bold;
        border: 2px solid ${colors.tertiary};
        padding: 10px 20px;
    }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 15px;
  background: linear-gradient(
    110deg,
    ${colors.primarydark},
    ${colors.primarydeepdark}
  );
  align-items: center;
  justify-content: center;
`;

function Accueil() {
  const [form, setForm] = useState();
  const setSignup = (e) => {
    e.preventDefault();
    setForm(<Signup />);
  };
  const setLogin = (e) => {
    e.preventDefault();
    setForm(<Login />);
  };

  return (
    <>
      <FormContainer>
        <ImgResize src={logo} alt="logo groupomania"></ImgResize>
        {form}
        <div>
          <MenuButton onClick={setLogin}>Login</MenuButton>
          <MenuButton onClick={setSignup}>Signup</MenuButton>
        </div>
      </FormContainer>
    </>
  );
}

export default Accueil;
