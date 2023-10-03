import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";
import SpecificEligibilityLoanData from "../data/NPVScenarioLists.json";
import { FaSpinner } from "react-icons/fa";
const HomePage = () => {
  const [cardBackgroundColors, setCardBackgroundColors] = useState({});
  const [nPVScenarioLists, setNPVScenarioLists] = useState([]);
  const [nPVScenarioListsError, setNPVScenarioListsError] = useState([]);
  const handleCardMouseEnter = (index) => {
    const colors = [
      "bg-red-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-indigo-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCardBackgroundColors({ [index]: randomColor });
  };
  useEffect(() => {
    setNPVScenarioListsError(true);
    const timeoutId = setTimeout(() => {
      setNPVScenarioLists(
        SpecificEligibilityLoanData.npv_scenarios.map(
          (npvScenario) => npvScenario
        )
      );
      setNPVScenarioListsError(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div
      className={`mx-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 ease-in-out bg-gray-100`}
    >
      {nPVScenarioListsError ? (
        <div className="p-8 m-5">
          <span className="flex justify-center">
            <FaSpinner
              className="animate-spin rounded-full h-6 w-6 text-green-600"
              fontSize="large"
            />
            <p className="text-green-600 font-bold"> Loading...</p>
          </span>
        </div>
      ) : (
        !nPVScenarioListsError &&
        nPVScenarioLists.map((npvScenario) => (
          <div key={npvScenario.id}>
            <div
              className={`${classNames(
                "p-4",
                "rounded",
                "cursor-pointer",
                cardBackgroundColors[npvScenario.id + 1]
              )}w-full border-2 shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-gray-200`}
              onMouseEnter={() => handleCardMouseEnter(npvScenario.id)}
            >
              <header className="text-2xl font-bold text-center py-1 bg-[#00563F] text-white grounded-l">
                <NavLink
                  to={`/${npvScenario.id}`}
                  className={({ isActive }) =>
                    isActive ? "underline text-green-200 font-bold" : ""
                  }
                >
                  {npvScenario.name}
                </NavLink>
              </header>
              <p>
                <hr />
              </p>
              <article>
                <header>
                  <NavLink
                    to={`/${npvScenario.id}`}
                    className="px-4 font-bold text-green-950 hover:uppercase hover:cursor-pointer"
                  >
                    About {npvScenario.name} NPV
                  </NavLink>
                </header>
                <p>{npvScenario.description}</p>
                <ul>
                  {/* {npvScenario.group.map((productGroup, index) => (
                  <>
                    <li className="p-2" key={productGroup.id}>
                      <Link
                        to={`/product/${npvScenario.id}/${productGroup.id}`}
                      >
                        <h3 className="hover:font-bold hover:text-[purple] hover:underline first:capitalize hover:uppercase">
                          <strong className="px-2">{index + 1} </strong>
                          {productGroup.name}
                        </h3>
                      </Link>
                    </li>
                  </>
                ))} */}
                </ul>
              </article>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
