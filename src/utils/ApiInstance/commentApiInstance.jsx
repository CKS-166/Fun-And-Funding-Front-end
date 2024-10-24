import axios from "axios";
const commentApiInstace = axios.create({
    baseURL: `https://localhost:7044/api/comment`,
});

export default commentApiInstace;