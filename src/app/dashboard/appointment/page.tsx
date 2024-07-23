import React from "react";
import Layout from "../../components/layout";
import Link from "next/link";
const Appointment: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Appointments</h1>
      <p className="mt-4">Here you can manage your appointments.</p>
      <Link href="/dashboard/appointment/messaging">Chat room</Link>
    </div>
  );
};

export default Appointment;
