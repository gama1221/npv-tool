import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerService from "./CustomerService";
import { FaSpinner } from "react-icons/fa";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ViewCustomerInformation from "./ViewCustomerInformation";
import AddCustomerInformation from "./AddCustomerInformation";
import { ToastContainer, toast } from "react-toastify";
const CustomerComponent = () => {
  const initialCustomerState = {
    Id: null,
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    registerDate: "",
  };
  const [customers, setCustomers] = useState([]);
  const [temenosCustomer, setTemenosCustomer] = useState();
  const [temenosCustomerParams, setTemenosCustomerParams] = useState();
  const [customerErrorLoading, setCustomerErrorLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [submitted, setSubmitted] = useState(false);
  const { navigate } = useNavigate();
  const [customer, setCustomer] = useState(initialCustomerState);

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const handleCustomerInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };
  const saveCustomer = () => {
    var data = {
      customerId: customer.customerId,
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      gender: customer.gender,
      registerDate: customer.registerDate,
    };
    CustomerService.addCustomer(data)
      .then((response) => {
        setCustomer({
          id: response.data.id,
          customerId: response.data.customerId,
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
          gender: response.data.gender,
          registerDate: new Date(),
        });
        if (response.status === 200) {
          toast.success("Added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "addCustomerInformation",
          });
          showCustomers();
        }
      })
      .catch((e) => {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "updateCustomerInformation",
        });
      });
  };
  const handleCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };
  const handleCustomerCloseModal = () => {
    setIsCustomerModalOpen(false);
  };

  const showCustomers = () => {
    setCustomerErrorLoading(true);
    setTimeout(() => {
      CustomerService.getCustomers()
        .then((response) => {
          debugger;
          if (response.status === 200) {
            setCustomers(response.data);
            setCustomerErrorLoading(false);
          } else {
            setCustomerErrorLoading(false);
            setError("Something went wrong");
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            setError("Customer not found");
            setCustomerErrorLoading(false);
          } else if (error.status === 400) {
            setError("Something went wrong");
            setCustomerErrorLoading(false);
          } else if (error.status === 401) {
            navigate("/login");
          } else if (error.status === 403) {
            navigate("/login");
          }
        });
    }, 2000);
  };
  useEffect(() => {
    showCustomers();
  }, []);

  return (
    <div>
      {/* <header className="px-4 bg-gray-50 border border-gray-200 p-2 "></header> */}
      <div className="mx-w-[1240px] mx-auto grid gap-1 ease-in-out px-4">
        <div className="w-full border-2 shadow-xl flex flex-col my-4 rounded-lg">
          <span className="px-4 text-green-600 cursor-pointer hover:font-extrabold">
            <PersonAddAltOutlinedIcon
              fontSize="small"
              onClick={handleCustomerModal}
            />
          </span>
          <header className="text-2xl bg-[#00563F] text-white ease-in-out border text-center capitalize">
            Customers
          </header>
          <div className="px-8">
            <p className="text-sm font-bold m-4 text-green-600">
              List of customers on Non Performing Loan status
            </p>
            {error && <p className="text-red-500">{error}</p>}
            {!error && customerErrorLoading ? (
              <div className="flex justify-center">
                <span className="text-green-700">
                  <FaSpinner
                    className="animate-spin rounded-full h-6 w-6 text-green-600"
                    fontSize="small"
                    data-toggle="tooltip"
                    title="Click it to sign in"
                  />
                  Loading...
                </span>
              </div>
            ) : (
              !error &&
              !customerErrorLoading && (
                <ViewCustomerInformation customers={customers} />
              )
            )}
          </div>
        </div>
      </div>
      <AddCustomerInformation
        isCustomerModalOpen={isCustomerModalOpen}
        handleCustomerCloseModal={handleCustomerCloseModal}
        saveCustomer={saveCustomer}
        handleCustomerInputChange={handleCustomerInputChange}
        customer={customer}
      />
      <ToastContainer />
    </div>
  );
};
export default CustomerComponent;
