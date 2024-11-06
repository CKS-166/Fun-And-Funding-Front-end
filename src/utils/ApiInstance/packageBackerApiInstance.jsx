import axios from "axios";
const packageBackerApiInstance = axios.create({
    baseURL: `https://localhost:7044/api/orders`,
});

export default packageBackerApiInstance;