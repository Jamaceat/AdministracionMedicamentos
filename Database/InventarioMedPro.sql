CREATE DATABASE  IF NOT EXISTS `InventarioMedPro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `InventarioMedPro`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: InventarioMedPro
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `IDCode` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Description` longtext,
  `State` varchar(15) NOT NULL,
  `LaboratoryName` varchar(45) NOT NULL,
  PRIMARY KEY (`IDCode`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Acetaminofen','es Acetaminofen','Activo','Bayer'),(2,'Dolex','es Dolex','Inactivo','Bayer'),(4,'Ibuprofeno','SI es genfar es buenoo','Activo','Genfar'),(5,'paracetamol','es acetaminofen pero con otro nombre','Inactivo','Genfar'),(6,'paracetamol+','es acetaminofen pero con otro nombre y mejorado','Inactivo','Genfar');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Provider`
--

DROP TABLE IF EXISTS `Provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Provider` (
  `IDType` varchar(45) NOT NULL,
  `ID` varchar(45) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `ContactName` varchar(50) NOT NULL,
  `ContactNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`IDType`,`ID`),
  KEY `Ordered` (`ID`,`IDType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Provider`
--

LOCK TABLES `Provider` WRITE;
/*!40000 ALTER TABLE `Provider` DISABLE KEYS */;
INSERT INTO `Provider` VALUES ('Cedula','1000000000','John','Calle22D','Provedor de acetaminofen','10000320'),('Cedula de extranjeria','22222222','Steve','Calle23D','Provedor de Dolex','10000300'),('NIT','123124','Genfar','calle 22','genfar 2 ','300445555555'),('NIT','1231245','genfar 2','calle 22','genfar 2 ','300445555555');
/*!40000 ALTER TABLE `Provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReceptionProductByProvider`
--

DROP TABLE IF EXISTS `ReceptionProductByProvider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReceptionProductByProvider` (
  `InvoiceID` int NOT NULL AUTO_INCREMENT,
  `IDProduct` int NOT NULL,
  `IDProvider` varchar(45) NOT NULL,
  `IDTypeProvider` varchar(45) NOT NULL,
  `ReceptionDateTime` datetime NOT NULL,
  `Quantity` int NOT NULL,
  `Batch` varchar(45) NOT NULL,
  `INVIMACode` varchar(100) NOT NULL,
  `ExpirationDate` date NOT NULL,
  `Description` longtext,
  PRIMARY KEY (`InvoiceID`,`IDProduct`,`IDProvider`,`IDTypeProvider`),
  KEY `IDProduct_idx` (`IDProduct`),
  KEY `IDProvider_idx` (`IDProvider`,`IDTypeProvider`),
  CONSTRAINT `IDProduct` FOREIGN KEY (`IDProduct`) REFERENCES `Product` (`IDCode`),
  CONSTRAINT `IDProvider` FOREIGN KEY (`IDProvider`, `IDTypeProvider`) REFERENCES `Provider` (`ID`, `IDType`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReceptionProductByProvider`
--

LOCK TABLES `ReceptionProductByProvider` WRITE;
/*!40000 ALTER TABLE `ReceptionProductByProvider` DISABLE KEYS */;
INSERT INTO `ReceptionProductByProvider` VALUES (1,2,'22222222','Cedula de extranjeria','2023-11-02 15:50:54',30,'1','M-13851R1','2025-11-05','Bueno'),(2,2,'22222222','Cedula de extranjeria','2023-11-02 17:50:54',30,'2','M-13851R1','2025-11-05','Bueno'),(7,2,'22222222','Cedula de extranjeria','2023-11-02 20:54:45',30,'1','M-13851R1','2025-11-05','Bueno');
/*!40000 ALTER TABLE `ReceptionProductByProvider` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-05 13:12:42
