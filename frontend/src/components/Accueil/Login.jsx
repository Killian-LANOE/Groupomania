import styled from "styled-components";
import colors from "../../utils/colors";

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

function HandleLogin(e) {
  e.preventDefault();
  fetch("https://groupomania-db.onrender.com/api/auth/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: e.target["email"].value,
      password: e.target["password"].value,
    }),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        window.location = "/home";
      } else {
        alert("Login/Password incorrect !");
      }
    })
    .catch((err) => err.json());
}

function Login() {
  return (
    <PopUp>
      <h1>Login</h1>
      <StyledForm className="form" id="form" onSubmit={HandleLogin}>
        <StyledLabel>
          adresse mail :
          <input
            type="mail"
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
            required
          ></input>
        </StyledLabel>
        <LoginButton>Se connecter</LoginButton>
      </StyledForm>
    </PopUp>
  );
}

export default Login;
