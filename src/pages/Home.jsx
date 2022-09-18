import Profile from '../assets/profile.png';
import styled from 'styled-components';
import colors from '../utils/colors';
import '../styles/reset.css';
import CreatePost from '../components/Post';

const Header = styled.div`
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
`;

const StyledNav = styled.nav`
    display: flex;
    justify-content: center;
`;

function Home() {
    return (
        <>
            <Header>
                <StyledNav>
                    <StyledButton>Accueil</StyledButton>
                    <StyledButton>Settings</StyledButton>
                </StyledNav>
                <h1>Home</h1>
                <SizedImg src={Profile} alt=""></SizedImg>
            </Header>
            <CreatePost />
        </>
    );
}

export default Home;
