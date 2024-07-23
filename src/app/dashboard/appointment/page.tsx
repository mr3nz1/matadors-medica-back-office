import React from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import Appointments from "@/app/components/AppointmentsTable";
const Appointment: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Appointments</h1>
      <Appointments />
    </div>
  );
};

export default Appointment;
