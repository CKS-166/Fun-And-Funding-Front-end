export const editorList = [
  {
    name: "Basic Information",
    link: (id) => `/account/projects/update/${id}/basic-info`,
  },
  {
    name: "Media files",
    link: (id) => `/account/projects/update/${id}/media-files`,
  },
  {
    name: "Bank Account",
    link: (id) => `/account/projects/update/${id}/bank-account`,
  },
  {
    name: "Donation Packages",
    link: (id) => `/account/projects/update/${id}/donation-packages`,
  },
];

export const milestoneList = [
  { name: "Milestone 1", link: "/account/projects/update/milestone1" },
  { name: "Milestone 2", link: "/account/projects/update/milestone2" },
  { name: "Milestone 3", link: "/account/projects/update/milestone3" },
  { name: "Milestone 4", link: "/account/projects/update/milestone4" },
  { name: "Milestone 5", link: "/account/projects/update/milestone5" },
];
