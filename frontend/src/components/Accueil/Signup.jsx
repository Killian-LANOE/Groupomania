import styled from 'styled-components';
import colors from '../../utils/colors';

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 100%;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SignupButton = styled.button`
    padding: 12px 20px;
    margin: 20px 0;
    background: #fff;
    font-weight: bold;
    color: black;
    border: none;
    border-radius: 20px;
    &:hover {
        cursor: pointer;
    }
`;

const PopUp = styled.div`
    background: black;
    padding: 10px 30px;
    border-radius: 20px;
    margin-bottom: 30px;
    box-shadow: rgb(31 32 40) 0px 5px 30px -10px;
    border: 2px solid ${colors.tertiary};
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
        <PopUp>
            <h1>Signup</h1>
            <StyledForm onSubmit={HandleSignup}>
                <StyledLabel>
                    adresse mail :
                    <input
                        type="text"
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                        title="adresse email invalide"
                        name="email"
                        placeholder="exemple@mail.com"
                        required
                    ></input>
                </StyledLabel>
                <StyledLabel>
                    mot de passe:
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        minLength="6"
                        required
                    ></input>
                </StyledLabel>
                <SignupButton>S'inscrire</SignupButton>
            </StyledForm>
        </PopUp>
    );
}

export default Signup;
