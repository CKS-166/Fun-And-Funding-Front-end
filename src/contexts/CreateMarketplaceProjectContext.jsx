import { useState, useContext, createContext } from "react";

const CreateMarketplaceProjectContext = createContext();

export const useCreateMarketplaceProject = () =>
  useContext(CreateMarketplaceProjectContext);

export const MarketplaceProjectProvider = ({ children }) => {
  const [formIndex, setFormIndex] = useState(0);
  const [marketplaceProject, setMarketplaceProject] = useState({
    name: "",
    description: "",
    introduction: "",
    price: 0,
    fundingProjectId: "",
    marketplaceFiles: [
      {
        id: "",
        name: "",
        url: "",
        filetype: 0,
      },
    ],
    bankAccount: {
      bankNumber: "",
      bankCode: "",
    },
    categories: [{ id: "", name: "" }],
  });

  return (
    <CreateMarketplaceProjectContext.Provider
      value={{
        marketplaceProject,
        setMarketplaceProject,
        formIndex,
        setFormIndex,
      }}
    >
      {children}
    </CreateMarketplaceProjectContext.Provider>
  );
};
