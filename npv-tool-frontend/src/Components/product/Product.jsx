import { useParams, useNavigate, Link } from "react-router-dom";
import SpecificEligibilityLoanData from "../Data/SpecificEligibilityLoanData.json";
import { useState } from "react";
import { LiaGreaterThanSolid } from "react-icons/lia";
import LoanModal from "../Modal/LoanModal";
import EligibilityCriteria from "../EligibilityCriteria/SpecificEligibilityCriteria";
import HorizontalTabs from "./HorizontalTabs";

const Product = () => {
  const navigate = useNavigate();

  const { baseLine, groupId } = useParams();

  const productBaseLine = SpecificEligibilityLoanData.product_line.filter(
    (productLine) => productLine.id == baseLine
  );
  // loan modal1 start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specificEligibilityCriteria, setSpecificEligibilityCriteria] =
    useState("");
  const [generalEligibilityCriteria, setGeneralEligibilityCriteria] =
    useState("");
  const [specificElements, setSpecificElements] = useState();

  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);

  //for general eligibility

  function handleGeneralOpenModal() {
    setIsGeneralModalOpen(true);
  }

  function handleGeneralCloseModal() {
    setIsGeneralModalOpen(false);
  }
  //for specific eligibility
  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }
  const handleGoProductGroup = () => {
    navigate("/");
  };
  const handleGoSelfProductGroup = () => {
    navigate(1);
  };
  return (
    <div>
      <header className="px-4 bg-gray-50 border border-gray-200 p-2 space-x-2">
        <button
          className="text-purple-600 underline hover:font-semibold inline capitalize"
          data-toggle="tooltip"
          title="Click it go back"
          onClick={handleGoProductGroup}
        >
          {productBaseLine.map((productLine) => productLine.name)}
        </button>
        <div className="inline">
          <LiaGreaterThanSolid className="text-purple-600 inline" />
        </div>
        <div className="inline">
          <Link
            className="text-purple-600 capitalize underline hover:font-semibold visited:text-purple-650"
            data-toggle="tooltip"
            title="Click it go back"
            onClick={handleGoSelfProductGroup}
          >
            {productBaseLine.map((pr) =>
              pr.group
                .filter((gr) => gr.id == groupId)
                .map((selectedGroup) => selectedGroup.name)
            )}
          </Link>
        </div>
      </header>
      <section>
        <header>{/* <h2>Search result</h2> */}</header>
        {/* specific eligibility criteria modal */}
        {specificEligibilityCriteria && (
          <>
            <div className="border rounded-md p-1">
              {/* "`${item.}Specific Eligibility}`" */}
              <LoanModal
                className="border rounded-md p-1"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={`${specificElements.name} specific eligibility criteria`}
              >
                <EligibilityCriteria criteria={specificEligibilityCriteria} />
              </LoanModal>
            </div>
          </>
        )}
        {/* general eligibility criteria modal  */}
        {generalEligibilityCriteria && (
          <LoanModal
            isOpen={isGeneralModalOpen}
            onClose={handleGeneralCloseModal}
            title="General eligibility criteria"
          >
            <HorizontalTabs criteria={generalEligibilityCriteria} />
            {/* {generalEligibilityCriteria} */}
          </LoanModal>
        )}
        <article>
          {/* product cards */}
          <div className="mx-w-[1240px] mx-auto grid gap-1 ease-in-out px-4">
            {productBaseLine.map((pr) =>
              pr.group
                .filter((gr) => gr.id == groupId)
                .map((selectedGroup) => (
                  <div className="w-full border-2 shadow-xl flex flex-col my-4 rounded-lg">
                    <header className="text-2xl bg-[purple] text-white ease-in-out border text-center uppercase">
                      {selectedGroup.name}
                    </header>
                    <div className="px-8 text-xl items-center justify-center">
                      {selectedGroup.product.map((item, index) => (
                        <>
                          <Link
                            to={`/product/${baseLine}/${groupId}/${item.id}`}
                          >
                            <p className="space-x-2 p-3 hover:cursor-pointer hover:font-bold hover:text-[purple] hover:underline first:capitalize hover:uppercase hover:scale-105 hover:gap-1 ease-in-out duration-300 ">
                              <strong>{index + 1}</strong>.
                              <span>{item.name}</span>
                            </p>
                          </Link>
                        </>
                      ))}
                    </div>
                  </div>
                ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Product;