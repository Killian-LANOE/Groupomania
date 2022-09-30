import Header from './Header';
import styled from 'styled-components';
import colors from '../utils/colors';
import dingo from '../assets/dingo.webp';

const ErrorDiv = styled.div`
    height: 100vh;
    background: linear-gradient(110deg, ${colors.primary}, ${colors.tertiary});
`;

const ErrorMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

const Interogation = styled.div`
    font-size: 5rem;
`;

const ImgResize = styled.img`
    height: 400px;
    width: 300px;
`;

const RetourAccueil = styled.div`
    margin-bottom: 30px;
    text-decoration-line: underline;
    text-underline-position: under;

    &:hover {
        font-weight: bold;
        cursor: pointer;
    }
`;

function Error() {
    function ReturnAccueil(e) {
        e.preventDefault();
        window.location = '/';
    }

    return (
        <ErrorDiv>
            <Header />
            <ErrorMessage>
                <Interogation>?</Interogation>
                <h2>Erreur 404: Page introuvable 😢</h2>
                <RetourAccueil onClick={ReturnAccueil}>
                    Retourner à l'Accueil
                </RetourAccueil>
                <ImgResize src={dingo} alt="interogation_image"></ImgResize>
            </ErrorMessage>
        </ErrorDiv>
    );
}

export default Error;
