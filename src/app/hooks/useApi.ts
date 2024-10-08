import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ad707e099b18f4ca4b085266d8b655a5-3510328.eu-north-1.elb.amazonaws.com', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' } 
});

export default axiosInstance;