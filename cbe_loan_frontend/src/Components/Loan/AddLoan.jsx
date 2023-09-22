import NPVModal from "../NPVModal/NPVModal";
import { useState } from "react";

const AddLoan = () => {
    const [customers, setCustomers] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const [customer, setCustomer] = useState("initialCustomerState");

    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

    const handleCustomerInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };
    const refreshTheModal = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }
    const handleCustomerCloseModal=()=>{

    }
    const saveCustomer=()=>{

    }

    return (
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
                                <h1>
                                    Modal Body 
                                </h1>
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
    );
}

export default AddLoan;