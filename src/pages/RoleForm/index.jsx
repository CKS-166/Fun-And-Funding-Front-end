/* eslint-disable react/prop-types */
import logo from "../../assets/OnlyLogo.png";
import RoleBacker from "../../assets/backerRole.png";
import RoleGameOwner from "../../assets/gameowner.png";
import RoleCard from "../../components/RoleCard";

function RoleForm({ onClose, onOpenBackerForm, onOpenOwnerForm, onBack }) {
  const handleBackerClick = () => {
    onClose(); // Close role selection form
    onOpenBackerForm(); // Open BackerForm
  };

  const handleOwnerClick = () => {
    onClose(); // Close role selection form
    onOpenOwnerForm(); // Open OwnerForm
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      {/* Popup Container */}
      <div className="bg-white p-10 rounded-3xl relative shadow-lg w-[800px]">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">
          &times; {/* X Symbol */}
        </button>
        {/* Logo and Welcome Message */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-[78px] h-[88px] mb-[2.5rem]"
          />
          <h2 className="text-4xl font-bold text-gray-800">
            Who do you wanna be?
          </h2>
          <p className="text-gray-500 mt-1">
            Please select one of the two roles below to get started!
          </p>
        </div>
        {/* Back Button */}
        <div className="flex absolute top-4 left-4 justify-center mt-4">
          <span
            type="button"
            onClick={onBack} // Trigger the onBack function when clicked
            className="text-[#1BAA64] cursor-pointer py-2 px-4 rounded-md transition-all duration-200"
          >
            Back
          </span>
        </div>

        {/* Role Selection */}
        <div className="flex justify-between">
          <RoleCard
            Img={RoleBacker}
            Title={"Backer"}
            onClick={handleBackerClick}
            Description={"Fund and buy game projects"}
          />
          <RoleCard
            Img={RoleGameOwner}
            onClick={handleOwnerClick}
            Title={"Game Owner"}
            Description={"Create and showcase game projects"}
          />
        </div>
      </div>
    </div>
  );
}

export default RoleForm;
