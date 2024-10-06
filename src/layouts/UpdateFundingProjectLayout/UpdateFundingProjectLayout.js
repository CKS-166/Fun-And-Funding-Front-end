const requestBody = {
  categories: [{ id: "" }],
  name: "string",
  description: "string",
  introduction: "string",
  startDate: "2024-09-26T02:37:32.825Z",
  endDate: "2024-09-26T02:37:32.825Z",
  target: 0.01,
  balance: 0,
  bankAccount: {
    bankNumber: "string",
    bankCode: "string",
  },
  packages: [
    {
      name: "string",
      description: "string",
      requiredAmount: 0,
      limitQuantity: 0,
      packageTypes: 0,
      rewardItems: [
        {
          name: "string",
          description: "string",
          quantity: 0,
          imageFile: "string",
        },
      ],
    },
  ],
  fundingFiles: [
    {
      name: "string",
      url: "string",
      filetype: 0,
    },
  ],
  email: "string",
};

export const editorList = [
  { name: "Basic Information", link: "/account/projects/update/basic-info" },
  { name: "Media files", link: "/account/projects/update/media-files" },
  { name: "Bank Account", link: "/account/projects/update/bank-account" },
  {
    name: "Donation Packages",
    link: "/account/projects/update/donation-packages",
  },
];

export const milestoneList = [
  { name: "Milestone 1", link: "/account/projects/update/milestone1" },
  { name: "Milestone 2", link: "/account/projects/update/milestone2" },
  { name: "Milestone 3", link: "/account/projects/update/milestone3" },
  { name: "Milestone 4", link: "/account/projects/update/milestone4" },
  { name: "Milestone 5", link: "/account/projects/update/milestone5" },
];
