import axios from "axios";
const milestoneApiInstace = axios.create({
  baseURL: `https://localhost:7044/api/milestone`,
});

export default  milestoneApiInstace;