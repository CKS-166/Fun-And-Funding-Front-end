import axios from "axios";
const projectMilestoneRequirementApiInstace = axios.create({
  baseURL: `https://localhost:7044/api/project-milestone-requirements`,
});

export default  projectMilestoneRequirementApiInstace;