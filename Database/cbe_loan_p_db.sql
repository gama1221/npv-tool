-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: cbe_loan_p_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cbe_loan_collateral`
--

DROP TABLE IF EXISTS `cbe_loan_collateral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cbe_loan_collateral` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `register_date` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `loan_collateral` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq6vwgemm5gl5dobwlfy5a228h` (`loan_collateral`),
  CONSTRAINT `FKq6vwgemm5gl5dobwlfy5a228h` FOREIGN KEY (`loan_collateral`) REFERENCES `cbe_loan_loan` (`loan_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cbe_loan_collateral`
--

LOCK TABLES `cbe_loan_collateral` WRITE;
/*!40000 ALTER TABLE `cbe_loan_collateral` DISABLE KEYS */;
INSERT INTO `cbe_loan_collateral` VALUES (1,'2023:04:12:09:24:20','building',310000,1),(2,'2023:04:12:09:24:40','motor',340000,1);
/*!40000 ALTER TABLE `cbe_loan_collateral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cbe_loan_loan`
--

DROP TABLE IF EXISTS `cbe_loan_loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cbe_loan_loan` (
  `loan_id` bigint NOT NULL AUTO_INCREMENT,
  `amount` varchar(255) DEFAULT NULL,
  `register_date` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `customer_loan` bigint DEFAULT NULL,
  `annual_interest_rate` float DEFAULT NULL,
  `loan_periods_in_years` int DEFAULT NULL,
  `risk_premium` float DEFAULT NULL,
  `number_of_payments` int DEFAULT NULL,
  PRIMARY KEY (`loan_id`),
  KEY `FKb8e9kcyteacu7h257fars1ill` (`customer_loan`),
  CONSTRAINT `FKb8e9kcyteacu7h257fars1ill` FOREIGN KEY (`customer_loan`) REFERENCES `customer` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cbe_loan_loan`
--

LOCK TABLES `cbe_loan_loan` WRITE;
/*!40000 ALTER TABLE `cbe_loan_loan` DISABLE KEYS */;
INSERT INTO `cbe_loan_loan` VALUES (1,'1000000','2023:04:12:09:13:23','morgage',1,15.5,3,3,4),(2,'500000','2023:04:12:09:14:33','farming',2,15.52,6,3.2,1),(3,'700000','2023:04:12:09:15:06','industry',3,15.53,5,3.3,2),(4,'1200000','2023:04:12:09:13:23','Farming',1,15.5,3,3,4),(5,'3200000','2023:01:12:09:13:23','Technology Outsouring',1,15.5,3,3,4);
/*!40000 ALTER TABLE `cbe_loan_loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `register_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'cbe0001','Belayneh','Male','xxxx','Kindie','0911213456','2023:04:12:08:54:19'),(2,'cbe0002','Haile','Male','Silasie','Gebre','0911213488','2023:04:12:08:54:55'),(3,'cbe0003','Bereket','Female','xxx','Geberewa','0921213488','2023:04:12:08:55:25');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_MODERATOR'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(1,2),(3,2),(1,3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'getinetamare@cbe.com.et','$2a$10$4iugdskEpGhzVF41SWnsSeWOFHPW7mnPeenozZxZreyXtVLqOKBKi','getinet'),(2,'tiztawtilaye@cbe.com.et','$2a$10$92PfKa6Y3PQvPwmQwIrM4.MCRaKgtaIhVXcgP9Sg5uvONkI1BjKp2','tiztaw'),(3,'haregwin@cbe.com.et','$2a$10$F0h5vl0hUu1Uh6.erkaX/.O4XJLi.QlM9IeMS5PJIjKH0TP.jh.ju','haregwin'),(4,'banchu@cbe.com.et','$2a$10$tKrVYxffkiUjfZXnqlcAp.e4u76yckClZhNpDyPuStJbT2QRJtuSm','banchu'),(5,'test@gmail.com','$2a$10$lJ1xkkhKq1fx84UlBhMinO3ADOMrb8VSaL6nmon2k8KuEjsThbsj.','GetinetA');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-14 16:33:58
