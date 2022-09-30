import '../styles/reset.css';
import Posts from '../components/Home/Posts';
import Header from '../components/Header';
import styled from 'styled-components';
import colors from '../utils/colors';

const Title = styled.div`
    text-align: center;
`;
const CenteringDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${colors.secondary};
`;

const StyledDiv = styled.div`
    @media (max-width: 426px) {
        width: 100%;
    }
    width: 70%;
    background: ${colors.tertiary};
`;

function Home() {
    return (
        <CenteringDiv>
            <StyledDiv>
                <Header />
                <Title>
                    <h1>Home</h1>
                </Title>
                <Posts />
            </StyledDiv>
        </CenteringDiv>
    );
}

export default Home;
