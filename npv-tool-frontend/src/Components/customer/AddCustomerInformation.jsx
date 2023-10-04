import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import NPVModal from "../Modal/NPVModal";
import NpvTextField from "../common/NpvTextField";
const AddCustomerInformation = ({
  isCustomerModalOpen,
  handleCustomerCloseModal,
  saveCustomer,
  handleCustomerInputChange,
  customer,
}) => {
  return (
    <NPVModal
      isOpen={isCustomerModalOpen}
      onClose={handleCustomerCloseModal}
      title="Add customer information"
    >
      <div className="grid grid-cols-1 gap-4 submit-form">
        <div className="submit-form ">
          <>
            <form onSubmit={saveCustomer}>
              <div className="relative center justify-center flex-1 w-full max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <NpvTextField
                  id="customerId"
                  label="Customer Number"
                  value={customer.customerId}
                  onChange={handleCustomerInputChange}
                  name="customerId"
                />
                <NpvTextField
                  id="firstName"
                  label="First Name"
                  value={customer.firstName}
                  onChange={handleCustomerInputChange}
                  name="firstName"
                />
                <NpvTextField
                  id="middleName"
                  label="Middle Name"
                  value={customer.middleName}
                  onChange={handleCustomerInputChange}
                  name="middleName"
                />
                <NpvTextField
                  id="lastName"
                  label="Last Name"
                  value={customer.lastName}
                  onChange={handleCustomerInputChange}
                  name="lastName"
                />
                <NpvTextField
                  id="phoneNumber"
                  label="Phone Number"
                  value={customer.phoneNumber}
                  onChange={handleCustomerInputChange}
                  name="phoneNumber"
                />

                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <InputLabel id="companyType" color="success">
                    {" "}
                    Gender
                  </InputLabel>
                  <Select
                    color="success"
                    // onChange={handleCustomerInputChange}
                    onChange={(event) => (customer.gender = event.target.value)}
                    labelId="companyType"
                    id="gender"
                    label="Gender"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex justify-center pt-3">
                <button
                  className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  // onClick={() => {
                  //   saveCustomer();
                  //   refreshTheModal();
                  // }}
                >
                  Save
                </button>
              </div>
            </form>
          </>
        </div>
      </div>
    </NPVModal>
  );
};

export default AddCustomerInformation;
