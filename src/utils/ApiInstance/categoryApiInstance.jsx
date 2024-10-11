import axios from "axios";
const categoryApiInstace = axios.create({
    baseURL: `https://localhost:7044/api/categories`,
});

export default categoryApiInstace;