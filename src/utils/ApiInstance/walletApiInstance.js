import axios from "axios";

const walletApiInstance = axios.create({
  baseURL: 'https://localhost:7044/api/wallets',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`,
  },
})

export default walletApiInstance