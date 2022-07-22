import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const SharedLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <main className="dashboard">
        <Sidebar />
        <div className="dashboad-page">
          <Outlet />
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default SharedLayout;
