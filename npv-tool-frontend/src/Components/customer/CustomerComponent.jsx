import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CustomerService from './CustomerService';
import { BiMoneyWithdraw } from 'react-icons/bi';
import NPVModal from '../Modal/NPVModal';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import CustomerTable from './Customer/CustomerTable';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

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

    const [submitted, setSubmitted] = useState(false);

    const [customer, setCustomer] = useState(initialCustomerState);

    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

    const handleCustomerInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };
    const handleTemenosCustomerInputChange = (event) => {
        setTemenosCustomer(event.target.value);
    };
    
    const refreshTheModal = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }
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
        CustomerService
            .addCustomer(data)
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
                    // registerDate: response.data.registerDate,
                });
                setSubmitted(true);
                debugger
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleCustomerModal = () => {
        setIsCustomerModalOpen(true);
    }
    const handleCustomerCloseModal = () => {
        setIsCustomerModalOpen(false);
    }
    useEffect(() => {
        showCustomers();
    }, [])
    const showCustomers = () => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error => {
            console.log(error);
        })
    }
    // from temenos 
    const getCustomers = () => {
        CustomerService.getLoanInfoFromTemenos(temenosCustomer).then((response) => {    
            setTemenosCustomerParams(response.data.Body.WSLOANINFOResponse.CBECREDITNPVNOFILEENQType.gCBECREDITNPVNOFILEENQDetailType.mCBECREDITNPVNOFILEENQDetailType);
            debugger
        }).catch(error => {
            console.log(error);
        })
    }
    
    return (
        <div>
            {/* <div className='shadow-lg'>
                <div className="submit-form ">
                    <TextField
                        id="customerIdTemenos"
                        label="Customer Number"
                        variant="standard"
                        color="secondary"
                        size=""
                        required
                        sx={{ width: "45ch" }}
                        value={temenosCustomer}
                        onChange={handleTemenosCustomerInputChange}
                        name="customerIdTemenos"
                        className="w-full max-w-full"
                    />
                    <button className="btn btn-outline-success mb-2" onClick={getCustomers}>
                        Search
                    </button>
                </div>
            </div>
            <div>
                {temenosCustomerParams ?
                    <table className="table table-bordered table-striped mt-3">
                        <thead>
                            <th> Customer Id </th>
                            <th> Customer Name </th>
                            <th> Loan Account </th>
                            <th> Loan Type  </th>
                            <th> Loan Amount  </th>
                            <th> Register Date  </th>
                            <th> Principal Rate  </th>
                            <th> Maturity Date  </th>
                            <th> Risk Premium </th>
                            <th> Noo f Payments </th>
                            <th> Arrangement Id </th>
                            <th> Payment Term </th>
                            <th> Payment Frequency </th>
                            <th> Action </th>
                        </thead>
                        <tbody>
                            {
                                temenosCustomerParams.map(cust =>
                                    <tr key={cust.CustomerID}>
                                        <td> {cust.CustomerID} </td>
                                        <td> {cust.CustomerName} </td>
                                        <td> {cust.LoanAccount} </td>
                                        <td> {cust.LoanType} </td>
                                        <td> {cust.LoanAmount} </td>
                                        <td> {cust.RegisterDate} </td>
                                        <td> {cust.PrincipalRate} </td>
                                        <td> {cust.MaturityDate} </td>
                                        <td> {cust.RiskPremium} </td>
                                        <td> {cust.NoofPayments} </td>
                                        <td> {cust.ArrangementId} </td>
                                        <td> {cust.PaymentTerm} </td>
                                        <td> {cust.PaymentFrequency} </td>
                                        <td> 
                                        <Link className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} to={`/loan/${cust.CustomerID}`} data-toggle="tooltip" title="Click it for loan" >
                                            <BiMoneyWithdraw size={25} /> Loan
                                        </Link>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    : <p>Nt found</p>
                }
            </div> */}
            <h4 className="text-center"> Customers </h4>
            <button className="btn btn-outline-success btn-sm" onClick={handleCustomerModal}>
                <PersonAddAltOutlinedIcon fontSize='small'/> Customer
            </button>
            <NPVModal
                isOpen={isCustomerModalOpen}
                onClose={handleCustomerCloseModal}
                title="Add customer information"
            >
                <div className="grid grid-cols-1 gap-4 submit-form">
                    <div className="submit-form ">
                        {submitted ? (
                            <h4 className='text-success'>You submitted successfully!</h4>
                        ) : (
                            <>
                                <div className="relative center justify-center flex-1 w-full max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <TextField
                                        id="customerId"
                                        label="Customer Number"
                                        variant="standard"
                                        color="secondary"
                                        size=""
                                        required
                                        sx={{ width: "45ch" }}
                                        value={customer.customerId}
                                        onChange={handleCustomerInputChange}
                                        name="customerId"
                                        className="w-full max-w-full"
                                    />
                                    <TextField
                                        id="firstName"
                                        label="First Name"
                                        variant="standard"
                                        color="secondary"
                                        size=""
                                        required
                                        sx={{ width: "45ch" }}
                                        value={customer.firstName}
                                        onChange={handleCustomerInputChange}
                                        name="firstName"
                                        className="w-full max-w-full"
                                    />
                                    <TextField
                                        id="middleName"
                                        label="Middle Name"
                                        variant="standard"
                                        color="secondary"
                                        size=""
                                        required
                                        sx={{ width: "45ch" }}
                                        value={customer.middleName}
                                        onChange={handleCustomerInputChange}
                                        name="middleName"
                                        className="w-full max-w-full"
                                    />
                                    <TextField
                                        id="lastName"
                                        label="Last Name"
                                        variant="standard"
                                        color="secondary"
                                        size=""
                                        required
                                        sx={{ width: "45ch" }}
                                        value={customer.lastName}
                                        onChange={handleCustomerInputChange}
                                        name="lastName"
                                        className="w-full max-w-full"
                                    />
                                    <TextField
                                        id="phoneNumber"
                                        label="Phone Number"
                                        variant="standard"
                                        color="secondary"
                                        size=""
                                        required
                                        sx={{ width: "45ch" }}
                                        value={customer.phoneNumber}
                                        onChange={handleCustomerInputChange}
                                        name="phoneNumber"
                                        className="w-full max-w-full"
                                    />

                                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                        <InputLabel id="companyType" color="secondary">
                                            {" "}
                                            Gender
                                        </InputLabel>
                                        <Select
                                            color="secondary"
                                            // onChange={handleCustomerInputChange}
                                            onChange={(event) =>
                                                (customer.gender = event.target.value)
                                            }
                                            labelId="companyType"
                                            id="gender"
                                            label="Gender"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="male">
                                                Male
                                            </MenuItem>
                                            <MenuItem value="female">
                                                Female
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex justify-between pt-3">
                                    <button
                                        className="bg-[purple] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => {
                                            saveCustomer(); refreshTheModal()
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </>

                        )}
                    </div>

                </div>
            </NPVModal>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Customer Id </th>
                    <th> Customer First Name </th>
                    <th> Customer Middle Name </th>
                    <th> Customer Last Name </th>
                    <th> Customer Gender </th>
                    <th> Customer Phone Number </th>
                    <th> Customer Registration Date </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        customers.map(
                            customer =>
                                <tr key={customer.id}>
                                    <td> {customer.customerId} </td>
                                    <td> {customer.firstName} </td>
                                    <td> {customer.middleName} </td>
                                    <td> {customer.lastName} </td>
                                    <td> {customer.gender} </td>
                                    <td> {customer.phoneNumber} </td>
                                    <td> {customer.registerDate} </td>
                                    <td style={{ display: 'auto' }}>
                                        {/* <Link className="btn btn-info btn-sm" to={`/edit-customer/${customer.id}`} >Update</Link> */}
                                        <Link className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} to={`/loan/${customer.id}`} data-toggle="tooltip" title="Click it for loan" >
                                            <BiMoneyWithdraw size={25} /> Loan
                                        </Link>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            {
                //    customers && <CustomerTable data={customers} />
            }
        </div>
    )
}
export default CustomerComponent;