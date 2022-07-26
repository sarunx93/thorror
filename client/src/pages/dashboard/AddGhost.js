import React from "react";
import styled from "styled-components";
import FormRow from "../../components/FormRow";
import Textbox from "../../components/Textbox";
const addGhost = () => {
  return (
    <Wrapper>
      <h1>Add a ghost profile</h1>
      <form>
        <h3>Add ghost</h3>
        <div className="form-center">
          <FormRow name="ghost" type="text" />
          <Textbox name="description" type="text" />
          <FormRow name="image" type="file" />
        </div>
      </form>
      <div className="btn-container">
        <button className="btn clear-btn">clear</button>
        <button className="btn submit-btn">submit</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .clear-btn:hover {
    background: red;
    color: white;
  }
  .submit-btn:hover {
    color: white;
  }
`;

export default addGhost;
