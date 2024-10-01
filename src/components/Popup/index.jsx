/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import LoginForm from "../../pages/LoginForm";
import RoleForm from "../../pages/RoleForm";
import BackerForm from "../../pages/RegisterBacker";
import OwnerForm from "../../pages/RegisterGameOwner";

const AuthDialog = ({ isOpen, onClose }) => {
  const [currentForm, setCurrentForm] = useState("login");

  useEffect(() => {
    if (isOpen) {
      setCurrentForm("login"); // Open login form by default when the dialog is opened
    }
  }, [isOpen]);

  const openLoginForm = () => {
    setCurrentForm("login"); // Switch to LoginForm
  };
  // Switch to OwnerForm
  const openOwnerForm = () => {
    setCurrentForm("owner");
  };

  const openBackerForm = () => {
    setCurrentForm("backer"); // Switch to BackerForm
  };

  const closeDialog = () => {
    onClose(); // This will close the entire dialog
  };

  const goBackRole = () => {
    setCurrentForm("role"); // Go back to RoleForm
  };

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      {currentForm === "login" && (
        <LoginForm onClose={closeDialog} onOpenRoleSelection={goBackRole} />
      )}
      {currentForm === "backer" && (
        <BackerForm
          onClose={closeDialog}
          onOpenLogin={openLoginForm} // Switch to login when Sign In is clicked
          onBack={goBackRole}
        />
      )}
      {currentForm === "role" && (
        <RoleForm
          onClose={closeDialog}
          onOpenBackerForm={openBackerForm}
          onOpenOwnerForm={openOwnerForm}
          onBack={openLoginForm}
        />
      )}
      {currentForm === "owner" && (
        <OwnerForm
          onClose={closeDialog}
          onOpenLogin={openLoginForm}
          onBack={goBackRole}
        />
      )}
    </Dialog>
  );
};

export default AuthDialog;
