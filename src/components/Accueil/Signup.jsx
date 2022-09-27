import styled from 'styled-components';
import colors from '../../utils/colors';

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
            email: e.target['email'].value,
            password: e.target['password'].value,
        }),
    }).then((res) => {
        if (res.ok) {
            alert('Utilisateur Crée');
            window.location = '/';
        }
    });
}

function Signup() {
    return (
        <FormContainerDiv>
            <StyledForm onSubmit={HandleSignup}>
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
