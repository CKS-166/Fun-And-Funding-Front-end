import React from "react";
import { useState } from "react";
import withdrawApiInstace from "../../utils/ApiInstance/withdrawApiInstance";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useParams } from "react-router";
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
const MarketplaceWithdrawButton = () => {
  const token = Cookies.get("_auth");
  const { id } = useParams();
  console.log("mp Id", id);
  const handleClick = async () => {
    const response = await withdrawApiInstace.post(
      `/marketplace/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data._isSuccess) {
      notify(response.data._message, "success");
    }
  };
  return (
    <div>
      <button
        onClick={handleClick}
        href="#"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-green rounded-lg hover:bg-primary-green/80"
      >
        Withdraw
      </button>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
};

export default MarketplaceWithdrawButton;
