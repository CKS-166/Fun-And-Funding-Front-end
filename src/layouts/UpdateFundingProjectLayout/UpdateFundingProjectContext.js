import { createContext } from "react";

const initialProject = {
  id: "",
  name: "",
  description: "",
  introduction: "",
  startDate: "",
  endDate: "",
  target: 0,
  balance: 0,
  status: null,
  bankAccount: { bankNumber: "", bankCode: "" },
  packages: [
    {
      id: "",
      name: "",
      requiredAmount: 0,
      url: "",
      limitQuantity: 0,
      updatedImage: null,
      rewardItems: [
        {
          id: "",
          name: "",
          description: "",
          quantity: 0,
          imageFile: null,
          imageUrl: "",
        },
      ],
    },
  ],
  fundingFiles: [],
};

const ProjectContext = createContext({
  project: initialProject,
  edited: false,
  isLoading: false,
  loadingStatus: 0,
  setProject: (data) => {},
  setIsEdited: (isEdited) => {},
  setIsLoading: (loading) => {},
  setLoadingStatus: (loadingStatus) => {},
});

export default ProjectContext;
