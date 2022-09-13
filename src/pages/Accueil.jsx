import styled from 'styled-components';
import logo from '../assets/logo_red-black.svg';
import React, {useState} from 'react';

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    &:hover {
        cursor: pointer;
        color: blue;
    }
`;

const StyledNav = styled.nav`
    display: flex;
    justify-content: flex-end;
`;

function Accueil() {
    const [title, setTitle] = useState('Login');
    const setSignup = (e) => {
        e.preventDefault();
        setTitle('Signup');
    };
    const setLogin = (e) => {
        e.preventDefault();
        setTitle('Login');
    };

    return (
        <div>
            <StyledNav>
                <StyledButton onClick={setLogin}>Login</StyledButton>
                <StyledButton onClick={setSignup}>Signup</StyledButton>
            </StyledNav>
            <h1>{title}</h1>
            <StyledLabel>
                adresse mail :
                <input type="text" placeholder="exemple@mail.com"></input>
            </StyledLabel>
            <StyledLabel>
                mot de passe:
                <input inputMode="text" placeholder="password"></input>
            </StyledLabel>
            <img src={logo} alt="logo Groupomania" />
        </div>
    );
}

export default Accueil;
