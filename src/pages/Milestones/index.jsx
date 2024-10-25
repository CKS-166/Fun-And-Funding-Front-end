/* eslint-disable no-unused-vars */
import React from "react";
import "./index.css";
import AdminTable from "../../components/AdminTable";
function Milestone() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1BAA64]">
        Milestones Management
      </h1>
      <AdminTable></AdminTable>
    </>
  );
}

export default Milestone;
