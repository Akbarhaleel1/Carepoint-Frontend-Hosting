import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://a245a7bb236114c15b4072de9adc4664-1481104342.eu-north-1.elb.amazonaws.com', 
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' } 
});

export default axiosInstance;