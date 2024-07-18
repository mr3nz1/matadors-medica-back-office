import React from "react";
import Layout from "../../components/layout";
import Home from "./home/page";
import Appointment from "./appointment/page";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default Dashboard;
