import axios from "axios";

// const API_URL = "http://localhost:8384/cbe/api/loan/";
const API_URL = "http://10.3.6.135:8384/cbe/api/loan/";

// const API_URL = "http://10.3.6.135:9999/cbe/api/loan/";
// const API_URL = "http://localhost:9999/cbe/api/loan/";

const getCustomers = () => {
    return axios.get(API_URL + "customer/");
}
const getCustomer = (id) => {
    return axios.get(API_URL + "customer/" + id)
};
const getLoans = (customerId) => {
    return axios.get(API_URL + 'loan'.concat('/', customerId));
}
const addLoans = (data, customerId) => {
    return axios.post(`${API_URL}loan/${customerId}`, data);
}
const addCollateral = (data, loanId) => {
    return axios.post(`${API_URL}collateral/${loanId}`, data);
}
const getCollateral = (loanId) => {
    return axios.get(API_URL + 'collateral'.concat('/', loanId));
    // return axios.get(API_URL + 'collateral' + '/' + loanId);
}
const getLoanInfoFromTemenos = (customerId) => {
    return axios.get(API_URL + 'loan/integrate'.concat('/', customerId));
}
const getCollateralParamsFromTemenos = (customerId) => {
    return axios.get(API_URL + 'loan/collateral'.concat('/', customerId));
}



const addCustomer = (data) => {
    return axios.post(`${API_URL}customer/`, data);
  };
const CustomerService = {
    getCustomers,
    getCustomer,
    getLoans,
    getCollateral,
    addCustomer,
    addLoans,
    addCollateral,
    getLoanInfoFromTemenos,
    getCollateralParamsFromTemenos,
}
export default CustomerService;  