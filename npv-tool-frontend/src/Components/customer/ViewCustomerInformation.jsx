import { BiMoneyWithdraw } from "react-icons/bi";
import { Link } from "react-router-dom";
const ViewCustomerInformation = ({ customers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-green-100">
        {/* <table className="table table-bordered table-striped"> */}
        <thead>
          <tr className="bg-green-200 ">
            <th className="px-2 py-4"> No </th>
            <th className="px-2 py-4"> Customer Id </th>
            <th className="px-2 py-4"> Customer First Name </th>
            <th className="px-2 py-4"> Customer Middle Name </th>
            <th className="px-2 py-4"> Customer Last Name </th>
            <th className="px-2 py-4"> Customer Gender </th>
            <th className="px-2 py-4"> Customer Phone Number </th>
            <th className="px-2 py-4"> Customer Registration Date </th>
            <th className="px-2 py-4"> Actions </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              className="bg-white
                    border-b border-green-200 hover:bg-green-200"
              key={customer.id}
            >
              <td>{index + 1}</td>
              <td> {customer.customerId} </td>
              <td> {customer.firstName} </td>
              <td> {customer.middleName} </td>
              <td> {customer.lastName} </td>
              <td> {customer.gender} </td>
              <td> {customer.phoneNumber} </td>
              <td> {customer.registerDate} </td>
              <td style={{ display: "auto" }}>
                <Link
                  className="text-green-500"
                  style={{ margin: "1px" }}
                  to={`/npv/${customer.id}`}
                  data-toggle="tooltip"
                  title="Click it to get list of loan(s)"
                >
                  <span>
                    <BiMoneyWithdraw size={25} />
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomerInformation;
