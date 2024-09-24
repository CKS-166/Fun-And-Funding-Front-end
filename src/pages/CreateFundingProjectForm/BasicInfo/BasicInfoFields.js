
export const fieldCategory = {
  fieldTitle: 'Project category*',
  fieldDescription: 'To help backers find your campaign, select a category that best represents your project.',
  inputs: [
    {
      name: 'category',
      placeholder: 'Category',
      inputeType: 'select'
    }
  ]
};

export const fieldProjectName = {
  fieldTitle: 'Project name*',
  fieldDescription: 'What is the title of your project?',
  inputs: [
    {
      name: 'projectName',
      placeholder: 'Project name...',
      inputeType: 'string'
    }
  ]
};

export const fieldProjectDescription = {
  fieldTitle: 'Project description*',
  fieldDescription: 'Provide a short description that best describes your campaign to your audience.',
  inputs: [
    {
      name: 'description',
      placeholder: 'Project description...',
      inputeType: 'textarea'
    }
  ]
};

export const fieldProjectGoalAmount = {
  fieldTitle: 'Fundraising goal*',
  fieldDescription: 'How much money would you like to raise for this campaign?',
  inputs: [
    {
      name: 'goalAmount',
      placeholder: 'Goal amount...',
      inputeType: 'number',
      postFix: 'VND'
    }
  ]
};

export const fieldProjectDuration = {
  fieldTitle: 'Project duration*',
  fieldDescription: 'How many days will you be running your campaign for?',
  inputs: [
    {
      name: 'startDate',
      placeholder: 'Start date',
      inputeType: 'datetime'
    },
    {
      name: 'endDate',
      placeholder: 'End date',
      inputeType: 'datetime'
    }
  ]
};