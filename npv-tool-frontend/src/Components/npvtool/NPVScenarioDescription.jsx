import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUndo } from "react-icons/fa";
import NPVScenarioLists from "../data/NPVScenarioLists.json";
const NPVToolPage = () => {
  const { npvId } = useParams();
  const navigate = useNavigate();
  const selectedNPVScenario = NPVScenarioLists.npv_scenarios.filter(
    (npvScenario) => npvScenario.id == npvId
  );
  const goBackToScenarios = () => {
    navigate(`/`);
  };
  return (
    <div>
      <header className="px-4 bg-gray-50 border border-gray-200 p-2 space-x-2">
        <div className="inline">
          <FaUndo
            className="text-[#00563F] hover:font-semibold cursor-pointer inline"
            onClick={goBackToScenarios}
          />
        </div>
        <button
          className="text-[#00563F] font-bold hover:font-semibold inline capitalize"
          data-toggle="tooltip"
          title="Click it go back"
          onClick={goBackToScenarios}
        >
          {selectedNPVScenario.map((scenario) => scenario.name)}
        </button>
      </header>
      <section>
        <article>
          <div className="mx-w-[1240px] mx-auto grid gap-1 ease-in-out px-4">
            {selectedNPVScenario.map((pr) => (
              <div className="w-full border-2 shadow-xl flex flex-col my-4 rounded-lg">
                <header className="text-2xl bg-[#00563F] text-white ease-in-out border text-center capitalize">
                  {pr.name} scenario description
                </header>
                <div className="px-8 items-center justify-center">
                  <p className="text-sm font-small m-4">{pr.description}</p>
                  <p className="text-sm font-bold m-4 text-green-600">
                    {pr.formulas}
                  </p>
                  <h2 className="text-sm font-bold m-4 text-green-600">
                    Where
                  </h2>
                  <ul className="ml-10">
                    {pr.where.map((res) => (
                      <React.Fragment key={res.id}>
                        <li className="text-sm">
                          <span className="text-green-600 font-semibold">
                            {res.title.substring(0, 1)}
                          </span>
                          {res.title.substring(1)}
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                  <h2 className="text-sm font-bold m-4 text-green-600">
                    About Parameters
                  </h2>
                  <ul className="ml-10">
                    {pr.sub.map((res) => (
                      <React.Fragment key={res.id}>
                        <li className="text-sm">
                          <span className="text-green-600 font-semibold p-2">
                            {res.id})
                          </span>
                          {res.title}
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};
export default NPVToolPage;
