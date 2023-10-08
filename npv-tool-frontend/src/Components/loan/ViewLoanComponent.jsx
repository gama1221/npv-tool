import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import CustomerService from "../customer/CustomerService";
import { BsListUl } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { FiCopy } from "react-icons/fi";
import { FaUndo } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { BsCheck2All } from "react-icons/bs";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Accordion from "@mui/material/Accordion";
// import Button from '@mui/material/Button';
import GppGoodIcon from "@mui/icons-material/GppGood";
import ReorderIcon from "@mui/icons-material/Reorder";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import FunctionsIcon from '@mui/icons-material/Functions';
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import CalculateTwoToneIcon from "@mui/icons-material/CalculateTwoTone";
// import FunctionsIcon from '@mui/icons-material/Functions';
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NpvTextField from "../common/NpvTextField";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import Grid from "@mui/material/Grid";
import npvNormal from "cbe-npv-normal";
import NPVPrincipalWaiver from "cbe-npv-principal-waiver";
import NPVInterestWaiver from "cbe-npv-interest-waiver";
import NPVExtension from "cbe-npv-extension";
import NPVInterestAndPrincipalWaiver from "interest-and-principal-waiver";
import NPVPrincipalWaiverPlusExtension from "principal-waiver-and-extension";
import Chart from "../Chart/Chart";
import SimplePieChartComponent from "../Chart/SimplePieChartComponent";
import PieChartComponent from "../Chart/PieChartComponent";
import MaterailTableComponent from "../common/MaterailTableComponent";
import PrincipalWaiverComponent from "../schenarios/PrincipalWaiverComponent";
import InterestWaiverComponent from "../schenarios/InterestWaiverComponent";
import ExtensionComponent from "../schenarios/ExtensionComponent";
import PrincipalAndInterestWaiverComponent from "../schenarios/PrincipalAndInterestWaiverComponent";
import PrincipalWaiverAndExtensionComponent from "../schenarios/PrincipalWaiverAndExtensionComponent";
import NPVInterestWaiverPlusExtension from "interest-waiver-and-extension";
import InterestWaiverAndExtensionComponent from "../schenarios/InterestWaiverAndExtensionComponent";
import NPVPrincipalAndInterestWaiverPlusExtension from "principal-and-interest-waiver-and-extension";
import PrincipalAndInterestWaiverAndExtensionComponent from "../schenarios/PrincipalAndInterestWaiverAndExtensionComponent";

import NPVModal from "../Modal/NPVModal";
//injection
import NPVInjection from "cbe-npv-injection";
import InjectionComponent from "../schenarios/InjectionComponent";

const graphNPVS = [
  // { "type": "PrincipalWaiver", "result": 200000.26 },
];
/**
 * ====================================================================================================================
 * ====================================================================================================================
 * =============================||\\    //||     ||      ||    ||       ||\\   ||   |||||||  \\    //==================
 * =============================|| \\  // ||     ||      ||    ||       || \\  ||   ||___||   \\  //===================
 * =============================||  \\//  ||     ||||||||||    |||||||  ||  \\_||   ||         \\//====================
 * ====================================================================================================================
 * ====================================================================================================================
 * ====================================================================================================================
 */
var normalMultipleNPV = [];
var withPrincipalWaiverMultipleNPV = [];
var withInterestWaiverMultipleNPV = [];
var withExtensionMultipleNPV = [];
var withInjectionMultipleNPV = [];
var withInterestAndPrincipalWaiverMultipleNPV = [];
var withPrincipalWaiverAndExtensionMultipleNPV = [];
var withInterestWaiverAndExtensionMultipleNPV = [];
var withPrincipalAndInterestWaiverAndExtensionMultipleNPV = [];
var normalMultipleNPVWithoutDuplication = [];
var ascendingOrderNPVs = [{}];
var descendingOrderNPVs = [{}];
/**
 * Sum npvs
 *
 */

/**
 * It takes array of array of
 */
/**
 *
 * @returns Loan Lists
 */
const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    color: "white",
    fontSize: "13px",
    backgroundColor: "#0E6F1A",
    fontType: "bold",
  },
});
const ViewLoanComponent = () => {
  // add loan for the selected customer
  const initialCreditState = {
    loan_id: null,
    amount: "",
    registeredDate: "",
    type: "",
    annualInterestRate: "",
    loanPeriodsInYears: "",
    riskPremium: "",
    numberOfPayments: "",
  };
  const [submitted, setSubmitted] = useState(false);
  const [loanSubmitted, setLoanSubmitted] = useState();
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [credit, setCredit] = useState(initialCreditState);
  const handleLoanModal = () => {
    setIsLoanModalOpen(true);
  };
  const handleLoanCloseModal = () => {
    setIsLoanModalOpen(false);
  };
  const handleLoanInputChange = (event) => {
    const { name, value } = event.target;
    setCredit({ ...credit, [name]: value });
  };
  const [selectedNumberOfPayments, setSelectedNumberOfPayments] = useState("");

  const handleChangeSelectedNumberOfPayments = (event) => {
    setSelectedNumberOfPayments(event.target.value);
  };
  const saveLoan = (e) => {
    debugger;
    e.preventDefault();
    var data = {
      amount: credit.amount,
      registeredDate: credit.registeredDate,
      type: credit.type,
      annualInterestRate: credit.annualInterestRate,
      loanPeriodsInYears: credit.loanPeriodsInYears,
      riskPremium: credit.riskPremium,
      numberOfPayments: selectedNumberOfPayments,
    };
    debugger;
    CustomerService.addLoans(data, id)
      .then((response) => {
        debugger;
        setCredit({
          loan_id: response.data.loan_id,
          amount: response.data.amount,
          registeredDate: response.data.registeredDate,
          type: response.data.type,
          annualInterestRate: response.data.annualInterestRate,
          loanPeriodsInYears: response.data.loanPeriodsInYears,
          riskPremium: response.data.riskPremium,
          numberOfPayments: response.data.numberOfPayments,
        });
        toast.success("Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "loanAdded",
        });
        getLoans();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // end of loan registration

  // add collateral for the selected customer
  const initialCollateralState = {
    id: null,
    value: "",
    registerDate: "",
    type: "",
  };
  const [submittedCollateral, setSubmittedCollateral] = useState(false);
  const [isCollateralModalOpen, setIsCollateralModalOpen] = useState(false);
  const [collateralAdd, setCollateralAdd] = useState(initialCollateralState);
  const handleCollateralModal = () => {
    setIsCollateralModalOpen(true);
  };
  const handleCollateralCloseModal = () => {
    setIsCollateralModalOpen(false);
  };
  const refreshTheCollateralModal = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleCollateralInputChange = (event) => {
    const { name, value } = event.target;
    setCollateralAdd({ ...collateralAdd, [name]: value });
  };
  const saveCollateral = (e) => {
    e.preventDefault();
    var data = {
      value: collateralAdd.value,
      type: collateralAdd.type,
      registerDate: collateralAdd.registerDate,
    };
    CustomerService.addCollateral(data, loanAdd)
      .then((response) => {
        setCollateralAdd({
          id: response.data.id,
          value: response.data.value,
          registerDate: response.data.registerDate,
          type: response.data.type,
        });
        toast.success("Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "collateralAdded",
        });   
        alert(localStorage.getItem("selectedLoan"))
        showCollateral(localStorage.getItem("selectedLoan"));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // end of collateral registration

  /**
   * For normal multiple npv computation
   */
  let totalNPV = 0;
  const sumUpNPVs = (npv) => {
    totalNPV += npv;
  };
  /**
   * For normal multiple npv loss computation
   */
  let totalNormalNPVLoss = 0;
  const sumUpNormalNPVLoss = (npv) => {
    totalNormalNPVLoss += npv;
  };
  /**
   * For principal waiver multiple npv computation
   */
  let totalPrincipalWaiverNPV = 0;
  const sumUpPrincipalWaiverNPVs = (npv) => {
    totalPrincipalWaiverNPV += npv;
  };

  /**
   * For interest waiver multiple npv computation
   */
  let totalInterestWaiverNPV = 0;
  const sumUpInterestWaiverNPVs = (npv) => {
    totalInterestWaiverNPV += npv;
  };

  /**
   * For interest waiver multiple npv computation
   */
  let totalExtensionNPV = 0;
  const sumUpExtensionNPVs = (npv) => {
    totalExtensionNPV += npv;
  };

  /**
   * For Injection multiple npv computation
   */
  let totalInjectionNPV = 0;
  const sumUpInjectionNPVs = (npv) => {
    totalInjectionNPV += npv;
  };

  /**
   * For Principal Waiver and Extension multiple npv computation
   */
  let totalPrincipalWaiverAndExtensionNPV = 0;
  const sumUpPrincipalWaiverAndExtensionNPVs = (npv) => {
    totalPrincipalWaiverAndExtensionNPV += npv;
  };

  /**
   * For Interest Waiver and Extension multiple npv computation
   */
  let totalInterestWaiverAndExtensionNPV = 0;
  const sumUpInterestWaiverAndExtensionNPVs = (npv) => {
    totalInterestWaiverAndExtensionNPV += npv;
  };

  /**
   * For Principal & Interest Waiver and Extension multiple npv computation
   */
  let totalPrincipalAndInterestWaiverAndExtensionNPV = 0;
  const sumUpPrincipalAndInterestWaiverAndExtensionNPVs = (npv) => {
    totalPrincipalAndInterestWaiverAndExtensionNPV += npv;
  };

  /**
   *
   * For interest plus principal waiver multiple npv computation
   *
   * */
  let totalInterestAndPrincipalNPV = 0;
  const sumUpInterestAndPrincipalNPVs = (npv) => {
    totalInterestAndPrincipalNPV += npv;
  };
  /**
   * Chart data
   */
  const [amortization, setAmortization] = useState([]);
  const [principalWaiverAmortization, setPrincipalWaiverAmortization] =
    useState([]);
  const [interestWaiverAmortization, setInterestWaiverAmortization] = useState(
    []
  );
  const [extensionAmortization, setExtensionAmortization] = useState([]);
  const [
    interestAndPrincipalAmortization,
    setInterestAndPrincipalAmortization,
  ] = useState([]);
  const [
    principalWaiverPlusExtensionAmortization,
    setPrincipalWaiverPlusExtensionAmortization,
  ] = useState([]);
  const [
    interestWaiverPlusExtensionAmortization,
    setInterestWaiverPlusExtensionAmortization,
  ] = useState([]);
  const [
    principalAndInterestWaiverPlusExtensionAmortization,
    setPrincipalAndInterestWaiverPlusExtensionAmortization,
  ] = useState([]);
  const [injectionAmortization, setInjectionAmortization] = useState([]);
  /**
   * Yearly Amortization Summary Start
   */
  //========================== Normal Start ===================================
  const [yearlyScheduledPayment, setYearlyScheduledPayment] = useState([]);
  const [yearlyInterestSummation, setYearlyInterestSummation] = useState([]);
  const [yearlyPrincipalSummation, setYearlyPrincipalSummation] = useState([]);
  //========================== Normal End ===================================

  //========================== With Principal Waiver Start ===================================
  const [
    yearlyScheduledPaymentPrincipalWaiver,
    setYearlyScheduledPaymentPrincipalWaiver,
  ] = useState([]);
  const [
    yearlyInterestSummationPrincipalWaiver,
    setYearlyInterestSummationPrincipalWaiver,
  ] = useState([]);
  const [
    yearlyPrincipalSummationPrincipalWaiver,
    setYearlyPrincipalSummationPrincipalWaiver,
  ] = useState([]);
  //========================== With Principal Waiver End ===================================

  //========================== With Principal Waiver Start ===================================
  const [
    yearlyScheduledPaymentInterestWaiver,
    setYearlyScheduledPaymentInterestWaiver,
  ] = useState([]);
  const [
    yearlyInterestSummationInterestWaiver,
    setYearlyInterestSummationInterestWaiver,
  ] = useState([]);
  const [
    yearlyPrincipalSummationInterestWaiver,
    setYearlyPrincipalSummationInterestWaiver,
  ] = useState([]);
  //========================== With Principal Waiver End ===================================

  //========================== With Extension Start ===================================
  const [yearlyScheduledPaymentExtension, setYearlyScheduledPaymentExtension] =
    useState([]);
  const [
    yearlyInterestSummationExtension,
    setYearlyInterestSummationExtension,
  ] = useState([]);
  const [
    yearlyPrincipalSummationExtension,
    setYearlyPrincipalSummationExtension,
  ] = useState([]);
  //========================== With Extension End ===================================

  //========================== With Principal and Interest Waiver Start ===================================
  const [
    yearlyScheduledPaymentWithInterestAndPrincipalWaiver,
    setYearlyScheduledPaymentWithInterestAndPrincipalWaiver,
  ] = useState([]);
  const [
    yearlyInterestSummationWithInterestAndPrincipalWaiver,
    setYearlyInterestSummationWithInterestAndPrincipalWaiver,
  ] = useState([]);
  const [
    yearlyPrincipalSummationWithInterestAndPrincipalWaiver,
    setYearlyPrincipalSummationWithInterestAndPrincipalWaiver,
  ] = useState([]);
  //========================== With Principal and Interest Waiver End ===================================

  //========================== With Principal Waiver plus extension Start ===================================
  const [
    yearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion,
    setYearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion,
  ] = useState([]);
  const [
    yearlyInterestSummationWithWaiverPlusExtnesion,
    setYearlyInterestSummationWithWaiverPlusExtnesion,
  ] = useState([]);
  const [
    yearlyPrincipalSummationWithWaiverPlusExtnesion,
    setYearlyPrincipalSummationWithWaiverPlusExtnesion,
  ] = useState([]);
  //========================== With Principal Waiver plus extension  End ===================================

  //========================== With Principal Waiver plus extension  start ===================================
  const [
    yearlyScheduledPaymentWithInterestWaiverPlusExtension,
    setYearlyScheduledPaymentWithInterestWaiverPlusExtension,
  ] = useState([]);
  const [
    yearlyInterestSummationWithInterestWaiverPlusExtension,
    setYearlyInterestSummationWithInterestWaiverPlusExtension,
  ] = useState([]);
  const [
    yearlyPrincipalSummationWithInterestWaiverPlusExtension,
    setYearlyPrincipalSummationWithInterestWaiverPlusExtension,
  ] = useState([]);
  //========================== With Principal Waiver plus extension  End ===================================

  //========================== With Principal Waiver plus extension  start ===================================
  const [
    yearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension,
    setYearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension,
  ] = useState([]);
  const [
    yearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension,
    setYearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension,
  ] = useState([]);
  const [
    yearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension,
    setYearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension,
  ] = useState([]);
  //========================== With Principal Waiver plus extension  End ===================================

  //========================== With injection  start ===================================
  const [yearlyScheduledPaymentInjection, setYearlyScheduledPaymentInjection] =
    useState([]);
  const [
    yearlyInterestSummationInjection,
    setYearlyInterestSummationInjection,
  ] = useState([]);
  const [
    yearlyPrincipalSummationInjection,
    setYearlyPrincipalSummationInjection,
  ] = useState([]);
  //========================== With injection  End ===================================

  /**
   * Yearly Amortization Summary end
   */

  /**
   * NPV UseStates start
   */
  const [npv, setNPV] = useState([]);
  const [npvInterestWaiver, setNpvInterestWaiver] = useState([]);
  const [npvPrincipalWaiver, setNpvPrincipalWaiver] = useState([]);
  const [npvExtension, setNpvExtension] = useState([]);
  const [npvPrincipalAndInterestWaiver, setNpvPrincipalAndInterestWaiver] =
    useState([]);
  const [npvPrincipalWaiverPlusExtension, setNpvPrincipalWaiverPlusExtension] =
    useState([]);
  const [npvInterestWaiverExtension, setNpvInterestWaiverExtension] = useState(
    []
  );
  const [
    npvPrincipalAndInterestWaiverExtension,
    setNpvPrincipalAndInterestWaiverExtension,
  ] = useState([]);
  const [npvInjection, setNpvInjection] = useState([]);

  const [lowestNPV, setLowestNPV] = useState([]);
  const [largestNPV, setLargestNPV] = useState([]);

  const [npvForClosure, setNPVForClosure] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const [cashFlow, setCashFlow] = useState(0);
  const [sellingCost, setSellingCost] = useState(0);

  //===================== Visibility for amortization table start =============================
  const [showNoramlNpv, setShowNoramlNpv] = useState(false);
  const [showNPVWithPrincipalWaiver, setShowNPVWithPrincipalWaiver] =
    useState(false);
  const [showNPVWithInterestWaiver, setShowNPVWithInterestWaiver] =
    useState(false);
  const [showNPVWithExtension, setShowNPVWithExtension] = useState(false);
  const [
    showNPVWithPrincipalAndInterestWaiver,
    setShowNPVWithPrincipalAndInterestWaiver,
  ] = useState(false);
  const [
    showNPVWithPrincipalWaiverPlusExtension,
    setShowNPVWithPrincipalWaiverPlusExtension,
  ] = useState(false);
  const [
    showNPVWithInterestWaiverPlusExtension,
    setShowNPVWithInterestWaiverPlusExtension,
  ] = useState(false);
  const [
    showNPVWithPrincipalAndInterestWaiverPlusExtension,
    setShowNPVWithPrincipalAndInterestWaiverPlusExtension,
  ] = useState(false);
  const [showNPVWithForeclosure, setShowNPVWithForeclosure] = useState(false);
  const [showNPVWithInjection, setShowNPVWithInjection] = useState(false);
  const [showBarChart, setShowBarChart] = useState(true);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showSimplePieChart, setShowSimplePieChart] = useState(false);
  //===================== Visibility for amortization table start =============================

  /**
   * NPV UseStates end
   */

  // ==========================Show in Graph start==============================
  const [visualizeDataInGrpah, setVisualizeDataInGrpah] = useState([]);

  const [showNoramlNpvInGraph, setShowNoramlNpvInGraph] = useState(false);
  const [
    showNPVWithPrincipalWaiverInGraph,
    setShowNPVWithPrincipalWaiverInGraph,
  ] = useState(false);
  const [
    showNPVWithInterestWaiverInGraph,
    setShowNPVWithInterestWaiverInGraph,
  ] = useState(false);
  const [showNPVWithExtensionInGraph, setShowNPVWithExtensionInGraph] =
    useState(false);
  const [
    showNPVWithPrincipalAndInterestWaiverInGraph,
    setShowNPVWithPrincipalAndInterestWaiverInGraph,
  ] = useState(false);
  const [
    showNPVWithPrincipalWaiverPlusExtensionInGraph,
    setShowNPVWithPrincipalWaiverPlusExtensionInGraph,
  ] = useState(false);
  const [
    showNPVWithInterestWaiverPlusExtensionInGraph,
    setShowNPVWithInterestWaiverPlusExtensionInGraph,
  ] = useState(false);
  const [showNPVWithForeclosureInGraph, setShowNPVWithForeclosureInGraph] =
    useState(false);
  const [showNPVWithInjectionInGraph, setShowNPVWithInjectionInGraph] =
    useState(false);

  const [showNPVComparision, setShowNPVComparision] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingPopulate, setLoadingPopulate] = useState(false);

  const [showNumberOfLoans, setShowNumberOfLoans] = useState(false);
  // ======================NPV Incase of foreclosure============================
  const [selectedLoan, setSelectedLoan] = useState(0);
  // ==========================Show in Graph end================================
  const [clickStatus, setClickStatus] = useState(false);

  const [values, setValues] = useState({
    "original-loan": "",
    "annaul-interest-rate": "",
    "loan-period-in-years": "",
    "risk-premium": "",
    "number-of-payments-per-year": "",
  });

  const [principalWaiverNumber, setPrincipalWaiverNumber] = useState({
    "principal-waiver-number": "",
  });
  const [interestWaiverNumber, setInterestWaiverNumber] = useState({
    "interest-waiver-number": "",
  });
  const [extension, setExtension] = useState({
    extension: "",
  });
  const [interestAndPrincipalWaiver, setInterestAndPrincipalWaiver] = useState({
    principalwaiversecond: "",
    interestwaiversecond: "",
  });
  const [principalWaiverPlusExtension, setPrincipalWaiverPlusExtension] =
    useState({
      principalwaiverthird: "",
      extensionsecond: "",
    });
  const [interestWaiverPlusExtension, setInterestWaiverPlusExtension] =
    useState({
      interest_waiver_extension: "",
      extension_interest_waiver: "",
    });
  const [
    principalAndInterestWaiverPlusExtension,
    setPrincipalAndInterestWaiverPlusExtension,
  ] = useState({
    principal_interest_waiver_extension: "",
    interest_principal_waiver_extension: "",
    extension_interest_principal_waiver: "",
  });
  const [injection, setInjection] = useState({
    injection: "",
  });
  //====================Handle Additional Inputs start =========================================
  const handlePrincipalWaiver = (e) => {
    const { name, value } = e.target;
    setPrincipalWaiverNumber({
      ...principalWaiverNumber,
      [name]: value,
    });
  };

  const handleInterestWaiver = (e) => {
    const { name, value } = e.target;
    setInterestWaiverNumber({
      ...interestWaiverNumber,
      [name]: value,
    });
  };
  const handleExtension = (e) => {
    const { name, value } = e.target;
    setExtension({
      ...extension,
      [name]: value,
    });
  };

  const handleInterestAndPricipalWaiver = (e) => {
    const { name, value } = e.target;
    setInterestAndPrincipalWaiver({
      ...interestAndPrincipalWaiver,
      [name]: value,
    });
  };

  const handlePrincipalWaiverPlusExtension = (e) => {
    const { name, value } = e.target;
    setPrincipalWaiverPlusExtension({
      ...principalWaiverPlusExtension,
      [name]: value,
    });
  };
  const handleInterestWaiverPlusExtension = (e) => {
    const { name, value } = e.target;
    setInterestWaiverPlusExtension({
      ...interestWaiverPlusExtension,
      [name]: value,
    });
  };
  const handlePrincipalAndInterestWaiverPlusExtension = (e) => {
    const { name, value } = e.target;
    setPrincipalAndInterestWaiverPlusExtension({
      ...principalAndInterestWaiverPlusExtension,
      [name]: value,
    });
  };
  const handleInjection = (e) => {
    const { name, value } = e.target;
    setInjection({
      ...injection,
      [name]: value,
    });
  };

  //====================Handle Additional Inputs end =========================================
  const [npvScenarios, setnpvScenarios] = useState({
    "npv-scenarios": "",
  });

  const handleNpvScenariosChange = (e) => {
    const { name, value } = e.target;
    setnpvScenarios({
      ...npvScenarios,
      [name]: value,
    });
  };

  const [npvLoans, setNpvLoans] = useState();
  const handleGraphType = (e) => {
    setCharType(e.target.value);
  };
  const [charType, setCharType] = useState("BarChart");
  // const handleCustomerLoansChange = (e) => {
  //     const value = e.target.value;
  //     setNpvLoans(value)
  //     alert(value.amount)
  // }

  // const [npvChartScenarios, setnpvChartScenarios] = useState({
  //     "npv-chart-scenarios": ''
  // });
  // const handleNpvChartScenariosChange = (e) => {
  //     const { name, value } = e.target;
  //     setnpvChartScenarios({
  //         ...npvChartScenarios,
  //         [name]: value,
  //     });
  //     if (npvChartScenarios["npv-chart-scenarios"] === "bar_chart") {
  //         setShowBarChart(true);
  //     }
  //     else if (npvChartScenarios["npv-chart-scenarios"] === "pie_chart") {
  //         setShowPieChart(true);
  //     }
  //     else if (npvChartScenarios["npv-chart-scenarios"] === "simple_pie_chart") {
  //         setShowSimplePieChart(true);
  //     }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // alert(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const roundAmount = (num) => {
    return Math.round(num * 100) / 100;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    computeNPVMessage();
    setLoading(true);
    var numberOfPaymentsPerMonth = isNaN(values["number-of-payments-per-month"])
      ? 0
      : values["number-of-payments-per-month"] / 12;
    setTimeout(() => {
      setIsPending(false);
      if (npvScenarios["npv-scenarios"] === "normal".trim()) {
        calculate(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"]
        );
        setShowNoramlNpv(true);
        setLoading(false);
      }
      if (npvScenarios["npv-scenarios"] === "principalwaiver".trim()) {
        calculateNPVWithPrincipalWaiver(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"],
          principalWaiverNumber["principal-waiver-number"]
        );
        setShowNPVWithPrincipalWaiver(true);
        setLoading(false);
      }
      if (npvScenarios["npv-scenarios"] === "interestwaiver".trim()) {
        calculateNPVWithInterestWaiver(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"],
          interestWaiverNumber["interest-waiver-number"]
        );
        setShowNPVWithInterestWaiver(true);
        setLoading(false);
      }
      if (npvScenarios["npv-scenarios"] === "extension".trim()) {
        calculateNPVExtention(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"],
          extension["extension"]
        );
        setShowNPVWithExtension(true);
        setLoading(false);
      }

      if (
        npvScenarios["npv-scenarios"] ===
        "principalwaiver&interestwaiver".trim()
      ) {
        calculateNPVWithInterestAndPrincipalWaiver(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"],
          interestAndPrincipalWaiver["principalwaiversecond"],
          interestAndPrincipalWaiver["interestwaiversecond"]
        );
        setShowNPVWithPrincipalAndInterestWaiver(true);
        setLoading(false);
      }

      if (
        npvScenarios["npv-scenarios"] === "principalwaiver&extension".trim()
      ) {
        calculateNPVWithPrincipalWaiverPlusExtension(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"],
          principalWaiverPlusExtension["principalwaiverthird"],
          principalWaiverPlusExtension["extensionsecond"]
        );
        setShowNPVWithPrincipalWaiverPlusExtension(true);
        setLoading(false);
      }
      if (npvScenarios["npv-scenarios"] === "interestwaiver&extension".trim()) {
        calculateNPVWithInterestWaiverPlusExtension(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"],
          interestWaiverPlusExtension["interest_waiver_extension"],
          interestWaiverPlusExtension["extension_interest_waiver"]
        );
        setShowNPVWithInterestWaiverPlusExtension(true);
        setLoading(false);
      }

      if (
        npvScenarios["npv-scenarios"] ===
        "principal&interestwaiver&extension".trim()
      ) {
        calculateNPVWithPrincipalAndInterestWaiverPlusExtension(
          values["original-loan"],
          values["annaul-interest-rate"],
          Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
          values["risk-premium"],
          values["number-of-payments-per-year"],
          principalAndInterestWaiverPlusExtension[
            "principal_interest_waiver_extension"
          ],
          principalAndInterestWaiverPlusExtension[
            "interest_principal_waiver_extension"
          ],
          principalAndInterestWaiverPlusExtension[
            "extension_interest_principal_waiver"
          ]
        );
        setShowNPVWithPrincipalAndInterestWaiverPlusExtension(true);
        setLoading(false);
      }
      if (npvScenarios["npv-scenarios"] === "injection".trim()) {
        calculateNPVInjection(
          values["original-loan"],
          values["annaul-interest-rate"],
          values["loan-period-in-years"],
          values["risk-premium"],
          values["number-of-payments-per-year"],
          injection["injection"]
        );
        setShowNPVWithInjection(true);
        setLoading(false);
      }
      setClickStatus(true);
    }, 1000);
    setIsPending(true);
  };

  const calculate = (amount, rate, years, riskPremium, numberOfPayments) => {
    const loan = npvNormal(amount, rate, years, riskPremium, numberOfPayments);

    /**
     * ======================================================================================================================================================================
     * ======================================================================================================================================================================
     * =============================||\\    //||     ||      ||    ||       ||\\   ||   |||||||  \\    //====================================================================
     * =============================|| \\  // ||     ||      ||    ||       || \\  ||   ||___||   \\  //=====================================================================
     * =============================||  \\//  ||     ||||||||||    |||||||  ||  \\_||   ||         \\//======================================================================
     * ======================================================================================================================================================================
     * ======================================================================================================================================================================
     * First check the array is empty or not
     *  If empty => push the current npv information such as scenario, NPV result and selectedLoan information
     *  Else if the scenario and loan information is same plus there is already pushed loan information,
     *  remove the old loan information and push/substitue with the new one.
     * ==================================================================================================================================
     */

    if (normalMultipleNPV.length === 0) {
      const normalNpvMul = {
        scenario: "Normal",
        npv: loan.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: values["original-loan"],
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
      };
      normalMultipleNPV.push(normalNpvMul);
      console.log(normalMultipleNPV);
    } else if (normalMultipleNPV.length > 0) {
      normalMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loan information that is already exists
           * Then splice that array and assign the newly requested loan information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanInfo = normalMultipleNPV.filter(
            (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
          );
          const normalNpvMul = {
            scenario: "Normal",
            npv: loan.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
          };
          removeExistedLoanInfo.push(normalNpvMul);
          normalMultipleNPV = removeExistedLoanInfo;
          console.log("normalMultipleNPV");
          console.log(normalMultipleNPV);
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanInfoSecond = normalMultipleNPV.filter(
            (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
          );
          const normalNpvMulSecond = {
            scenario: "Normal",
            npv: loan.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: npvLoans.amount,
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
          };
          removeExistedLoanInfoSecond.push(normalNpvMulSecond);
          normalMultipleNPV = removeExistedLoanInfoSecond;
          console.log("normalMultipleNPV second value");
          console.log(normalMultipleNPV);
        }
      });
    }
    /**
     * ===================================================
     * NPV Graphical representation
     * ===================================================
     */
    const normalNPV = { type: "normal", result: loan.NPV };
    graphNPVS.push(normalNPV);
    localStorage.setItem("npvs", JSON.stringify(normalNPV));
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));
    setNPV(loan.NPV);
    setAmortization(loan.scheduledPayments);
    setYearlyScheduledPayment(loan.yearlyScheduledPayment);
    setYearlyInterestSummation(loan.yearlyInterestSummation);
    setYearlyPrincipalSummation(loan.yearlyPrincipalSummation);
  };

  /**
   * =========================================================================================================================================================
   * Compute NPV with PrincipalWaiver alone===================================================================================================================
   * =========================================================================================================================================================
   * ========================================================================================================================================================
   * =============================||||||||========\\================//=======================================================================================
   * =============================||    ||=========\\==============//========================================================================================
   * =============================||||||||==========\\====//\\====//=========================================================================================
   * =============================||=================\\==//==\\==//==========================================================================================
   * =============================||==================\\//====\\//===========================================================================================
   * ========================================================================================================================================================
   * First check the array is empty or not===================================================================================================================
   *  If empty => push the current npv information such as scenario, NPV result and selectedLoan information=================================================
   *  Else if the scenario and loan information is same plus there is already pushed loan information,=======================================================
   *  remove the old loan information and push/substitue with the new one.===================================================================================
   * ========================================================================================================================================================
   */

  const calculateNPVWithPrincipalWaiver = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments,
    waivedNumberOfPayment
  ) => {
    const loanPrincipalWaiver = NPVPrincipalWaiver(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      waivedNumberOfPayment
    );

    if (withPrincipalWaiverMultipleNPV.length === 0) {
      const withPrincipalWaiverNpvMul = {
        scenario: "principalwaiver",
        npv: loanPrincipalWaiver.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: npvLoans.amount,
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        waivedPrincipal: principalWaiverNumber["principal-waiver-number"],
      };
      withPrincipalWaiverMultipleNPV.push(withPrincipalWaiverNpvMul);
      // console.log(withPrincipalWaiverMultipleNPV);
    } else if (withPrincipalWaiverMultipleNPV.length > 0) {
      withPrincipalWaiverMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loanPrincipalWaiver information that is already exists
           * Then splice that array and assign the newly requested loanPrincipalWaiver information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanWithPrincipalWaiverInfo =
            withPrincipalWaiverMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withPrincipalWaiverNpvMul1 = {
            scenario: "principalwaiver",
            npv: loanPrincipalWaiver.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            waivedPrincipal: principalWaiverNumber["principal-waiver-number"],
          };
          removeExistedLoanWithPrincipalWaiverInfo.push(
            withPrincipalWaiverNpvMul1
          );
          withPrincipalWaiverMultipleNPV =
            removeExistedLoanWithPrincipalWaiverInfo;
          // console.log("With Principal Multiple NPV first value");
          // console.log(withPrincipalWaiverMultipleNPV);
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanInfoSecond =
            withPrincipalWaiverMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withPrincipalWaiverNpvMul2 = {
            scenario: "principalwaiver",
            npv: loanPrincipalWaiver.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            waivedPrincipal: principalWaiverNumber["principal-waiver-number"],
          };
          removeExistedLoanInfoSecond.push(withPrincipalWaiverNpvMul2);
          withPrincipalWaiverMultipleNPV = removeExistedLoanInfoSecond;
          // console.log("With Principal Multiple NPV second value");
          // console.log(withPrincipalWaiverMultipleNPV);
        }
      });
    }

    setPrincipalWaiverAmortization(loanPrincipalWaiver.scheduledPayments);
    setNpvPrincipalWaiver(loanPrincipalWaiver.NPV);

    setYearlyScheduledPaymentPrincipalWaiver(
      loanPrincipalWaiver.yearlyScheduledPaymentPrincipalWaiver
    );
    setYearlyInterestSummationPrincipalWaiver(
      loanPrincipalWaiver.yearlyInterestSummationPrincipalWaiver
    );
    setYearlyPrincipalSummationPrincipalWaiver(
      loanPrincipalWaiver.yearlyPrincipalSummationPrincipalWaiver
    );

    const withPrincipalWaiverNPVGraph = {
      type: "Principal Waiver",
      result: loanPrincipalWaiver.NPV,
    };
    graphNPVS.push(withPrincipalWaiverNPVGraph);
    localStorage.setItem("npvs", JSON.stringify(withPrincipalWaiverNPVGraph));
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));
  };

  /**
   * =========================================================================================================================================================
   * Compute NPV with InterestWaiver alone====================================================================================================================
   * ========================================================================================================================================================
   * =========================||||||||||==========\\================//=======================================================================================
   * =============================||===============\\==============//========================================================================================
   * =============================||================\\====//\\====//=========================================================================================
   * =============================||=================\\==//==\\==//==========================================================================================
   * =========================||||||||||==============\\//====\\//===========================================================================================
   * ========================================================================================================================================================
   * First check the array is empty or not===================================================================================================================
   *  If empty => push the current npv information such as scenario, NPV result and selectedLoan information=================================================
   *  Else if the scenario and loan information is same plus there is already pushed loan information,=======================================================
   *  remove the old loan information and push/substitue with the new one.===================================================================================
   * ========================================================================================================================================================
   */

  const calculateNPVWithInterestWaiver = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments,
    waivedNumberOfPayment
  ) => {
    const loanInterestWaiver = NPVInterestWaiver(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      waivedNumberOfPayment
    );

    if (withInterestWaiverMultipleNPV.length === 0) {
      const withInterestWaiverNpvMul = {
        scenario: "interestwaiver",
        npv: loanInterestWaiver.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: npvLoans.amount,
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        waivedInterest: values["interest-waiver-number"],
      };
      withInterestWaiverMultipleNPV.push(withInterestWaiverNpvMul);
    } else if (withInterestWaiverMultipleNPV.length > 0) {
      withInterestWaiverMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loanInterestWaiver information that is already exists
           * Then splice that array and assign the newly requested loanInterestWaiver information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanWithInterestWaiverInfo =
            withInterestWaiverMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withInterestWaiverNpvMul1 = {
            scenario: "interestwaiver",
            npv: loanInterestWaiver.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            waivedInterest: values["interest-waiver-number"],
          };
          removeExistedLoanWithInterestWaiverInfo.push(
            withInterestWaiverNpvMul1
          );
          withInterestWaiverMultipleNPV =
            removeExistedLoanWithInterestWaiverInfo;
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanInterestWaiverInfoSecond =
            withInterestWaiverMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withInterestWaiverNpvMul2 = {
            scenario: "interestwaiver",
            npv: loanInterestWaiver.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            waivedInterest: values["interest-waiver-number"],
          };
          removeExistedLoanInterestWaiverInfoSecond.push(
            withInterestWaiverNpvMul2
          );
          withInterestWaiverMultipleNPV =
            removeExistedLoanInterestWaiverInfoSecond;
        }
      });
    }

    setInterestWaiverAmortization(loanInterestWaiver.scheduledPayments);
    setNpvInterestWaiver(loanInterestWaiver.NPV);

    setYearlyScheduledPaymentInterestWaiver(
      loanInterestWaiver.yearlyScheduledPaymentInterestWaiver
    );
    setYearlyInterestSummationInterestWaiver(
      loanInterestWaiver.yearlyInterestSummationInterestWaiver
    );
    setYearlyPrincipalSummationInterestWaiver(
      loanInterestWaiver.yearlyPrincipalSummationInterestWaiver
    );

    const withInterestWaiverNPVGraph = {
      type: "Interest Waiver",
      result: loanInterestWaiver.NPV,
    };
    graphNPVS.push(withInterestWaiverNPVGraph);
    localStorage.setItem("npvs", JSON.stringify(withInterestWaiverNPVGraph));
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));

    // console.log(loanInterestWaiver);
  };

  /**
   * =========================================================================================================================================================
   * Compute NPV with InterestWaiver alone====================================================================================================================
   * ========================================================================================================================================================
   * =========================||||||||||=====================================================================================================================
   * =========================||=============================================================================================================================
   * =========================||||||||||=====================================================================================================================
   * =========================||=============================================================================================================================
   * =========================||||||||||=====================================================================================================================
   * ========================================================================================================================================================
   * First check the array is empty or not===================================================================================================================
   *  If empty => push the current npv information such as scenario, NPV result and selectedLoan information=================================================
   *  Else if the scenario and loan information is same plus there is already pushed loan information,=======================================================
   *  remove the old loan information and push/substitue with the new one.===================================================================================
   * ========================================================================================================================================================
   */
  const calculateNPVExtention = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments,
    waivedNumberOfPayment
  ) => {
    const loanExtension = NPVExtension(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      waivedNumberOfPayment
    );

    if (withExtensionMultipleNPV.length === 0) {
      const withExtensionNpvMul = {
        scenario: "extension",
        npv: loanExtension.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: values["original-loan"],
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        withExtension: values["extension"],
      };
      withExtensionMultipleNPV.push(withExtensionNpvMul);
    } else if (withExtensionMultipleNPV.length > 0) {
      withExtensionMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loanExtension information that is already exists
           * Then splice that array and assign the newly requested loanExtension information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanWithExtensionInfo =
            withExtensionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withExtensionNpvMul1 = {
            scenario: "extension",
            npv: loanExtension.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            withExtension: values["extension"],
          };
          removeExistedLoanWithExtensionInfo.push(withExtensionNpvMul1);
          withExtensionMultipleNPV = removeExistedLoanWithExtensionInfo;
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanExtensionInfoSecond =
            withExtensionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withExtensionNpvMul2 = {
            scenario: "extension",
            npv: loanExtension.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            withExtension: values["extension"],
          };
          removeExistedLoanExtensionInfoSecond.push(withExtensionNpvMul2);
          withExtensionMultipleNPV = removeExistedLoanExtensionInfoSecond;
        }
      });
    }

    setExtensionAmortization(loanExtension.scheduledPayments);
    setNpvExtension(loanExtension.NPV);

    setYearlyScheduledPaymentExtension(
      loanExtension.yearlyScheduledPaymentExtension
    );
    setYearlyInterestSummationExtension(
      loanExtension.yearlyInterestSummationExtension
    );
    setYearlyPrincipalSummationExtension(
      loanExtension.yearlyPrincipalSummationExtension
    );

    const withExtension = { type: "Extension", result: loanExtension.NPV };
    graphNPVS.push(withExtension);
    localStorage.setItem("npvs", JSON.stringify(withExtension));
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));
  };

  /**
   * =========================================================================================================================================================
   * Compute NPV with InterestWaiver alone====================================================================================================================
   * ========================================================================================================================================================
   * =========================||||||||||=========||||||||||||================================================================================================
   * =============================||=============||========||================================================================================================
   * =============================||=============||========||================================================================================================
   * =============================||=============||||||||||||================================================================================================
   * =========================||||||||||=========||==========================================================================================================
   * ========================================================================================================================================================
   * First check the array is empty or not===================================================================================================================
   *  If empty => push the current npv information such as scenario, NPV result and selectedLoan information=================================================
   *  Else if the scenario and loan information is same plus there is already pushed loan information,=======================================================
   *  remove the old loan information and push/substitue with the new one.===================================================================================
   * ========================================================================================================================================================
   */

  const calculateNPVWithInterestAndPrincipalWaiver = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments,
    principalwaivedNumberOfPayment,
    interestwaivedNumberOfPayment
  ) => {
    const loanInterestAndPrincipalWaiver = NPVInterestAndPrincipalWaiver(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      principalwaivedNumberOfPayment,
      interestwaivedNumberOfPayment
    );
    if (withInterestAndPrincipalWaiverMultipleNPV.length === 0) {
      const withInterestAndPrincipalNpvMul = {
        scenario: "principalwaiver&interestwaiver",
        npv: loanInterestAndPrincipalWaiver.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: values["original-loan"],
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        interestAndPrincipalWaiver:
          interestAndPrincipalWaiver["principalwaiversecond"],
        interestAndPrincipalWaiver:
          interestAndPrincipalWaiver["interestwaiversecond"],
      };
      withInterestAndPrincipalWaiverMultipleNPV.push(
        withInterestAndPrincipalNpvMul
      );
    } else if (withInterestAndPrincipalWaiverMultipleNPV.length > 0) {
      withInterestAndPrincipalWaiverMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loanInterestAndPrincipalWaiver information that is already exists
           * Then splice that array and assign the newly requested loanInterestAndPrincipalWaiver information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanWithInterestAndPrincipalInfo =
            withInterestAndPrincipalWaiverMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withInterestAndPrincipalNpvMul1 = {
            scenario: "principalwaiver&interestwaiver",
            npv: loanInterestAndPrincipalWaiver.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            interestAndPrincipalWaiver:
              interestAndPrincipalWaiver["principalwaiversecond"],
            interestAndPrincipalWaiver:
              interestAndPrincipalWaiver["interestwaiversecond"],
          };
          removeExistedLoanWithInterestAndPrincipalInfo.push(
            withInterestAndPrincipalNpvMul1
          );
          withInterestAndPrincipalWaiverMultipleNPV =
            removeExistedLoanWithInterestAndPrincipalInfo;
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanWithInterestAndPrincipalInfoSecond =
            withInterestAndPrincipalWaiverMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withInterestAndPrincipalNpvMul2 = {
            scenario: "principalwaiver&interestwaiver",
            npv: loanInterestAndPrincipalWaiver.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            interestAndPrincipalWaiver:
              interestAndPrincipalWaiver["principalwaiversecond"],
            interestAndPrincipalWaiver:
              interestAndPrincipalWaiver["interestwaiversecond"],
          };
          removeExistedLoanWithInterestAndPrincipalInfoSecond.push(
            withInterestAndPrincipalNpvMul2
          );
          withInterestAndPrincipalWaiverMultipleNPV =
            removeExistedLoanWithInterestAndPrincipalInfoSecond;
        }
      });
    }
    setInterestAndPrincipalAmortization(
      loanInterestAndPrincipalWaiver.scheduledPayments
    );
    setNpvPrincipalAndInterestWaiver(loanInterestAndPrincipalWaiver.NPV);

    setYearlyScheduledPaymentWithInterestAndPrincipalWaiver(
      loanInterestAndPrincipalWaiver.yearlyScheduledPayment
    );
    setYearlyInterestSummationWithInterestAndPrincipalWaiver(
      loanInterestAndPrincipalWaiver.yearlyInterestSummation
    );
    setYearlyPrincipalSummationWithInterestAndPrincipalWaiver(
      loanInterestAndPrincipalWaiver.yearlyPrincipalSummation
    );

    const interestAndPrincipalData = {
      type: "Principal and Interest Waiver",
      result: loanInterestAndPrincipalWaiver.NPV,
    };
    graphNPVS.push(interestAndPrincipalData);
    localStorage.setItem("npvs", JSON.stringify(interestAndPrincipalData));
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));
  };

  /**
   * =========================================================================================================================================================
   * Multiple Principal Waiver and Extension NPV
   * ========================================================================================================================================================
   */
  const calculateNPVWithPrincipalWaiverPlusExtension = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments,
    principalwaivedNumberOfPayment, //will come to here
    interestwaivedNumberOfPayment
  ) => {
    const loanPrincipalWaiverPlusExtention = NPVPrincipalWaiverPlusExtension(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      principalwaivedNumberOfPayment,
      interestwaivedNumberOfPayment
    );

    if (withPrincipalWaiverAndExtensionMultipleNPV.length === 0) {
      const withPwAndEMulNPV = {
        scenario: "principalwaiver&extension",
        npv: loanPrincipalWaiverPlusExtention.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: values["original-loan"],
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        principalwaiverthird: values["principalwaiverthird"],
        extensionsecond: values["extensionsecond"],
      };
      withPrincipalWaiverAndExtensionMultipleNPV.push(withPwAndEMulNPV);
    } else if (withPrincipalWaiverAndExtensionMultipleNPV.length > 0) {
      withPrincipalWaiverAndExtensionMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loanExtension information that is already exists
           * Then splice that array and assign the newly requested loanExtension information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanWithPrincipalWaiverAndExtensionInfo =
            withPrincipalWaiverAndExtensionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withExtensionNpvMul1 = {
            scenario: "principalwaiver&extension",
            npv: loanPrincipalWaiverPlusExtention.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            principalwaiverthird: values["principalwaiverthird"],
            extensionsecond: values["extensionsecond"],
          };
          removeExistedLoanWithPrincipalWaiverAndExtensionInfo.push(
            withExtensionNpvMul1
          );
          withPrincipalWaiverAndExtensionMultipleNPV =
            removeExistedLoanWithPrincipalWaiverAndExtensionInfo;
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanExtensionInfoSecond =
            withPrincipalWaiverAndExtensionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withExtensionNpvMul2 = {
            scenario: "principalwaiver&extension",
            npv: loanPrincipalWaiverPlusExtention.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            principalwaiverthird: values["principalwaiverthird"],
            extensionsecond: values["extensionsecond"],
          };
          removeExistedLoanExtensionInfoSecond.push(withExtensionNpvMul2);
          withPrincipalWaiverAndExtensionMultipleNPV =
            removeExistedLoanExtensionInfoSecond;
        }
      });
    }

    setPrincipalWaiverPlusExtensionAmortization(
      loanPrincipalWaiverPlusExtention.scheduledPayments
    );
    setNpvPrincipalWaiverPlusExtension(loanPrincipalWaiverPlusExtention.NPV);

    const withPrincipalWaiverPlusExtensionInGraph = {
      type: "Principal Waiver Plus Extension",
      result: loanPrincipalWaiverPlusExtention.NPV,
    };
    graphNPVS.push(withPrincipalWaiverPlusExtensionInGraph);
    localStorage.setItem(
      "npvs",
      JSON.stringify(withPrincipalWaiverPlusExtensionInGraph)
    );
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));

    setYearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion(
      loanPrincipalWaiverPlusExtention.yearlyScheduledPayment
    );
    setYearlyInterestSummationWithWaiverPlusExtnesion(
      loanPrincipalWaiverPlusExtention.yearlyInterestSummation
    );
    setYearlyPrincipalSummationWithWaiverPlusExtnesion(
      loanPrincipalWaiverPlusExtention.yearlyPrincipalSummation
    );
  };

  const calculateNPVWithInterestWaiverPlusExtension = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments, //will come to here
    interestwaivedNumberOfPayment,
    extension
  ) => {
    const loanInterestWaiverPlusExtention = NPVInterestWaiverPlusExtension(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      interestwaivedNumberOfPayment,
      extension
    );
    if (withInterestWaiverAndExtensionMultipleNPV.length === 0) {
      const withIwAndEMulNPV = {
        scenario: "interestwaiver&extension",
        npv: loanInterestWaiverPlusExtention.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: values["original-loan"],
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        interest_waiver_extension: values["interest_waiver_extension"],
        extension_interest_waiver: values["extension_interest_waiver"],
      };
      withInterestWaiverAndExtensionMultipleNPV.push(withIwAndEMulNPV);
    } else if (withInterestWaiverAndExtensionMultipleNPV.length > 0) {
      withInterestWaiverAndExtensionMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loanExtension information that is already exists
           * Then splice that array and assign the newly requested loanExtension information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanWithInterestWaiverAndExtensionInfo =
            withInterestWaiverAndExtensionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withExtensionNpvMul1 = {
            scenario: "interestwaiver&extension",
            npv: loanInterestWaiverPlusExtention.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            interest_waiver_extension: values["interest_waiver_extension"],
            extension_interest_waiver: values["extension_interest_waiver"],
          };
          removeExistedLoanWithInterestWaiverAndExtensionInfo.push(
            withExtensionNpvMul1
          );
          withInterestWaiverAndExtensionMultipleNPV =
            removeExistedLoanWithInterestWaiverAndExtensionInfo;
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanInterestWaiverAndExtensionInfoSecond =
            withInterestWaiverAndExtensionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withExtensionNpvMul2 = {
            scenario: "interestwaiver&extension",
            npv: loanInterestWaiverPlusExtention.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            interest_waiver_extension: values["interest_waiver_extension"],
            extension_interest_waiver: values["extension_interest_waiver"],
          };
          removeExistedLoanInterestWaiverAndExtensionInfoSecond.push(
            withExtensionNpvMul2
          );
          withInterestWaiverAndExtensionMultipleNPV =
            removeExistedLoanInterestWaiverAndExtensionInfoSecond;
        }
      });
    }
    setInterestWaiverPlusExtensionAmortization(
      loanInterestWaiverPlusExtention.scheduledPayments
    );
    setNpvInterestWaiverExtension(loanInterestWaiverPlusExtention.NPV);

    const withInterestWaiverPlusExtensionInGraph = {
      type: "Interest Waiver Plus Extension",
      result: loanInterestWaiverPlusExtention.NPV,
    };
    graphNPVS.push(withInterestWaiverPlusExtensionInGraph);
    localStorage.setItem(
      "npvs",
      JSON.stringify(withInterestWaiverPlusExtensionInGraph)
    );
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));

    setYearlyScheduledPaymentWithInterestWaiverPlusExtension(
      loanInterestWaiverPlusExtention.yearlyScheduledPayment
    );
    setYearlyInterestSummationWithInterestWaiverPlusExtension(
      loanInterestWaiverPlusExtention.yearlyInterestSummation
    );
    setYearlyPrincipalSummationWithInterestWaiverPlusExtension(
      loanInterestWaiverPlusExtention.yearlyPrincipalSummation
    );
  };

  const calculateNPVWithPrincipalAndInterestWaiverPlusExtension = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments, //will come to here
    principalInterestWaiverExtension,
    interestprincipalWaiverExtension,
    extensionInterestIrincipalWaiver
  ) => {
    const loanPrincipalAndInterestWaiverPlusExtention =
      NPVPrincipalAndInterestWaiverPlusExtension(
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,
        principalInterestWaiverExtension,
        interestprincipalWaiverExtension,
        extensionInterestIrincipalWaiver
      );
    if (withPrincipalAndInterestWaiverAndExtensionMultipleNPV.length === 0) {
      const withIwAndEMulNPV = {
        scenario: "principal&interestwaiver&extension",
        npv: loanPrincipalAndInterestWaiverPlusExtention.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: values["original-loan"],
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        principal_interest_waiver_extension:
          values["principal_interest_waiver_extension"],
        interest_principal_waiver_extension:
          values["interest_principal_waiver_extension"],
        extension_interest_principal_waiver:
          values["extension_interest_principal_waiver"],
      };
      withPrincipalAndInterestWaiverAndExtensionMultipleNPV.push(
        withIwAndEMulNPV
      );
    } else if (
      withPrincipalAndInterestWaiverAndExtensionMultipleNPV.length > 0
    ) {
      withPrincipalAndInterestWaiverAndExtensionMultipleNPV.forEach(
        (selectedLoanInfo) => {
          if (
            npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
            npvScenarios["npv-scenarios"].trim().toLowerCase() ===
              selectedLoanInfo.scenario.trim().toLowerCase()
          ) {
            /**
             * ==================================================================================================================
             * Change the npv results because it is already exists
             * First get the loanExtension information that is already exists
             * Then splice that array and assign the newly requested loanExtension information to the array object
             * ===================================================================================================================
             */
            const removeExistedLoanWithInterestWaiverAndExtensionInfo =
              withPrincipalAndInterestWaiverAndExtensionMultipleNPV.filter(
                (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
              );
            const withExtensionNpvMul1 = {
              scenario: "principal&interestwaiver&extension",
              npv: loanPrincipalAndInterestWaiverPlusExtention.NPV,
              selectedLoan: npvLoans.loan_id,
              amount: values["original-loan"],
              annualInterestRate: npvLoans.annualInterestRate,
              loanPeriodsInYears: npvLoans.loanPeriodsInYears,
              numberOfPayments: npvLoans.numberOfPayments,
              riskPremium: npvLoans.riskPremium,
              type: npvLoans.type,
              registeredDate: npvLoans.registeredDate,
              principal_interest_waiver_extension:
                values["principal_interest_waiver_extension"],
              interest_principal_waiver_extension:
                values["interest_principal_waiver_extension"],
              extension_interest_principal_waiver:
                values["extension_interest_principal_waiver"],
            };
            removeExistedLoanWithInterestWaiverAndExtensionInfo.push(
              withExtensionNpvMul1
            );
            withPrincipalAndInterestWaiverAndExtensionMultipleNPV =
              removeExistedLoanWithInterestWaiverAndExtensionInfo;
          } else if (
            npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
            npvScenarios["npv-scenarios"].trim().toLowerCase() ===
              selectedLoanInfo.scenario.trim().toLowerCase()
          ) {
            /**
             * Loan id is not same as the previous but scienario is same
             * Find the loan information in the existing array
             * if exists, remove the old loan information
             * else add to the array of objects
             */
            const removeExistedLoanInterestWaiverAndExtensionInfoSecond =
              withPrincipalAndInterestWaiverAndExtensionMultipleNPV.filter(
                (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
              );
            const withExtensionNpvMul2 = {
              scenario: "principal&interestwaiver&extension",
              npv: loanPrincipalAndInterestWaiverPlusExtention.NPV,
              selectedLoan: npvLoans.loan_id,
              amount: values["original-loan"],
              annualInterestRate: npvLoans.annualInterestRate,
              loanPeriodsInYears: npvLoans.loanPeriodsInYears,
              numberOfPayments: npvLoans.numberOfPayments,
              riskPremium: npvLoans.riskPremium,
              type: npvLoans.type,
              registeredDate: npvLoans.registeredDate,
              principal_interest_waiver_extension:
                values["principal_interest_waiver_extension"],
              interest_principal_waiver_extension:
                values["interest_principal_waiver_extension"],
              extension_interest_principal_waiver:
                values["extension_interest_principal_waiver"],
            };
            removeExistedLoanInterestWaiverAndExtensionInfoSecond.push(
              withExtensionNpvMul2
            );
            withPrincipalAndInterestWaiverAndExtensionMultipleNPV =
              removeExistedLoanInterestWaiverAndExtensionInfoSecond;
          }
        }
      );
    }
    setPrincipalAndInterestWaiverPlusExtensionAmortization(
      loanPrincipalAndInterestWaiverPlusExtention.scheduledPayments
    );
    setNpvPrincipalAndInterestWaiverExtension(
      loanPrincipalAndInterestWaiverPlusExtention.NPV
    );

    const withPrincipalAndInterestWaiverPlusExtensionInGraph = {
      type: "Principal & Interest Waiver Plus Extension",
      result: loanPrincipalAndInterestWaiverPlusExtention.NPV,
    };
    graphNPVS.push(withPrincipalAndInterestWaiverPlusExtensionInGraph);
    localStorage.setItem(
      "npvs",
      JSON.stringify(withPrincipalAndInterestWaiverPlusExtensionInGraph)
    );
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));

    setYearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension(
      loanPrincipalAndInterestWaiverPlusExtention.yearlyScheduledPayment
    );
    setYearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension(
      loanPrincipalAndInterestWaiverPlusExtention.yearlyInterestSummation
    );
    setYearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension(
      loanPrincipalAndInterestWaiverPlusExtention.yearlyPrincipalSummation
    );
  };

  /**
   * =========================================================================================================================================================
   * Compute NPV with InterestWaiver alone====================================================================================================================
   * ========================================================================================================================================================
   * =========================||||||||=======================================================================================================================
   * ============================||==========================================================================================================================
   * ============================||==========================================================================================================================
   * ============================||==========================================================================================================================
   * =========================||||||||=======================================================================================================================
   * ========================================================================================================================================================
   * First check the array is empty or not===================================================================================================================
   *  If empty => push the current npv information such as scenario, NPV result and selectedLoan information=================================================
   *  Else if the scenario and loan information is same plus there is already pushed loan information,=======================================================
   *  remove the old loan information and push/substitue with the new one.===================================================================================
   * ========================================================================================================================================================
   */

  const calculateNPVInjection = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments,
    injection
  ) => {
    const loanInjection = NPVInjection(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      injection
    );
    if (withInjectionMultipleNPV.length === 0) {
      const withInjectionNpvMul = {
        scenario: "injection",
        npv: loanInjection.NPV,
        selectedLoan: npvLoans.loan_id,
        amount: values["original-loan"],
        annualInterestRate: npvLoans.annualInterestRate,
        loanPeriodsInYears: npvLoans.loanPeriodsInYears,
        numberOfPayments: npvLoans.numberOfPayments,
        riskPremium: npvLoans.riskPremium,
        type: npvLoans.type,
        registeredDate: npvLoans.registeredDate,
        withExtension: values["injection"],
      };
      withInjectionMultipleNPV.push(withInjectionNpvMul);
    } else if (withInjectionMultipleNPV.length > 0) {
      withInjectionMultipleNPV.forEach((selectedLoanInfo) => {
        if (
          npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * ==================================================================================================================
           * Change the npv results because it is already exists
           * First get the loanExtension information that is already exists
           * Then splice that array and assign the newly requested loanExtension information to the array object
           * ===================================================================================================================
           */
          const removeExistedLoanWithInjectionInfo =
            withInjectionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withExtensionNpvMul1 = {
            scenario: "injection",
            npv: loanInjection.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            withExtension: values["injection"],
          };
          removeExistedLoanWithInjectionInfo.push(withExtensionNpvMul1);
          withInjectionMultipleNPV = removeExistedLoanWithInjectionInfo;
        } else if (
          npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
          npvScenarios["npv-scenarios"].trim().toLowerCase() ===
            selectedLoanInfo.scenario.trim().toLowerCase()
        ) {
          /**
           * Loan id is not same as the previous but scienario is same
           * Find the loan information in the existing array
           * if exists, remove the old loan information
           * else add to the array of objects
           */
          const removeExistedLoanInjectionInfoSecond =
            withInjectionMultipleNPV.filter(
              (oldLoan) => oldLoan.selectedLoan !== npvLoans.loan_id
            );
          const withInjectionNpvMul2 = {
            scenario: "injection",
            npv: loanInjection.NPV,
            selectedLoan: npvLoans.loan_id,
            amount: values["original-loan"],
            annualInterestRate: npvLoans.annualInterestRate,
            loanPeriodsInYears: npvLoans.loanPeriodsInYears,
            numberOfPayments: npvLoans.numberOfPayments,
            riskPremium: npvLoans.riskPremium,
            type: npvLoans.type,
            registeredDate: npvLoans.registeredDate,
            withExtension: values["injection"],
          };
          removeExistedLoanInjectionInfoSecond.push(withInjectionNpvMul2);
          withInjectionMultipleNPV = removeExistedLoanInjectionInfoSecond;
        }
      });
    }

    setInjectionAmortization(loanInjection.scheduledPayments);
    setNpvInjection(loanInjection.NPV);

    const withInjection = { type: "injection", result: loanInjection.NPV };
    graphNPVS.push(withInjection);
    localStorage.setItem("npvs", JSON.stringify(withInjection));
    localStorage.setItem("allNPV", JSON.stringify(graphNPVS));

    setYearlyScheduledPaymentInjection(loanInjection.yearlyScheduledPayment);
    setYearlyInterestSummationInjection(loanInjection.yearlyInterestSummation);
    setYearlyPrincipalSummationInjection(
      loanInjection.yearlyPrincipalSummation
    );
  };
  //tiztaw end
  // I End here
  const { id } = useParams();
  const [collaterals, setCollaterals] = useState([]);
  const [loans, setLoans] = useState([]);
  const [isCollateralShown, setIsCollateralShown] = useState(false);
  const [collateralLength, setCollateralLength] = useState(0);
  const [loanAdd, setLoanAdd] = useState(0);

  useEffect(() => {
    getLoans();
  }, []);

  const getLoans = () => {
    CustomerService.getLoans(id)
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const showCollateral = (loan) => {
  //     setCollaterals(loan.collaterals)
  //     setIsCollateralShown(true)
  //     setCollateralLength(loan.collaterals.length)
  // }

  const showCollateral = (loan) => {
    localStorage.setItem("selectedLoan", JSON.stringify(loan));
    setCollaterals(loan.collaterals);
    setIsCollateralShown(true);
    setCollateralLength(loan.collaterals.length);
    setSelectedLoan(loan);
    setLoanAdd(loan.loan_id);
  };
  const [forclosureValues, setForclosureValues] = useState({
    "collateral-type": "",
    "collateral-value": "",
    registerDate: "",
  });

  const handleForClosureInputChange = (e) => {
    const { name, value } = e.target;
    setForclosureValues({
      ...forclosureValues,
      [name]: value,
    });
  };

  // const numberWithCommas = (x) =>{
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  const numberWithCommas = (num) => {
    return num.toLocaleString("en-US");
  };

  const copyCollateral = (e, collateral) => {
    e.preventDefault();
    setTimeout(() => {
      setIsPending(false);
      // const con = JSON.parse(localStorage.getItem("selectedLoan"));
      // forclosureValues["riskPremium"] = con.riskPremium;
      // forclosureValues["annualInterestRate "] = con.annualInterestRate;
      // // console.log(collateral)
      // forclosureValues["collateral-type"] = collateral.type;
      // forclosureValues["collateral-value"] = collateral.value;
      // console.log("Le me see it : " + collateral.registerDate)
      // let year = (collateral.registerDate).substring(0, 4)
      // let month = (collateral.registerDate).substring(5, 7)
      // let day = (collateral.registerDate).substring(8, 10)
      // console.log("Year : " + year)
      // console.log("month : " + month)
      // console.log("day : " + day)
      // let rd = (year + "-" + month + "-" + day);
      // console.log("Last date : " + rd)
      // forclosureValues["registerDate"] = rd;
      setClickStatus(true);
    }, 100);
    setIsPending(true);
  };
  const computeCollateralNPV = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const selling_cost_multiplier = 0.05;
      var foreclosure_npv = 0;
      var foreclosure_cashflow = 0;
      var foreclosure_selling_cost = 0;
      var sellingTime = 2;
      const riskPremium = selectedLoan.riskPremium;
      const annualInterestRate = selectedLoan.annualInterestRate;
      const today = new Date();
      // var totalRate = riskPremium + annualInterestRate + 100;
      // console.log("totalRate before: "+totalRate)
      collaterals.forEach((selected_collateral, index) => {
        if (selected_collateral.type === "building") {
          const loanPeriod =
            today.getFullYear() -
            selected_collateral.registerDate.substring(0, 4);
          var total_rate_building_0 = riskPremium + annualInterestRate + 100;
          if (loanPeriod <= 1) {
            // if the duration is from 1 to 2year inclusive, MCF	1
            // value of collateral*MCF*1
            // var cashflow = collateral_value - selling_cost;
            var foreclosure_selling_cost_building_0_temp =
              selected_collateral.value * selling_cost_multiplier; //selling cost during forclosure

            var foreclosure_cashflow_building_0_temp =
              selected_collateral.value -
              foreclosure_selling_cost_building_0_temp;

            var div = Math.pow(total_rate_building_0 / 100, sellingTime);
            var foreclosure_temp_building_0_npv =
              foreclosure_cashflow_building_0_temp / div;

            foreclosure_cashflow += foreclosure_cashflow_building_0_temp;

            foreclosure_selling_cost +=
              foreclosure_selling_cost_building_0_temp;

            foreclosure_npv += foreclosure_temp_building_0_npv;

            // const foreclosureGraphData = { "type": "Foreclosure", "result": npv }
            // graphNPVS.push(foreclosureGraphData)
            // localStorage.setItem("npvs", JSON.stringify(foreclosureGraphData))
            // localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
          } else if (loanPeriod > 1 && loanPeriod <= 2) {
            // if the duration is from 1 to 2 years inclusive, MCF	1.2
            // value of collateral*MCF*1.5
            var total_rate_building_1 = riskPremium + annualInterestRate + 100;
            var foreclosure_selling_cost_building_1_temp =
              selected_collateral.value * selling_cost_multiplier;

            var updateColateralValue = selected_collateral.value * 1.13;
            var foreclosure_cashflow_building_1_temp =
              updateColateralValue - foreclosure_selling_cost_building_1_temp;
            var div_building_1 = Math.pow(
              total_rate_building_1 / 100,
              sellingTime
            );

            var foreclosure_building_1_npv =
              foreclosure_cashflow_building_1_temp / div_building_1;

            foreclosure_cashflow += foreclosure_cashflow_building_1_temp;
            foreclosure_selling_cost +=
              foreclosure_selling_cost_building_1_temp;
            foreclosure_npv += foreclosure_building_1_npv;
          } else if (loanPeriod > 2 && loanPeriod <= 3) {
            // if the duration is from 2 to 3year inclusive, MCF	1.3
            // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
            var total_rate_building_2 = riskPremium + annualInterestRate + 100;
            var foreclosure_selling_cost_building_2_temp =
              selected_collateral.value * selling_cost_multiplier;
            var updateColateralValue_2 = selected_collateral.value * 1.25;

            var foreclosure_cashflow_building_2_temp =
              updateColateralValue_2 - foreclosure_selling_cost_building_2_temp;
            var div_building_2 = Math.pow(
              total_rate_building_2 / 100,
              sellingTime
            );

            var foreclosure_building_2_npv =
              foreclosure_cashflow_building_2_temp / div_building_2;

            foreclosure_cashflow += foreclosure_cashflow_building_2_temp;
            foreclosure_selling_cost +=
              foreclosure_selling_cost_building_2_temp;
            foreclosure_npv += foreclosure_building_2_npv;
          } else if (loanPeriod > 3 && loanPeriod <= 4) {
            // if the duration is from 3 to 4year inclusive, MCF	1.4
            // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
            var total_rate_building_3 = riskPremium + annualInterestRate + 100;

            var foreclosure_selling_cost_building_3_temp =
              selected_collateral.value * selling_cost_multiplier;
            var updateColateralValue_3 = selected_collateral.value * 1.38;
            var foreclosure_cashflow_building_3_temp =
              updateColateralValue_3 - foreclosure_selling_cost_building_3_temp;
            var div_building_3 = Math.pow(
              total_rate_building_3 / 100,
              sellingTime
            );

            var foreclosure_building_3_npv =
              foreclosure_cashflow_building_3_temp / div_building_3;

            foreclosure_cashflow += foreclosure_cashflow_building_3_temp;
            foreclosure_selling_cost +=
              foreclosure_selling_cost_building_3_temp;
            foreclosure_npv += foreclosure_building_3_npv;
          } else if (loanPeriod > 4 && loanPeriod <= 5) {
            // if the duration is from 4 to 5year inclusive, MCF	1.5
            // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
            var total_rate_building_4 = riskPremium + annualInterestRate + 100;
            var foreclosure_selling_cost_building_4_temp =
              selected_collateral.value * selling_cost_multiplier;
            var updateColateralValue_5 = selected_collateral.value * 1.5;
            var foreclosure_cashflow_building_4_temp =
              updateColateralValue_5 - foreclosure_selling_cost_building_4_temp;
            var div_building_4 = Math.pow(
              total_rate_building_4 / 100,
              sellingTime
            );

            var foreclosure_building_4_npv =
              foreclosure_cashflow_building_4_temp / div_building_4;

            foreclosure_cashflow += foreclosure_cashflow_building_4_temp;
            foreclosure_selling_cost +=
              foreclosure_selling_cost_building_4_temp;
            foreclosure_npv += foreclosure_building_4_npv;
          } else if (loanPeriod > 5) {
            alert("It should be revaluated by experts");
          }
        }
        if (selected_collateral.type === "motor") {
          const loanPeriod =
            today.getFullYear() -
            selected_collateral.registerDate.substring(0, 4);
          var depreciationValue = 0.1;
          var AmountDepreciation =
            selected_collateral.value * depreciationValue * loanPeriod;
          var netValueAfterDepreciation =
            selected_collateral.value - AmountDepreciation;
          if (loanPeriod <= 1) {
            // if the duration is from 1 to 2year inclusive, MCF	1
            // value of collateral*MCF*1
            var foreclosure_selling_cost_motor_0_temp =
              selected_collateral.value * selling_cost_multiplier;
            var openMarketColateralValue = netValueAfterDepreciation;
            var foreclosure_cashflow_motor_0_temp =
              openMarketColateralValue - foreclosure_selling_cost_motor_0_temp;

            var total_rate_motor_41 = riskPremium + annualInterestRate + 100;

            var div_motor_0 = Math.pow(total_rate_motor_41 / 100, sellingTime);

            foreclosure_selling_cost_motor_0_temp =
              selected_collateral.value * selling_cost_multiplier;
            foreclosure_selling_cost += foreclosure_selling_cost_motor_0_temp;

            foreclosure_cashflow += foreclosure_cashflow_motor_0_temp;
            var foreclosure_temp_motor_0_npv =
              foreclosure_cashflow_motor_0_temp / div_motor_0;
            foreclosure_npv += foreclosure_temp_motor_0_npv;
          } else if (loanPeriod > 1 && loanPeriod <= 2) {
            // if the duration is from 1 to 2year inclusive, MCF	1.1
            // for the duration b/n 1 to 5year value of collateral*MCF*0.9
            var foreclosure_selling_cost_motor_1_temp =
              selected_collateral.value * selling_cost_multiplier;
            var openMarketColateralValue_2 = netValueAfterDepreciation * 1.1;

            var foreclosure_cashflow_motor_1_temp =
              openMarketColateralValue_2 -
              foreclosure_selling_cost_motor_1_temp;

            var total_rate_motor_1 = riskPremium + annualInterestRate + 100;

            var div_motor_1 = Math.pow(total_rate_motor_1 / 100, sellingTime);
            var foreclosure_temp_motor_1_npv =
              foreclosure_cashflow_motor_1_temp / div_motor_1;

            foreclosure_selling_cost += foreclosure_selling_cost_motor_1_temp;
            foreclosure_cashflow += foreclosure_cashflow_motor_1_temp;
            foreclosure_npv += foreclosure_temp_motor_1_npv;
          } else if (loanPeriod > 2 && loanPeriod <= 4) {
            // if the duration is from 2 to 4year inclusive, MCF	1.2
            // for the duration b/n 1 to 5year value of collateral*MCF*0.9
            var foreclosure_selling_cost_motor_2_temp =
              selected_collateral.value * selling_cost_multiplier;
            var openMarketColateralValue_3 = netValueAfterDepreciation * 1.2;
            var foreclosure_cashflow_motor_2_temp =
              openMarketColateralValue_3 -
              foreclosure_selling_cost_motor_2_temp;
            var total_rate_motor_2 = riskPremium + annualInterestRate + 100;

            var div_motor_2 = Math.pow(
              parseFloat(total_rate_motor_2 / 100),
              parseFloat(sellingTime)
            );
            var foreclosure_temp_motor_2_npv =
              foreclosure_cashflow_motor_2_temp / div_motor_2;

            foreclosure_selling_cost += foreclosure_selling_cost_motor_2_temp;
            foreclosure_cashflow += foreclosure_cashflow_motor_1_temp;
            foreclosure_npv += foreclosure_temp_motor_2_npv;
          } else if (loanPeriod > 4 && loanPeriod <= 6) {
            // if the duration is from 4 to 6year inclusive, MCF	1.25
            // for the duration b/n 1 to 5year value of collateral*MCF*0.9
            var foreclosure_selling_cost_motor_4_temp =
              selected_collateral.value * selling_cost_multiplier;
            var openMarketColateralValue_4 = netValueAfterDepreciation * 1.3;
            var foreclosure_cashflow_motor_4_temp =
              openMarketColateralValue_4 -
              foreclosure_selling_cost_motor_4_temp;
            var total_rate_motor_4 = riskPremium + annualInterestRate + 100;
            var div_motor_4 = Math.pow(total_rate_motor_4 / 100, sellingTime);
            var foreclosure_temp_motor_4_npv =
              foreclosure_cashflow_motor_4_temp / div_motor_4;

            foreclosure_selling_cost += foreclosure_selling_cost_motor_4_temp;
            foreclosure_cashflow += foreclosure_cashflow_motor_4_temp;
            foreclosure_npv += foreclosure_temp_motor_4_npv;
          } else if (loanPeriod > 6 && loanPeriod <= 8) {
            // If the duration is from 6 to 8 year inclusive, MCF	1.35
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_motor_6_temp =
              selected_collateral.value * selling_cost_multiplier;
            var openMarketColateralValue_5 = netValueAfterDepreciation * 1.4;

            var foreclosure_cashflow_motor_6_temp =
              openMarketColateralValue_5 -
              foreclosure_selling_cost_motor_6_temp;
            var total_rate_motor_6 = riskPremium + annualInterestRate + 100;
            var div_motor_6 = Math.pow(total_rate_motor_6 / 100, sellingTime);
            var foreclosure_temp_motor_6_npv =
              foreclosure_cashflow_motor_6_temp / div_motor_6;

            foreclosure_selling_cost += foreclosure_selling_cost_motor_6_temp;
            foreclosure_cashflow += foreclosure_cashflow_motor_6_temp;
            foreclosure_npv += foreclosure_temp_motor_6_npv;
          } else if (loanPeriod > 8 && loanPeriod <= 10) {
            // if the duration is from 8 to 10 year inclusive, MCF	1.5
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_motor_8_temp =
              selected_collateral.value * selling_cost_multiplier;
            var openMarketColateralValue_6 = netValueAfterDepreciation * 1.5;
            var foreclosure_cashflow_motor_8_temp =
              openMarketColateralValue_6 -
              foreclosure_selling_cost_motor_8_temp;
            var total_rate_motor_8 = riskPremium + annualInterestRate + 100;
            var div_motor_8 = Math.pow(total_rate_motor_8 / 100, sellingTime);
            var foreclosure_temp_motor_8_npv =
              foreclosure_cashflow_motor_8_temp / div_motor_8;

            foreclosure_selling_cost += foreclosure_selling_cost_motor_8_temp;
            foreclosure_cashflow += foreclosure_cashflow_motor_8_temp;
            foreclosure_npv += foreclosure_temp_motor_8_npv;
          } else {
            // if the duration is above 10year, MCF	1.4
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_motor_9_temp =
              selected_collateral.value * selling_cost_multiplier;
            var openMarketColateralValue_7 = netValueAfterDepreciation * 0.14;
            var foreclosure_cashflow_motor_9_temp =
              openMarketColateralValue_7 -
              foreclosure_selling_cost_motor_9_temp;

            var total_rate_motor_9 = riskPremium + annualInterestRate + 100;
            var div_motor_9 = Math.pow(total_rate_motor_9 / 100, sellingTime);
            var foreclosure_temp_motor_9_npv =
              foreclosure_cashflow_motor_9_temp / div_motor_9;

            foreclosure_selling_cost += foreclosure_selling_cost_motor_9_temp;
            foreclosure_cashflow += foreclosure_cashflow_motor_9_temp;
            foreclosure_npv += foreclosure_temp_motor_9_npv;
            // tommorow I will do other parts
          }
        }
        if (selected_collateral.type === "others") {
          //it means machinery
          var depreciation = 0.07;
          const loanPeriod =
            today.getFullYear() -
            selected_collateral.registerDate.substring(0, 4);
          var amountDepreciated =
            selected_collateral.value * depreciation * loanPeriod;
          var NetValueAfterDepreciation =
            selected_collateral.value - amountDepreciated;

          if (loanPeriod <= 1) {
            // if the duration is from 1 to 2year inclusive, MCF1
            // value of collateral*MCF*1
            var foreclosure_selling_cost_others_0_temp =
              selected_collateral.value * selling_cost_multiplier;
            var Openmarketvaluationofcollateral_1 = NetValueAfterDepreciation;

            var total_rate_other_0 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_0_temp =
              Openmarketvaluationofcollateral_1 -
              foreclosure_selling_cost_others_0_temp;
            var div_other_0 = Math.pow(total_rate_other_0 / 100, sellingTime);
            var foreclosure_temp_other_0_npv =
              foreclosure_cashflow_other_0_temp / div_other_0;

            foreclosure_selling_cost += foreclosure_selling_cost_others_0_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_0_temp;
            foreclosure_npv += foreclosure_temp_other_0_npv;
          } else if (loanPeriod > 1 && loanPeriod <= 2) {
            // if the duration is from 1 to 2 year inclusive, MCF	1.05
            var foreclosure_selling_cost_others_1_temp =
              selected_collateral.value * selling_cost_multiplier;

            var Openmarketvaluationofcollateral_2 =
              NetValueAfterDepreciation * 1.07;
            var total_rate_other_1 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_1_temp =
              Openmarketvaluationofcollateral_2 -
              foreclosure_selling_cost_others_1_temp;
            var div_other_1 = Math.pow(total_rate_other_1 / 100, sellingTime);
            var foreclosure_temp_other_1_npv =
              foreclosure_cashflow_other_1_temp / div_other_1;

            foreclosure_selling_cost += foreclosure_selling_cost_others_1_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_1_temp;
            foreclosure_npv += foreclosure_temp_other_1_npv;
          } else if (loanPeriod > 2 && loanPeriod <= 4) {
            // if the duration is from 2 to 4year inclusive, MCF	1.2
            // for the duration b/n 1 to 5year value of collateral*MCF*0.9

            var foreclosure_selling_cost_others_2_temp =
              selected_collateral.value * selling_cost_multiplier;

            var Openmarketvaluationofcollateral_3 =
              NetValueAfterDepreciation * 1.14;
            var total_rate_other_2 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_2_temp =
              Openmarketvaluationofcollateral_3 -
              foreclosure_selling_cost_others_2_temp;
            var div_other_2 = Math.pow(total_rate_other_2 / 100, sellingTime);
            var foreclosure_temp_other_2_npv =
              foreclosure_cashflow_other_2_temp / div_other_2;

            foreclosure_selling_cost += foreclosure_selling_cost_others_2_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_2_temp;
            foreclosure_npv += foreclosure_temp_other_2_npv;
          } else if (loanPeriod > 4 && loanPeriod <= 6) {
            // if the duration is from 4 to 6year inclusive, MCF	1.3
            // for the duration b/n 1 to 5year value of collateral*MCF*0.9
            var foreclosure_selling_cost_others_4_temp =
              selected_collateral.value * selling_cost_multiplier;

            var Openmarketvaluationofcollateral_4 =
              NetValueAfterDepreciation * 1.21;
            var total_rate_other_4 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_4_temp =
              Openmarketvaluationofcollateral_4 -
              foreclosure_selling_cost_others_4_temp;
            var div_other_4 = Math.pow(total_rate_other_4 / 100, sellingTime);
            var foreclosure_temp_other_4_npv =
              foreclosure_cashflow_other_4_temp / div_other_4;

            foreclosure_selling_cost += foreclosure_selling_cost_others_4_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_4_temp;
            foreclosure_npv += foreclosure_temp_other_4_npv;
          } else if (loanPeriod > 6 && loanPeriod <= 8) {
            // if the duration is from 6 to 8year inclusive, MCF	1.35
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_others_6_temp =
              selected_collateral.value * selling_cost_multiplier;
            var Openmarketvaluationofcollateral_5 =
              NetValueAfterDepreciation * 1.29;
            var total_rate_other_6 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_6_temp =
              Openmarketvaluationofcollateral_5 -
              foreclosure_selling_cost_others_6_temp;
            var div_other_6 = Math.pow(total_rate_other_6 / 100, sellingTime);
            var foreclosure_temp_other_6_npv =
              foreclosure_cashflow_other_6_temp / div_other_6;

            foreclosure_selling_cost += foreclosure_selling_cost_others_6_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_6_temp;
            foreclosure_npv += foreclosure_temp_other_6_npv;
          } else if (loanPeriod > 8 && loanPeriod <= 10) {
            // if the duration is from 8 to 10year inclusive, MCF	1.4
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_others_8_temp =
              selected_collateral.value * selling_cost_multiplier;
            var Openmarketvaluationofcollateral_6 =
              NetValueAfterDepreciation * 1.36;
            var total_rate_other_8 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_8_temp =
              Openmarketvaluationofcollateral_6 -
              foreclosure_selling_cost_others_8_temp;
            var div_other_8 = Math.pow(total_rate_other_8 / 100, sellingTime);
            var foreclosure_temp_other_8_npv =
              foreclosure_cashflow_other_8_temp / div_other_8;

            foreclosure_selling_cost += foreclosure_selling_cost_others_8_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_8_temp;
            foreclosure_npv += foreclosure_temp_other_8_npv;
          } else if (loanPeriod > 10 && loanPeriod <= 12) {
            // if the duration is from 10 to 12year inclusive, MCF	1.45
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_others_10_temp =
              selected_collateral.value * selling_cost_multiplier;
            var Openmarketvaluationofcollateral_7 =
              NetValueAfterDepreciation * 1.43;
            var total_rate_other_10 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_10_temp =
              Openmarketvaluationofcollateral_7 -
              foreclosure_selling_cost_others_10_temp;
            var div_other_10 = Math.pow(total_rate_other_10 / 100, sellingTime);
            var foreclosure_temp_other_10_npv =
              foreclosure_cashflow_other_10_temp / div_other_10;

            foreclosure_selling_cost += foreclosure_selling_cost_others_10_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_10_temp;
            foreclosure_npv += foreclosure_temp_other_10_npv;
          } else if (loanPeriod > 12 && loanPeriod <= 15) {
            // if the duration is from 12 to 15year inclusive, MCF	1.5
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_others_12_temp =
              selected_collateral.value * selling_cost_multiplier;
            var Openmarketvaluationofcollateral_8 =
              NetValueAfterDepreciation * 1.5;
            var total_rate_other_12 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_12_temp =
              Openmarketvaluationofcollateral_8 -
              foreclosure_selling_cost_others_12_temp;
            var div_other_12 = Math.pow(total_rate_other_12 / 100, sellingTime);
            var foreclosure_temp_other_12_npv =
              foreclosure_cashflow_other_12_temp / div_other_12;

            foreclosure_selling_cost += foreclosure_selling_cost_others_12_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_12_temp;
            foreclosure_npv += foreclosure_temp_other_12_npv;
          } else {
            // if the duration is above 510year, MCF	1.3
            // For the duration is above 5 year value of collateral*MCF*0.9
            var foreclosure_selling_cost_others_13_temp =
              selected_collateral.value * selling_cost_multiplier;
            var Openmarketvaluationofcollateral_9 =
              NetValueAfterDepreciation * 1.13;
            var total_rate_other_13 = riskPremium + annualInterestRate + 100;

            var foreclosure_cashflow_other_13_temp =
              Openmarketvaluationofcollateral_9 -
              foreclosure_selling_cost_others_13_temp;
            var div_other_13 = Math.pow(total_rate_other_13 / 100, sellingTime);
            var foreclosure_temp_other_13_npv =
              foreclosure_cashflow_other_13_temp / div_other_13;

            foreclosure_selling_cost += foreclosure_selling_cost_others_13_temp;
            foreclosure_cashflow += foreclosure_cashflow_other_13_temp;
            foreclosure_npv += foreclosure_temp_other_13_npv;
          }
        }
      });
      setSellingCost(foreclosure_selling_cost);
      setNPVForClosure(foreclosure_npv);
      setCashFlow(numberWithCommas(foreclosure_cashflow));
      const foreclosureGraphData = {
        type: "Foreclosure",
        result: foreclosure_npv,
      };
      graphNPVS.push(foreclosureGraphData);
      localStorage.setItem("npvs", JSON.stringify(foreclosureGraphData));
      localStorage.setItem("allNPV", JSON.stringify(graphNPVS));
    });
    setShowNPVWithForeclosure(true);
  };
  /**
   *
   * @param {loan} - loan information
   * copy loan data to the calculator
   */

  const populateLoan = (e, index, loan) => {
    e.preventDefault();
    setLoadingPopulate(loan.loan_id, true);
    /**
     * Set loans for specific customer below
     */
    // setNpvLoans(loans);
    setNpvLoans(loan);
    setShowNumberOfLoans(true);
    setTimeout(() => {
      setIsPending(false);
      npvScenarios["npv-scenarios"] = "normal";
      values["collateral-type"] = "machinery";
      values["original-loan"] = loan.amount;
      values["annaul-interest-rate"] = loan.annualInterestRate;
      values["loan-period-in-years"] = loan.loanPeriodsInYears;
      values["risk-premium"] = loan.riskPremium;
      // values["number-of-payments-per-year"] = 4;
      values["number-of-payments-per-year"] = loan.numberOfPayments;
      // values["waiver-number-of-payments"] = 0;
      setClickStatus(true);
      setLoadingPopulate(false);
    }, 100);
    setIsPending(true);
  };
  const showInGraph = (e) => {
    e.preventDefault();
    setVisualizeDataInGrpah(JSON.parse(localStorage.getItem("allNPV")));
    setShowNoramlNpvInGraph(true);
    setShowNPVWithPrincipalWaiverInGraph(true);
    setShowNPVWithInterestWaiverInGraph(true);
    setShowNPVWithExtensionInGraph(true);
    setShowNPVWithPrincipalAndInterestWaiverInGraph(true);
    setShowNPVWithPrincipalWaiverPlusExtensionInGraph(true);
    setShowNPVWithInterestWaiverPlusExtensionInGraph(true);
    setShowNPVWithForeclosureInGraph(true);
    setShowNPVWithInjectionInGraph(true);
  };
  const compareNPV = (e) => {
    e.preventDefault();
    setShowNPVComparision(true);

    console.log(JSON.parse(localStorage.getItem("allNPV")));

    descendingOrderNPVs = JSON.parse(localStorage.getItem("allNPV"));
    ascendingOrderNPVs = JSON.parse(localStorage.getItem("allNPV"));

    const highest = descendingOrderNPVs.reduce((prev, cur) =>
      cur.result > prev.result ? cur : prev
    );
    const lowest = descendingOrderNPVs.reduce((prev, cur) =>
      cur.result < prev.result ? cur : prev
    );

    setLowestNPV(lowest);
    setLargestNPV(highest);

    console.log(
      descendingOrderNPVs.sort((p1, p2) =>
        p1.result < p2.result ? 1 : p1.result > p2.result ? -1 : 0
      )
    );
    // localStorage.setItem("descendingOrderNPVs", descendingOrderNPVs);
    // let sortedDates = ascendingOrderNPVs.sort((p1, p2) =>
    //   p1.result > p2.result ? 1 : p1.result < p2.result ? -1 : 0
    // );
  };
  /**
   * toast message for populating values
   */
  const populateMessage = () => {
    toast.success("Populated Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "populate",
    });
  };

  const computeNPVMessage = () => {
    toast.success("NPV is Computing", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "compute",
    });
  };
  return (
    <div>
      <NPVModal
        isOpen={isLoanModalOpen}
        onClose={handleLoanCloseModal}
        title="Add loan information"
      >
        <div className="grid grid-cols-1 gap-4 submit-form">
          <div className="submit-form ">
            <>
              <form onSubmit={saveLoan}>
                <div className="relative center justify-center flex-1 w-full max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <NpvTextField
                    id="amount"
                    label="Amount"
                    variant="standard"
                    type="number"
                    value={credit.amount}
                    onChange={handleLoanInputChange}
                    name="amount"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      id="registeredDate"
                      label="Registered Date"
                      inputFormat="MM/DD/YYYY"
                      className="w-full max-w-full"
                      slotProps={{
                        textField: { variant: "standard", color: "success" },
                      }}
                      renderInput={() => (
                        <TextField
                          value={credit.registeredDate}
                          onChange={handleLoanInputChange}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <NpvTextField
                    id="type"
                    label="type"
                    value={credit.type}
                    onChange={handleLoanInputChange}
                    name="type" 
                    variant="standard"
                  />
                  <NpvTextField
                    id="annualInterestRate"
                    type="number"
                    label="Annual Interest Rate"
                    value={credit.annualInterestRate}
                    onChange={handleLoanInputChange}
                    name="annualInterestRate"
                    variant="standard"
                  />
                  <NpvTextField
                    id="loanPeriodsInYears"
                    type="number" variant="standard"
                    label="Loan Periods In Years"
                    value={credit.loanPeriodsInYears}
                    onChange={handleLoanInputChange}
                    name="loanPeriodsInYears"
                  />

                  <NpvTextField
                    id="riskPremium"
                    label="Risk Premium" variant="standard"
                    type="number"
                    value={credit.riskPremium}
                    onChange={handleLoanInputChange}
                    name="riskPremium"
                  />
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="numberOfPayments" color="success">
                      Number Of Payments
                    </InputLabel>
                    <Select
                      color="success"
                      value={selectedNumberOfPayments}
                      onChange={handleChangeSelectedNumberOfPayments}
                      labelId="numberOfPayments"
                      id="numberOfPayments"
                      label="Number Of Payments"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1">Annually</MenuItem>
                      <MenuItem value="2">Semi-Annually</MenuItem>
                      <MenuItem value="4">Quarterly</MenuItem>
                      <MenuItem value="12">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex justify-center pt-3">
                  <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save
                  </button>
                  {/* <ToastContainer /> */}
                </div>
              </form>
            </>
          </div>
        </div>
      </NPVModal>
      <header className="px-4 bg-gray-50 border border-gray-200 p-2 ">
        <Link to="/npv" className="text-green-600 font-semibold">
        <FaUndo
            className="text-[#00563F] hover:font-semibold cursor-pointer inline"
          />Go Back </Link>
      </header>
      <div className="mx-w-[1240px] mx-auto grid gap-1 ease-in-out px-4">
        <div className="w-full border-2 shadow-xl flex flex-col my-4 rounded-lg">
          <span className="px-4 text-green-600 cursor-pointer hover:font-extrabold">
            <AddBusinessOutlinedIcon
              fontSize="small"
              onClick={handleLoanModal}
            />
          </span>
          <header className="text-2xl bg-[#00563F] text-white ease-in-out border text-center capitalize">
            Loans
          </header>
          <div className="px-8">
            <p className="text-sm font-bold m-4 text-green-600">
              List of customers on Non Performing Loan status
            </p>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-green-200">
                    <th className="px-2 py-4 border border-gray-300">Number</th>
                    <th className="px-2 py-4 border border-gray-300"> Type </th>
                    <th className="px-2 py-4 border border-gray-300">Amount</th>
                    <th className="px-2 py-4 border border-gray-300"> Date </th>
                    <th
                      className="px-2 py-4 border border-gray-300"
                      rowSpan={loans.length}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan, index) => (
                    <tr
                      key={index}
                      className="bg-white
                    border-b border-green-200 hover:bg-green-200"
                    >
                      <th>{index + 1}</th>
                      <td className="px-2 py-4"> {loan.type} </td>
                      <td className="px-2 py-4">
                        {" "}
                        {numberWithCommas(roundAmount(loan.amount))}{" "}
                      </td>
                      <td className="px-2 py-4"> {loan.registeredDate} </td>
                      <td className="px-2 py-4">
                        <button
                          id={loan.loan_id}
                          className="btn btn-outline-success btn-sm"
                          style={{ margin: "1px" }}
                          onClick={(e) => {
                            populateLoan(e, index, loan);
                            populateMessage();
                          }}
                        >
                          <span
                            className="text-green-600"
                            data-toggle="tooltip"
                            title="Click it to copy the data to the calculator"
                          >
                            <ContentCopyIcon fontSize="small" /> Populate
                            <ToastContainer
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              autoClose={2500}
                            />
                          </span>
                        </button>
                      </td>
                      {index + 1 === 1 && (
                        <td
                          rowSpan={loans.length}
                          style={{ display: "auto" }}
                          className="px-2 py-4"
                        >
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            style={{ margin: "1px" }}
                            onClick={() => showCollateral(loan)}
                          >
                            <ReorderIcon size={18} /> Collateral
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-lg pl-3">
        {collaterals && isCollateralShown && (
          <button
            className="px-4 mb-2"
            onClick={() => {
              handleCollateralModal();
            }}
          >
            <LibraryAddOutlinedIcon
              data-toggle="tooltip"
              title="Click it to add collateral"
              className="text-green-600"
            />
            <span className="text-green-600"> Add Collateral</span>
          </button>
        )}
        <NPVModal
          isOpen={isCollateralModalOpen}
          onClose={handleCollateralCloseModal}
          title="Add Collateral information"
        >
          <div className="grid grid-cols-1 gap-4 submit-form">
            <form onSubmit={saveCollateral}>
              <>
                <div className="relative center justify-center flex-1 w-full max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <NpvTextField
                    id="value"
                    label="value"
                    type="number"
                    variant="standard"
                    value={collateralAdd.value}
                    onChange={handleCollateralInputChange}
                    name="value"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      id="evaluatedOn"
                      color="success"
                      label="Evaluatition Date"
                      inputFormat="MM/DD/YYYY"
                      className="w-full max-w-full"
                      slotProps={{ textField: { variant: "standard", color:"success" } }}
                      renderInput={() => (
                        <TextField
                          value={collateralAdd.registerDate}
                          onChange={handleCollateralInputChange}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <NpvTextField
                    id="type"
                    variant="standard"
                    label="type"
                    sx={{ width: "45ch" }}
                    value={collateralAdd.type}
                    onChange={handleCollateralInputChange}
                    name="type"
                  />
                </div>
                <div className="flex justify-center pt-3">
                  <button className="bg-[green] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save
                  </button>
                </div>
              </>
            </form>
          </div>
        </NPVModal>

        {collaterals && isCollateralShown && collateralLength && (
          <table className="table-auto w-full border-collapse px-1 py-2 border border-green-300">
            <thead>
              {" "}
              <tr className="bg-green-950 text-white">
                <th className="py-2 border border-green-300">Type</th>
                <th className="py-2 border border-green-300"> Value </th>
                <th className="py-2 border border-green-300"> Date </th>
              </tr>
            </thead>
            <tbody>
              {collaterals.map((collateral) => (
                <tr
                  key={collateral.id}
                  rowSpan="3"
                  className="p-4  text-left border-b border-green-300 hover:bg-green-200"
                >
                  <td className="p-1 text-left border-r border-green-300">
                    {" "}
                    {collateral.type}{" "}
                  </td>
                  <td className="p-1 text-left border-r border-green-300">
                    {" "}
                    {collateral.value}{" "}
                  </td>
                  <td className="p-1 text-left border-r border-green-300">
                    {" "}
                    {collateral.registerDate}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
            <div className="flex justify-center">
              <button
                className="m-3 text-white bg-green-600 rounded-md p-1 hover:bg-green-900"
                style={{ margin: "1px" }}
                onClick={(e) => computeCollateralNPV(e)}
              >
                <CalculateTwoToneIcon
                  fontSize="small"
                  data-toggle="tooltip"
                  className="text-white"
                  title="Click it to copy the data to the calculator"
                />
                Compute Foreclosure NPV
              </button>
            </div>
          </table>
        )}
      </div>
      {/* NPV Calculator form start */}
      {loans.length >= 2 && npvLoans && (
        <p className="px-10">
          {" "}
          You are calculating NPV for loan
          <strong style={{ color: "green" }}>
            {npvLoans.type.charAt(0).toUpperCase() + npvLoans.type.slice(1)}
          </strong>
          type with
          <strong style={{ color: "green" }}>
            {numberWithCommas(roundAmount(npvLoans.amount))} <em>ETB</em>
          </strong>
          Amount
        </p>
      )}
      <div className="mx-w-[1240px] mx-auto grid gap-1 ease-in-out px-4 ">
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 border-1 flex flex-col my-4 rounded-sm border shadow-lg p-2">
            <form
              onSubmit={handleSubmit}
              id="normalForm"
              value="test"
              className="px-10 py-5 p-4"
            >
              <div className="flex-item-left">
                <Stack spacing={2}>
                  <Stack spacing={1} direction="row">
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 350 }}>
                      <InputLabel
                        id="demo-simple-select-filled-label"
                        color="success"
                      >
                        Scenarios
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="npv-scenarios"
                        name="npv-scenarios"
                        value={npvScenarios["npv-scenarios"]}
                        onChange={handleNpvScenariosChange}
                        color="success"
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <hr style={{ color: "purple" }} />
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="principalwaiver">
                          Principal Waiver
                        </MenuItem>
                        <MenuItem value="interestwaiver">
                          Interest Waiver
                        </MenuItem>
                        <MenuItem value="extension">Extension</MenuItem>
                        <hr style={{ color: "purple" }} />
                        <MenuItem value="principalwaiver&interestwaiver">
                          Interest & Principal Waiver
                        </MenuItem>
                        <MenuItem value="principalwaiver&extension">
                          Principal Waiver & Extension
                        </MenuItem>
                        <MenuItem value="interestwaiver&extension">
                          Interest Waiver & Extension
                        </MenuItem>
                        <hr style={{ color: "purple" }} />
                        <MenuItem value="principal&interestwaiver&extension">
                          Principal & Interest Waiver & Extension
                        </MenuItem>
                        <MenuItem value="injection">Injection</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  <Stack spacing={1} direction="row">
                    <NpvTextField
                      label="Loan Amount"
                      name="original-loan"
                      type="number"
                      variant="filled"
                      value={values["original-loan"]}
                      onChange={handleInputChange}
                    />

                    <NpvTextField
                      label="Annual Interest Rate in %"
                      variant="filled"
                      name="annaul-interest-rate"
                      value={values["annaul-interest-rate"]}
                      onChange={handleInputChange}
                    />
                  </Stack>
                  <Stack spacing={1} direction="row">
                    <FormControl>
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        color="success"
                        size="small"
                      >
                        Number of Payment
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="number-of-payments-per-year"
                        name="number-of-payments-per-year"
                        label="Number of Payments"
                        variant="filled"
                        color="success"
                        size="small"
                        value={values["number-of-payments-per-year"]}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="1">Annually</MenuItem>
                        <MenuItem value="2">Semi-Annually</MenuItem>
                        <MenuItem value="4">Quarterly</MenuItem>
                        <MenuItem value="12">Monthly</MenuItem>
                      </Select>
                      <FormHelperText>
                        {" "}
                        Select again for loan period in month{" "}
                      </FormHelperText>
                    </FormControl>
                    {npvScenarios["npv-scenarios"] ===
                      "principalwaiver".trim() && (
                      <TextField
                        label="Principal Waiver"
                        color="success"
                        size="small"
                        placeholder="Enter Principal Waiver"
                        variant="filled"
                        name="principal-waiver-number"
                        id="principal-waiver-number"
                        value={principalWaiverNumber["principal-waiver-number"]}
                        onChange={handlePrincipalWaiver}
                      />
                    )}
                    {npvScenarios["npv-scenarios"] ===
                      "interestwaiver".trim() && (
                      <TextField
                        label="Interest Waiver"
                        color="success"
                        size="small"
                        placeholder="Enter Interest Waiver"
                        variant="filled"
                        name="interest-waiver-number"
                        value={values["interest-waiver-number"]}
                        onChange={handleInterestWaiver}
                      />
                    )}

                    {npvScenarios["npv-scenarios"] === "extension".trim() && (
                      <TextField
                        label="Extension"
                        color="success"
                        size="small"
                        placeholder="Enter Extension"
                        variant="filled"
                        name="extension"
                        value={values["extension"]}
                        onChange={handleExtension}
                      />
                    )}
                    {/* Two npv scenario starts */}
                    {npvScenarios["npv-scenarios"] ===
                      "principalwaiver&interestwaiver".trim() && (
                      <>
                        <TextField
                          label="Principal"
                          color="success"
                          size="small"
                          placeholder="Enter Principal Waiver"
                          variant="filled"
                          name="principalwaiversecond"
                          value={values["principalwaiversecond"]}
                          onChange={handleInterestAndPricipalWaiver}
                        />

                        <TextField
                          label="Interest Waiver"
                          color="success"
                          size="small"
                          placeholder="Enter Interest Waiver"
                          variant="filled"
                          name="interestwaiversecond"
                          value={values["interestwaiversecond"]}
                          onChange={handleInterestAndPricipalWaiver}
                        />
                      </>
                    )}
                    {npvScenarios["npv-scenarios"] ===
                      "principalwaiver&extension".trim() && (
                      <>
                        <TextField
                          label="Principal"
                          color="success"
                          size="small"
                          placeholder="Enter Principal Waiver"
                          variant="filled"
                          name="principalwaiverthird"
                          value={values["principalwaiverthird"]}
                          onChange={handlePrincipalWaiverPlusExtension}
                        />

                        <TextField
                          label="Extension"
                          color="success"
                          size="small"
                          placeholder="Enter Extension"
                          variant="filled"
                          name="extensionsecond"
                          value={values["extensionsecond"]}
                          onChange={handlePrincipalWaiverPlusExtension}
                        />
                      </>
                    )}

                    {npvScenarios["npv-scenarios"] ===
                      "interestwaiver&extension".trim() && (
                      <>
                        <TextField
                          label="Interest Waiver"
                          color="success"
                          size="small"
                          placeholder="Enter Interest Waiver"
                          variant="filled"
                          name="interest_waiver_extension"
                          value={values["interest_waiver_extension"]}
                          onChange={handleInterestWaiverPlusExtension}
                        />

                        <TextField
                          label="Extension"
                          color="success"
                          size="small"
                          placeholder="Enter Extension"
                          variant="filled"
                          name="extension_interest_waiver"
                          value={values["extension_interest_waiver"]}
                          onChange={handleInterestWaiverPlusExtension}
                        />
                      </>
                    )}
                    {/* Third start */}
                    {npvScenarios["npv-scenarios"] ===
                      "principal&interestwaiver&extension".trim() && (
                      <>
                        <TextField
                          label="Principal Waiver"
                          color="success"
                          size="small"
                          placeholder="Enter Principal Waiver"
                          variant="filled"
                          name="principal_interest_waiver_extension"
                          value={values["principal_interest_waiver_extension"]}
                          onChange={
                            handlePrincipalAndInterestWaiverPlusExtension
                          }
                        />
                        <TextField
                          label="Interest Waiver"
                          color="success"
                          size="small"
                          placeholder="Enter Interest Waiver"
                          variant="filled"
                          name="interest_principal_waiver_extension"
                          value={values["interest_principal_waiver_extension"]}
                          onChange={
                            handlePrincipalAndInterestWaiverPlusExtension
                          }
                        />
                        <TextField
                          label="Extension"
                          color="success"
                          size="small"
                          placeholder="Enter Extension"
                          variant="filled"
                          name="extension_interest_principal_waiver"
                          value={values["extension_interest_principal_waiver"]}
                          onChange={
                            handlePrincipalAndInterestWaiverPlusExtension
                          }
                        />
                      </>
                    )}
                    {npvScenarios["npv-scenarios"] === "injection".trim() && (
                      <TextField
                        label="Injection"
                        color="success"
                        size="small"
                        placeholder="Enter Injection"
                        variant="filled"
                        name="injection"
                        value={values["injection"]}
                        onChange={handleInjection}
                      />
                    )}
                  </Stack>

                  <Stack spacing={1} direction="row">
                    <TextField
                      label="Loan period in (Years)"
                      color="success"
                      size="small"
                      placeholder="Enter Loan period in (Years)"
                      variant="filled"
                      name="loan-period-in-years"
                      value={values["loan-period-in-years"]}
                      onChange={handleInputChange}
                    />
                    {values["number-of-payments-per-year"] === "4" && (
                      <FormControl>
                        <InputLabel
                          id="loan_period_in_months_quarterly_lbl"
                          color="success"
                          size="small"
                        >
                          Loan period in months
                        </InputLabel>
                        <Select
                          labelId="loan_period_in_months_quarterly_lbl"
                          id="number-of-payments-per-month"
                          name="number-of-payments-per-month"
                          label="Number of Payments"
                          variant="filled"
                          color="success"
                          size="small"
                          value={values["number-of-payments-per-month"]}
                          onChange={handleInputChange}
                          onInput={handleInputChange}
                        >
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="6">6</MenuItem>
                          <MenuItem value="9">9</MenuItem>
                        </Select>
                        <FormHelperText>Loan period in months </FormHelperText>
                      </FormControl>
                    )}
                    {values["number-of-payments-per-year"] === "12" && (
                      <FormControl>
                        <InputLabel
                          id="loan_period_in_months_quarterly_lbl"
                          color="success"
                          size="small"
                        >
                          Loan period in months
                        </InputLabel>
                        <Select
                          labelId="loan_period_in_months_quarterly_lbl"
                          id="number-of-payments-per-month"
                          name="number-of-payments-per-month"
                          label="Number of Payments"
                          variant="filled"
                          color="success"
                          size="small"
                          value={values["number-of-payments-per-month"]}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5">5</MenuItem>
                          <MenuItem value="6">6</MenuItem>
                          <MenuItem value="7">7</MenuItem>
                          <MenuItem value="8">8</MenuItem>
                          <MenuItem value="9">9</MenuItem>
                          <MenuItem value="10">10</MenuItem>
                          <MenuItem value="11">11</MenuItem>
                        </Select>
                        <FormHelperText>Loan period in months </FormHelperText>
                      </FormControl>
                    )}
                    {values["number-of-payments-per-year"] === "2" && (
                      <FormControl>
                        <InputLabel
                          id="loan_period_in_months_quarterly_lbl"
                          color="success"
                          size="small"
                        >
                          Loan period in months
                        </InputLabel>
                        <Select
                          labelId="loan_period_in_months_quarterly_lbl"
                          id="number-of-payments-per-month"
                          name="number-of-payments-per-month"
                          label="Number of Payments"
                          variant="filled"
                          color="success"
                          size="small"
                          value={values["number-of-payments-per-month"]}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="6">6</MenuItem>
                        </Select>
                        <FormHelperText>Loan period in months </FormHelperText>
                      </FormControl>
                    )}
                    <TextField
                      label="Risk premium in %"
                      color="success"
                      size="small"
                      placeholder="Enter Risk premium in %"
                      variant="filled"
                      name="risk-premium"
                      value={values["risk-premium"]}
                      onChange={handleInputChange}
                    />
                  </Stack>
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="medium"
                  id="btnCompute"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Click it to compute NPV"
                  data-original-title="Tooltip on bottom"
                  style={{ marginTop: "8px" }}
                  className="red-tooltip"
                >
                  {loading && (
                    <span class="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-500"></span>
                  )}
                  <span> Compute NPV</span>
                </Button>
              </div>
            </form>
          </div>
          <div class="w-full md:w-1/2 border-1 flex flex-col my-4 rounded-sm border shadow-lg p-2">
            {/* bosena */}
            {Boolean(
              showNPVWithPrincipalWaiver ||
                showNoramlNpv ||
                showNPVWithInterestWaiver ||
                showNPVWithExtension ||
                showNPVWithPrincipalAndInterestWaiver ||
                showNPVWithPrincipalWaiverPlusExtension ||
                showNPVWithInterestWaiverPlusExtension ||
                showNPVWithPrincipalAndInterestWaiverPlusExtension ||
                showNPVWithInjection ||
                showNPVWithForeclosure
            ) && (
              <>
                <table>
                  <tbody>
                    <tr className="bg-green-700 text-white">
                      <th className="p-1 text-left border-b border-green-300">
                        Scenario
                      </th>
                      <th className="p-1 text-left border-b border-green-300">
                        NPV Result
                      </th>
                      <th className="text-left border-b border-green-300">
                        NPV Loss
                      </th>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        Normal
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>NPV Details</h4>
                                {normalMultipleNPV.length != 0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table-auto w-full bg-green-600"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {normalMultipleNPV.map(
                                          (normalNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(normalNPV.npv)
                                                )}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {normalNPV.type} Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table-auto w-full border-collapse px-1 py-2 border border-green-300">
                                                        <thead>
                                                          <tr className="bg-green-950 text-white">
                                                            <th className="py-2 border border-green-300">
                                                              Parameters
                                                            </th>
                                                            <th className="py-2 border border-green-300">
                                                              Values
                                                            </th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Amount
                                                            </td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  normalNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                normalNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                normalNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                normalNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                normalNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Scenario
                                                            </td>
                                                            <td>
                                                              {
                                                                normalNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Type
                                                            </td>
                                                            <td>
                                                              {normalNPV.type}
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                normalNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              NPV
                                                            </td>
                                                            <td>
                                                              {numberWithCommas(
                                                                normalNPV.npv
                                                              )}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {normalMultipleNPV.map((amort) =>
                                sumUpNPVs(amort.npv)
                              )}
                              {numberWithCommas(totalNPV) + " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        Baseline
                      </td>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        With Principal Waiver
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  Principal Waiver NPV Details
                                </h4>
                                {withPrincipalWaiverMultipleNPV.length != 0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table className="table-auto w-full border-collapse px-1 py-2 border border-green-300">
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withPrincipalWaiverMultipleNPV.map(
                                          (principalWaiverNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(
                                                    principalWaiverNPV.npv
                                                  )
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {principalWaiverNPV.type}{" "}
                                                      Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr className="bg-green-950 text-white">
                                                            <th className="py-2 border border-green-300">
                                                              Parameters
                                                            </th>
                                                            <th className="py-2 border border-green-300">
                                                              Values
                                                            </th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Amount
                                                            </td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  principalWaiverNPV.amount
                                                                )
                                                              )}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                principalWaiverNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                principalWaiverNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                principalWaiverNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                principalWaiverNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Scenario
                                                            </td>
                                                            <td>
                                                              {
                                                                principalWaiverNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Type
                                                            </td>
                                                            <td>
                                                              {
                                                                principalWaiverNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                principalWaiverNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr className="p-1 text-left border-b border-green-300">
                                                            <td className="p-1 text-left border-r border-green-300">
                                                              NPV
                                                            </td>
                                                            <td>
                                                              {numberWithCommas(
                                                                principalWaiverNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {principalWaiverNumber[
                                                            "principal-waiver-number"
                                                          ] ? (
                                                            <tr className="p-1 text-left border-b border-green-300">
                                                              <td className="p-1 text-left border-r border-green-300">
                                                                Principal Waived
                                                              </td>
                                                              <td>
                                                                {
                                                                  principalWaiverNPV.waivedPrincipal
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withPrincipalWaiverMultipleNPV.map((amort) =>
                                sumUpPrincipalWaiverNPVs(amort.npv)
                              )}
                              {numberWithCommas(totalPrincipalWaiverNPV) +
                                " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(
                          roundAmount(npv - npvPrincipalWaiver)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        With Interest Waiver
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  Interest Waiver NPV Details
                                </h4>
                                {withInterestWaiverMultipleNPV.length != 0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table table-responsive"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withInterestWaiverMultipleNPV.map(
                                          (interestWaiverNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(
                                                    interestWaiverNPV.npv
                                                  )
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {interestWaiverNPV.type}{" "}
                                                      Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr>
                                                            <th>Parameters</th>
                                                            <th>Values</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>Amount</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  interestWaiverNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                interestWaiverNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                interestWaiverNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                interestWaiverNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                interestWaiverNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Scenario</td>
                                                            <td>
                                                              {
                                                                interestWaiverNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Type</td>
                                                            <td>
                                                              {
                                                                interestWaiverNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                interestWaiverNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NPV</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                interestWaiverNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {interestWaiverNumber[
                                                            "interest-waiver-number"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Interest Waived
                                                              </td>
                                                              <td>
                                                                {
                                                                  interestWaiverNumber[
                                                                    "interest-waiver-number"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withInterestWaiverMultipleNPV.map((amort) =>
                                sumUpInterestWaiverNPVs(amort.npv)
                              )}
                              {numberWithCommas(totalInterestWaiverNPV) +
                                " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(roundAmount(npv - npvInterestWaiver))}
                      </td>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        With Extension{" "}
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  Extension NPV Details
                                </h4>
                                {withExtensionMultipleNPV.length != 0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table table-responsive"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withExtensionMultipleNPV.map(
                                          (extensionNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(extensionNPV.npv)
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {extensionNPV.type} Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr>
                                                            <th>Parameters</th>
                                                            <th>Values</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>Amount</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  extensionNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                extensionNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                extensionNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                extensionNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                extensionNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Scenario</td>
                                                            <td>
                                                              {
                                                                extensionNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Type</td>
                                                            <td>
                                                              {
                                                                extensionNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                extensionNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NPV</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                extensionNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {extension[
                                                            "extension"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Extended for
                                                              </td>
                                                              <td>
                                                                {
                                                                  extension[
                                                                    "extension"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withExtensionMultipleNPV.map((amort) =>
                                sumUpExtensionNPVs(amort.npv)
                              )}
                              {numberWithCommas(totalExtensionNPV) + " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(roundAmount(npv - npvExtension))}
                      </td>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        With Principal and Interest Waiver{" "}
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  Interest and Principal Waived NPV Details
                                </h4>
                                {withInterestAndPrincipalWaiverMultipleNPV.length !=
                                  0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table table-responsive"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withInterestAndPrincipalWaiverMultipleNPV.map(
                                          (
                                            interestAndPrincipalWaivedNPV,
                                            index
                                          ) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(
                                                    interestAndPrincipalWaivedNPV.npv
                                                  )
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {
                                                        interestAndPrincipalWaivedNPV.type
                                                      }{" "}
                                                      Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr>
                                                            <th>Parameters</th>
                                                            <th>Values</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>Amount</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  interestAndPrincipalWaivedNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                interestAndPrincipalWaivedNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                interestAndPrincipalWaivedNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                interestAndPrincipalWaivedNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                interestAndPrincipalWaivedNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Scenario</td>
                                                            <td>
                                                              {
                                                                interestAndPrincipalWaivedNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Type</td>
                                                            <td>
                                                              {
                                                                interestAndPrincipalWaivedNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                interestAndPrincipalWaivedNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NPV</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                interestAndPrincipalWaivedNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {interestAndPrincipalWaiver[
                                                            "principalwaiversecond"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Waived Principal
                                                              </td>
                                                              <td>
                                                                {
                                                                  interestAndPrincipalWaiver[
                                                                    "principalwaiversecond"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                          {interestAndPrincipalWaiver[
                                                            "interestwaiversecond"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Waived Interest
                                                              </td>
                                                              <td>
                                                                {
                                                                  interestAndPrincipalWaiver[
                                                                    "interestwaiversecond"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withInterestAndPrincipalWaiverMultipleNPV.map(
                                (amort) =>
                                  sumUpInterestAndPrincipalNPVs(amort.npv)
                              )}
                              {numberWithCommas(totalInterestAndPrincipalNPV) +
                                " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(
                          roundAmount(npv - npvPrincipalAndInterestWaiver)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        With Principal Waiver plus Extention{" "}
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  With Principal Waiver plus Extention NPV
                                  Details
                                </h4>
                                {withPrincipalWaiverAndExtensionMultipleNPV.length !=
                                  0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table table-responsive"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withPrincipalWaiverAndExtensionMultipleNPV.map(
                                          (injectionNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(injectionNPV.npv)
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {injectionNPV.type} Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr>
                                                            <th>Parameters</th>
                                                            <th>Values</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>Amount</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  injectionNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Scenario</td>
                                                            <td>
                                                              {
                                                                injectionNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Type</td>
                                                            <td>
                                                              {
                                                                injectionNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NPV</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                injectionNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {extension[
                                                            "injection"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Injection ETB
                                                              </td>
                                                              <td>
                                                                {
                                                                  extension[
                                                                    "injection"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withPrincipalWaiverAndExtensionMultipleNPV.map(
                                (amort) =>
                                  sumUpPrincipalWaiverAndExtensionNPVs(
                                    amort.npv
                                  )
                              )}
                              {numberWithCommas(
                                totalPrincipalWaiverAndExtensionNPV
                              ) + " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(
                          roundAmount(npv - npvPrincipalWaiverPlusExtension)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        With Interest Waiver plus Extention{" "}
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  With Interest Waiver plus Extention NPV
                                  Details
                                </h4>
                                {withInterestWaiverAndExtensionMultipleNPV.length !=
                                  0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table table-responsive"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withInterestWaiverAndExtensionMultipleNPV.map(
                                          (injectionNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(injectionNPV.npv)
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {injectionNPV.type} Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr>
                                                            <th>Parameters</th>
                                                            <th>Values</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>Amount</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  injectionNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Scenario</td>
                                                            <td>
                                                              {
                                                                injectionNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Type</td>
                                                            <td>
                                                              {
                                                                injectionNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NPV</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                injectionNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {extension[
                                                            "injection"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Injection ETB
                                                              </td>
                                                              <td>
                                                                {
                                                                  extension[
                                                                    "injection"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withInterestWaiverAndExtensionMultipleNPV.map(
                                (amort) =>
                                  sumUpInterestWaiverAndExtensionNPVs(amort.npv)
                              )}
                              {numberWithCommas(
                                totalInterestWaiverAndExtensionNPV
                              ) + " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(
                          roundAmount(npv - npvInterestWaiverExtension)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        With Principal & Interest Waiver plus Extention{" "}
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  With Principal & Interest Waiver plus
                                  Extention NPV Details
                                </h4>
                                {withPrincipalAndInterestWaiverAndExtensionMultipleNPV.length !=
                                  0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table table-responsive"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withPrincipalAndInterestWaiverAndExtensionMultipleNPV.map(
                                          (injectionNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(injectionNPV.npv)
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {injectionNPV.type} Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr>
                                                            <th>Parameters</th>
                                                            <th>Values</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>Amount</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  injectionNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Scenario</td>
                                                            <td>
                                                              {
                                                                injectionNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Type</td>
                                                            <td>
                                                              {
                                                                injectionNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NPV</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                injectionNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {extension[
                                                            "injection"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Injection ETB
                                                              </td>
                                                              <td>
                                                                {
                                                                  extension[
                                                                    "injection"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withPrincipalAndInterestWaiverAndExtensionMultipleNPV.map(
                                (amort) =>
                                  sumUpPrincipalAndInterestWaiverAndExtensionNPVs(
                                    amort.npv
                                  )
                              )}
                              {numberWithCommas(
                                totalPrincipalAndInterestWaiverAndExtensionNPV
                              ) + " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(
                          roundAmount(
                            npv - npvPrincipalAndInterestWaiverExtension
                          )
                        )}
                      </td>
                    </tr>

                    {/* withInjectionMultipleNPV */}
                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        {" "}
                        With Injection{" "}
                      </th>
                      <td
                        name="normal-npv"
                        className="text-left border-b border-green-300"
                      >
                        <div>
                          <CustomWidthTooltip
                            title={
                              <div>
                                <h4 style={{ align: "center" }}>
                                  Injection NPV Details
                                </h4>
                                {withInjectionMultipleNPV.length != 0 && (
                                  /**
                                   * Show NPV Results and the parameters will display on the detail section.
                                   */
                                  <div>
                                    {/* table table-striped table-hover table-responsive */}
                                    <strong>Show all NPV results</strong>
                                    <table
                                      style={{ color: "white" }}
                                      className="table table-responsive"
                                    >
                                      <thead>
                                        <tr>
                                          <th>NPV</th>
                                          <th>Result </th>
                                          <th>More Info</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {withInjectionMultipleNPV.map(
                                          (injectionNPV, index) => (
                                            <tr
                                              style={{ color: "white" }}
                                              key={index}
                                            >
                                              <td>{index + 1} </td>
                                              <td>
                                                {numberWithCommas(
                                                  roundAmount(injectionNPV.npv)
                                                )}{" "}
                                                ETB
                                              </td>
                                              <td>
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={
                                                      <ExpandMoreIcon />
                                                    }
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      {injectionNPV.type} Loan
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <table className="table table-bordered ">
                                                        <thead>
                                                          <tr>
                                                            <th>Parameters</th>
                                                            <th>Values</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          <tr>
                                                            <td>Amount</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                roundAmount(
                                                                  injectionNPV.amount
                                                                )
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Annual Interest
                                                              Rate
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.annualInterestRate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Number of Payments
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.numberOfPayments
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Loan periods in
                                                              Years
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.loanPeriodsInYears
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Risk Premium
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.riskPremium
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Scenario</td>
                                                            <td>
                                                              {
                                                                injectionNPV.scenario
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Type</td>
                                                            <td>
                                                              {
                                                                injectionNPV.type
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>
                                                              Registered Date
                                                            </td>
                                                            <td>
                                                              {
                                                                injectionNPV.registeredDate
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>NPV</td>
                                                            <td>
                                                              {numberWithCommas(
                                                                injectionNPV.npv
                                                              )}{" "}
                                                              ETB
                                                            </td>
                                                          </tr>
                                                          {extension[
                                                            "injection"
                                                          ] ? (
                                                            <tr>
                                                              <td>
                                                                Injection ETB
                                                              </td>
                                                              <td>
                                                                {
                                                                  extension[
                                                                    "injection"
                                                                  ]
                                                                }
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button color="success">
                              {withInjectionMultipleNPV.map((amort) =>
                                sumUpInjectionNPVs(amort.npv)
                              )}
                              {numberWithCommas(totalInjectionNPV) + " ETB"}
                            </Button>
                          </CustomWidthTooltip>
                        </div>
                      </td>
                      <td className="text-left border-b border-green-300">
                        {numberWithCommas(roundAmount(npv - npvInjection))}
                      </td>
                    </tr>

                    <tr>
                      <th className="p-1 text-left border-b border-green-300">
                        {" "}
                        With foreclosure
                      </th>
                      <td className="text-left border-b border-green-300">
                        <strong>
                          {" "}
                          {numberWithCommas(roundAmount(npvForClosure))}{" "}
                        </strong>{" "}
                        <table className="table table-striped table-bordered ">
                          <thead>
                            <tr>
                              <th>Cashflow</th>
                              <th>Selling Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{cashFlow}</td>
                              <td>
                                {numberWithCommas(roundAmount(sellingCost))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        {numberWithCommas(roundAmount(npv - npvForClosure))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {showNPVComparision && (
                  <div className="npv-comparision-all">
                    <p className="npv-comparision"> NPV, Comparision </p>
                    <table
                      className="table table-bordered"
                      style={{ width: "100%" }}
                    >
                      <tbody>
                        <tr>
                          <th width="70%">Large</th>
                          <td name="normal-npv" className="text-green-600">
                            <span className="npv-type">
                              {" "}
                              {largestNPV.type},{" "}
                            </span>
                            {largestNPV.result}
                          </td>
                        </tr>

                        <tr>
                          <th width="70%">Small</th>
                          <td name="normal-npv" className="text-green-600">
                            <span className="text-green-600">
                              {lowestNPV.type},{" "}
                            </span>
                            {roundAmount(lowestNPV.result)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="buttons">
                  <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    size="medium"
                    id="btnShowInGraph"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Click it to show in graph"
                    data-original-title="Tooltip on bottom"
                    style={{ marginTop: "5px" }}
                    className="red-tooltip"
                    onClick={(e) => showInGraph(e)}
                  >
                    Show In Graph
                  </Button>

                  <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    size="medium"
                    id="btnShowInGraph"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Click it to Compare NPVs"
                    data-original-title="Tooltip on bottom"
                    style={{ marginTop: "5px" }}
                    className="red-tooltip"
                    onClick={(e) => compareNPV(e)}
                  >
                    Compare NPV
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* NPV Calculator form end */}

      {/* amortization table start */}
      {Boolean(
        values["original-loan"] &&
          values["annaul-interest-rate"] &&
          values["loan-period-in-years"] &&
          values["number-of-payments-per-year"] &&
          values["risk-premium"] &&
          showNoramlNpv
      ) && (
        <div className="flex-container">
          <div className="px-4">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              Normal NPV Amortization Table
            </h4>
            <MaterailTableComponent data={amortization} />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div className="normal-interest-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyInterestSummation.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                      >
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummation.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                      >
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPayment.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                      >
                        <td className="border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className="border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {showNPVWithPrincipalWaiver && (
        <div className="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Principal Waiver Amortization Table
            </h4>
            <PrincipalWaiverComponent data={principalWaiverAmortization} />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div>
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyInterestSummationPrincipalWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                      border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationPrincipalWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                  border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentPrincipalWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                        >
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {showNPVWithInterestWaiver && (
        <div className="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Interest Waiver Amortization Table
            </h4>
            <InterestWaiverComponent data={interestWaiverAmortization} />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div className="normal-interest-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearlyInterestSummationInterestWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationInterestWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                  border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentInterestWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                        >
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNPVWithExtension && (
        <div className="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Extension Amortization Table
            </h4>
            <ExtensionComponent data={extensionAmortization} />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div className="flex justify-between shadow-lg p-4">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearlyInterestSummationExtension.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
               border-b border-green-200 hover:bg-green-200"
                      >
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationExtension.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                      >
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentExtension.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                      >
                        <td className="border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className="border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNPVWithPrincipalAndInterestWaiver && (
        // Boolean(npvScenarios["npv-scenarios"] === "extension".trim() && showNPVWithExtension) && (
        <div className="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Principal and Interest Waiver Amortization Table
            </h4>
            <PrincipalAndInterestWaiverComponent
              data={interestAndPrincipalAmortization}
            />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div className="flex justify-between shadow-lg p-4">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearlyInterestSummationWithInterestAndPrincipalWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationWithInterestAndPrincipalWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentWithInterestAndPrincipalWaiver.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNPVWithPrincipalWaiverPlusExtension && (
        <div className="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Principal Waiver plus Extension Amortization Table
            </h4>
            <PrincipalWaiverAndExtensionComponent
              data={principalWaiverPlusExtensionAmortization}
            />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div>
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearlyInterestSummationWithWaiverPlusExtnesion.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationWithWaiverPlusExtnesion.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                  border-b border-green-200 hover:bg-green-200"
                        >
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNPVWithInterestWaiverPlusExtension && (
        <div className="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Interest Waiver plus Extension Amortization Table
            </h4>
            <InterestWaiverAndExtensionComponent
              data={interestWaiverPlusExtensionAmortization}
            />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div>
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearlyInterestSummationWithInterestWaiverPlusExtension.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationWithInterestWaiverPlusExtension.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentWithInterestWaiverPlusExtension.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                  border-b border-green-200 hover:bg-green-200"
                        >
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNPVWithPrincipalAndInterestWaiverPlusExtension && (
        <div className="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Principal & Interest Waiver plus Extension Amortization
              Table
            </h4>
            <PrincipalAndInterestWaiverAndExtensionComponent
              data={principalAndInterestWaiverPlusExtensionAmortization}
            />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div className="normal-interest-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className=" border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension.map(
                      (amort, index) => (
                        <tr
                          key={index}
                          className="p-4 bg-white
                    border-b border-green-200 hover:bg-green-200"
                        >
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {" "}
                            {index + 1}{" "}
                          </td>
                          <td className="border-green-300 py-2 px-4 col-span-4">
                            {roundAmount(amort)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {showNPVWithInjection && (
        <div class="flex-container">
          <div className="px-4 normal-npv-amortization">
            <h4 className="flex justify-center items-center text-green-600 font-semibold">
              NPV With Injection Amortization Table
            </h4>
            <InjectionComponent data={injectionAmortization} />
            <header>
              <h4 className="bg-gray-100 flex justify-center font-semibold">
                Summary
              </h4>
            </header>
            <div className="flex justify-between shadow-lg p-4">
              <div>
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Interest{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {yearlyInterestSummationInjection.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                      >
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="normal-principal-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Principal{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyPrincipalSummationInjection.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                      >
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className=" border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className=" normal-cash-flow-summary">
                <table className="table-auto w-full shadow-md p-4">
                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Year
                      </th>
                      <th className="border-green-300 py-2 px-4 col-span-4">
                        Cashflow{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyScheduledPaymentInjection.map((amort, index) => (
                      <tr
                        key={index}
                        className="p-4 bg-white
                border-b border-green-200 hover:bg-green-200"
                      >
                        <td className="border-green-300 py-2 px-4 col-span-4">
                          {" "}
                          {index + 1}{" "}
                        </td>
                        <td className="border-green-300 py-2 px-4 col-span-4">
                          {roundAmount(amort)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {Boolean(
        showNoramlNpvInGraph ||
          showNPVWithPrincipalWaiverInGraph ||
          showNPVWithInterestWaiverInGraph ||
          showNPVWithExtensionInGraph ||
          showNPVWithPrincipalAndInterestWaiverInGraph ||
          showNPVWithPrincipalWaiverPlusExtensionInGraph ||
          showNPVWithInterestWaiverPlusExtensionInGraph ||
          showNPVWithInjectionInGraph ||
          showNPVWithForeclosureInGraph
      ) && (
        <div className="flex-container">
          <form className="flex justify-center pt-4">
            <FormControl>
              <InputLabel id="graph-type-label" color="success" size="small">
                --Graph Type--
              </InputLabel>
              <Select
                labelId="graph-type-label"
                id="graph-type"
                name="graph-type"
                label="Graph Type"
                variant="filled"
                color="success"
                size="small"
                value={charType}
                onChange={handleGraphType}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="BarChart">Bar Chart</MenuItem>
                <MenuItem value="PieChart">Pie Chart</MenuItem>
                <MenuItem value="SimplePieChart">Simple Pie Chart</MenuItem>
              </Select>
              <FormHelperText> Select graph type </FormHelperText>
            </FormControl>
          </form>
          <div className="p-5">
            <h5 className="flex justify-center text-green-900 font-semibold">
              NPV, Graphical Representation
            </h5>
            {charType === "" && (
              <div className="npv-graph px-5 text-danger m-4">
                Selected None
              </div>
            )}
            {charType === "BarChart" && (
              <div className="px-5 m-4 ">
                <Chart data={visualizeDataInGrpah} />
              </div>
            )}

            {charType === "PieChart" && (
              <div className="flex justify-center shadow-2xl p-2">
                <PieChartComponent data={visualizeDataInGrpah} />
              </div>
            )}
            {charType === "SimplePieChart" && (
              <div className="flex justify-center shadow-2xl p-2">
                <SimplePieChartComponent data={visualizeDataInGrpah} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewLoanComponent;
