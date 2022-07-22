import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { logoutUser } from "../features/userSlice";
const NavBarComponent = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      {user ? (
        <div className="btn-container">
          <button
            className="btn user-btn"
            type="button"
            onClick={() => setShowLogout(!showLogout)}
          >
            {user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              logout
            </button>
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding-right: 3rem;
  padding-top: 1rem;

  display: flex;
  justify-content: right;
  .btn-container {
    position: relative;
  }
  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;

    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;

export default NavBarComponent;
