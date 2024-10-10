import { createContext } from "react";

const initialProject = {
  id: "",
  name: "",
  description: "",
  introduction: "",
  startDate: null,
  endDate: null,
  target: 0,
  balance: 0,
  status: null,
  bankAccount: {
    id: "",
    createdDate: null,
    bankNumber: "",
    bankCode: "",
  },
  packages: [],
  fundingFiles: [],
  email: null,
  user: {
    id: "",
    createdDate: null,
    userName: "",
    email: "",
    bio: null,
    fullName: "",
    avatar: null,
    address: "",
    gender: null,
    dayOfBirth: null,
    userStatus: null,
    wallet: null,
  },
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
