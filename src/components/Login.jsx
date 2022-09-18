import styled from 'styled-components';
import colors from '../utils/colors';

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

const LoginButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 12px 20px;
    background: ${colors.primary};
    font-weight: bold;
    color: white;
    border: none;
    cursor: pointer;
`;

function HandleLogin(e) {
    e.preventDefault();
    fetch('http://localhost:8000/api/auth/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: e.target['email'].value,
            password: e.target['password'].value,
        }),
    })
        .then((res) => {
            if (res.ok) {
                window.location = '/home';
            } else {
                alert('Login/Password incorrect !');
            }
        })
        .catch((err) => err.json());
}

function Login() {
    return (
        <div id="formContainer">
            <StyledForm className="form" id="form" onSubmit={HandleLogin}>
                <StyledLabel>
                    adresse mail :
                    <input
                        name="email"
                        placeholder="exemple@mail.com"
                        required
                    ></input>
                </StyledLabel>
                <StyledLabel>
                    mot de passe:
                    <input
                        name="password"
                        placeholder="password"
                        required
                    ></input>
                </StyledLabel>
                <LoginButton>Ce connecter</LoginButton>
            </StyledForm>
        </div>
    );
}

export default Login;
