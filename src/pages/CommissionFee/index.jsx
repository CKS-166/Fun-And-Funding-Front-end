/* eslint-disable no-unused-vars */
import React from "react";
import CustomPaginationActionsTable from "../../components/AdminTable";
import commissionApiInstance from "../../utils/ApiInstance/commisionApiInstance";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "@mui/material";
import InputField from "../../components/InputField";
import PercentIcon from "@mui/icons-material/Percent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SelectWithIcon from "../../components/SelectionCommision";
import { set } from "react-hook-form";

const notify = (message, type) => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontWeight: "bold",
    },
  };

  if (type === "warn") {
    toast.warn(message, options);
  } else if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  }
};
function CommissionFee() {
  const [dataLoad, setDataLoad] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [rate, setRate] = useState();
  const [type, setType] = useState(3);
  const [selectId, setSelectId] = useState("");
  const [commision, setCommision] = useState({
    rate: "",
    commissionType: "",
    version: "",
  });
  const handleUpdateCloseDialog = () => {
    setUpdateDialog(false);
  };
  const handleUpdateOpenDialog = () => {
    setUpdateDialog(true);
  };
  const handleUpdateChange = (e) => {
    setRate(e.target.value);
  };

  const handleLatestChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    fetchLatestVersion(newType);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Parse the value to the correct type for specific fields
    const parsedValue = isNaN(value) ? value : Number(value);

    setCommision((prevCommision) => ({
      ...prevCommision,
      [name]: parsedValue,
    }));
  };
  const fetchCommisonFee = async () => {
    try {
      const response = await commissionApiInstance.get("");
      setDataLoad(response.data._data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLatestVersion = async (type) => {
    try {
      if (type === 3) {
        fetchCommisonFee();
      } else {
        const response = await commissionApiInstance.get(
          `/applied-commission-fee?type=${type}`
        );

        console.log(response.data._data);
        if (response.data._isSuccess) {
          setDataLoad([response.data._data]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const mappingData = dataLoad.map((data) => ({
    Id: data.id,
    Rate: data.rate,
    Version: data.version,
    Type: data.commissionType === 0 ? "Funding" : "Marketplace",
    "Last Updated": formatDate(data.updateDate),
  }));

  useEffect(() => {
    if (type !== undefined) {
      fetchLatestVersion(type);
      notify("Commission fee loaded successfully", "success");
    }
  }, [type]);

  const handleRowClick = async (id) => {
    console.log("Row clicked with ID:", id);
    try {
      setSelectId(id);
      handleUpdateOpenDialog();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await commissionApiInstance.put(
        `/${selectId}`,
        { rate }, // Send as an object
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(selectId, rate);
      if (response.data._isSuccess) {
        console.log(response.data._data);
        notify("Commission fee updated successfully", "success");
        handleUpdateCloseDialog();
        fetchCommisonFee(); // Refresh data
      }
    } catch (error) {
      console.log(error);
      notify("Error updating commission fee", "error");
    }
  };
  const handleSubmit = async () => {
    console.log("submit", commision);
    try {
      const response = await commissionApiInstance.post("", commision);
      if (response.data._isSuccess) {
        console.log(response.data._data);
        notify("Commision fee created successfully", "success");
        fetchCommisonFee();
        handleCloseDialog();
      }
    } catch (error) {
      console.log(error);
      notify("Error creating commision fee", "error");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold my-6 text-center text-[#1BAA64]">
        Commission Fee Management
      </h1>
      <div className="flex justify-center flex-col gap-4">
        <SelectWithIcon
          name="commissionType"
          formControlStyles={{}}
          label="Type"
          startIcon={<MonetizationOnIcon />}
          value={type}
          onChange={handleLatestChange}
          options={[
            { value: 0, label: "Funding Commission" },
            { value: 1, label: "Marketplace Commission" },
            { value: 3, label: "All Commission" },
          ]}
        />
        <button
          type="button"
          className=" font-medium bg-[#1BAA64] text-white py-3 my-4 rounded-lg mt-6 hover:bg-white hover:text-[#1BAA64] border border-[#1BAA64] transition-all duration-200"
          onClick={handleOpenDialog}
        >
          Create New Commision
        </button>
      </div>

      <CustomPaginationActionsTable
        data={mappingData}
        handleRowClick={handleRowClick}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="py-10 px-10 bg-white rounded-3xl relative shadow-lg w-[45rem]">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl text-center my-4 font-bold text-gray-800 ">
                Create Commision Fee
              </h2>

              <div className="w-full flex flex-col gap-4">
                <InputField
                  name="rate"
                  formControlStyles={{ width: "100%" }}
                  label="Rate"
                  startIcon={<PercentIcon />}
                  value={commision.rate}
                  onChange={handleChange}
                  placeholder="Rate"
                  inputProps={{
                    inputMode: "decimal",
                    pattern: "[0-9]*[.,]?[0-9]*",
                  }}
                />
                <SelectWithIcon
                  name="commissionType"
                  formControlStyles={{ width: "100%" }}
                  label="Type"
                  startIcon={<MonetizationOnIcon />}
                  value={commision.commissionType}
                  onChange={handleChange}
                  options={[
                    { value: 0, label: "Funding Commission" },
                    { value: 1, label: "Marketplace Commission" },
                  ]}
                />

                <InputField
                  name="version"
                  formControlStyles={{ width: "100%" }}
                  label="Version"
                  value={commision.version}
                  onChange={handleChange}
                  startIcon={<FormatListNumberedIcon />}
                  placeholder="Version"
                  inputProps={{
                    inputMode: "decimal",
                    pattern: "[0-9]*[.,]?[0-9]*",
                  }}
                />
              </div>

              <div className="flex justify-around gap-4 mt-6">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
      <Dialog open={openUpdateDialog} onClose={handleUpdateCloseDialog}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="py-10 px-10 bg-white rounded-3xl relative shadow-lg w-[45rem]">
            <form onSubmit={handleUpdateSubmit}>
              <h2 className="text-xl text-center my-4 font-bold text-gray-800 ">
                Update Commision Fee
              </h2>

              <div className="w-full flex flex-col gap-4">
                <InputField
                  name="rate"
                  formControlStyles={{ width: "100%" }}
                  label="Rate"
                  startIcon={<PercentIcon />}
                  value={rate}
                  onChange={handleUpdateChange}
                  placeholder="Rate"
                  inputProps={{
                    inputMode: "decimal",
                    pattern: "[0-9]*[.,]?[0-9]*",
                  }}
                />
              </div>

              <div className="flex justify-around gap-4 mt-6">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleUpdateCloseDialog}
                  className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
}

export default CommissionFee;
