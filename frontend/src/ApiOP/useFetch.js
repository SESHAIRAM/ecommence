import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useFetch = () => {
  const [responseData, setResponseData] = useState([]);
  const [isLoadingApi, setisLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const baseURI = "http://localhost:8000";
  const Navigate = useNavigate()


  const serverRequest = (serverRequestParam) => {
    const fetchURL = baseURI + serverRequestParam.apiUrl;
    setApiKey(serverRequestParam.apikey);
    setisLoading(false);
    fetch(fetchURL, serverRequestParam)
      .then((response) => {
        return response.json();
      })
      .then((respdata) => {
        setResponseData(respdata);
        setisLoading(true);
      })
      .catch((error) => {
        setisLoading(false);
        setFetchError(error.message);
      });
  };

  return { responseData, isLoadingApi, apiKey, fetchError, serverRequest };
};




export default useFetch;
