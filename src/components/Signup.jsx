import styled from 'styled-components';
import colors from '../utils/colors';

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 100%;
`;

const FormContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SignupButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 12px 20px;
    background: ${colors.primary};
    font-weight: bold;
    color: white;
    border: none;
    cursor: pointer;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function HandleSignup(e) {
    e.preventDefault();
    fetch('http://localhost:8000/api/auth/signup', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            name: e.target['name'].value,
            firstName: e.target['firstName'].value,
            email: e.target['email'].value,
            password: e.target['password'].value,
        }),
    });
}

function Signup() {
    return (
        <FormContainerDiv>
            <StyledForm onSubmit={HandleSignup}>
                <StyledLabel>
                    Nom :
                    <input type="text" name="name" placeholder="Nom"></input>
                </StyledLabel>
                <StyledLabel>
                    Prénom :
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                    ></input>
                </StyledLabel>
                <StyledLabel>
                    adresse mail :
                    <input
                        type="mail"
                        name="email"
                        placeholder="exemple@mail.com"
                    ></input>
                </StyledLabel>
                <StyledLabel>
                    mot de passe:
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    ></input>
                </StyledLabel>
                <SignupButton>S'inscrire</SignupButton>
            </StyledForm>
        </FormContainerDiv>
    );
}

export default Signup;
