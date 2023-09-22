import axios from "axios";

const URL = 'http://192.168.1.103:8000/api';

const axiosApi = axios.create({
  baseURL: URL,
})

export  const get = async (url) => {

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      };
    const res = await axiosApi.get(url,  config);
    
    return res;
  };

  