package com.cbe.credit.loan;

import com.cbe.credit.customer.Customer;
import com.cbe.credit.exception.ResourceNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static com.cbe.credit.LoanApplication.disableCertificateValidation;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/cbe/api/loan/loan")
@RestController
public class LoanController {
    @Autowired
    private LoanRepository loanRepository;
    @PostMapping("/{customerId}")
    public ResponseEntity<?> addLoans(@Valid @RequestBody Loan loan, @PathVariable("customerId") Customer customerId){
        String registered_date = new SimpleDateFormat("yyyy:MM:dd:HH:mm:ss").format(Calendar.getInstance().getTime());
        Loan _loan = new Loan();
        _loan.setLoan_id(loan.getLoan_id());
        _loan.setType(loan.getType());
        _loan.setAmount(loan.getAmount());
        _loan.setAnnualInterestRate(loan.getAnnualInterestRate());
        _loan.setLoanPeriodsInYears(loan.getLoanPeriodsInYears());
        _loan.setNumberOfPayments(loan.getNumberOfPayments());
        _loan.setCustomerLoan(customerId);
        _loan.setRegisteredDate(registered_date);
        loanRepository.save(_loan);
        return new ResponseEntity<>(_loan, HttpStatus.CREATED);
    }
    @GetMapping("/")
    public ResponseEntity<List<Loan>> getAllLoan() {
        List<Loan> loans = new ArrayList<>(loanRepository.findAll());
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLoanDetails(@PathVariable("id") Long id, @RequestBody Loan loan) {
        Loan _loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found coach with id = " + id));
        _loan.setType(loan.getType());
        loanRepository.save(_loan);
        return ResponseEntity.ok(_loan);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLoan(@PathVariable("id") Long id) {
        loanRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
    @GetMapping("/{customerId}")
    public ResponseEntity<?> getAllLoanOnCustomer(@PathVariable("customerId") Customer customerId) {
        return new ResponseEntity<>(loanRepository.findByCustomerLoan(customerId), HttpStatus.OK);
    }
    /**
     *
     * @param customerNumber
     * @return - parameters of loan such as accountNumber, amount, ....
     * @throws IOException
     * @throws InterruptedException 
     */
    @GetMapping("/integrate/{customerNumber}")
    public ResponseEntity<?> getLoanParameters(@PathVariable("customerNumber") String customerNumber) throws IOException, InterruptedException {
        String jsonArray = null;
//        String javaHome = System.getProperty("java.home");
//        String keytoolPath = javaHome + "/bin/keytool";
//        String truststorePath = "C:\\Program Files\\Java\\jdk-1.8\\jre\\lib\\security\\cacerts";
//        String truststorePassword = "changeit";
//        String certificatePath = "C:\\ssl\\www-cbetestws-com-et.pfx.cer";
//        String alias = "cbenpvtool";
//
//        // Create a temporary copy of the certificate file
//        Path tempCertificatePath = Files.createTempFile("cbenpvtoolcertificate", ".crt");
//        Files.copy(Paths.get(certificatePath), tempCertificatePath, StandardCopyOption.REPLACE_EXISTING);
//
//        // Build the keytool command
//        ProcessBuilder processBuilder = new ProcessBuilder(
//                keytoolPath,
//                "-import",
//                "-trustcacerts",
//                "-keystore",
//                truststorePath,
//                "-storepass",
//                truststorePassword,
//                "-alias",
//                alias,
//                "-file",
//                tempCertificatePath.toAbsolutePath().toString()
//        );
//
//        // Execute the keytool command
//        Process process = processBuilder.start();
//        int exitCode = process.waitFor();
//
//        // Clean up the temporary certificate file
//        Files.deleteIfExists(tempCertificatePath);
        disableCertificateValidation();
        // Construct the SOAP request
        String soapRequest = "<?xml version='1.0' encoding='UTF-8' ?>" +
                "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cbec='http://temenos.com/CBECREDITS'>" +
                "<soapenv:Header/>" +
                "<soapenv:Body>" +
                "<cbec:WSLOANINFO>" +
                "<WebRequestCommon>" +
                "<company/>" +
                "<password>123456</password>" +
                "<userName>ABIY.01</userName>" +
                "</WebRequestCommon>" +
                "<CBECREDITNPVNOFILEENQType>" +
                "<enquiryInputCollection>" +
                "<columnName>CUSTOMER.ID</columnName>" +
                "<criteriaValue>" + customerNumber + "</criteriaValue>" +
                "<operand>EQ</operand>" +
                "</enquiryInputCollection>" +
                "</CBECREDITNPVNOFILEENQType>" +
                "</cbec:WSLOANINFO>" +
                "</soapenv:Body>" +
                "</soapenv:Envelope>";

        // Set the SOAP endpoint URL
        URL url = new URL("https://www.cbetestws.com.et/CBECREDIT/services");

        // Create a connection to the SOAP endpoint
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "text/xml;charset=UTF-8");
        connection.setDoOutput(true);

        // Send the SOAP request
        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(soapRequest.getBytes("UTF-8"));
        outputStream.flush();
        outputStream.close();

        // Read the SOAP response
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();
        // Create XmlMapper
        XmlMapper xmlMapper = new XmlMapper();

        // Convert XML to JSON
        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.enable(SerializationFeature.INDENT_OUTPUT);
        jsonArray = jsonMapper.writeValueAsString(xmlMapper.readValue(response.toString(), Object.class));
        // Print the JSON response
        return new ResponseEntity<>(jsonArray, HttpStatus.OK);
    }

    @GetMapping("/collateral/{customerNumber}")
    public ResponseEntity<?> getCollateralParameters(@PathVariable("customerNumber") String customerNumber) throws IOException, InterruptedException {
        String jsonArray = null;
        disableCertificateValidation();
//        String javaHome = System.getProperty("java.home");
//        String keytoolPath = javaHome + "/bin/keytool";
//        String truststorePath = "C:\\Program Files\\Java\\jdk-1.8\\jre\\lib\\security\\cacerts";
//        String truststorePassword = "changeit";
//        String certificatePath = "C:\\ssl\\www-cbetestws-com-et.pfx.cer";
//        String alias = "cbenpvtool";
//
//        // Create a temporary copy of the certificate file
//        Path tempCertificatePath = Files.createTempFile("cbenpvtoolcertificate", ".crt");
//        Files.copy(Paths.get(certificatePath), tempCertificatePath, StandardCopyOption.REPLACE_EXISTING);
//
//        // Build the keytool command
//        ProcessBuilder processBuilder = new ProcessBuilder(
//                keytoolPath,
//                "-import",
//                "-trustcacerts",
//                "-keystore",
//                truststorePath,
//                "-storepass",
//                truststorePassword,
//                "-alias",
//                alias,
//                "-file",
//                tempCertificatePath.toAbsolutePath().toString()
//        );
//
//        // Execute the keytool command
//        Process process = processBuilder.start();
//        // Clean up the temporary certificate file
//        Files.deleteIfExists(tempCertificatePath);

        // Construct the SOAP request
//        String collateralSoapRequest = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:cbec=\"http://temenos.com/CBECREDITS\">\n" +
//                "   <soapenv:Header/>\n" +
//                "   <soapenv:Body>\n" +
//                "      <cbec:WSCOLLATERALINFO>\n" +
//                "         <WebRequestCommon>\n" +
//                "            <!--Optional:-->\n" +
//                "            <company/>\n" +
//                "            <password>123456</password>\n" +
//                "            <userName>ABIY.01</userName>\n" +
//                "         </WebRequestCommon>\n" +
//                "         <CBECOLLATERALDETAILENQType>\n" +
//                "            <!--Zero or more repetitions:-->\n" +
//                "            <enquiryInputCollection>\n" +
//                "               <!--Optional:-->\n" +
//                "               <columnName>@ID</columnName>\n" +
//                "               <!--Optional:-->\n" +
//                "               <criteriaValue>"+customerNumber+"</criteriaValue>\n" +
//                "               <!--Optional:-->\n" +
//                "               <operand>CT</operand>\n" +
//                "            </enquiryInputCollection>\n" +
//                "         </CBECOLLATERALDETAILENQType>\n" +
//                "      </cbec:WSCOLLATERALINFO>\n" +
//                "   </soapenv:Body>\n" +
//                "</soapenv:Envelope>";

        String collateralSoapRequest = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:cbec=\"http://temenos.com/CBECREDIT\">\n" +
                "   <soapenv:Header/>\n" +
                "   <soapenv:Body>\n" +
                "      <cbec:CollateralDetailInformation>\n" +
                "         <WebRequestCommon>\n" +
                "            <company/>\n" +
                "            <password>123456</password>\n" +
                "            <userName>ABIY.01</userName>\n" +
                "         </WebRequestCommon>\n" +
                "         <CBECOLLATERALDETAILNOFILEType>\n" +
                "            <enquiryInputCollection>\n" +
                "               <columnName>CUSTOMER.ID</columnName>\n" +
                "               <criteriaValue>"+customerNumber+"</criteriaValue>\n" +
                "               <operand>EQ</operand>\n" +
                "            </enquiryInputCollection>\n" +
                "         </CBECOLLATERALDETAILNOFILEType>\n" +
                "      </cbec:CollateralDetailInformation>\n" +
                "   </soapenv:Body>\n" +
                "</soapenv:Envelope>\n";

        // Set the SOAP endpoint URL
        URL url = new URL("https://www.cbetestws.com.et/CBECREDITNEW/services");

        // Create a connection to the SOAP endpoint
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "text/xml;charset=UTF-8");
        connection.setDoOutput(true);

        // Send the SOAP request
        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(collateralSoapRequest.getBytes(StandardCharsets.UTF_8));
        outputStream.flush();
        outputStream.close();

        // Read the SOAP response
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();
        // Create XmlMapper
        XmlMapper xmlMapper = new XmlMapper();

        // Convert XML to JSON
        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.enable(SerializationFeature.INDENT_OUTPUT);
        jsonArray = jsonMapper.writeValueAsString(xmlMapper.readValue(response.toString(), Object.class));
        // Print the JSON response
        return new ResponseEntity<>(jsonArray, HttpStatus.OK);
    }
}