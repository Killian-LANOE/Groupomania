import styled from 'styled-components';
import colors from '../utils/colors';

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: transparent;
    color: white;
    align-items: center;
`;

const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    color: ${colors.white};
    padding: 10px;
    &:hover {
        cursor: pointer;
    }
`;

const StyledNav = styled.nav`
    display: flex;
    justify-content: center;
    border: 1px solid white;
    width: 100%;
    margin-bottom: 20px;
`;

function logout(e) {
    e.preventDefault();
    localStorage.clear();
    window.location = '/';
}

function homePage(e) {
    e.preventDefault();
    window.location = '/home';
}

function Header() {
    return (
        <HeaderDiv>
            <StyledNav>
                <StyledButton onClick={homePage}>Accueil</StyledButton>
                <StyledButton onClick={logout}>Logout</StyledButton>
            </StyledNav>
        </HeaderDiv>
    );
}

export default Header;
