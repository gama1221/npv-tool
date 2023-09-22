import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import CustomerService from '../../services/customer/CustomerService';
import CustomerTable from '../Customer/CustomerTable';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { WidthFull } from '@mui/icons-material';
import NPVModal from '../NPVModal/NPVModal';
import { Grid, Stack, FormHelperText } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import npvNormal from "cbe-npv-normal";
import NPVPrincipalWaiver from 'cbe-npv-principal-waiver';
import NPVInterestWaiver from 'cbe-npv-interest-waiver';
import NPVExtension from 'cbe-npv-extension';
import NPVInterestAndPrincipalWaiver from 'interest-and-principal-waiver';
import NPVPrincipalWaiverPlusExtension from 'principal-waiver-and-extension';
import Chart from '../Chart';
import SimplePieChartComponent from '../SimplePieChartComponent';
import PieChartComponent from '../PieChartComponent';
import MaterailTableComponent from '../MaterailTableComponent'
import PrincipalWaiverComponent from '../PrincipalWaiverComponent';
import InterestWaiverComponent from '../InterestWaiverComponent';
import ExtensionComponent from '../ExtensionComponent';
import PrincipalAndInterestWaiverComponent from '../PrincipalAndInterestWaiverComponent';
import PrincipalWaiverAndExtensionComponent from '../PrincipalWaiverAndExtensionComponent';
import NPVInterestWaiverPlusExtension from 'interest-waiver-and-extension'
import InterestWaiverAndExtensionComponent from '../InterestWaiverAndExtensionComponent';
import NPVPrincipalAndInterestWaiverPlusExtension from "principal-and-interest-waiver-and-extension";
import PrincipalAndInterestWaiverAndExtensionComponent from "../PrincipalAndInterestWaiverAndExtensionComponent";
import NPVInjection from "cbe-npv-injection";
import InjectionComponent from "../InjectionComponent";
import CalculateTwoToneIcon from '@mui/icons-material/CalculateTwoTone';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import ReorderIcon from '@mui/icons-material/Reorder';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const graphNPVS = [

    // { "type": "PrincipalWaiver", "result": 200000.26 },
]
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
        color: 'white',
        fontSize: "13px",
        backgroundColor: '#ff00ff',
        fontType: "bold",
    },
});

const NPV = () => {
    const [temenosCustomer, setTemenosCustomer] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingForeclosureNPV, setLoadingForeclosureNPV] = useState(false);
    const [collateralLoading, setCollateralLoading] = useState(false);
    const [collateralNotFound, setCollateralNotFound] = useState();
    const [searchLoading, setSearchLoading] = useState(false);
    const [npvForm, setNpvForm] = useState(false);
    const [runOnce, setRunOnce] = useState(true);
    const [successLoanLoading, setSuccessLoanLoading] = useState(false);
    const [successCollateralLoading, setSuccessCollateralLoading] = useState(false);
    const [temenosCustomerParams, setTemenosCustomerParams] = useState([]);
    const [temenosCollateralParams, setTemenosCollateralParams] = useState([]);
    const [temenosSingleCollateralParam, setTemenosSingleCollateralParam] = useState();
    const [notFound, setNotFound] = useState();
    const [oneLoanChecker, setOneLoanChecker] = useState(false);
    const [oneCollateralChecker, setOneCollateralChecker] = useState(false);
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

    //===================== Visibility for amortization table start =============================
    const [showNoramlNpv, setShowNoramlNpv] = useState(false);
    const [showNPVWithPrincipalWaiver, setShowNPVWithPrincipalWaiver] = useState(false);
    const [showNPVWithInterestWaiver, setShowNPVWithInterestWaiver] = useState(false);
    const [showNPVWithExtension, setShowNPVWithExtension] = useState(false);
    const [showNPVWithPrincipalAndInterestWaiver, setShowNPVWithPrincipalAndInterestWaiver] = useState(false);
    const [showNPVWithPrincipalWaiverPlusExtension, setShowNPVWithPrincipalWaiverPlusExtension] = useState(false);
    const [showNPVWithInterestWaiverPlusExtension, setShowNPVWithInterestWaiverPlusExtension] = useState(false);
    const [showNPVWithPrincipalAndInterestWaiverPlusExtension, setShowNPVWithPrincipalAndInterestWaiverPlusExtension] = useState(false);
    const [showNPVWithForeclosure, setShowNPVWithForeclosure] = useState(false);
    const [showNPVWithInjection, setShowNPVWithInjection] = useState(false);
    const [showBarChart, setShowBarChart] = useState(true);
    const [showPieChart, setShowPieChart] = useState(false);
    const [showSimplePieChart, setShowSimplePieChart] = useState(false);
    //===================== Visibility for amortization table start =============================
    const [npv, setNPV] = useState([]);
    const [npvInterestWaiver, setNpvInterestWaiver] = useState([]);
    const [npvPrincipalWaiver, setNpvPrincipalWaiver] = useState([]);
    const [npvExtension, setNpvExtension] = useState([]);
    const [npvPrincipalAndInterestWaiver, setNpvPrincipalAndInterestWaiver] = useState([]);
    const [npvPrincipalWaiverPlusExtension, setNpvPrincipalWaiverPlusExtension] = useState([]);
    const [npvInterestWaiverExtension, setNpvInterestWaiverExtension] = useState([]);
    const [npvPrincipalAndInterestWaiverExtension, setNpvPrincipalAndInterestWaiverExtension] = useState([]);
    const [npvInjection, setNpvInjection] = useState([]);

    const [lowestNPV, setLowestNPV] = useState([]);
    const [largestNPV, setLargestNPV] = useState([]);

    const [npvForClosure, setNPVForClosure] = useState(0);

    const [cashFlow, setCashFlow] = useState(0);
    const [sellingCost, setSellingCost] = useState(0);

    const [collateralVisibility, setCollateralVisibility] = useState(true);

    /**
     * Chart data
    */
    const [amortization, setAmortization] = useState([]);
    const [principalWaiverAmortization, setPrincipalWaiverAmortization] = useState([]);
    const [interestWaiverAmortization, setInterestWaiverAmortization] = useState([]);
    const [extensionAmortization, setExtensionAmortization] = useState([]);
    const [interestAndPrincipalAmortization, setInterestAndPrincipalAmortization] = useState([]);
    const [principalWaiverPlusExtensionAmortization, setPrincipalWaiverPlusExtensionAmortization] = useState([]);
    const [interestWaiverPlusExtensionAmortization, setInterestWaiverPlusExtensionAmortization] = useState([]);
    const [principalAndInterestWaiverPlusExtensionAmortization, setPrincipalAndInterestWaiverPlusExtensionAmortization] = useState([]);
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
    const [yearlyScheduledPaymentPrincipalWaiver, setYearlyScheduledPaymentPrincipalWaiver] = useState([]);
    const [yearlyInterestSummationPrincipalWaiver, setYearlyInterestSummationPrincipalWaiver] = useState([]);
    const [yearlyPrincipalSummationPrincipalWaiver, setYearlyPrincipalSummationPrincipalWaiver] = useState([]);
    //========================== With Principal Waiver End ===================================

    //========================== With Principal Waiver Start ===================================
    const [yearlyScheduledPaymentInterestWaiver, setYearlyScheduledPaymentInterestWaiver] = useState([]);
    const [yearlyInterestSummationInterestWaiver, setYearlyInterestSummationInterestWaiver] = useState([]);
    const [yearlyPrincipalSummationInterestWaiver, setYearlyPrincipalSummationInterestWaiver] = useState([]);
    //========================== With Principal Waiver End ===================================

    //========================== With Extension Start ===================================
    const [yearlyScheduledPaymentExtension, setYearlyScheduledPaymentExtension] = useState([]);
    const [yearlyInterestSummationExtension, setYearlyInterestSummationExtension] = useState([]);
    const [yearlyPrincipalSummationExtension, setYearlyPrincipalSummationExtension] = useState([]);
    //========================== With Extension End ===================================

    //========================== With Principal and Interest Waiver Start ===================================
    const [yearlyScheduledPaymentWithInterestAndPrincipalWaiver, setYearlyScheduledPaymentWithInterestAndPrincipalWaiver] = useState([]);
    const [yearlyInterestSummationWithInterestAndPrincipalWaiver, setYearlyInterestSummationWithInterestAndPrincipalWaiver] = useState([]);
    const [yearlyPrincipalSummationWithInterestAndPrincipalWaiver, setYearlyPrincipalSummationWithInterestAndPrincipalWaiver] = useState([]);
    //========================== With Principal and Interest Waiver End ===================================

    //========================== With Principal Waiver plus extension Start ===================================
    const [yearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion, setYearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion] = useState([]);
    const [yearlyInterestSummationWithWaiverPlusExtnesion, setYearlyInterestSummationWithWaiverPlusExtnesion] = useState([]);
    const [yearlyPrincipalSummationWithWaiverPlusExtnesion, setYearlyPrincipalSummationWithWaiverPlusExtnesion] = useState([]);
    //========================== With Principal Waiver plus extension  End ===================================

    //========================== With Principal Waiver plus extension  start ===================================
    const [yearlyScheduledPaymentWithInterestWaiverPlusExtension, setYearlyScheduledPaymentWithInterestWaiverPlusExtension] = useState([]);
    const [yearlyInterestSummationWithInterestWaiverPlusExtension, setYearlyInterestSummationWithInterestWaiverPlusExtension] = useState([]);
    const [yearlyPrincipalSummationWithInterestWaiverPlusExtension, setYearlyPrincipalSummationWithInterestWaiverPlusExtension] = useState([]);
    //========================== With Principal Waiver plus extension  End ===================================

    //========================== With Principal Waiver plus extension  start ===================================
    const [yearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension, setYearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension] = useState([]);
    const [yearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension, setYearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension] = useState([]);
    const [yearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension, setYearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension] = useState([]);
    //========================== With Principal Waiver plus extension  End ===================================

    //========================== With injection  start ===================================
    const [yearlyScheduledPaymentInjection, setYearlyScheduledPaymentInjection] = useState([]);
    const [yearlyInterestSummationInjection, setYearlyInterestSummationInjection,] = useState([]);
    const [yearlyPrincipalSummationInjection, setYearlyPrincipalSummationInjection,] = useState([]);
    //========================== With injection  End ===================================
    // ==========================Show in Graph start==============================
    const [visualizeDataInGrpah, setVisualizeDataInGrpah] = useState([]);

    const [showNoramlNpvInGraph, setShowNoramlNpvInGraph] = useState(false);
    const [showNPVWithPrincipalWaiverInGraph, setShowNPVWithPrincipalWaiverInGraph] = useState(false);
    const [showNPVWithInterestWaiverInGraph, setShowNPVWithInterestWaiverInGraph] = useState(false);
    const [showNPVWithExtensionInGraph, setShowNPVWithExtensionInGraph] = useState(false);
    const [showNPVWithPrincipalAndInterestWaiverInGraph, setShowNPVWithPrincipalAndInterestWaiverInGraph] = useState(false);
    const [showNPVWithPrincipalWaiverPlusExtensionInGraph, setShowNPVWithPrincipalWaiverPlusExtensionInGraph] = useState(false);
    const [showNPVWithInterestWaiverPlusExtensionInGraph, setShowNPVWithInterestWaiverPlusExtensionInGraph] = useState(false);
    const [showNPVWithForeclosureInGraph, setShowNPVWithForeclosureInGraph] = useState(false);
    const [showNPVWithInjectionInGraph, setShowNPVWithInjectionInGraph] = useState(false);

    // toggle charts 

    const handleGraphType = (e) => {
        setCharType(e.target.value)
    }

    // const handleNpvScenariosChange = (e) => {
    //     const { name, value } = e.target;
    //     setnpvScenarios({
    //         ...npvScenarios,
    //         [name]: value,
    //     });
    // };

    /**
    * Yearly Amortization Summary end
    */
    const handleCustomerCloseModal = () => {
        setIsCustomerModalOpen(false);
    }
    const handleCustomerModal = () => {
        setIsCustomerModalOpen(true);
    }
    const handleTemenosCustomerInputChange = (event) => {
        setTemenosCustomer(event.target.value);
    };
    const [values, setValues] = useState({
        "original-loan": '',
        "annaul-interest-rate": '',
        "loan-period-in-years": '',
        "risk-premium": '',
        "number-of-payments-per-year": '',
    });
    const [principalWaiverNumber, setPrincipalWaiverNumber] = useState({
        "principal-waiver-number": ''
    });
    const [interestWaiverNumber, setInterestWaiverNumber] = useState({
        "interest-waiver-number": ''
    });
    const [extension, setExtension] = useState({
        "extension": ''
    });
    const [interestAndPrincipalWaiver, setInterestAndPrincipalWaiver] = useState({
        "principalwaiversecond": '',
        "interestwaiversecond": ''

    });
    const [principalWaiverPlusExtension, setPrincipalWaiverPlusExtension] = useState({
        "principalwaiverthird": '',
        "extensionsecond": ''

    });
    const [interestWaiverPlusExtension, setInterestWaiverPlusExtension] = useState({
        "interest_waiver_extension": '',
        "extension_interest_waiver": ''
    });
    const [principalAndInterestWaiverPlusExtension, setPrincipalAndInterestWaiverPlusExtension] = useState({
        "principal_interest_waiver_extension": '',
        "interest_principal_waiver_extension": '',
        "extension_interest_principal_waiver": ''
    });
    const [injection, setInjection] = useState({
        injection: "",
    });
    const [showNPVComparision, setShowNPVComparision] = useState(false);

    /**
   * For normal multiple npv computation
   */
    let totalNPV = 0;
    const sumUpNPVs = (npv) => {
        totalNPV += npv;
    }
    /**
     * For normal multiple npv loss computation
     */


    /**
   * For Injection multiple npv computation
   */
    let totalInjectionNPV = 0;
    const sumUpInjectionNPVs = (npv) => {
        totalInjectionNPV += npv;
    }

    /**
    * For Interest Waiver and Extension multiple npv computation
    */
    let totalInterestWaiverAndExtensionNPV = 0;
    const sumUpInterestWaiverAndExtensionNPVs = (npv) => {
        totalInterestWaiverAndExtensionNPV += npv;
    }

    /**
     * For Principal & Interest Waiver and Extension multiple npv computation
     */
    let totalPrincipalAndInterestWaiverAndExtensionNPV = 0;
    const sumUpPrincipalAndInterestWaiverAndExtensionNPVs = (npv) => {
        totalPrincipalAndInterestWaiverAndExtensionNPV += npv;
    }

    /**
  * For normal multiple npv loss computation
  */
    let totalNormalNPVLoss = 0;
    const sumUpNormalNPVLoss = (npv) => {
        totalNormalNPVLoss += npv;
    }
    /**
    * For principal waiver multiple npv computation
    */
    let totalPrincipalWaiverNPV = 0;
    const sumUpPrincipalWaiverNPVs = (npv) => {
        totalPrincipalWaiverNPV += npv;
    }

    /**
    * For interest waiver multiple npv computation
    */
    let totalInterestWaiverNPV = 0;
    const sumUpInterestWaiverNPVs = (npv) => {
        totalInterestWaiverNPV += npv;
    }

    /**
   * For interest waiver multiple npv computation
   */
    let totalExtensionNPV = 0;
    const sumUpExtensionNPVs = (npv) => {
        totalExtensionNPV += npv;
    }
    /**
    * For Principal Waiver and Extension multiple npv computation
    */
    let totalPrincipalWaiverAndExtensionNPV = 0;
    const sumUpPrincipalWaiverAndExtensionNPVs = (npv) => {
        totalPrincipalWaiverAndExtensionNPV += npv;
    }

    /**
     *  
     * For interest plus principal waiver multiple npv computation
     * 
     * */
    let totalInterestAndPrincipalNPV = 0;
    const sumUpInterestAndPrincipalNPVs = (npv) => {
        totalInterestAndPrincipalNPV += npv;
    }
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


    const viewCollateralMessage = () => {
        toast.success('Fetching collateral...', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 'fecthCollateral',
        });
    }

    const handleCollateralVisible = () => {
        setCollateralVisibility(!collateralVisibility);
    }
    const compareNPV = (e) => {
        e.preventDefault();
        setShowNPVComparision(true);

        console.log(JSON.parse(localStorage.getItem("allNPV")));

        descendingOrderNPVs = JSON.parse(localStorage.getItem("allNPV"));
        ascendingOrderNPVs = JSON.parse(localStorage.getItem("allNPV"));

        const highest = descendingOrderNPVs.reduce((prev, cur) => (cur.result > prev.result ? cur : prev));
        const lowest = descendingOrderNPVs.reduce((prev, cur) => (cur.result < prev.result ? cur : prev));

        setLowestNPV(lowest);
        setLargestNPV(highest);

        console.log(descendingOrderNPVs.sort(
            (p1, p2) =>
                (p1.result < p2.result) ? 1 : (p1.result > p2.result) ? -1 : 0));

        // localStorage.setItem("descendingOrderNPVs", descendingOrderNPVs);

        let sortedDates = ascendingOrderNPVs.sort((p1, p2) => (p1.result > p2.result) ? 1 : (p1.result < p2.result) ? -1 : 0);
        console.log("Products sorted based on ascending order of their manufacture dates are:")
        console.log(sortedDates);
        // localStorage.setItem("ascendingOrderNPVs", ascendingOrderNPVs);

        // ascendingOrderNPVs.push(ascendingOrderNPV);
        // descendingOrderNPVs.push(descendingOrderNPV);
        console.log("Products sorted based on ascending order of their manufacture dates are:")
        console.log(ascendingOrderNPVs);
        console.log("Products sorted based on Descending order of their manufacture dates are:")
        console.log(descendingOrderNPVs)
    }
    //====================Handle Additional Inputs end =========================================
    const [npvScenarios, setnpvScenarios] = useState({
        "npv-scenarios": ''
    });

    const [charType, setCharType] = useState("BarChart");
    const [npvLoans, setNpvLoans] = useState();
    const [populatedLoan, setPopulatedLoan] = useState();

    const [showNumberOfLoans, setShowNumberOfLoans] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [clickStatus, setClickStatus] = useState(false);
    const [loadingPopulate, setLoadingPopulate] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // alert(name, value);
        setValues({
            ...values,
            [name]: value,
        });
    };
    const showInGraph = (e) => {
        e.preventDefault();
        setVisualizeDataInGrpah(JSON.parse(localStorage.getItem("allNPV")))
        setShowNoramlNpvInGraph(true);
        setShowNPVWithPrincipalWaiverInGraph(true);
        setShowNPVWithInterestWaiverInGraph(true);
        setShowNPVWithExtensionInGraph(true);
        setShowNPVWithPrincipalAndInterestWaiverInGraph(true);
        setShowNPVWithPrincipalWaiverPlusExtensionInGraph(true);
        setShowNPVWithInterestWaiverPlusExtensionInGraph(true);
        setShowNPVWithForeclosureInGraph(true);
        setShowNPVWithInjectionInGraph(true);
    }
    const populateLoan = (e, index, customer) => {
        e.preventDefault();
        setLoadingPopulate(index, true);
        /**
         * Set loans for specific customer below
         */
        setPopulatedLoan(customer);
        setNpvLoans(customer);
        setShowNumberOfLoans(true);
        setTimeout(() => {
            setIsPending(false);
            npvScenarios["npv-scenarios"] = "normal";
            values["collateral-type"] = "machinery";
            values["original-loan"] = parseFloat(customer.LoanAmount.replace(/,/g, '')) < 0 ? (-parseFloat(customer.LoanAmount.replace(/,/g, ''))) : parseFloat(customer.LoanAmount.replace(/,/g, ''));
            values["annaul-interest-rate"] = parseFloat(customer.PrincipalRate);
            if (customer.PaymentTerm.endsWith("Y") || customer.PaymentTerm.endsWith("y")) {
                values["loan-period-in-years"] = customer.PaymentTerm.slice(0, -1);
            }
            else if (customer.PaymentTerm.endsWith("D") || customer.PaymentTerm.endsWith("d")) {
                // values["loan-period-in-years"] = 1.5;// because it will be less than a year set to 1 year
                values["loan-period-in-years"] = parseInt(customer.PaymentTerm.slice(0, -1)) <= 366 ? 1 : parseInt(parseInt(customer.PaymentTerm.slice(0, -1)) / 365);
            }
            values["risk-premium"] = customer.RiskPremium;
            // values["number-of-payments-per-year"] = 4;
            if (customer.PaymentFrequency.substring(1, 2) == 1) {
                values["number-of-payments-per-year"] = 1;
            }
            else if (customer.PaymentFrequency.substring(5, 6) == 1) {
                values["number-of-payments-per-year"] = 12;
            }
            else if (customer.PaymentFrequency.substring(5, 6) == 3) {
                values["number-of-payments-per-year"] = 4;
            }
            else if (customer.PaymentFrequency.substring(5, 6) == 6) {
                values["number-of-payments-per-year"] = 2;
            }
            setClickStatus(true);
            setLoadingPopulate(false);
        }, 100);
        setIsPending(true);
    }
    const handleNpvScenariosChange = (e) => {
        const { name, value } = e.target;
        setnpvScenarios({
            ...npvScenarios,
            [name]: value,
        });
    };
    const numberWithCommas = (num) => {
        return num.toLocaleString('en-US');
    }
    const computeCollateralNPV = (e) => {
        e.preventDefault();
        setLoadingForeclosureNPV(true)
        setTimeout(() => {
            const selling_cost_multiplier = 0.05;
            var foreclosure_npv = 0;
            var foreclosure_cashflow = 0;
            var foreclosure_selling_cost = 0;
            var sellingTime = 2;
            const today = new Date();
            if(oneCollateralChecker){
                debugger
                // for single collateral
                if (parseFloat(temenosSingleCollateralParam.CollateralCode) === (100 || 101 || 102 || 103 || 104 || 105 || 106 || 107 || 108 || 109 || 110)) {
                    // for Premises, Buildings or Houses
                    const loanPeriod = today.getFullYear() - (parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseInt(temenosSingleCollateralParam.ExecutionDate.substring(0, 4)) : parseInt(temenosSingleCollateralParam.RevaluedDate.substring(0, 4)));
                    // I will check the value of 1 not replaced with 0 or not
                    var total_rate_building_0 = parseFloat(temenosSingleCollateralParam.RiskPremium) + parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? (1 + 100) : (parseFloat(temenosSingleCollateralParam.PrincipalRate) + 100);
                    if (loanPeriod <= 1) {
                        /**
                         * if the duration is from 1 to 2year inclusive, MCF	1
                         * value of collateral*MCF*1
                         * var cashflow = collateral_value - selling_cost;
                         */
                        let foreclosure_selling_cost_building_0_temp = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let foreclosure_cashflow_building_0_temp = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) - foreclosure_selling_cost_building_0_temp;

                        let div = Math.pow(total_rate_building_0 / 100, sellingTime);
                        let foreclosure_temp_building_0_npv = (foreclosure_cashflow_building_0_temp / div);

                        foreclosure_cashflow += foreclosure_cashflow_building_0_temp;

                        foreclosure_selling_cost += foreclosure_selling_cost_building_0_temp;

                        foreclosure_npv += foreclosure_temp_building_0_npv;
                        setLoadingForeclosureNPV(false);

                        /**
                         * const foreclosureGraphData = { "type": "Foreclosure", "result": npv }
                         * graphNPVS.push(foreclosureGraphData)
                         * localStorage.setItem("npvs", JSON.stringify(foreclosureGraphData))
                         * localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
                         */
                    }
                    else if (loanPeriod > 1 && loanPeriod <= 2) {
                        // if the duration is from 1 to 2 years inclusive, MCF	1.2
                        // value of collateral*MCF*1.5

                        let total_rate_building_1 = parseFloat(temenosSingleCollateralParam.RiskPremium) + (parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0) ? (1 + 100) : parseFloat(temenosSingleCollateralParam.PrincipalRate) + 100;

                        let foreclosure_selling_cost_building_1_temp = (parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0) ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue = (parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0) ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * 1.13;
                        let foreclosure_cashflow_building_1_temp = updateColateralValue - foreclosure_selling_cost_building_1_temp;
                        let div_building_1 = Math.pow(total_rate_building_1 / 100, sellingTime);

                        let foreclosure_building_1_npv = foreclosure_cashflow_building_1_temp / div_building_1;

                        foreclosure_cashflow += foreclosure_cashflow_building_1_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_1_temp;
                        foreclosure_npv += foreclosure_building_1_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 2 && loanPeriod <= 3) {
                        /**
                         * if the duration is from 2 to 3year inclusive, MCF	1.3
                         * for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                         */

                        let total_rate_building_2 = parseFloat(temenosSingleCollateralParam.RiskPremium) + parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? (1 + 100) : parseFloat(temenosSingleCollateralParam.PrincipalRate) + 100;

                        let foreclosure_selling_cost_building_2_temp = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue_2 = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * 1.13;

                        let foreclosure_cashflow_building_2_temp = updateColateralValue_2 - foreclosure_selling_cost_building_2_temp;
                        let div_building_2 = Math.pow(total_rate_building_2 / 100, sellingTime);

                        let foreclosure_building_2_npv = foreclosure_cashflow_building_2_temp / div_building_2;

                        foreclosure_cashflow += foreclosure_cashflow_building_2_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_2_temp;
                        foreclosure_npv += foreclosure_building_2_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 3 && loanPeriod <= 4) {
                        /**
                         * if the duration is from 3 to 4year inclusive, MCF	1.4
                         * for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                         */
                        let total_rate_building_3 = parseFloat(temenosSingleCollateralParam.RiskPremium) + parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? (1 + 100) : parseFloat(temenosSingleCollateralParam.PrincipalRate) + 100;
                        // I will continue here
                        let foreclosure_selling_cost_building_3_temp = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) * selling_cost_multiplier : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue_3 = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) * 1.38 : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * 1.38;

                        let foreclosure_cashflow_building_3_temp = updateColateralValue_3 - foreclosure_selling_cost_building_3_temp;
                        let div_building_3 = Math.pow(total_rate_building_3 / 100, sellingTime);

                        let foreclosure_building_3_npv = foreclosure_cashflow_building_3_temp / div_building_3;

                        foreclosure_cashflow += foreclosure_cashflow_building_3_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_3_temp;
                        foreclosure_npv += foreclosure_building_3_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 4 && loanPeriod <= 5) {
                        /**
                         * if the duration is from 4 to 5year inclusive, MCF	1.5
                         * for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                         */

                        let total_rate_building_4 = parseFloat(temenosSingleCollateralParam.RiskPremium) + (parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0) ? (1 + 100) : parseFloat(temenosSingleCollateralParam.PrincipalRate) + 100;

                        let foreclosure_selling_cost_building_4_temp = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) * selling_cost_multiplier : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue_5 = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) * 1.5 : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * 1.5;

                        let foreclosure_cashflow_building_4_temp = updateColateralValue_5 - foreclosure_selling_cost_building_4_temp;
                        let div_building_4 = Math.pow(total_rate_building_4 / 100, sellingTime);

                        let foreclosure_building_4_npv = foreclosure_cashflow_building_4_temp / div_building_4;

                        foreclosure_cashflow += foreclosure_cashflow_building_4_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_4_temp;
                        foreclosure_npv += foreclosure_building_4_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 5) {
                        foreclosure_cashflow += 0;
                        foreclosure_selling_cost += 0;
                        foreclosure_npv += 0;
                        // alert("foreclosure_cashflow = " + foreclosure_cashflow + " = foreclosure_selling_cost = " + foreclosure_selling_cost + "  foreclosure_npv = " + foreclosure_npv);
                        // alert("It should be revaluated by experts");
                        setLoadingForeclosureNPV(false);
                    }
                }
                else if (parseFloat(temenosSingleCollateralParam.CollateralCode) === (150 || 151 || 152 || 153 || 154 || 155 || 156 || 157 || 158 || 159 || 160 || 161 || 162 || 163 || 164 || 165 || 166 || 167 || 168 || 169 || 170 || 171 || 172 || 173 || 174 || 175 || 176 || 177 || 178 || 179 || 180 || 181 || 182 || 183 || 184 || 185 || 186 || 187 || 188 || 189 || 190 || 301)) {
                    /**
                     * for Motor vehicles
                     * I will continue right here tomorrow tiringo
                     */
                    const loanPeriod = today.getFullYear() - (parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseInt(temenosSingleCollateralParam.ExecutionDate.substring(0, 4)) : parseInt(temenosSingleCollateralParam.RevaluedDate.substring(0, 4)));

                    var depreciationValue = 0.1;
                    var AmountDepreciation = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) * depreciationValue * loanPeriod : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * depreciationValue * loanPeriod;
                    var netValueAfterDepreciation = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, ''))- AmountDepreciation : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) - AmountDepreciation;
                    if (loanPeriod <= 1) {
                        /**
                         * if the duration is from 1 to 2year inclusive, MCF	1
                         * value of collateral*MCF*1
                         */
                        let foreclosure_selling_cost_motor_0_temp = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, ''))* selling_cost_multiplier : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier;
                        let openMarketColateralValue = netValueAfterDepreciation;
                        let foreclosure_cashflow_motor_0_temp = openMarketColateralValue - foreclosure_selling_cost_motor_0_temp;

                        let total_rate_motor_41 = parseFloat(temenosSingleCollateralParam.RiskPremium) + parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.selected_collateral.RevaluedAmount.replace(/,/g, '')) + 100;

                        let div_motor_0 = Math.pow(total_rate_motor_41 / 100, sellingTime);

                        foreclosure_selling_cost_motor_0_temp = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) * selling_cost_multiplier : parseFloat(temenosSingleCollateralParam.selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier;
                        foreclosure_selling_cost += foreclosure_selling_cost_motor_0_temp;

                        foreclosure_cashflow += foreclosure_cashflow_motor_0_temp;
                        let foreclosure_temp_motor_0_npv = (foreclosure_cashflow_motor_0_temp / div_motor_0);
                        foreclosure_npv += foreclosure_temp_motor_0_npv;
                        setLoadingForeclosureNPV(false);
                    }

                    else if (loanPeriod > 1 && loanPeriod <= 2) {
                        /**
                         * if the duration is from 1 to 2year inclusive, MCF	1.1
                         * for the duration b/n 1 to 5year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? 1 : parseFloat(temenosSingleCollateralParam.PrincipalRate);
                        let foreclosure_selling_cost_motor_1_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_2 = netValueAfterDepreciation * 1.1;

                        let foreclosure_cashflow_motor_1_temp = openMarketColateralValue_2 - foreclosure_selling_cost_motor_1_temp;

                        let total_rate_motor_1 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let div_motor_1 = Math.pow(total_rate_motor_1 / 100, sellingTime);
                        let foreclosure_temp_motor_1_npv = foreclosure_cashflow_motor_1_temp / div_motor_1;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_1_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_1_temp;
                        foreclosure_npv += foreclosure_temp_motor_1_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 2 && loanPeriod <= 4) {
                        /**
                         * if the duration is from 2 to 4year inclusive, MCF	1.2
                         * for the duration b/n 1 to 5year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? 1 : parseFloat(temenosSingleCollateralParam.PrincipalRate);

                        let foreclosure_selling_cost_motor_2_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_3 = netValueAfterDepreciation * 1.2;
                        let foreclosure_cashflow_motor_2_temp = openMarketColateralValue_3 - foreclosure_selling_cost_motor_2_temp;
                        let total_rate_motor_2 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let div_motor_2 = Math.pow(parseFloat(total_rate_motor_2 / 100), parseFloat(sellingTime));
                        let foreclosure_temp_motor_2_npv = foreclosure_cashflow_motor_2_temp / div_motor_2;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_2_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_2_temp;
                        foreclosure_npv += foreclosure_temp_motor_2_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 4 && loanPeriod <= 6) {
                        /**
                         * if the duration is from 4 to 6year inclusive, MCF	1.25
                         * for the duration b/n 1 to 5year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? 1 : parseFloat(temenosSingleCollateralParam.PrincipalRate);

                        let foreclosure_selling_cost_motor_4_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_4 = netValueAfterDepreciation * 1.3;
                        let foreclosure_cashflow_motor_4_temp = openMarketColateralValue_4 - foreclosure_selling_cost_motor_4_temp;
                        let total_rate_motor_4 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;
                        let div_motor_4 = Math.pow(total_rate_motor_4 / 100, sellingTime);
                        let foreclosure_temp_motor_4_npv = foreclosure_cashflow_motor_4_temp / div_motor_4;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_4_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_4_temp;
                        foreclosure_npv += foreclosure_temp_motor_4_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 6 && loanPeriod <= 8) {
                        /**
                         * If the duration is from 6 to 8 year inclusive, MCF	1.35
                         * For the duration is above 5 year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? 1 : parseFloat(temenosSingleCollateralParam.PrincipalRate);

                        let foreclosure_selling_cost_motor_6_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_5 = netValueAfterDepreciation * 1.4;

                        let foreclosure_cashflow_motor_6_temp = openMarketColateralValue_5 - foreclosure_selling_cost_motor_6_temp;
                        let total_rate_motor_6 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;
                        let div_motor_6 = Math.pow(total_rate_motor_6 / 100, sellingTime);
                        let foreclosure_temp_motor_6_npv = foreclosure_cashflow_motor_6_temp / div_motor_6;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_6_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_6_temp;
                        foreclosure_npv += foreclosure_temp_motor_6_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 8 && loanPeriod <= 10) {
                        /**
                         * if the duration is from 8 to 10 year inclusive, MCF	1.5
                         * For the duration is above 5 year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? 1 : parseFloat(temenosSingleCollateralParam.PrincipalRate);

                        let foreclosure_selling_cost_motor_8_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_6 = netValueAfterDepreciation * 1.5;
                        let foreclosure_cashflow_motor_8_temp = openMarketColateralValue_6 - foreclosure_selling_cost_motor_8_temp;
                        let total_rate_motor_8 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;
                        let div_motor_8 = Math.pow(total_rate_motor_8 / 100, sellingTime);
                        let foreclosure_temp_motor_8_npv = foreclosure_cashflow_motor_8_temp / div_motor_8;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_8_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_8_temp;
                        foreclosure_npv += foreclosure_temp_motor_8_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else {
                        /**
                         * if the duration is above 10year, MCF	1.4
                         * For the duration is above 5 year value of collateral*MCF*0.9
                         */
                        // alert("which is else part");
                        let collateralValue = parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(temenosSingleCollateralParam.PrincipalRate) === 0 ? 1 : parseFloat(temenosSingleCollateralParam.PrincipalRate);

                        let foreclosure_selling_cost_motor_9_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_7 = netValueAfterDepreciation * 0.14;
                        let foreclosure_cashflow_motor_9_temp = openMarketColateralValue_7 - foreclosure_selling_cost_motor_9_temp;

                        let total_rate_motor_9 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;
                        let div_motor_9 = Math.pow(total_rate_motor_9 / 100, sellingTime);
                        let foreclosure_temp_motor_9_npv = foreclosure_cashflow_motor_9_temp / div_motor_9;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_9_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_9_temp;
                        foreclosure_npv += foreclosure_temp_motor_9_npv;
                        setLoadingForeclosureNPV(false);
                    }
                }
                else {
                    /**
                     * for Others 
                     * it means machinery 
                     */
                    var depreciation = 0.07;
                    const loanPeriod = today.getFullYear() - (parseFloat(temenosSingleCollateralParam.RevaluedAmount) === 0 ? parseInt(temenosSingleCollateralParam.ExecutionDate.substring(0, 4)) : parseInt(temenosSingleCollateralParam.RevaluedDate.substring(0, 4)));

                    var collateralValue = parseFloat(temenosSingleCollateralParam.selected_collateral.RevaluedAmount) === 0 ? parseFloat(temenosSingleCollateralParam.ExecutionValue.replace(/,/g, '')) : parseFloat(temenosSingleCollateralParam.RevaluedAmount.replace(/,/g, ''));
                    var principalRate = parseFloat(temenosSingleCollateralParam.selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(temenosSingleCollateralParam.PrincipalRate);

                    var amountDepreciated = collateralValue * depreciation * loanPeriod;
                    var netValueAfterDepreciation = collateralValue - amountDepreciated;

                    if (loanPeriod <= 1) {
                        // if the duration is from 1 to 2year inclusive, MCF1
                        // value of collateral*MCF*1
                        let foreclosure_selling_cost_others_0_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_1 = netValueAfterDepreciation;

                        let total_rate_other_0 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_0_temp = Openmarketvaluationofcollateral_1 - foreclosure_selling_cost_others_0_temp;
                        let div_other_0 = Math.pow(total_rate_other_0 / 100, sellingTime);
                        let foreclosure_temp_other_0_npv = foreclosure_cashflow_other_0_temp / div_other_0;


                        foreclosure_selling_cost += foreclosure_selling_cost_others_0_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_0_temp;
                        foreclosure_npv += foreclosure_temp_other_0_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 1 && loanPeriod <= 2) {
                        // if the duration is from 1 to 2 year inclusive, MCF	1.05
                        let foreclosure_selling_cost_others_1_temp = collateralValue * selling_cost_multiplier;

                        let Openmarketvaluationofcollateral_2 = netValueAfterDepreciation * 1.07;
                        let total_rate_other_1 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_1_temp = Openmarketvaluationofcollateral_2 - foreclosure_selling_cost_others_1_temp;
                        let div_other_1 = Math.pow(total_rate_other_1 / 100, sellingTime);
                        let foreclosure_temp_other_1_npv = foreclosure_cashflow_other_1_temp / div_other_1;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_1_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_1_temp;
                        foreclosure_npv += foreclosure_temp_other_1_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 2 && loanPeriod <= 4) {
                        // if the duration is from 2 to 4year inclusive, MCF	1.2
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9

                        let foreclosure_selling_cost_others_2_temp = collateralValue * selling_cost_multiplier;

                        let Openmarketvaluationofcollateral_3 = netValueAfterDepreciation * 1.14;
                        let total_rate_other_2 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_2_temp = Openmarketvaluationofcollateral_3 - foreclosure_selling_cost_others_2_temp;
                        let div_other_2 = Math.pow(total_rate_other_2 / 100, sellingTime);
                        let foreclosure_temp_other_2_npv = foreclosure_cashflow_other_2_temp / div_other_2;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_2_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_2_temp;
                        foreclosure_npv += foreclosure_temp_other_2_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 4 && loanPeriod <= 6) {
                        // if the duration is from 4 to 6year inclusive, MCF	1.3
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_4_temp = collateralValue * selling_cost_multiplier;

                        let Openmarketvaluationofcollateral_4 = netValueAfterDepreciation * 1.21;
                        let total_rate_other_4 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_4_temp = Openmarketvaluationofcollateral_4 - foreclosure_selling_cost_others_4_temp;
                        let div_other_4 = Math.pow(total_rate_other_4 / 100, sellingTime);
                        let foreclosure_temp_other_4_npv = foreclosure_cashflow_other_4_temp / div_other_4;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_4_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_4_temp;
                        foreclosure_npv += foreclosure_temp_other_4_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 6 && loanPeriod <= 8) {
                        // if the duration is from 6 to 8year inclusive, MCF	1.35
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_6_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_5 = netValueAfterDepreciation * 1.29;
                        let total_rate_other_6 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_6_temp = Openmarketvaluationofcollateral_5 - foreclosure_selling_cost_others_6_temp;
                        let div_other_6 = Math.pow(total_rate_other_6 / 100, sellingTime);
                        let foreclosure_temp_other_6_npv = foreclosure_cashflow_other_6_temp / div_other_6;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_6_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_6_temp;
                        foreclosure_npv += foreclosure_temp_other_6_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 8 && loanPeriod <= 10) {
                        // if the duration is from 8 to 10year inclusive, MCF	1.4
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_8_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_6 = netValueAfterDepreciation * 1.36;
                        let total_rate_other_8 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_8_temp = Openmarketvaluationofcollateral_6 - foreclosure_selling_cost_others_8_temp;
                        let div_other_8 = Math.pow(total_rate_other_8 / 100, sellingTime);
                        let foreclosure_temp_other_8_npv = foreclosure_cashflow_other_8_temp / div_other_8;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_8_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_8_temp;
                        foreclosure_npv += foreclosure_temp_other_8_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 10 && loanPeriod <= 12) {
                        // if the duration is from 10 to 12year inclusive, MCF	1.45
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_10_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_7 = netValueAfterDepreciation * 1.43;
                        let total_rate_other_10 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_10_temp = Openmarketvaluationofcollateral_7 - foreclosure_selling_cost_others_10_temp;
                        let div_other_10 = Math.pow(total_rate_other_10 / 100, sellingTime);
                        let foreclosure_temp_other_10_npv = foreclosure_cashflow_other_10_temp / div_other_10;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_10_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_10_temp;
                        foreclosure_npv += foreclosure_temp_other_10_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 12 && loanPeriod <= 15) {
                        // if the duration is from 12 to 15year inclusive, MCF	1.5
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_12_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_8 = netValueAfterDepreciation * 1.5;
                        let total_rate_other_12 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_12_temp = Openmarketvaluationofcollateral_8 - foreclosure_selling_cost_others_12_temp;
                        let div_other_12 = Math.pow(total_rate_other_12 / 100, sellingTime);
                        let foreclosure_temp_other_12_npv = foreclosure_cashflow_other_12_temp / div_other_12;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_12_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_12_temp;
                        foreclosure_npv += foreclosure_temp_other_12_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else {
                        // if the duration is above 510year, MCF	1.3
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_13_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_9 = netValueAfterDepreciation * 1.13;
                        let total_rate_other_13 = parseFloat(temenosSingleCollateralParam.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_13_temp = Openmarketvaluationofcollateral_9 - foreclosure_selling_cost_others_13_temp;
                        let div_other_13 = Math.pow(total_rate_other_13 / 100, sellingTime);
                        let foreclosure_temp_other_13_npv = foreclosure_cashflow_other_13_temp / div_other_13;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_13_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_13_temp;
                        foreclosure_npv += foreclosure_temp_other_13_npv;
                        setLoadingForeclosureNPV(false);
                    }
                }
            }else{
                //For multiple collaterals
                 temenosCollateralParams.forEach((selected_collateral, index) => {
                if (parseFloat(selected_collateral.CollateralCode) === (100 || 101 || 102 || 103 || 104 || 105 || 106 || 107 || 108 || 109 || 110)) {
                    // for Premises, Buildings or Houses
                    const loanPeriod = today.getFullYear() - (parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseInt(selected_collateral.ExecutionDate.substring(0, 4)) : parseInt(selected_collateral.RevaluedDate.substring(0, 4)));
                    // I will check the value of 1 not replaced with 0 or not
                    var total_rate_building_0 = parseFloat(selected_collateral.RiskPremium) + parseFloat(selected_collateral.PrincipalRate) === 0 ? (1 + 100) : (parseFloat(selected_collateral.PrincipalRate) + 100);
                    if (loanPeriod <= 1) {
                        /**
                         * if the duration is from 1 to 2year inclusive, MCF	1
                         * value of collateral*MCF*1
                         * var cashflow = collateral_value - selling_cost;
                         */
                        let foreclosure_selling_cost_building_0_temp = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let foreclosure_cashflow_building_0_temp = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) - foreclosure_selling_cost_building_0_temp;

                        let div = Math.pow(total_rate_building_0 / 100, sellingTime);
                        let foreclosure_temp_building_0_npv = (foreclosure_cashflow_building_0_temp / div);

                        foreclosure_cashflow += foreclosure_cashflow_building_0_temp;

                        foreclosure_selling_cost += foreclosure_selling_cost_building_0_temp;

                        foreclosure_npv += foreclosure_temp_building_0_npv;
                        setLoadingForeclosureNPV(false);

                        /**
                         * const foreclosureGraphData = { "type": "Foreclosure", "result": npv }
                         * graphNPVS.push(foreclosureGraphData)
                         * localStorage.setItem("npvs", JSON.stringify(foreclosureGraphData))
                         * localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
                         */
                    }
                    else if (loanPeriod > 1 && loanPeriod <= 2) {
                        // if the duration is from 1 to 2 years inclusive, MCF	1.2
                        // value of collateral*MCF*1.5

                        let total_rate_building_1 = parseFloat(selected_collateral.RiskPremium) + (parseFloat(selected_collateral.PrincipalRate) === 0) ? (1 + 100) : parseFloat(selected_collateral.PrincipalRate) + 100;

                        let foreclosure_selling_cost_building_1_temp = (parseFloat(selected_collateral.RevaluedAmount) === 0) ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue = (parseFloat(selected_collateral.RevaluedAmount) === 0) ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * 1.13;
                        let foreclosure_cashflow_building_1_temp = updateColateralValue - foreclosure_selling_cost_building_1_temp;
                        let div_building_1 = Math.pow(total_rate_building_1 / 100, sellingTime);

                        let foreclosure_building_1_npv = foreclosure_cashflow_building_1_temp / div_building_1;

                        foreclosure_cashflow += foreclosure_cashflow_building_1_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_1_temp;
                        foreclosure_npv += foreclosure_building_1_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 2 && loanPeriod <= 3) {
                        /**
                         * if the duration is from 2 to 3year inclusive, MCF	1.3
                         * for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                         */

                        let total_rate_building_2 = parseFloat(selected_collateral.RiskPremium) + parseFloat(selected_collateral.PrincipalRate) === 0 ? (1 + 100) : parseFloat(selected_collateral.PrincipalRate) + 100;

                        let foreclosure_selling_cost_building_2_temp = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue_2 = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * 1.13;

                        let foreclosure_cashflow_building_2_temp = updateColateralValue_2 - foreclosure_selling_cost_building_2_temp;
                        let div_building_2 = Math.pow(total_rate_building_2 / 100, sellingTime);

                        let foreclosure_building_2_npv = foreclosure_cashflow_building_2_temp / div_building_2;

                        foreclosure_cashflow += foreclosure_cashflow_building_2_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_2_temp;
                        foreclosure_npv += foreclosure_building_2_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 3 && loanPeriod <= 4) {
                        /**
                         * if the duration is from 3 to 4year inclusive, MCF	1.4
                         * for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                         */

                        let total_rate_building_3 = parseFloat(selected_collateral.RiskPremium) + parseFloat(selected_collateral.PrincipalRate) === 0 ? (1 + 100) : parseFloat(selected_collateral.PrincipalRate) + 100;

                        let foreclosure_selling_cost_building_3_temp = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue_3 = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * 1.38;

                        let foreclosure_cashflow_building_3_temp = updateColateralValue_3 - foreclosure_selling_cost_building_3_temp;
                        let div_building_3 = Math.pow(total_rate_building_3 / 100, sellingTime);

                        let foreclosure_building_3_npv = foreclosure_cashflow_building_3_temp / div_building_3;

                        foreclosure_cashflow += foreclosure_cashflow_building_3_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_3_temp;
                        foreclosure_npv += foreclosure_building_3_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 4 && loanPeriod <= 5) {
                        /**
                         * if the duration is from 4 to 5year inclusive, MCF	1.5
                         * for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                         */

                        let total_rate_building_4 = parseFloat(selected_collateral.RiskPremium) + (parseFloat(selected_collateral.PrincipalRate) === 0) ? (1 + 100) : parseFloat(selected_collateral.PrincipalRate) + 100;

                        let foreclosure_selling_cost_building_4_temp = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier //selling cost during forclosure

                        let updateColateralValue_5 = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * 1.5;

                        let foreclosure_cashflow_building_4_temp = updateColateralValue_5 - foreclosure_selling_cost_building_4_temp;
                        let div_building_4 = Math.pow(total_rate_building_4 / 100, sellingTime);

                        let foreclosure_building_4_npv = foreclosure_cashflow_building_4_temp / div_building_4;

                        foreclosure_cashflow += foreclosure_cashflow_building_4_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_4_temp;
                        foreclosure_npv += foreclosure_building_4_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 5) {
                        debugger
                        foreclosure_cashflow += 0;
                        foreclosure_selling_cost += 0;
                        foreclosure_npv += 0;
                        // alert("foreclosure_cashflow = " + foreclosure_cashflow + " = foreclosure_selling_cost = " + foreclosure_selling_cost + "  foreclosure_npv = " + foreclosure_npv);
                        // alert("It should be revaluated by experts");
                        setLoadingForeclosureNPV(false);
                    }
                }
                 else if (parseFloat(selected_collateral.CollateralCode) === (150 || 151 || 152 || 153 || 154 || 155 || 156 || 157 || 158 || 159 || 160 || 161 || 162 || 163 || 164 || 165 || 166 || 167 || 168 || 169 || 170 || 171 || 172 || 173 || 174 || 175 || 176 || 177 || 178 || 179 || 180 || 181 || 182 || 183 || 184 || 185 || 186 || 187 || 188 || 189 || 190 || 301)) {
                    /**
                     * for Motor vehicles
                     * I will continue right here tomorrow tiringo
                     */
                    const loanPeriod = today.getFullYear() - (parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseInt(selected_collateral.ExecutionDate.substring(0, 4)) : parseInt(selected_collateral.RevaluedDate.substring(0, 4)));

                    var depreciationValue = 0.1;
                    var AmountDepreciation = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * depreciationValue * loanPeriod;
                    var netValueAfterDepreciation = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) - AmountDepreciation;
                    if (loanPeriod <= 1) {
                        /**
                         * if the duration is from 1 to 2year inclusive, MCF	1
                         * value of collateral*MCF*1
                         */
                        let foreclosure_selling_cost_motor_0_temp = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier;
                        let openMarketColateralValue = netValueAfterDepreciation;
                        let foreclosure_cashflow_motor_0_temp = openMarketColateralValue - foreclosure_selling_cost_motor_0_temp;

                        let total_rate_motor_41 = parseFloat(selected_collateral.RiskPremium) + parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) + 100;

                        let div_motor_0 = Math.pow(total_rate_motor_41 / 100, sellingTime);

                        foreclosure_selling_cost_motor_0_temp = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, '')) * selling_cost_multiplier;
                        foreclosure_selling_cost += foreclosure_selling_cost_motor_0_temp;

                        foreclosure_cashflow += foreclosure_cashflow_motor_0_temp;
                        let foreclosure_temp_motor_0_npv = (foreclosure_cashflow_motor_0_temp / div_motor_0);
                        foreclosure_npv += foreclosure_temp_motor_0_npv;
                        setLoadingForeclosureNPV(false);
                    }

                    else if (loanPeriod > 1 && loanPeriod <= 2) {
                        /**
                         * if the duration is from 1 to 2year inclusive, MCF	1.1
                         * for the duration b/n 1 to 5year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(selected_collateral.PrincipalRate);
                        let foreclosure_selling_cost_motor_1_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_2 = netValueAfterDepreciation * 1.1;

                        let foreclosure_cashflow_motor_1_temp = openMarketColateralValue_2 - foreclosure_selling_cost_motor_1_temp;

                        let total_rate_motor_1 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let div_motor_1 = Math.pow(total_rate_motor_1 / 100, sellingTime);
                        let foreclosure_temp_motor_1_npv = foreclosure_cashflow_motor_1_temp / div_motor_1;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_1_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_1_temp;
                        foreclosure_npv += foreclosure_temp_motor_1_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 2 && loanPeriod <= 4) {
                        /**
                         * if the duration is from 2 to 4year inclusive, MCF	1.2
                         * for the duration b/n 1 to 5year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(selected_collateral.PrincipalRate);

                        let foreclosure_selling_cost_motor_2_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_3 = netValueAfterDepreciation * 1.2;
                        let foreclosure_cashflow_motor_2_temp = openMarketColateralValue_3 - foreclosure_selling_cost_motor_2_temp;
                        let total_rate_motor_2 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let div_motor_2 = Math.pow(parseFloat(total_rate_motor_2 / 100), parseFloat(sellingTime));
                        let foreclosure_temp_motor_2_npv = foreclosure_cashflow_motor_2_temp / div_motor_2;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_2_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_2_temp;
                        foreclosure_npv += foreclosure_temp_motor_2_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 4 && loanPeriod <= 6) {
                        /**
                         * if the duration is from 4 to 6year inclusive, MCF	1.25
                         * for the duration b/n 1 to 5year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(selected_collateral.PrincipalRate);

                        let foreclosure_selling_cost_motor_4_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_4 = netValueAfterDepreciation * 1.3;
                        let foreclosure_cashflow_motor_4_temp = openMarketColateralValue_4 - foreclosure_selling_cost_motor_4_temp;
                        let total_rate_motor_4 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;
                        let div_motor_4 = Math.pow(total_rate_motor_4 / 100, sellingTime);
                        let foreclosure_temp_motor_4_npv = foreclosure_cashflow_motor_4_temp / div_motor_4;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_4_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_4_temp;
                        foreclosure_npv += foreclosure_temp_motor_4_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 6 && loanPeriod <= 8) {
                        /**
                         * If the duration is from 6 to 8 year inclusive, MCF	1.35
                         * For the duration is above 5 year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(selected_collateral.PrincipalRate);

                        let foreclosure_selling_cost_motor_6_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_5 = netValueAfterDepreciation * 1.4;

                        let foreclosure_cashflow_motor_6_temp = openMarketColateralValue_5 - foreclosure_selling_cost_motor_6_temp;
                        let total_rate_motor_6 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;
                        let div_motor_6 = Math.pow(total_rate_motor_6 / 100, sellingTime);
                        let foreclosure_temp_motor_6_npv = foreclosure_cashflow_motor_6_temp / div_motor_6;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_6_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_6_temp;
                        foreclosure_npv += foreclosure_temp_motor_6_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 8 && loanPeriod <= 10) {
                        /**
                         * if the duration is from 8 to 10 year inclusive, MCF	1.5
                         * For the duration is above 5 year value of collateral*MCF*0.9
                         */
                        let collateralValue = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(selected_collateral.PrincipalRate);

                        let foreclosure_selling_cost_motor_8_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_6 = netValueAfterDepreciation * 1.5;
                        let foreclosure_cashflow_motor_8_temp = openMarketColateralValue_6 - foreclosure_selling_cost_motor_8_temp;
                        let total_rate_motor_8 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;
                        let div_motor_8 = Math.pow(total_rate_motor_8 / 100, sellingTime);
                        let foreclosure_temp_motor_8_npv = foreclosure_cashflow_motor_8_temp / div_motor_8;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_8_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_8_temp;
                        foreclosure_npv += foreclosure_temp_motor_8_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else {
                        /**
                         * if the duration is above 10year, MCF	1.4
                         * For the duration is above 5 year value of collateral*MCF*0.9
                         */
                        // alert("which is else part");
                        let collateralValue = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, ''));
                        let principalRate = parseFloat(selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(selected_collateral.PrincipalRate);

                        let foreclosure_selling_cost_motor_9_temp = collateralValue * selling_cost_multiplier;
                        let openMarketColateralValue_7 = netValueAfterDepreciation * 0.14;
                        let foreclosure_cashflow_motor_9_temp = openMarketColateralValue_7 - foreclosure_selling_cost_motor_9_temp;

                        let total_rate_motor_9 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;
                        let div_motor_9 = Math.pow(total_rate_motor_9 / 100, sellingTime);
                        let foreclosure_temp_motor_9_npv = foreclosure_cashflow_motor_9_temp / div_motor_9;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_9_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_9_temp;
                        foreclosure_npv += foreclosure_temp_motor_9_npv;
                        setLoadingForeclosureNPV(false);
                    }
                } 
                else {
                    /**
                     * for Others 
                     * it means machinery 
                     */
                    var depreciation = 0.07;
                    const loanPeriod = today.getFullYear() - (parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseInt(selected_collateral.ExecutionDate.substring(0, 4)) : parseInt(selected_collateral.RevaluedDate.substring(0, 4)));

                    var collateralValue = parseFloat(selected_collateral.RevaluedAmount) === 0 ? parseFloat(selected_collateral.ExecutionValue.replace(/,/g, '')) : parseFloat(selected_collateral.RevaluedAmount.replace(/,/g, ''));
                    var principalRate = parseFloat(selected_collateral.PrincipalRate) === 0 ? 1 : parseFloat(selected_collateral.PrincipalRate);

                    var amountDepreciated = collateralValue * depreciation * loanPeriod;
                    var netValueAfterDepreciation = collateralValue - amountDepreciated;

                    if (loanPeriod <= 1) {
                        // if the duration is from 1 to 2year inclusive, MCF1
                        // value of collateral*MCF*1
                        let foreclosure_selling_cost_others_0_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_1 = netValueAfterDepreciation;

                        let total_rate_other_0 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_0_temp = Openmarketvaluationofcollateral_1 - foreclosure_selling_cost_others_0_temp;
                        let div_other_0 = Math.pow(total_rate_other_0 / 100, sellingTime);
                        let foreclosure_temp_other_0_npv = foreclosure_cashflow_other_0_temp / div_other_0;


                        foreclosure_selling_cost += foreclosure_selling_cost_others_0_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_0_temp;
                        foreclosure_npv += foreclosure_temp_other_0_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 1 && loanPeriod <= 2) {
                        // if the duration is from 1 to 2 year inclusive, MCF	1.05
                        let foreclosure_selling_cost_others_1_temp = collateralValue * selling_cost_multiplier;

                        let Openmarketvaluationofcollateral_2 = netValueAfterDepreciation * 1.07;
                        let total_rate_other_1 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_1_temp = Openmarketvaluationofcollateral_2 - foreclosure_selling_cost_others_1_temp;
                        let div_other_1 = Math.pow(total_rate_other_1 / 100, sellingTime);
                        let foreclosure_temp_other_1_npv = foreclosure_cashflow_other_1_temp / div_other_1;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_1_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_1_temp;
                        foreclosure_npv += foreclosure_temp_other_1_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 2 && loanPeriod <= 4) {
                        // if the duration is from 2 to 4year inclusive, MCF	1.2
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9

                        let foreclosure_selling_cost_others_2_temp = collateralValue * selling_cost_multiplier;

                        let Openmarketvaluationofcollateral_3 = netValueAfterDepreciation * 1.14;
                        let total_rate_other_2 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_2_temp = Openmarketvaluationofcollateral_3 - foreclosure_selling_cost_others_2_temp;
                        let div_other_2 = Math.pow(total_rate_other_2 / 100, sellingTime);
                        let foreclosure_temp_other_2_npv = foreclosure_cashflow_other_2_temp / div_other_2;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_2_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_2_temp;
                        foreclosure_npv += foreclosure_temp_other_2_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 4 && loanPeriod <= 6) {
                        // if the duration is from 4 to 6year inclusive, MCF	1.3
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_4_temp = collateralValue * selling_cost_multiplier;

                        let Openmarketvaluationofcollateral_4 = netValueAfterDepreciation * 1.21;
                        let total_rate_other_4 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_4_temp = Openmarketvaluationofcollateral_4 - foreclosure_selling_cost_others_4_temp;
                        let div_other_4 = Math.pow(total_rate_other_4 / 100, sellingTime);
                        let foreclosure_temp_other_4_npv = foreclosure_cashflow_other_4_temp / div_other_4;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_4_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_4_temp;
                        foreclosure_npv += foreclosure_temp_other_4_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 6 && loanPeriod <= 8) {
                        // if the duration is from 6 to 8year inclusive, MCF	1.35
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_6_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_5 = netValueAfterDepreciation * 1.29;
                        let total_rate_other_6 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_6_temp = Openmarketvaluationofcollateral_5 - foreclosure_selling_cost_others_6_temp;
                        let div_other_6 = Math.pow(total_rate_other_6 / 100, sellingTime);
                        let foreclosure_temp_other_6_npv = foreclosure_cashflow_other_6_temp / div_other_6;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_6_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_6_temp;
                        foreclosure_npv += foreclosure_temp_other_6_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 8 && loanPeriod <= 10) {
                        // if the duration is from 8 to 10year inclusive, MCF	1.4
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_8_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_6 = netValueAfterDepreciation * 1.36;
                        let total_rate_other_8 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_8_temp = Openmarketvaluationofcollateral_6 - foreclosure_selling_cost_others_8_temp;
                        let div_other_8 = Math.pow(total_rate_other_8 / 100, sellingTime);
                        let foreclosure_temp_other_8_npv = foreclosure_cashflow_other_8_temp / div_other_8;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_8_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_8_temp;
                        foreclosure_npv += foreclosure_temp_other_8_npv;
                        setLoadingForeclosureNPV(false);

                    }
                    else if (loanPeriod > 10 && loanPeriod <= 12) {
                        // if the duration is from 10 to 12year inclusive, MCF	1.45
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_10_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_7 = netValueAfterDepreciation * 1.43;
                        let total_rate_other_10 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_10_temp = Openmarketvaluationofcollateral_7 - foreclosure_selling_cost_others_10_temp;
                        let div_other_10 = Math.pow(total_rate_other_10 / 100, sellingTime);
                        let foreclosure_temp_other_10_npv = foreclosure_cashflow_other_10_temp / div_other_10;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_10_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_10_temp;
                        foreclosure_npv += foreclosure_temp_other_10_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else if (loanPeriod > 12 && loanPeriod <= 15) {
                        // if the duration is from 12 to 15year inclusive, MCF	1.5
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_12_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_8 = netValueAfterDepreciation * 1.5;
                        let total_rate_other_12 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_12_temp = Openmarketvaluationofcollateral_8 - foreclosure_selling_cost_others_12_temp;
                        let div_other_12 = Math.pow(total_rate_other_12 / 100, sellingTime);
                        let foreclosure_temp_other_12_npv = foreclosure_cashflow_other_12_temp / div_other_12;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_12_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_12_temp;
                        foreclosure_npv += foreclosure_temp_other_12_npv;
                        setLoadingForeclosureNPV(false);
                    }
                    else {
                        // if the duration is above 510year, MCF	1.3
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        let foreclosure_selling_cost_others_13_temp = collateralValue * selling_cost_multiplier;
                        let Openmarketvaluationofcollateral_9 = netValueAfterDepreciation * 1.13;
                        let total_rate_other_13 = parseFloat(selected_collateral.RiskPremium) + principalRate + 100;

                        let foreclosure_cashflow_other_13_temp = Openmarketvaluationofcollateral_9 - foreclosure_selling_cost_others_13_temp;
                        let div_other_13 = Math.pow(total_rate_other_13 / 100, sellingTime);
                        let foreclosure_temp_other_13_npv = foreclosure_cashflow_other_13_temp / div_other_13;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_13_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_13_temp;
                        foreclosure_npv += foreclosure_temp_other_13_npv;
                        setLoadingForeclosureNPV(false);
                    }
                }
            })
            }
           
            setSellingCost(foreclosure_selling_cost);
            setNPVForClosure(foreclosure_npv);
            setCashFlow(foreclosure_cashflow);
            const foreclosureGraphData = { "type": "Foreclosure", "result": foreclosure_npv }
            graphNPVS.push(foreclosureGraphData)
            localStorage.setItem("npvs", JSON.stringify(foreclosureGraphData))
            localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
        }, 1000)
        setShowNPVWithForeclosure(true);
    }
    const roundAmount = (num) => {
        return Math.round(num * 100) / 100;
    };
    const getCustomers = () => {
        setSearchLoading(true);
        CustomerService.getLoanInfoFromTemenos(temenosCustomer).then((response) => {
            if (response.data.Body.WSLOANINFOResponse.CBECREDITNPVNOFILEENQType.gCBECREDITNPVNOFILEENQDetailType.mCBECREDITNPVNOFILEENQDetailType.length === undefined) {
                setOneLoanChecker(true);
                setSuccessLoanLoading(true);
                setTemenosCustomerParams(response.data.Body.WSLOANINFOResponse.CBECREDITNPVNOFILEENQType.gCBECREDITNPVNOFILEENQDetailType.mCBECREDITNPVNOFILEENQDetailType);
                setNpvForm(true);
            }
            if (response.data.Body.WSLOANINFOResponse.Status.messages) {
                alert("Not found")
            }
            if (response.data.Body.WSLOANINFOResponse.CBECREDITNPVNOFILEENQType.gCBECREDITNPVNOFILEENQDetailType.mCBECREDITNPVNOFILEENQDetailType.length >= 2) {
                setOneLoanChecker(false)
                setSuccessLoanLoading(true);
                setTemenosCustomerParams(response.data.Body.WSLOANINFOResponse.CBECREDITNPVNOFILEENQType.gCBECREDITNPVNOFILEENQDetailType.mCBECREDITNPVNOFILEENQDetailType);
                setNpvForm(true);
                // alert("Has " + response.data.Body.WSLOANINFOResponse.CBECREDITNPVNOFILEENQType.gCBECREDITNPVNOFILEENQDetailType.mCBECREDITNPVNOFILEENQDetailType.length + " loans which is multiple");
            }
            setSearchLoading(false);
        }).catch(error => {
            setSearchLoading(false);
            console.log(error);
        })
    }
    const handleNPVComputation = (e) => {
        e.preventDefault();
        setLoading(true);
        var numberOfPaymentsPerMonth = isNaN(values["number-of-payments-per-month"]) ? 0 : ((values["number-of-payments-per-month"]) / 12);
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
                    principalWaiverNumber["principal-waiver-number"],
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
                    interestWaiverNumber["interest-waiver-number"],
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
                    extension["extension"],
                );
                setShowNPVWithExtension(true);
                setLoading(false);
            }

            if (npvScenarios["npv-scenarios"] === "principalwaiver&interestwaiver".trim()) {
                calculateNPVWithInterestAndPrincipalWaiver(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    interestAndPrincipalWaiver["principalwaiversecond"],
                    interestAndPrincipalWaiver["interestwaiversecond"],
                );
                setShowNPVWithPrincipalAndInterestWaiver(true);
                setLoading(false);
            }

            if (npvScenarios["npv-scenarios"] === "principalwaiver&extension".trim()) {
                calculateNPVWithPrincipalWaiverPlusExtension(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    principalWaiverPlusExtension["principalwaiverthird"],
                    principalWaiverPlusExtension["extensionsecond"],
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
                    interestWaiverPlusExtension["extension_interest_waiver"],
                );
                setShowNPVWithInterestWaiverPlusExtension(true);
                setLoading(false);
            }
            if (npvScenarios["npv-scenarios"] === "principal&interestwaiver&extension".trim()) {
                calculateNPVWithPrincipalAndInterestWaiverPlusExtension(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    Number(values["loan-period-in-years"]) + numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    principalAndInterestWaiverPlusExtension["principal_interest_waiver_extension"],
                    principalAndInterestWaiverPlusExtension["interest_principal_waiver_extension"],
                    principalAndInterestWaiverPlusExtension["extension_interest_principal_waiver"],
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
        }, 1000)
        setIsPending(true);
    }

    const calculate = (amount, rate, years, riskPremium, numberOfPayments) => {
        const loan = npvNormal(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments
        );

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
                "scenario": "Normal",
                "npv": loan.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": npvLoans.LoanAmount,
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate
            };
            normalMultipleNPV.push(normalNpvMul);
            console.log(normalMultipleNPV);
        }
        else if (normalMultipleNPV.length > 0) {
            normalMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.ArrangementId === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loan information that is already exists
                    * Then splice that array and assign the newly requested loan information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanInfo = normalMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const normalNpvMul = {
                        "scenario": "Normal",
                        "npv": loan.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        // "amount": values["original-loan"],
                        "amount": npvLoans.LoanAmount,
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate
                    };
                    removeExistedLoanInfo.push(normalNpvMul);
                    normalMultipleNPV = removeExistedLoanInfo;
                    console.log("normalMultipleNPV");
                    console.log(normalMultipleNPV);
                }
                else if (npvLoans.ArrangementId !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanInfoSecond = normalMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const normalNpvMulSecond = {
                        "scenario": "Normal",
                        "npv": loan.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": npvLoans.LoanAmount,
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate
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
        const normalNPV = { "type": "normal", "result": loan.NPV };
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
                "scenario": "principalwaiver",
                "npv": loanPrincipalWaiver.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": npvLoans.LoanAmount,
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "waivedPrincipal": principalWaiverNumber["principal-waiver-number"]
            };
            withPrincipalWaiverMultipleNPV.push(withPrincipalWaiverNpvMul);
            // console.log(withPrincipalWaiverMultipleNPV);
        }
        else if (withPrincipalWaiverMultipleNPV.length > 0) {
            withPrincipalWaiverMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.ArrangementId === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanPrincipalWaiver information that is already exists
                    * Then splice that array and assign the newly requested loanPrincipalWaiver information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithPrincipalWaiverInfo = withPrincipalWaiverMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withPrincipalWaiverNpvMul1 = {
                        "scenario": "principalwaiver",
                        "npv": loanPrincipalWaiver.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": npvLoans.LoanAmount,
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "waivedPrincipal": principalWaiverNumber["principal-waiver-number"]

                    };
                    removeExistedLoanWithPrincipalWaiverInfo.push(withPrincipalWaiverNpvMul1);
                    withPrincipalWaiverMultipleNPV = removeExistedLoanWithPrincipalWaiverInfo;
                    // console.log("With Principal Multiple NPV first value");
                    // console.log(withPrincipalWaiverMultipleNPV);
                }
                else if (npvLoans.ArrangementId !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanInfoSecond = withPrincipalWaiverMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withPrincipalWaiverNpvMul2 = {
                        "scenario": "principalwaiver",
                        "npv": loanPrincipalWaiver.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": npvLoans.LoanAmount,
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "waivedPrincipal": principalWaiverNumber["principal-waiver-number"]
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

        setYearlyScheduledPaymentPrincipalWaiver(loanPrincipalWaiver.yearlyScheduledPaymentPrincipalWaiver);
        setYearlyInterestSummationPrincipalWaiver(loanPrincipalWaiver.yearlyInterestSummationPrincipalWaiver);
        setYearlyPrincipalSummationPrincipalWaiver(loanPrincipalWaiver.yearlyPrincipalSummationPrincipalWaiver);

        const withPrincipalWaiverNPVGraph = { "type": "Principal Waiver", "result": loanPrincipalWaiver.NPV }
        graphNPVS.push(withPrincipalWaiverNPVGraph)
        localStorage.setItem("npvs", JSON.stringify(withPrincipalWaiverNPVGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
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
                "scenario": "interestwaiver",
                "npv": loanInterestWaiver.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": npvLoans.LoanAmount,
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "waivedInterest": values["interest-waiver-number"]
            };
            withInterestWaiverMultipleNPV.push(withInterestWaiverNpvMul);
        }
        else if (withInterestWaiverMultipleNPV.length > 0) {
            withInterestWaiverMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.ArrangementId === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanInterestWaiver information that is already exists
                    * Then splice that array and assign the newly requested loanInterestWaiver information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithInterestWaiverInfo = withInterestWaiverMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withInterestWaiverNpvMul1 = {
                        "scenario": "interestwaiver",
                        "npv": loanInterestWaiver.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": npvLoans.LoanAmount,
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "waivedInterest": values["interest-waiver-number"]
                    };
                    removeExistedLoanWithInterestWaiverInfo.push(withInterestWaiverNpvMul1);
                    withInterestWaiverMultipleNPV = removeExistedLoanWithInterestWaiverInfo;
                }
                else if (npvLoans.ArrangementId !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanInterestWaiverInfoSecond = withInterestWaiverMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withInterestWaiverNpvMul2 = {
                        "scenario": "interestwaiver",
                        "npv": loanInterestWaiver.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": npvLoans.LoanAmount,
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "waivedInterest": values["interest-waiver-number"]
                    };
                    removeExistedLoanInterestWaiverInfoSecond.push(withInterestWaiverNpvMul2);
                    withInterestWaiverMultipleNPV = removeExistedLoanInterestWaiverInfoSecond;
                }
            });
        }

        setInterestWaiverAmortization(loanInterestWaiver.scheduledPayments);
        setNpvInterestWaiver(loanInterestWaiver.NPV);

        setYearlyScheduledPaymentInterestWaiver(loanInterestWaiver.yearlyScheduledPaymentInterestWaiver);
        setYearlyInterestSummationInterestWaiver(loanInterestWaiver.yearlyInterestSummationInterestWaiver);
        setYearlyPrincipalSummationInterestWaiver(loanInterestWaiver.yearlyPrincipalSummationInterestWaiver);

        const withInterestWaiverNPVGraph = { "type": "Interest Waiver", "result": loanInterestWaiver.NPV }
        graphNPVS.push(withInterestWaiverNPVGraph)
        localStorage.setItem("npvs", JSON.stringify(withInterestWaiverNPVGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

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
                "scenario": "extension",
                "npv": loanExtension.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": values["original-loan"],
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "withExtension": values["extension"]
            };
            withExtensionMultipleNPV.push(withExtensionNpvMul);
        }
        else if (withExtensionMultipleNPV.length > 0) {
            withExtensionMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.ArrangementId === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanExtension information that is already exists
                    * Then splice that array and assign the newly requested loanExtension information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithExtensionInfo = withExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withExtensionNpvMul1 = {
                        "scenario": "extension",
                        "npv": loanExtension.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "withExtension": values["extension"]

                    };
                    removeExistedLoanWithExtensionInfo.push(withExtensionNpvMul1);
                    withExtensionMultipleNPV = removeExistedLoanWithExtensionInfo;
                }
                else if (npvLoans.ArrangementId !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanExtensionInfoSecond = withExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withExtensionNpvMul2 = {
                        "scenario": "extension",
                        "npv": loanExtension.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "withExtension": values["extension"]
                    };
                    removeExistedLoanExtensionInfoSecond.push(withExtensionNpvMul2);
                    withExtensionMultipleNPV = removeExistedLoanExtensionInfoSecond;
                }
            });
        }

        setExtensionAmortization(loanExtension.scheduledPayments);
        setNpvExtension(loanExtension.NPV);

        setYearlyScheduledPaymentExtension(loanExtension.yearlyScheduledPaymentExtension);
        setYearlyInterestSummationExtension(loanExtension.yearlyInterestSummationExtension);
        setYearlyPrincipalSummationExtension(loanExtension.yearlyPrincipalSummationExtension);

        const withExtension = { "type": "Extension", "result": loanExtension.NPV }
        graphNPVS.push(withExtension)
        localStorage.setItem("npvs", JSON.stringify(withExtension))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
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
                "scenario": "principalwaiver&interestwaiver",
                "npv": loanInterestAndPrincipalWaiver.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": values["original-loan"],
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "interestAndPrincipalWaiver": interestAndPrincipalWaiver["principalwaiversecond"],
                "interestAndPrincipalWaiver": interestAndPrincipalWaiver["interestwaiversecond"],
            };
            withInterestAndPrincipalWaiverMultipleNPV.push(withInterestAndPrincipalNpvMul);
        }
        else if (withInterestAndPrincipalWaiverMultipleNPV.length > 0) {
            withInterestAndPrincipalWaiverMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.ArrangementId === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanInterestAndPrincipalWaiver information that is already exists
                    * Then splice that array and assign the newly requested loanInterestAndPrincipalWaiver information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithInterestAndPrincipalInfo = withInterestAndPrincipalWaiverMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withInterestAndPrincipalNpvMul1 = {
                        "scenario": "principalwaiver&interestwaiver",
                        "npv": loanInterestAndPrincipalWaiver.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "interestAndPrincipalWaiver": interestAndPrincipalWaiver["principalwaiversecond"],
                        "interestAndPrincipalWaiver": interestAndPrincipalWaiver["interestwaiversecond"],
                    };
                    removeExistedLoanWithInterestAndPrincipalInfo.push(withInterestAndPrincipalNpvMul1);
                    withInterestAndPrincipalWaiverMultipleNPV = removeExistedLoanWithInterestAndPrincipalInfo;
                }
                else if (npvLoans.ArrangementId !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanWithInterestAndPrincipalInfoSecond = withInterestAndPrincipalWaiverMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.ArrangementId);
                    const withInterestAndPrincipalNpvMul2 = {
                        "scenario": "principalwaiver&interestwaiver",
                        "npv": loanInterestAndPrincipalWaiver.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "interestAndPrincipalWaiver": interestAndPrincipalWaiver["principalwaiversecond"],
                        "interestAndPrincipalWaiver": interestAndPrincipalWaiver["interestwaiversecond"],
                    };
                    removeExistedLoanWithInterestAndPrincipalInfoSecond.push(withInterestAndPrincipalNpvMul2);
                    withInterestAndPrincipalWaiverMultipleNPV = removeExistedLoanWithInterestAndPrincipalInfoSecond;
                }
            });
        }
        setInterestAndPrincipalAmortization(loanInterestAndPrincipalWaiver.scheduledPayments);
        setNpvPrincipalAndInterestWaiver(loanInterestAndPrincipalWaiver.NPV);

        setYearlyScheduledPaymentWithInterestAndPrincipalWaiver(loanInterestAndPrincipalWaiver.yearlyScheduledPayment);
        setYearlyInterestSummationWithInterestAndPrincipalWaiver(loanInterestAndPrincipalWaiver.yearlyInterestSummation);
        setYearlyPrincipalSummationWithInterestAndPrincipalWaiver(loanInterestAndPrincipalWaiver.yearlyPrincipalSummation);

        const interestAndPrincipalData = { "type": "Principal and Interest Waiver", "result": loanInterestAndPrincipalWaiver.NPV }
        graphNPVS.push(interestAndPrincipalData)
        localStorage.setItem("npvs", JSON.stringify(interestAndPrincipalData))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
    };

    const calculateNPVWithPrincipalWaiverPlusExtension = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,
        principalwaivedNumberOfPayment,
        interestwaivedNumberOfPayment,
    ) => {
        const loanPrincipalWaiverPlusExtention = NPVPrincipalWaiverPlusExtension(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            principalwaivedNumberOfPayment,
            interestwaivedNumberOfPayment,
        );

        if (withPrincipalWaiverAndExtensionMultipleNPV.length === 0) {
            const withPwAndEMulNPV = {
                "scenario": "principalwaiver&extension",
                "npv": loanPrincipalWaiverPlusExtention.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": values["original-loan"],
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "principalwaiverthird": values["principalwaiverthird"],
                "extensionsecond": values["extensionsecond"]
            };
            withPrincipalWaiverAndExtensionMultipleNPV.push(withPwAndEMulNPV);
        }
        else if (withPrincipalWaiverAndExtensionMultipleNPV.length > 0) {
            withPrincipalWaiverAndExtensionMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanExtension information that is already exists
                    * Then splice that array and assign the newly requested loanExtension information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithPrincipalWaiverAndExtensionInfo = withPrincipalWaiverAndExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withExtensionNpvMul1 = {
                        "scenario": "principalwaiver&extension",
                        "npv": loanPrincipalWaiverPlusExtention.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "principalwaiverthird": values["principalwaiverthird"],
                        "extensionsecond": values["extensionsecond"]
                    };
                    removeExistedLoanWithPrincipalWaiverAndExtensionInfo.push(withExtensionNpvMul1);
                    withPrincipalWaiverAndExtensionMultipleNPV = removeExistedLoanWithPrincipalWaiverAndExtensionInfo;
                }
                else if (npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanExtensionInfoSecond = withPrincipalWaiverAndExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withExtensionNpvMul2 = {
                        "scenario": "principalwaiver&extension",
                        "npv": loanPrincipalWaiverPlusExtention.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "principalwaiverthird": values["principalwaiverthird"],
                        "extensionsecond": values["extensionsecond"]
                    };
                    removeExistedLoanExtensionInfoSecond.push(withExtensionNpvMul2);
                    withPrincipalWaiverAndExtensionMultipleNPV = removeExistedLoanExtensionInfoSecond;
                }
            });
        }
        setPrincipalWaiverPlusExtensionAmortization(loanPrincipalWaiverPlusExtention.scheduledPayments);
        setNpvPrincipalWaiverPlusExtension(loanPrincipalWaiverPlusExtention.NPV);

        const withPrincipalWaiverPlusExtensionInGraph = { "type": "Principal Waiver Plus Extension", "result": loanPrincipalWaiverPlusExtention.NPV }
        graphNPVS.push(withPrincipalWaiverPlusExtensionInGraph)
        localStorage.setItem("npvs", JSON.stringify(withPrincipalWaiverPlusExtensionInGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        setYearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion(loanPrincipalWaiverPlusExtention.yearlyScheduledPayment);
        setYearlyInterestSummationWithWaiverPlusExtnesion(loanPrincipalWaiverPlusExtention.yearlyInterestSummation);
        setYearlyPrincipalSummationWithWaiverPlusExtnesion(loanPrincipalWaiverPlusExtention.yearlyPrincipalSummation);
    };

    const calculateNPVWithInterestWaiverPlusExtension = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,                                                                         //will come to here
        interestwaivedNumberOfPayment,
        extension,
    ) => {
        const loanInterestWaiverPlusExtention = NPVInterestWaiverPlusExtension(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            interestwaivedNumberOfPayment,
            extension,
        );

        if (withInterestWaiverAndExtensionMultipleNPV.length === 0) {
            const withIwAndEMulNPV = {
                "scenario": "interestwaiver&extension",
                "npv": loanInterestWaiverPlusExtention.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": values["original-loan"],
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "interest_waiver_extension": values["interest_waiver_extension"],
                "extension_interest_waiver": values["extension_interest_waiver"]
            };
            withInterestWaiverAndExtensionMultipleNPV.push(withIwAndEMulNPV);
        }
        else if (withInterestWaiverAndExtensionMultipleNPV.length > 0) {
            withInterestWaiverAndExtensionMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanExtension information that is already exists
                    * Then splice that array and assign the newly requested loanExtension information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithInterestWaiverAndExtensionInfo = withInterestWaiverAndExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withExtensionNpvMul1 = {
                        "scenario": "interestwaiver&extension",
                        "npv": loanInterestWaiverPlusExtention.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "interest_waiver_extension": values["interest_waiver_extension"],
                        "extension_interest_waiver": values["extension_interest_waiver"]
                    };
                    removeExistedLoanWithInterestWaiverAndExtensionInfo.push(withExtensionNpvMul1);
                    withInterestWaiverAndExtensionMultipleNPV = removeExistedLoanWithInterestWaiverAndExtensionInfo;
                }
                else if (npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanInterestWaiverAndExtensionInfoSecond = withInterestWaiverAndExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withExtensionNpvMul2 = {
                        "scenario": "interestwaiver&extension",
                        "npv": loanInterestWaiverPlusExtention.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "interest_waiver_extension": values["interest_waiver_extension"],
                        "extension_interest_waiver": values["extension_interest_waiver"]
                    };
                    removeExistedLoanInterestWaiverAndExtensionInfoSecond.push(withExtensionNpvMul2);
                    withInterestWaiverAndExtensionMultipleNPV = removeExistedLoanInterestWaiverAndExtensionInfoSecond;
                }
            });
        }
        setInterestWaiverPlusExtensionAmortization(loanInterestWaiverPlusExtention.scheduledPayments);
        setNpvInterestWaiverExtension(loanInterestWaiverPlusExtention.NPV);

        const withInterestWaiverPlusExtensionInGraph = { "type": "Interest Waiver Plus Extension", "result": loanInterestWaiverPlusExtention.NPV }
        graphNPVS.push(withInterestWaiverPlusExtensionInGraph)
        localStorage.setItem("npvs", JSON.stringify(withInterestWaiverPlusExtensionInGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        setYearlyScheduledPaymentWithInterestWaiverPlusExtension(loanInterestWaiverPlusExtention.yearlyScheduledPayment);
        setYearlyInterestSummationWithInterestWaiverPlusExtension(loanInterestWaiverPlusExtention.yearlyInterestSummation);
        setYearlyPrincipalSummationWithInterestWaiverPlusExtension(loanInterestWaiverPlusExtention.yearlyPrincipalSummation);

    };

    const calculateNPVWithPrincipalAndInterestWaiverPlusExtension = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,                                                                         //will come to here
        principalInterestWaiverExtension,
        interestprincipalWaiverExtension,
        extensionInterestIrincipalWaiver,
    ) => {
        const loanPrincipalAndInterestWaiverPlusExtention = NPVPrincipalAndInterestWaiverPlusExtension(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            principalInterestWaiverExtension,
            interestprincipalWaiverExtension,
            extensionInterestIrincipalWaiver,
        );


        if (withPrincipalAndInterestWaiverAndExtensionMultipleNPV.length === 0) {
            const withIwAndEMulNPV = {
                "scenario": "principal&interestwaiver&extension",
                "npv": loanPrincipalAndInterestWaiverPlusExtention.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": values["original-loan"],
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm,
                "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "principal_interest_waiver_extension": values["principal_interest_waiver_extension"],
                "interest_principal_waiver_extension": values["interest_principal_waiver_extension"],
                "extension_interest_principal_waiver": values["extension_interest_principal_waiver"],
            };
            withPrincipalAndInterestWaiverAndExtensionMultipleNPV.push(withIwAndEMulNPV);
        }
        else if (withPrincipalAndInterestWaiverAndExtensionMultipleNPV.length > 0) {
            withPrincipalAndInterestWaiverAndExtensionMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanExtension information that is already exists
                    * Then splice that array and assign the newly requested loanExtension information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithInterestWaiverAndExtensionInfo = withPrincipalAndInterestWaiverAndExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withExtensionNpvMul1 = {
                        "scenario": "principal&interestwaiver&extension",
                        "npv": loanPrincipalAndInterestWaiverPlusExtention.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "principal_interest_waiver_extension": values["principal_interest_waiver_extension"],
                        "interest_principal_waiver_extension": values["interest_principal_waiver_extension"],
                        "extension_interest_principal_waiver": values["extension_interest_principal_waiver"],
                    };
                    removeExistedLoanWithInterestWaiverAndExtensionInfo.push(withExtensionNpvMul1);
                    withPrincipalAndInterestWaiverAndExtensionMultipleNPV = removeExistedLoanWithInterestWaiverAndExtensionInfo;
                }
                else if (npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanInterestWaiverAndExtensionInfoSecond = withPrincipalAndInterestWaiverAndExtensionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withExtensionNpvMul2 = {
                        "scenario": "principal&interestwaiver&extension",
                        "npv": loanPrincipalAndInterestWaiverPlusExtention.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm,
                        "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "principal_interest_waiver_extension": values["principal_interest_waiver_extension"],
                        "interest_principal_waiver_extension": values["interest_principal_waiver_extension"],
                        "extension_interest_principal_waiver": values["extension_interest_principal_waiver"],
                    };
                    removeExistedLoanInterestWaiverAndExtensionInfoSecond.push(withExtensionNpvMul2);
                    withPrincipalAndInterestWaiverAndExtensionMultipleNPV = removeExistedLoanInterestWaiverAndExtensionInfoSecond;
                }
            });
        }
        setPrincipalAndInterestWaiverPlusExtensionAmortization(loanPrincipalAndInterestWaiverPlusExtention.scheduledPayments);
        setNpvPrincipalAndInterestWaiverExtension(loanPrincipalAndInterestWaiverPlusExtention.NPV);

        const withPrincipalAndInterestWaiverPlusExtensionInGraph = { "type": "Principal & Interest Waiver Plus Extension", "result": loanPrincipalAndInterestWaiverPlusExtention.NPV }
        graphNPVS.push(withPrincipalAndInterestWaiverPlusExtensionInGraph)
        localStorage.setItem("npvs", JSON.stringify(withPrincipalAndInterestWaiverPlusExtensionInGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        setYearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension(loanPrincipalAndInterestWaiverPlusExtention.yearlyScheduledPayment);
        setYearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension(loanPrincipalAndInterestWaiverPlusExtention.yearlyInterestSummation);
        setYearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension(loanPrincipalAndInterestWaiverPlusExtention.yearlyPrincipalSummation);
    };
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
                "scenario": "injection",
                "npv": loanInjection.NPV,
                "selectedLoan": npvLoans.ArrangementId,
                "amount": values["original-loan"],
                "annualInterestRate": npvLoans.PrincipalRate,
                "loanPeriodsInYears": npvLoans.PaymentTerm, "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                "riskPremium": npvLoans.RiskPremium,
                "type": npvLoans.LoanType,
                "registeredDate": npvLoans.RegisterDate,
                "withExtension": values["injection"]
            };
            withInjectionMultipleNPV.push(withInjectionNpvMul);
        }
        else if (withInjectionMultipleNPV.length > 0) {
            withInjectionMultipleNPV.forEach((selectedLoanInfo) => {
                if (npvLoans.loan_id === selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * ==================================================================================================================
                    * Change the npv results because it is already exists
                    * First get the loanExtension information that is already exists
                    * Then splice that array and assign the newly requested loanExtension information to the array object
                    * ===================================================================================================================
                    */
                    const removeExistedLoanWithInjectionInfo = withInjectionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withExtensionNpvMul1 = {
                        "scenario": "injection",
                        "npv": loanInjection.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm, "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "withExtension": values["injection"]
                    };
                    removeExistedLoanWithInjectionInfo.push(withExtensionNpvMul1);
                    withInjectionMultipleNPV = removeExistedLoanWithInjectionInfo;
                }
                else if (npvLoans.loan_id !== selectedLoanInfo.selectedLoan &&
                    npvScenarios["npv-scenarios"].trim().toLowerCase() === selectedLoanInfo.scenario.trim().toLowerCase()) {
                    /**
                     * Loan id is not same as the previous but scienario is same
                     * Find the loan information in the existing array
                     * if exists, remove the old loan information
                     * else add to the array of objects 
                     */
                    const removeExistedLoanInjectionInfoSecond = withInjectionMultipleNPV.filter(oldLoan => oldLoan.selectedLoan !== npvLoans.loan_id);
                    const withInjectionNpvMul2 = {
                        "scenario": "injection",
                        "npv": loanInjection.NPV,
                        "selectedLoan": npvLoans.ArrangementId,
                        "amount": values["original-loan"],
                        "annualInterestRate": npvLoans.PrincipalRate,
                        "loanPeriodsInYears": npvLoans.PaymentTerm, "numberOfPayments": npvLoans.PaymentFrequency.substring(1, 2) == 1 ? "Annually" : npvLoans.PaymentFrequency.substring(5, 6) == 1 ? "Monthly" : npvLoans.PaymentFrequency.substring(5, 6) == 3 ? "Quarterly" : npvLoans.PaymentFrequency.substring(5, 6) == 6 ? "Semi-annual" : "",
                        "riskPremium": npvLoans.RiskPremium,
                        "type": npvLoans.LoanType,
                        "registeredDate": npvLoans.RegisterDate,
                        "withExtension": values["injection"]
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
        setYearlyPrincipalSummationInjection(loanInjection.yearlyPrincipalSummation);

    }
    const showCollateral = () => {
        setCollateralLoading(true);
        CustomerService.getCollateralParamsFromTemenos(temenosCustomer).then((response) => {
            if (response.data.Body.CollateralDetailInformationResponse.Status.messages) {
                setCollateralLoading(false);
                setCollateralNotFound("Not found");
            }
            else if (response.data.Body.CollateralDetailInformationResponse.CBECOLLATERALDETAILNOFILEType.gCBECOLLATERALDETAILNOFILEDetailType.mCBECOLLATERALDETAILNOFILEDetailType === undefined) {
                debugger
                setCollateralLoading(false);
                setCollateralNotFound("Not found");
                setOneCollateralChecker(true);
                setSuccessCollateralLoading(true);
                setTemenosCollateralParams(response.data.Body.CollateralDetailInformationResponse.CBECOLLATERALDETAILNOFILEType.gCBECOLLATERALDETAILNOFILEDetailType.mCBECOLLATERALDETAILNOFILEDetailType);
            }
            else if (response.data.Body.CollateralDetailInformationResponse.CBECOLLATERALDETAILNOFILEType.gCBECOLLATERALDETAILNOFILEDetailType.mCBECOLLATERALDETAILNOFILEDetailType.length >= 2) {
                setCollateralLoading(false);
                setCollateralNotFound("Not found");
                setOneCollateralChecker(false)
                setSuccessCollateralLoading(true);
                setTemenosCollateralParams(response.data.Body.CollateralDetailInformationResponse.CBECOLLATERALDETAILNOFILEType.gCBECOLLATERALDETAILNOFILEDetailType.mCBECOLLATERALDETAILNOFILEDetailType);
            }
            else {
                setTemenosSingleCollateralParam(response.data.Body.CollateralDetailInformationResponse.CBECOLLATERALDETAILNOFILEType.gCBECOLLATERALDETAILNOFILEDetailType.mCBECOLLATERALDETAILNOFILEDetailType);
                setCollateralLoading(false);
                setCollateralLoading(false);
                setOneCollateralChecker(true);
                setSuccessCollateralLoading(true);
               
            }
        })
    }
    const handleClick = () => {
        alert("IconButton clicked!");
    };
    /**
   * toast message for populating values
   */
    const populateMessage = () => {
        toast.success('Populated Successfully', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 'populate',
        });
    }

    const computeNPVMessage = () => {
        toast.success('NPV is Computing', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 'compute',
        });
    }
    const computeForeclosureNPVMessage = () => {
        toast.success('Foreclosure NPV is Computing', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 'computeForeclosure',
        });
    }

    return (
        <div>
            <div className='shadow-md'>
                <form >
                    <TextField
                        variant="outlined"
                        color='secondary'
                        placeholder='Customer Number e.g 1000368066'
                        size='small'
                        required
                        value={temenosCustomer}
                        onChange={handleTemenosCustomerInputChange}
                        name="customerIdTemenos"
                        className="w-full max-w-full"
                        sx={{ width: "45ch" }}
                        InputProps={{
                            endAdornment: (
                                <div>
                                    <IconButton data-toggle="tooltip" title="Click it to search customers" >
                                        {
                                            searchLoading && <span class="spinner-border spinner-border-sm" style={{ color: 'purple', width: '12px', height: '12px' }} />
                                        }
                                        <span>
                                            <SearchIcon onClick={getCustomers} fontSize="medium" variant="outlined" color='secondary' titleAccess='Click it to search ' />
                                        </span>
                                    </IconButton>
                                </div>
                            ),
                        }}
                    />
                </form>
            </div>
            <div>
                <p>
                    {
                        notFound && <strong> {notFound} </strong>
                    }
                    {
                        (oneLoanChecker && temenosCustomerParams) &&
                        <table className="table table-bordered table-striped table-hover mt-3">
                            <thead>
                                <th> Customer Id </th>
                                <th> Customer Name </th>
                                <th> Loan Type  </th>
                                <th> Loan Amount  </th>
                                <th> Register Date  </th>
                                <th> Risk Premium </th>
                                <th> Noo f Payments </th>
                                <th> Payment Term </th>
                                <th> Action </th>
                            </thead>
                            <tbody>
                                <tr key={temenosCustomerParams.CustomerID}>
                                    <td> {temenosCustomerParams.CustomerID} </td>
                                    <td> {temenosCustomerParams.CustomerName} </td>
                                    <td> {temenosCustomerParams.LoanType} </td>
                                    <td> {temenosCustomerParams.LoanAmount} </td>
                                    <td> {temenosCustomerParams.RegisterDate} </td>
                                    <td> {temenosCustomerParams.RiskPremium} </td>
                                    <td> {temenosCustomerParams.NoofPayments} </td>
                                    <td> {temenosCustomerParams.PaymentTerm} </td>
                                    <td>
                                        <button className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} onClick={(e) => { populateLoan(); populateMessage(); }}>
                                            <span data-toggle="tooltip" title="Click it to copy the data to the calculator">
                                                <ContentCopyIcon fontSize='small' />Populate
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

                                        <button className="btn btn-outline-success btn-sm"
                                            style={{ margin: "1px" }} data-toggle="tooltip"
                                            title="Click it for more information about the loan"
                                            onClick={handleCustomerModal}
                                        >
                                            <InfoOutlinedIcon fontSize="small" /> More
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </p>
                {
                    (!oneLoanChecker && temenosCustomerParams) &&
                        temenosCustomerParams ?
                        <>
                            {
                                successLoanLoading ?
                                    <div>
                                        <h5 className='d-flex shadow-sm'>
                                            <strong className='mr-auto'>
                                                List of loans
                                            </strong>
                                            <p>
                                                <strong>With Customer Id</strong> <span className='underline text-fuchsia-600'> {temenosCustomerParams.map(cust => cust.CustomerID).at(0)} </span>
                                            </p>
                                        </h5>
                                        <table className="table table-bordered table-striped table-hover mt-3">
                                            <thead>
                                                <th> Customer Name </th>
                                                <th> Loan Type  </th>
                                                <th> Loan Amount  </th>
                                                <th> Register Date  </th>
                                                <th> Risk Premium </th>
                                                <th> Principal Rate </th>
                                                <th> Payment Term </th>
                                                <th> Action </th>
                                            </thead>
                                            <tbody>
                                                {
                                                    temenosCustomerParams.map((customer, index) => (
                                                        <>
                                                            {customer.LoanAmount !== "0.00" ?
                                                                <tr key={customer.CustomerID}>
                                                                    <td> {customer.CustomerName.length <= 13 ? customer.CustomerName : customer.CustomerName.substring(0, 13) + '...'} </td>
                                                                    <td> {customer.LoanType} </td>
                                                                    <td> {customer.LoanAmount} </td>
                                                                    <td> {customer.RegisterDate} </td>
                                                                    <td> {customer.RiskPremium} </td>
                                                                    <td> {customer.PrincipalRate} </td>
                                                                    <td> {customer.PaymentTerm} </td>
                                                                    <td >
                                                                        <button className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} onClick={(e) => { populateLoan(e, index, customer); populateMessage() }}>
                                                                            <span data-toggle="tooltip" title="Click it to copy the data to the calculator">
                                                                                <ContentCopyIcon fontSize='small' />Populate
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
                                                                        {
                                                                            runOnce && <button className="btn btn-outline-success btn-sm"
                                                                                style={{ margin: "1px" }} data-toggle="tooltip"
                                                                                title="Click it for more information about the loan"
                                                                                onClick={handleCustomerModal}
                                                                            >
                                                                                <span data-toggle="tooltip" title="Click it to copy the data to the calculator">
                                                                                    <InfoOutlinedIcon fontSize="small" /> More
                                                                                </span>
                                                                            </button>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                : ""
                                                            }
                                                        </>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    : ""}
                        </>
                        : ""
                }
                <NPVModal
                    isOpen={isCustomerModalOpen}
                    onClose={handleCustomerCloseModal}
                    title="Customer information"
                >
                    <div className="grid grid-cols-1">
                        <div className="submit-form ">
                            <>
                                {
                                    (!oneLoanChecker && temenosCustomerParams) &&
                                        temenosCustomerParams ?
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
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                        : ""
                                }
                                {
                                    (oneLoanChecker && temenosCustomerParams) &&
                                    <table className="table table-bordered table-striped mt-3">
                                        <thead>
                                            <th> Customer Id </th>
                                            <th> Customer Name </th>
                                            <th> Loan Type  </th>
                                            <th> Loan Amount  </th>
                                            <th> Register Date  </th>
                                            <th> Risk Premium </th>
                                            <th> Noo f Payments </th>
                                            <th> Payment Term </th>
                                        </thead>
                                        <tbody>
                                            <tr key={temenosCustomerParams.CustomerID}>
                                                <td> {temenosCustomerParams.CustomerID} </td>
                                                <td> {temenosCustomerParams.CustomerName} </td>
                                                <td> {temenosCustomerParams.LoanType} </td>
                                                <td> {temenosCustomerParams.LoanAmount} </td>
                                                <td> {temenosCustomerParams.RegisterDate} </td>
                                                <td> {temenosCustomerParams.RiskPremium} </td>
                                                <td> {temenosCustomerParams.NoofPayments} </td>
                                                <td> {temenosCustomerParams.PaymentTerm} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                            </>
                        </div>
                    </div>
                </NPVModal>
            </div>
            {/* Loan lists end  */}

            {/* Loan form start  */}
            {/* collateral start  */}

            <Button
                type="submit"
                variant="outlined"
                color='secondary'
                size="medium"
                id="btnFetchCollateral"
                data-toggle="tooltip"
                data-placement="top"
                title="Click it to fetch collateral"
                data-original-title="Tooltip on bottom"
                style={{ marginTop: "5px", marginBottom: "15px" }}
                className="red-tooltip"
                onClick={() => { viewCollateralMessage(); showCollateral() }}
            >
                {collateralLoading && <span class="spinner-border spinner-border-sm"></span>}
                <span> Fetch Collateral </span>
            </Button>
            
            {
                successCollateralLoading && oneCollateralChecker &&
                <div>
                        <strong className='mr-auto'>
                            Collaterals
                        </strong>
                        <table className="table table-bordered table-striped" border="1">
                            <thead>
                                <th> Execution Value </th>
                                <th> Execution Date </th>
                                <th> Revalued Date </th>
                                <th> Revalued Amount </th>
                                <th> Collateral Code </th>
                                <th> Principal Rate </th>
                                <th> Risk Premium </th>
                                <th> Revalued Amount </th>
                                <th> Collateral Desc... </th>
                            </thead>
                            <tbody>
                                <tr key={temenosSingleCollateralParam.LoanID}>
                                    <td> ETB {temenosSingleCollateralParam.ExecutionValue} </td>
                                    <td> {temenosSingleCollateralParam.ExecutionDate} </td>
                                    <td> {temenosSingleCollateralParam.RevaluedDate} </td>
                                    <td> {temenosSingleCollateralParam.RevaluedAmount} </td>
                                    <td> {temenosSingleCollateralParam.CollateralCode} </td>
                                    <td> {temenosSingleCollateralParam.PrincipalRate} </td>
                                    <td> {temenosSingleCollateralParam.RiskPremium}% </td>
                                    <td> ETB {temenosSingleCollateralParam.RevaluedAmount} </td>
                                    <td> {temenosSingleCollateralParam.CollateralDescription} </td>
                                </tr>
                            </tbody>
                        </table>

                        <Button
                            type="submit"
                            variant="outlined"
                            color='secondary'
                            size="medium"
                            id="btnComputeForeclosureNPV"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Click it to compute NPV"
                            data-original-title="Tooltip on bottom"
                            style={{ marginBottom: "10px" }}
                            className="red-tooltip"
                            onClick={(e) => { computeCollateralNPV(e); computeForeclosureNPVMessage() }}
                        >
                            {loadingForeclosureNPV && successCollateralLoading && <span class="spinner-border spinner-border-sm"></span>}
                            <span> <CalculateTwoToneIcon fontSize="small" data-toggle="tooltip" title="Click it to copy the data to the calculator" /> Compute Foreclosure NPV</span>
                        </Button>
                </div>
            }

            {
                !oneCollateralChecker &&
                successCollateralLoading ?
                    <div>
                        <h5 className='d-flex shadow-sm'>
                            <strong className='mr-auto'>
                                Collaterals
                            </strong>
                            <Button
                                type="submit"
                                variant="outlined"
                                color='secondary'
                                size="small"
                                id="btnVisibleCollateral"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Click it to show collaterals"
                                data-original-title="Tooltip on bottom"
                                className="red-tooltip p-2"
                                onClick={(e) => { handleCollateralVisible(e) }}
                            >
                                {
                                    collateralVisibility ?
                                        <span>
                                            <VisibilityIcon fontSize="small" data-toggle="tooltip" title="Click it to copy the data to the calculator" /> Hide
                                        </span> :
                                        <span>
                                            <VisibilityOffIcon fontSize="small" data-toggle="tooltip" title="Click it to copy the data to the calculator" /> Show
                                        </span>
                                }
                            </Button>
                        </h5>
                        {
                            collateralVisibility &&
                            <table className="table table-bordered table-striped" border="1">
                                <thead>
                                    <th> Number </th>
                                    <th> Execution Value </th>
                                    <th> Execution Date </th>
                                    <th> Revalued Date </th>
                                    <th> Revalued Amount </th>
                                    <th> Collateral Code </th>
                                    <th> Principal Rate </th>
                                    <th> Risk Premium </th>
                                    <th> Revalued Amount </th>
                                    <th> Collateral Desc... </th>
                                </thead>
                                <tbody>
                                    {
                                        temenosCollateralParams.map((collateral, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td> ETB {collateral.ExecutionValue} </td>
                                                <td> {collateral.ExecutionDate} </td>
                                                <td> {collateral.RevaluedDate} </td>
                                                <td> {collateral.RevaluedAmount} </td>
                                                <td> {collateral.CollateralCode} </td>
                                                <td> {collateral.PrincipalRate} </td>
                                                <td> {collateral.RiskPremium}% </td>
                                                <td> ETB {collateral.RevaluedAmount} </td>
                                                <td> {collateral.CollateralDescription} </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                        <Button
                            type="submit"
                            variant="outlined"
                            color='secondary'
                            size="medium"
                            id="btnComputeForeclosureNPV"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Click it to compute NPV"
                            data-original-title="Tooltip on bottom"
                            style={{ marginBottom: "10px" }}
                            className="red-tooltip"
                            onClick={(e) => { computeCollateralNPV(e); computeForeclosureNPVMessage() }}
                        >
                            {loadingForeclosureNPV && successCollateralLoading && <span class="spinner-border spinner-border-sm"></span>}
                            <span> <CalculateTwoToneIcon fontSize="small" data-toggle="tooltip" title="Click it to copy the data to the calculator" /> Compute Foreclosure NPV</span>
                        </Button>

                    </div>
                    : collateralNotFound && <div className='shadow-sm p-3'>
                        <p className='text-danger'>
                            {collateralNotFound}
                        </p>
                        <hr />
                    </div>
            }
            {
                populatedLoan &&
                <p> You are calculating NPV for
                    <strong style={{ color: "purple" }}> {npvLoans.LoanType.charAt(0).toUpperCase() + npvLoans.LoanType.slice(1)}
                    </strong> type with <strong>ETB</strong> <strong style={{ color: "purple" }}> {populatedLoan.LoanAmount} </strong> Amount
                </p>
            }
            {
                npvForm &&
                <form onSubmit={handleNPVComputation} id="npvCalculator">
                    <div className="flex-container">
                        <Grid container spacing={2}>
                            <div className="flex-item-left">
                                <Stack spacing={2}>
                                    <Stack spacing={1} direction='row'>
                                        <FormControl variant="filled" sx={{ m: 1, minWidth: 350 }}>
                                            <InputLabel id="demo-simple-select-filled-label" color="secondary">Scenarios</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="npv-scenarios"
                                                name="npv-scenarios"
                                                value={npvScenarios["npv-scenarios"]}
                                                onChange={handleNpvScenariosChange}
                                                color='secondary'
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <hr style={{ color: 'purple' }} />
                                                <MenuItem value="normal">Normal</MenuItem>
                                                <MenuItem value="principalwaiver">Principal Waiver</MenuItem>
                                                <MenuItem value="interestwaiver">Interest Waiver</MenuItem>
                                                <MenuItem value="extension">Extension</MenuItem>
                                                <hr style={{ color: 'purple' }} />
                                                <MenuItem value="principalwaiver&interestwaiver">Interest & Principal Waiver</MenuItem>
                                                <MenuItem value="principalwaiver&extension">Principal Waiver & Extension</MenuItem>
                                                <MenuItem value="interestwaiver&extension">Interest Waiver & Extension</MenuItem>
                                                <hr style={{ color: 'purple' }} />
                                                <MenuItem value="principal&interestwaiver&extension">Principal & Interest Waiver & Extension</MenuItem>
                                                <MenuItem value="injection">Injection</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1} direction='row'>
                                    <TextField label='Loan Amount' color="secondary" size="small"
                                        placeholder="Enter Loan Amount" variant="filled"
                                        name="original-loan"
                                        value={values["original-loan"]}
                                        onChange={handleInputChange}
                                    />

                                    <TextField label='Annual Interest Rate in %' color="secondary" size="small"
                                        placeholder="Enter Annual Interest Rate in %" variant="filled"
                                        name="annaul-interest-rate"
                                        value={values["annaul-interest-rate"]}
                                        onChange={handleInputChange}
                                    />
                                </Stack>
                                <br />
                                <Stack spacing={1} direction='row'>
                                    <FormControl>
                                        <InputLabel
                                            id="demo-simple-select-helper-label"
                                            color="secondary" size="small">Number of Payment</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="number-of-payments-per-year"
                                            name="number-of-payments-per-year"
                                            label="Number of Payments"
                                            variant='filled'
                                            color="secondary"
                                            size='small'
                                            value={values["number-of-payments-per-year"]}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value='1'>Annually</MenuItem>
                                            <MenuItem value='2'>Semi-Annually</MenuItem>
                                            <MenuItem value='4'>Quarterly</MenuItem>
                                            <MenuItem value='12'>Monthly</MenuItem>
                                        </Select>
                                        <FormHelperText> Select again for loan period in month </FormHelperText>
                                    </FormControl>
                                    {
                                        npvScenarios["npv-scenarios"] === "principalwaiver".trim() &&
                                        <TextField
                                            label='Principal Waiver'
                                            color="secondary"
                                            size="small"
                                            placeholder="Enter Principal Waiver"
                                            variant="filled"
                                            name="principal-waiver-number"
                                            id="principal-waiver-number"
                                            value={principalWaiverNumber["principal-waiver-number"]}
                                            onChange={handlePrincipalWaiver}
                                        />
                                    }
                                    {
                                        npvScenarios["npv-scenarios"] === "interestwaiver".trim() &&
                                        <TextField
                                            label='Interest Waiver'
                                            color="secondary"
                                            size="small"
                                            placeholder="Enter Interest Waiver"
                                            variant="filled"
                                            name="interest-waiver-number"
                                            value={values["interest-waiver-number"]}
                                            onChange={handleInterestWaiver}
                                        />
                                    }

                                    {
                                        npvScenarios["npv-scenarios"] === "extension".trim() &&
                                        <TextField
                                            label='Extension'
                                            color="secondary"
                                            size="small"
                                            placeholder="Enter Extension"
                                            variant="filled"
                                            name="extension"
                                            value={values["extension"]}
                                            onChange={handleExtension}
                                        />
                                    }
                                    {/* Two npv scenario starts */}
                                    {
                                        npvScenarios["npv-scenarios"] === "principalwaiver&interestwaiver".trim() &&
                                        <>
                                            <TextField
                                                label='Principal'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Principal Waiver"
                                                variant="filled"
                                                name="principalwaiversecond"
                                                value={values["principalwaiversecond"]}
                                                onChange={handleInterestAndPricipalWaiver}
                                            />

                                            <TextField
                                                label='Interest Waiver'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Interest Waiver"
                                                variant="filled"
                                                name="interestwaiversecond"
                                                value={values["interestwaiversecond"]}
                                                onChange={handleInterestAndPricipalWaiver}
                                            />
                                        </>
                                    }
                                    {
                                        npvScenarios["npv-scenarios"] === "principalwaiver&extension".trim() &&
                                        <>
                                            <TextField
                                                label='Principal'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Principal Waiver"
                                                variant="filled"
                                                name="principalwaiverthird"
                                                value={values["principalwaiverthird"]}
                                                onChange={handlePrincipalWaiverPlusExtension}
                                            />

                                            <TextField
                                                label='Extension'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Extension"
                                                variant="filled"
                                                name="extensionsecond"
                                                value={values["extensionsecond"]}
                                                onChange={handlePrincipalWaiverPlusExtension}
                                            />
                                        </>
                                    }

                                    {
                                        npvScenarios["npv-scenarios"] === "interestwaiver&extension".trim() &&
                                        <>
                                            <TextField
                                                label='Interest Waiver'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Interest Waiver"
                                                variant="filled"
                                                name="interest_waiver_extension"
                                                value={values["interest_waiver_extension"]}
                                                onChange={handleInterestWaiverPlusExtension}
                                            />

                                            <TextField
                                                label='Extension'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Extension"
                                                variant="filled"
                                                name="extension_interest_waiver"
                                                value={values["extension_interest_waiver"]}
                                                onChange={handleInterestWaiverPlusExtension}
                                            />
                                        </>
                                    }
                                    {/* Third start */}
                                    {
                                        npvScenarios["npv-scenarios"] === "principal&interestwaiver&extension".trim() &&
                                        <>
                                            <TextField
                                                label='Principal Waiver'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Principal Waiver"
                                                variant="filled"
                                                name="principal_interest_waiver_extension"
                                                value={values["principal_interest_waiver_extension"]}
                                                onChange={handlePrincipalAndInterestWaiverPlusExtension}
                                            />
                                            <TextField
                                                label='Interest Waiver'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Interest Waiver"
                                                variant="filled"
                                                name="interest_principal_waiver_extension"
                                                value={values["interest_principal_waiver_extension"]}
                                                onChange={handlePrincipalAndInterestWaiverPlusExtension}
                                            />
                                            <TextField
                                                label='Extension'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Extension"
                                                variant="filled"
                                                name="extension_interest_principal_waiver"
                                                value={values["extension_interest_principal_waiver"]}
                                                onChange={handlePrincipalAndInterestWaiverPlusExtension}
                                            />

                                        </>
                                    }
                                    {npvScenarios["npv-scenarios"] === "injection".trim() &&
                                        <TextField
                                            label="Injection"
                                            color="secondary"
                                            size="small"
                                            placeholder="Enter Injection"
                                            variant="filled"
                                            name="injection"
                                            value={values["injection"]}
                                            onChange={handleInjection}
                                        />
                                    }

                                </Stack>

                                <Stack spacing={1} direction='row'>
                                    <TextField label='Loan period in (Years)' color="secondary" size="small"
                                        placeholder="Enter Loan period in (Years)" variant="filled"
                                        name="loan-period-in-years"
                                        value={values["loan-period-in-years"]}
                                        onChange={handleInputChange}
                                    />
                                    {
                                        values["number-of-payments-per-year"] === '4' &&
                                        <FormControl>
                                            <InputLabel
                                                id="loan_period_in_months_quarterly_lbl"
                                                color="secondary" size="small">Loan period in months</InputLabel>
                                            <Select
                                                labelId="loan_period_in_months_quarterly_lbl"
                                                id="number-of-payments-per-month"
                                                name="number-of-payments-per-month"
                                                label="Number of Payments"
                                                variant='filled'
                                                color="secondary"
                                                size='small'
                                                value={values["number-of-payments-per-month"]}
                                                onChange={handleInputChange}
                                                onInput={handleInputChange}
                                            >
                                                <MenuItem value='3'>3</MenuItem>
                                                <MenuItem value='6'>6</MenuItem>
                                                <MenuItem value='9'>9</MenuItem>
                                            </Select>
                                            <FormHelperText>Loan period in months </FormHelperText>
                                        </FormControl>
                                    }
                                    {
                                        values["number-of-payments-per-year"] === '12' &&
                                        <FormControl>
                                            <InputLabel
                                                id="loan_period_in_months_quarterly_lbl"
                                                color="secondary" size="small">Loan period in months</InputLabel>
                                            <Select
                                                labelId="loan_period_in_months_quarterly_lbl"
                                                id="number-of-payments-per-month"
                                                name="number-of-payments-per-month"
                                                label="Number of Payments"
                                                variant='filled'
                                                color="secondary"
                                                size='small'
                                                value={values["number-of-payments-per-month"]}
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value='1'>1</MenuItem>
                                                <MenuItem value='2'>2</MenuItem>
                                                <MenuItem value='3'>3</MenuItem>
                                                <MenuItem value='4'>4</MenuItem>
                                                <MenuItem value='5'>5</MenuItem>
                                                <MenuItem value='6'>6</MenuItem>
                                                <MenuItem value='7'>7</MenuItem>
                                                <MenuItem value='8'>8</MenuItem>
                                                <MenuItem value='9'>9</MenuItem>
                                                <MenuItem value='10'>10</MenuItem>
                                                <MenuItem value='11'>11</MenuItem>
                                            </Select>
                                            <FormHelperText>Loan period in months </FormHelperText>
                                        </FormControl>
                                    }
                                    {
                                        values["number-of-payments-per-year"] === '2' &&
                                        <FormControl>
                                            <InputLabel
                                                id="loan_period_in_months_quarterly_lbl"
                                                color="secondary" size="small">Loan period in months</InputLabel>
                                            <Select
                                                labelId="loan_period_in_months_quarterly_lbl"
                                                id="number-of-payments-per-month"
                                                name="number-of-payments-per-month"
                                                label="Number of Payments"
                                                variant='filled'
                                                color="secondary"
                                                size='small'
                                                value={values["number-of-payments-per-month"]}
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value='6'>6</MenuItem>
                                            </Select>
                                            <FormHelperText>Loan period in months </FormHelperText>
                                        </FormControl>
                                    }
                                    <TextField label='Risk premium in %' color="secondary" size="small"
                                        placeholder="Enter Risk premium in %" variant="filled"
                                        name="risk-premium"
                                        value={values["risk-premium"]}
                                        onChange={handleInputChange}
                                    />
                                </Stack>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color='secondary'
                                    size="medium"
                                    id="btnCompute"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Click it to compute NPV"
                                    data-original-title="Tooltip on bottom"
                                    style={{ marginTop: "5px" }}
                                    className="red-tooltip"
                                    onClick={computeNPVMessage}
                                >
                                    {loading && <span class="spinner-border spinner-border-sm"></span>}
                                    <span> Compute NPV</span>
                                </Button>
                            </div>
                            {
                                Boolean(showNPVWithPrincipalWaiver ||
                                    showNoramlNpv ||
                                    showNPVWithInterestWaiver ||
                                    showNPVWithExtension ||
                                    showNPVWithPrincipalAndInterestWaiver ||
                                    showNPVWithPrincipalWaiverPlusExtension ||
                                    showNPVWithInterestWaiverPlusExtension ||
                                    showNPVWithPrincipalAndInterestWaiverPlusExtension ||
                                    showNPVWithInjection ||
                                    showNPVWithForeclosure) && (
                                    <div className="flex-item-right">
                                        {/* <Grid item xs={6}> */}
                                        <table className="table table-bordered" style={{ width: "100%" }}>
                                            <tbody>
                                                <tr>
                                                    <th
                                                        colSpan={2}
                                                        style={{
                                                            alignContent: "center",
                                                            alignItems: "center",
                                                            margin: "auto",
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        NPV
                                                    </th>
                                                    <th>NPV Loss</th>
                                                </tr>
                                                <tr>
                                                    <th width="70%">Normal</th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>NPV Details</h4>
                                                                {
                                                                    normalMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {normalMultipleNPV.map((normalNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(normalNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{normalNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {/* {numberWithCommas(roundAmount(normalNPV.amount))} ETB */}
                                                                                                                        ETB {normalNPV.amount}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {normalNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {normalNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {normalNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {normalNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {normalNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {normalNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {normalNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(normalNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {normalMultipleNPV.map(amort => sumUpNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                    </td>
                                                    <td> Baseline </td>
                                                </tr>
                                                <tr>
                                                    <th width="70%">With Principal Waiver</th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>Principal Waiver NPV Details</h4>
                                                                {
                                                                    withPrincipalWaiverMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withPrincipalWaiverMultipleNPV.map((principalWaiverNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(principalWaiverNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{principalWaiverNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {principalWaiverNPV.amount}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {principalWaiverNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {principalWaiverNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {principalWaiverNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {principalWaiverNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {principalWaiverNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {principalWaiverNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {principalWaiverNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(principalWaiverNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    principalWaiverNumber["principal-waiver-number"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Principal Waived
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                principalWaiverNPV.waivedPrincipal
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }

                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withPrincipalWaiverMultipleNPV.map(amort => sumUpPrincipalWaiverNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalPrincipalWaiverNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {numberWithCommas(roundAmount(npv - npvPrincipalWaiver))}
                                                        {/* {normalMultipleNPV.map(amort => sumUpNormalNPVLoss(amort.npv))}
                                                    {
                                                        (numberWithCommas(totalNormalNPVLoss - npvPrincipalWaiver)) + " ETB"
                                                    } */}
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <th width="70%">With Interest Waiver</th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>Interest Waiver NPV Details</h4>
                                                                {
                                                                    withInterestWaiverMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withInterestWaiverMultipleNPV.map((interestWaiverNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(interestWaiverNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{interestWaiverNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {interestWaiverNPV.amount}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestWaiverNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestWaiverNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestWaiverNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestWaiverNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestWaiverNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestWaiverNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestWaiverNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(interestWaiverNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    interestWaiverNumber["interest-waiver-number"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Interest Waived
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                interestWaiverNumber["interest-waiver-number"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }

                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withInterestWaiverMultipleNPV.map(amort => sumUpInterestWaiverNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalInterestWaiverNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                        {/* {numberWithCommas(roundAmount(npvInterestWaiver))} which is old   */}

                                                    </td>
                                                    <td>{numberWithCommas(roundAmount(npv - npvInterestWaiver))}</td>

                                                </tr>
                                                <tr>
                                                    <th width="70%">With Extension </th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>Extension NPV Details</h4>
                                                                {
                                                                    withExtensionMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withExtensionMultipleNPV.map((extensionNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>{numberWithCommas(roundAmount(extensionNPV.npv))} ETB</td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{extensionNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(roundAmount(extensionNPV.amount))}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {extensionNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {extensionNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {extensionNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {extensionNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {extensionNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {extensionNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {extensionNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(extensionNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    extension["extension"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Extended for
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                extension["extension"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }

                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withExtensionMultipleNPV.map(amort => sumUpExtensionNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalExtensionNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                    </td>
                                                    <td>{numberWithCommas(roundAmount(npv - npvExtension))}</td>

                                                </tr>
                                                <tr>
                                                    <th width="70%">With Principal and Interest Waiver </th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>Interest and Principal Waived NPV Details</h4>
                                                                {
                                                                    withInterestAndPrincipalWaiverMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withInterestAndPrincipalWaiverMultipleNPV.map((interestAndPrincipalWaivedNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(interestAndPrincipalWaivedNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{interestAndPrincipalWaivedNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(roundAmount(interestAndPrincipalWaivedNPV.amount))}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestAndPrincipalWaivedNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestAndPrincipalWaivedNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestAndPrincipalWaivedNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestAndPrincipalWaivedNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestAndPrincipalWaivedNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestAndPrincipalWaivedNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {interestAndPrincipalWaivedNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(interestAndPrincipalWaivedNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    interestAndPrincipalWaiver["principalwaiversecond"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Waived Principal
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                interestAndPrincipalWaiver["principalwaiversecond"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }
                                                                                                                {
                                                                                                                    interestAndPrincipalWaiver["interestwaiversecond"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Waived Interest
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                interestAndPrincipalWaiver["interestwaiversecond"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }

                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withInterestAndPrincipalWaiverMultipleNPV.map(amort => sumUpInterestAndPrincipalNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalInterestAndPrincipalNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                        {/* {numberWithCommas(roundAmount(npvPrincipalAndInterestWaiver))}  */}

                                                    </td>
                                                    <td>{numberWithCommas(roundAmount(npv - npvPrincipalAndInterestWaiver))}</td>

                                                </tr>

                                                {/* <tr>
                                                <th width="70%">With Principal Waiver plus Extention</th>
                                                <td name="principal-waiver-extension-npv"> {numberWithCommas(roundAmount(npvPrincipalWaiverPlusExtension))} </td>
                                                <td>{numberWithCommas(roundAmount(npv - npvPrincipalWaiverPlusExtension))}</td>
                                            </tr> */}
                                                <tr>
                                                    <th width="70%">With Principal Waiver plus Extention </th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>With Principal Waiver plus Extention NPV Details</h4>
                                                                {
                                                                    withPrincipalWaiverAndExtensionMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withPrincipalWaiverAndExtensionMultipleNPV.map((injectionNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(injectionNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{injectionNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(roundAmount(injectionNPV.amount))}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(injectionNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    extension["injection"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Injection ETB
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                extension["injection"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }

                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withPrincipalWaiverAndExtensionMultipleNPV.map(amort => sumUpPrincipalWaiverAndExtensionNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalPrincipalWaiverAndExtensionNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                    </td>
                                                    <td>ETB {numberWithCommas(roundAmount(npv - npvPrincipalWaiverPlusExtension))}</td>

                                                </tr>

                                                <tr>
                                                    <th width="70%">With Interest Waiver plus Extention </th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>With Interest Waiver plus Extention NPV Details</h4>
                                                                {
                                                                    withInterestWaiverAndExtensionMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withInterestWaiverAndExtensionMultipleNPV.map((injectionNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(injectionNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{injectionNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(roundAmount(injectionNPV.amount))}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(injectionNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    extension["injection"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Injection ETB
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                extension["injection"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }

                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withInterestWaiverAndExtensionMultipleNPV.map(amort => sumUpInterestWaiverAndExtensionNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalInterestWaiverAndExtensionNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                    </td>
                                                    <td>{numberWithCommas(roundAmount(npv - npvInterestWaiverExtension))}</td>
                                                </tr>
                                                <tr>
                                                    <th width="70%">With Principal & Interest Waiver plus Extention </th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>With Principal & Interest Waiver plus Extention NPV Details</h4>
                                                                {
                                                                    withPrincipalAndInterestWaiverAndExtensionMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withPrincipalAndInterestWaiverAndExtensionMultipleNPV.map((injectionNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(injectionNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{injectionNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(roundAmount(injectionNPV.amount))}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(injectionNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    extension["injection"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Injection ETB
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                extension["injection"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }

                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withPrincipalAndInterestWaiverAndExtensionMultipleNPV.map(amort => sumUpPrincipalAndInterestWaiverAndExtensionNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalPrincipalAndInterestWaiverAndExtensionNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                    </td>
                                                    <td>{numberWithCommas(roundAmount(npv - npvPrincipalAndInterestWaiverExtension))}</td>
                                                </tr>
                                                <tr>
                                                    <th width="70%">With Injection </th>
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    >
                                                        <div>
                                                            <CustomWidthTooltip title={<div>
                                                                <h4 style={{ align: "center" }}>Injection NPV Details</h4>
                                                                {
                                                                    withInjectionMultipleNPV.length != 0 &&
                                                                    /**
                                                                     * Show NPV Results and the parameters will display on the detail section.
                                                                     */
                                                                    <div>
                                                                        {/* table table-striped table-hover table-responsive */}
                                                                        <strong>Show all NPV results</strong>
                                                                        <table style={{ color: "white" }} className="table table-responsive">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>NPV</th>
                                                                                    <th>Result </th>
                                                                                    <th>More Info</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {withInjectionMultipleNPV.map((injectionNPV, index) => (
                                                                                    <tr style={{ color: "white" }} key={index}>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>ETB {numberWithCommas(roundAmount(injectionNPV.npv))} </td>
                                                                                        <td>
                                                                                            <Accordion>
                                                                                                <AccordionSummary
                                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                                    aria-controls="panel1a-content"
                                                                                                    id="panel1a-header"
                                                                                                >
                                                                                                    <Typography>{injectionNPV.type} Loan</Typography>
                                                                                                </AccordionSummary>
                                                                                                <AccordionDetails>
                                                                                                    <Typography>
                                                                                                        <table className='table table-bordered '>
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    <th>
                                                                                                                        Parameters
                                                                                                                    </th>
                                                                                                                    <th>
                                                                                                                        Values
                                                                                                                    </th>
                                                                                                                </tr>

                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Amount
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(roundAmount(injectionNPV.amount))}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Annual Interest Rate
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.annualInterestRate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Number of Payments
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.numberOfPayments}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Loan periods in Years
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.loanPeriodsInYears}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Risk Premium
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.riskPremium}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Scenario
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.scenario}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Type
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.type}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        Registered Date
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        {injectionNPV.registeredDate}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        NPV
                                                                                                                    </td>
                                                                                                                    <td>
                                                                                                                        ETB {numberWithCommas(injectionNPV.npv)}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {
                                                                                                                    extension["injection"] ? <tr>
                                                                                                                        <td>
                                                                                                                            Injection ETB
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            {
                                                                                                                                extension["injection"]
                                                                                                                            }
                                                                                                                        </td>
                                                                                                                    </tr> : ""
                                                                                                                }
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </Typography>
                                                                                                </AccordionDetails>
                                                                                            </Accordion>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                }
                                                            </div>
                                                            }>
                                                                <Button color='secondary'>
                                                                    {withInjectionMultipleNPV.map(amort => sumUpInjectionNPVs(amort.npv))}
                                                                    {
                                                                        "ETB " + numberWithCommas(totalInjectionNPV)
                                                                    }
                                                                </Button>
                                                            </CustomWidthTooltip>
                                                        </div>
                                                    </td>
                                                    <td>{numberWithCommas(roundAmount(npv - npvInjection))}</td>
                                                </tr>
                                                <tr>
                                                    <th>With foreclosure</th>
                                                    <td>
                                                        <strong>ETB {numberWithCommas(roundAmount(npvForClosure))} </strong>{" "}

                                                        <table className='table table-striped table-bordered '>
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Cashflow
                                                                    </th>
                                                                    <th>
                                                                        Selling Cost
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>ETB {numberWithCommas(roundAmount(cashFlow))}</td>
                                                                    <td>ETB {numberWithCommas(roundAmount(sellingCost))}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td>ETB {numberWithCommas(roundAmount(npv - npvForClosure))}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {
                                            showNPVComparision && (
                                                <div className="npv-comparision-all">
                                                    <p className='npv-comparision'> NPV, Comparision </p>
                                                    <table className="table table-bordered" style={{ width: "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <th>Large</th>
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                Scenario
                                                                            </th>
                                                                            <th>
                                                                                Value
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                {largestNPV.type}
                                                                            </td>
                                                                            <td>
                                                                                ETB {numberWithCommas(roundAmount(largestNPV.result))}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <hr />
                                                    <table className="table table-bordered" style={{ width: "100%" }}>
                                                        <tbody>
                                                            <tr>
                                                                <th name="normal-npv" className="cbe-text-color fontWeightBold">Small</th>
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                Scenario
                                                                            </th>
                                                                            <th>
                                                                                Value
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                {lowestNPV.type}
                                                                            </td>
                                                                            <td>
                                                                                ETB {numberWithCommas(roundAmount(lowestNPV.result))}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}
                                        <div className='buttons'>
                                            <Button
                                                type="submit"
                                                variant="outlined"
                                                color='secondary'
                                                size="medium"
                                                id="btnShowInGraph"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Click it to show in graph"
                                                data-original-title="Tooltip on bottom"
                                                style={{ marginTop: "5px" }}
                                                className="red-tooltip"
                                                onClick={e => showInGraph(e)}
                                            >
                                                Show In Graph
                                            </Button>

                                            <Button
                                                type="submit"
                                                variant="outlined"
                                                color='secondary'
                                                size="medium"
                                                id="btnShowInGraph"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Click it to Compare NPVs"
                                                data-original-title="Tooltip on bottom"
                                                style={{ marginTop: "5px" }}
                                                className="red-tooltip"
                                                onClick={e => compareNPV(e)}
                                            >
                                                Compare NPV
                                            </Button>
                                        </div>
                                        {/* </Grid> */}
                                    </div>
                                )
                            }
                        </Grid>
                    </div>
                </form>
            }
            {/* Loan form end  */}
            {Boolean(
                values["original-loan"] &&
                values["annaul-interest-rate"] &&
                values["loan-period-in-years"] &&
                values["number-of-payments-per-year"] &&
                values["risk-premium"] &&
                showNoramlNpv
            ) && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                Normal NPV Amortization Table
                            </h4>
                            <MaterailTableComponent data={amortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>

                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyInterestSummation.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummation.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPayment.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                )
            }
            {
                showNPVWithPrincipalWaiver && (
                    // Boolean(npvScenarios["npv-scenarios"] === "principalwaiver".trim() && showNPVWithPrincipalWaiver) &&(
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal Waiver Amortization Table
                            </h4>
                            <PrincipalWaiverComponent data={principalWaiverAmortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>

                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyInterestSummationPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummationPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPaymentPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showNPVWithInterestWaiver && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Interest Waiver Amortization Table
                            </h4>
                            <InterestWaiverComponent data={interestWaiverAmortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>

                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {yearlyInterestSummationInterestWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummationInterestWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPaymentInterestWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithExtension && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Extension Amortization Table
                            </h4>
                            <ExtensionComponent data={extensionAmortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>
                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {yearlyInterestSummationExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummationExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPaymentExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithPrincipalAndInterestWaiver && (
                    // Boolean(npvScenarios["npv-scenarios"] === "extension".trim() && showNPVWithExtension) && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal and Interest Waiver Amortization Table
                            </h4>
                            <PrincipalAndInterestWaiverComponent data={interestAndPrincipalAmortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>
                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {yearlyInterestSummationWithInterestAndPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummationWithInterestAndPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPaymentWithInterestAndPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithPrincipalWaiverPlusExtension && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal Waiver plus Extension Amortization Table
                            </h4>
                            <PrincipalWaiverAndExtensionComponent data={principalWaiverPlusExtensionAmortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>
                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {yearlyInterestSummationWithWaiverPlusExtnesion.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummationWithWaiverPlusExtnesion.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithInterestWaiverPlusExtension && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Interest Waiver plus Extension Amortization Table
                            </h4>
                            <InterestWaiverAndExtensionComponent data={interestWaiverPlusExtensionAmortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>
                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {yearlyInterestSummationWithInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummationWithInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPaymentWithInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithPrincipalAndInterestWaiverPlusExtension && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal & Interest Waiver plus Extension Amortization Table
                            </h4>
                            <PrincipalAndInterestWaiverAndExtensionComponent data={principalAndInterestWaiverPlusExtensionAmortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>
                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {yearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
            {showNPVWithInjection && (
                <div class="flex-container">
                    <div className="normal-npv-amortization">
                        <h4>NPV With Injection Amortization Table</h4>
                        <InjectionComponent data={injectionAmortization} />
                        <header>
                            <h4>Summary</h4>
                        </header>
                        <div className="normal-interest-summary">
                            <h4> Interest </h4>
                            <table
                                className="table table-striped table-hover table-responsive"
                                style={{ width: "100%" }}
                            >
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Interest </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {yearlyInterestSummationInjection.map((amort, index) => (
                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td>{roundAmount(amort)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="normal-principal-summary">
                            <h4> Principal </h4>
                            <table className="table table-striped table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Principal </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearlyPrincipalSummationInjection.map((amort, index) => (
                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td>{roundAmount(amort)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className=" normal-cash-flow-summary">
                            <h4> Cashflow </h4>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Cashflow </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearlyScheduledPaymentInjection.map((amort, index) => (
                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td>{roundAmount(amort)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {
                Boolean(showNoramlNpvInGraph || showNPVWithPrincipalWaiverInGraph || showNPVWithInterestWaiverInGraph || showNPVWithExtensionInGraph || showNPVWithPrincipalAndInterestWaiverInGraph || showNPVWithPrincipalWaiverPlusExtensionInGraph || showNPVWithInterestWaiverPlusExtensionInGraph || showNPVWithInjectionInGraph || showNPVWithForeclosureInGraph) && (
                    <div className='flex-container'>
                        <form className='normal-cash-flow-summary pt-4 px-4'>
                            <FormControl>
                                <InputLabel
                                    id="graph-type-label"
                                    color="secondary" size="small">--Graph Type--</InputLabel>
                                <Select
                                    labelId="graph-type-label"
                                    id="graph-type"
                                    name="graph-type"
                                    label="Graph Type"
                                    variant='filled'
                                    color="secondary"
                                    size='small'
                                    value={charType}
                                    onChange={handleGraphType}
                                >
                                    <MenuItem value=''>None</MenuItem>
                                    <MenuItem value='BarChart'>Bar Chart</MenuItem>
                                    <MenuItem value='PieChart'>Pie Chart</MenuItem>
                                    <MenuItem value='SimplePieChart'>Simple Pie Chart</MenuItem>
                                </Select>
                                <FormHelperText> Select graph type </FormHelperText>
                            </FormControl>
                        </form>
                        <div className='npv-graph'>
                            <h5>
                                NPV, Graphical Representation
                            </h5>
                            {
                                charType === "" &&
                                <div className='npv-graph px-5 text-danger m-4'> Selected None </div>
                            }
                            {
                                charType === "BarChart" &&
                                <div className='npv-graph px-5 text-danger m-4'><Chart data={visualizeDataInGrpah} /> </div>
                            }

                            {
                                charType === "PieChart" &&
                                (<div className='npv-graph px-5 text-danger m-4'><PieChartComponent data={visualizeDataInGrpah} /> </div>)
                            }
                            {
                                charType === "SimplePieChart" &&
                                (<div className='npv-graph px-5 text-danger m-4'><SimplePieChartComponent data={visualizeDataInGrpah} /> </div>)
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default NPV;