import styled from 'styled-components';
import logo from '../assets/logo_red-black.svg';
import React, {useState} from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import '../styles/reset.css';

const NavButton = styled.button`
    border: none;
    background-color: transparent;
    color: white;
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
    const [form, setForm] = useState(<Login />);
    const setSignup = (e) => {
        e.preventDefault();
        setTitle('Signup');
        setForm(<Signup />);
    };
    const setLogin = (e) => {
        e.preventDefault();
        setTitle('Login');
        setForm(<Login />);
    };

    return (
        <>
            <StyledNav>
                <NavButton onClick={setLogin}>Login</NavButton>
                <NavButton onClick={setSignup}>Signup</NavButton>
            </StyledNav>
            <h1>{title}</h1>
            {form}

            <img src={logo} alt="logo Groupomania" />
        </>
    );
}

export default Accueil;
