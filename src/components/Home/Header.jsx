import Profile from '../../assets/profile.png';
import styled from 'styled-components';
import colors from '../../utils/colors';

const HeaderDiv = styled.div`
    width: 66%;
    border: solid 2px white;
    background-color: ${colors.darkgrey};
    color: white;
`;

const SizedImg = styled.img`
    width: 75px;
    height: 75px;
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
            <h1>Home</h1>
            <SizedImg src={Profile} alt=""></SizedImg>
        </HeaderDiv>
    );
}

export default Header;
