/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Dialog } from "@mui/material";
import ReactQuill from "react-quill";
function ReportForm({ isOpen, onClose }) {
  const handleSubmit = () => {};
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-10 rounded-3xl relative shadow-lg w-[720px]">
          <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">
            Report Form
          </h1>
          <button
            onClick={onClose}
            className="absolute top-4 text-[#1BAA64] right-4 text-xl"
          >
            &times;
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Report Type
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select a report type</option>
                <option value="bug">Bug</option>
                <option value="feedback">Feedback</option>
                <option value="feature">Feature Request</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <ReactQuill />
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-[#1BAA64] text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

export default ReportForm;
