import { useState, useEffect } from "react";
import walletApiInstance from "../../ApiInstance/walletApiInstance";
import withdrawRequestApiInstance from "../../ApiInstance/withdrawRequestApiInstance";
import { useLoading } from "../../../contexts/LoadingContext";

export const useWalletApi = (endpoint, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isLoading, setIsLoading } = useLoading()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await walletApiInstance.request({
          url: endpoint,
          method,
          data: body,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body]);

  return { data, error };
};

export const useWithdrawRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const createWithdrawRequest = async (requestData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await withdrawRequestApiInstance.post("/wallet-request", requestData);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createWithdrawRequest, loading, error, response };
};


