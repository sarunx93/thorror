import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/userSlice";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Login = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/addGhost");
      }, 2500);
    }
  }, [user]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.warning("Please fill out all values");
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h1>{values.isMember ? "Login" : "Register"}</h1>
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            handleChange={handleChange}
            value={values.name}
          />
        )}
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          handleChange={handleChange}
          value={values.email}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          handleChange={handleChange}
          value={values.password}
        />
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}{" "}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 500px;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--primary-500);
  }
`;

export default Login;
