package com.cbe.credit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.IOException;
import java.security.cert.X509Certificate;

@SpringBootApplication
public class LoanApplication {
	public static void main(String[] args) throws IOException {
		SpringApplication.run(LoanApplication.class, args);
//		try {
//			// Create the SOAP request XML
//			String soapRequest = "<?xml version='1.0' encoding='UTF-8' ?>" +
//					"<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:cbec='http://temenos.com/CBECREDITS'>" +
//					"<soapenv:Header/>" +
//					"<soapenv:Body>" +
//					"<cbec:WSLOANINFO>" +
//					"<WebRequestCommon>" +
//					"<company/>" +
//					"<password>123456</password>" +
//					"<userName>ABIY.01</userName>" +
//					"</WebRequestCommon>" +
//					"<CBECREDITNPVNOFILEENQType>" +
//					"<enquiryInputCollection>" +
//					"<columnName>CUSTOMER.ID</columnName>" +
//					"<criteriaValue>1049735878</criteriaValue>" +
//					"<operand>EQ</operand>" +
//					"</enquiryInputCollection>" +
//					"</CBECREDITNPVNOFILEENQType>" +
//					"</cbec:WSLOANINFO>" +
//					"</soapenv:Body>" +
//					"</soapenv:Envelope>";
//			// Set the SOAP endpoint URL
//			URL url = new URL("https://www.cbetestws.com.et/CBECREDIT/services");
//
//			// Create a connection to the SOAP endpoint
//			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//			connection.setRequestMethod("POST");
//			connection.setRequestProperty("Content-Type", "text/xml;charset=UTF-8");
//			connection.setDoOutput(true);
//
//			// Send the SOAP request
//			OutputStream outputStream = connection.getOutputStream();
//			outputStream.write(soapRequest.getBytes("UTF-8"));
//			outputStream.flush();
//			outputStream.close();
//
//			// Read the SOAP response
//			BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
//			StringBuilder response = new StringBuilder();
//			String line;
//			while ((line = reader.readLine()) != null) {
//				response.append(line);
//			}
//			reader.close();
//			// Create XmlMapper
//			XmlMapper xmlMapper = new XmlMapper();
//			// Convert XML to JSON
//			ObjectMapper jsonMapper = new ObjectMapper();
//			jsonMapper.enable(SerializationFeature.INDENT_OUTPUT);
//			String jsonResponse = jsonMapper.writeValueAsString(xmlMapper.readValue(response.toString(), Object.class));
//
//			// Print the JSON response
//            System.out.println(jsonResponse);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
	}
	public static void disableCertificateValidation() {
		try {
			TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager() {
				public void checkClientTrusted(X509Certificate[] certs, String authType) {}
				public void checkServerTrusted(X509Certificate[] certs, String authType) {}
				public X509Certificate[] getAcceptedIssuers() { return null; }
			}};
			SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}