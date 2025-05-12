-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quanlygiay
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `role_id_idx` (`role_id`),
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Nguyễn Anh Huy','admin@gmail.com','$2a$10$q/eCeoKBAJtMwtEyP3sTWO7V0JhYwLmKWBg08GpkocXTAxhikRiEu','1'),(2,'Đoàn Thị Hiền','doanhien03@gmail.com','$2b$10$ZzXDu5dEVWJgP1C5/0vOqu1uvO67avWDR4DY3YcPKSQFi2aQ3mu0i','2'),(3,'anh thư','anhthu@gmail.com','$2b$10$qzmbd0sHOS6ZJWtWs/eQveNoPDeIQx3JOuTC5QzQkMPOTlQOA7Dq.','2'),(5,'trunghieu','trunghieu@gmail.com','$2b$10$UMnrNVHqNRY2B1AHguHQFeM0QxXgk4kkLBrw5KQjw.24meb6kGlxC','2'),(6,'trần khánh huyền','khanhhuyen@gmail.com','$2b$10$jbEhT05sQrgt90TCHHZZ5ujV/utjBs3E2ybpmaVgO5FYmH0ZZpq.G','2'),(7,'Võ Yến Thùy','yenthuy@gmail.com','$2b$10$oM63T66x28YXoCTFzWjbz.PZdxRLiPz3K/JXgEb6fMxnyKheGOQKC','2'),(8,'trần đình vũ','dinhvu@gmail.com','$2b$10$zzeIuxm325MySZPLGvWpp.Oy/vcmM7tlx42Ch/dwGj.mhGDgrHGk.','2'),(9,'lê anh khoa','anhkhoa@gmail.com','$2b$10$B19A58Po.zgjY9ncE3oUce/DyWg9m7qfBkNL7CNV1OR.31YHQyN.6','2'),(10,'Ngọc Nhi','ngocnhi@gmail.com','$2b$10$1dMzjwIZVam/iAyYAfmNyeza1tAaDOeh4bQ50axD5e6OQb8c/Vv86','2'),(11,'Minh Thư','minhthu@gmail.com','$2b$10$yuh/h4gwoJeCEkN9KXybPeWg4kKKR34GJmHJzSqxfHDGS2t47/8w.','2'),(12,'khanhnguyen','khanhnguyen@gmail.com','$2b$10$j2L9.3SxiJSqRzzQSzkeKegsoSt3MlcDjDjDgSGc36jE4vsr7R2uy','2'),(13,'Tường Vy','tuongvy@gmail.com','$2b$10$XVp81xMqOLvjj4ddN9P3re2zu4Z0BrMefW3eNerERf5b6fVAP.ApG','2'),(14,'admin','admin1@gmail.com','$2b$10$IRpy424KqWuKCl/7FCVlPesF6StbEngqHSa9i6vfDLLoircUpgGQK','1');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `bill_id` int NOT NULL,
  `account_id` int NOT NULL,
  `date` date NOT NULL,
  `total_price` int NOT NULL,
  `address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int NOT NULL,
  `discount_code` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discounted_price` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `account_id_idx` (`account_id`),
  KEY `customer_id_idx` (`customer_id`),
  KEY `discoutn_code_idx` (`discount_code`),
  CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `discoutn_code` FOREIGN KEY (`discount_code`) REFERENCES `discount` (`discount_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `brand_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES ('1','B1'),('2','B2'),('3','B3');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `cart_account_id_product_id_key` (`account_id`,`product_id`),
  KEY `account_id_idx` (`account_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `cart_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('1','C1'),('2','C2'),('3','C3');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discount_code` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `condition` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `active` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`discount_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goodsreceipt`
--

DROP TABLE IF EXISTS `goodsreceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goodsreceipt` (
  `receipt_id` int NOT NULL AUTO_INCREMENT,
  `goodsreceipt_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `total_price` int NOT NULL,
  `supplier_id` int NOT NULL,
  `account_id` int NOT NULL,
  PRIMARY KEY (`receipt_id`),
  KEY `goodsreceipt_account_id_idx` (`account_id`),
  KEY `goodsreceipt_supplier_id_idx` (`supplier_id`),
  CONSTRAINT `fk_goodsreceipt_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_goodsreceipt_supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodsreceipt`
--

LOCK TABLES `goodsreceipt` WRITE;
/*!40000 ALTER TABLE `goodsreceipt` DISABLE KEYS */;
INSERT INTO `goodsreceipt` VALUES (1,'Nhập Adidas','2025-05-01',10000,2,1),(2,'Nhập Nike','2025-05-02',10500,1,1),(3,'Nhập Van','2025-05-03',7500,3,1),(4,'Nhập Converse','2025-05-04',8400,5,1),(5,'Nhập Jodan','2025-05-05',12600,4,1),(6,'Nhập Nike','2025-05-07',8440,1,1),(7,'Nhập Van Old School','2025-05-09',5400,3,1),(8,'Nhập Nike Sport','2025-05-06',18200,1,1),(9,'Nhập Van N9','2025-05-09',30800,3,1),(10,'Nhập Converse White and Black','2025-04-10',50700,5,14),(11,'Nhập Adidas','2025-05-08',28771,2,14),(12,'Nhập Jodan','2025-05-10',35394,4,14),(13,'Nhập Jodan','2025-05-09',53075,4,14),(14,'Nhập Jodan','2025-05-03',22900,4,14),(15,'Nhập Nike','2025-05-09',30466,4,14),(16,'Nhập Nike 9-5','2025-05-09',38845,1,14),(17,'Nhập Nike V7','2025-05-10',13950,1,14),(18,'Nhập Converse','2025-05-10',36244,5,14),(19,'Nhập Converse 28-4','2025-04-28',33452,5,14),(20,'Nhập Converse 5','2025-05-08',18600,5,14),(21,'Nhập Van 5','2025-05-08',18864,3,14),(22,'Nhập Van 5-2','2025-05-09',36495,3,14),(23,'Nhập Adidas 5','2025-05-09',16381,2,14);
/*!40000 ALTER TABLE `goodsreceipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goodsreceipt_detail`
--

DROP TABLE IF EXISTS `goodsreceipt_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goodsreceipt_detail` (
  `receiptdetail_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `receipt_id` int NOT NULL,
  `input_price` int NOT NULL,
  PRIMARY KEY (`receiptdetail_id`),
  KEY `goodsreceipt_detail_product_id_idx` (`product_id`),
  KEY `goodsreceipt_detail_receipt_id_idx` (`receipt_id`),
  CONSTRAINT `fk_goodsreceipt_detail_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_goodsreceipt_detail_receipt_id` FOREIGN KEY (`receipt_id`) REFERENCES `goodsreceipt` (`receipt_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodsreceipt_detail`
--

LOCK TABLES `goodsreceipt_detail` WRITE;
/*!40000 ALTER TABLE `goodsreceipt_detail` DISABLE KEYS */;
INSERT INTO `goodsreceipt_detail` VALUES (17,1,20,1,500),(18,2,25,2,420),(19,3,30,3,250),(20,4,24,4,350),(21,5,30,5,420),(22,7,26,6,140),(23,6,24,6,200),(24,8,30,7,180),(25,9,35,8,520),(26,10,44,9,700),(27,12,45,10,560),(28,11,50,10,510),(29,14,15,11,788),(30,13,23,11,737),(31,16,39,12,578),(32,15,34,12,378),(33,18,12,13,576),(34,17,67,13,689),(35,20,20,14,698),(36,19,12,14,745),(37,22,33,15,406),(38,21,34,15,502),(39,24,33,16,509),(40,23,32,16,689),(41,25,45,17,310),(42,26,52,18,697),(43,28,35,19,600),(44,27,22,19,566),(45,30,12,20,500),(46,29,21,20,600),(47,32,26,21,588),(48,31,12,21,298),(49,34,30,22,684),(50,33,45,22,355),(51,36,24,23,297),(52,35,19,23,487);
/*!40000 ALTER TABLE `goodsreceipt_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int NOT NULL,
  `status` enum('PAID','PENDING') COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL,
  `dueDate` int NOT NULL,
  `fromName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fromEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `toName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `toEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `toAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceNumber` int NOT NULL,
  `note` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoiceItemDesc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoiceItemQuantity` int NOT NULL,
  `invoiceItemRate` int NOT NULL,
  `accountId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Invoice_accountId_fkey` (`accountId`),
  CONSTRAINT `Invoice_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khuyenmai`
--

DROP TABLE IF EXISTS `khuyenmai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khuyenmai` (
  `STT` int NOT NULL,
  `TEN` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MA` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DIEUKIEN` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `GIAMGIA` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NGAYBD` date NOT NULL,
  `NGAYKT` date NOT NULL,
  `TRANGTHAI` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`STT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khuyenmai`
--

LOCK TABLES `khuyenmai` WRITE;
/*!40000 ALTER TABLE `khuyenmai` DISABLE KEYS */;
/*!40000 ALTER TABLE `khuyenmai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `stripe_session_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `total_price` int NOT NULL,
  `delivery_status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `payment_status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `account_id_idx` (`account_id`),
  CONSTRAINT `order_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,2,'cs_test_b1SpBstOyn45VzksrjebiWvnwXjT3seNVEH0pAWgkgVtqQCsoRjUgG0kgO','2025-05-10 07:37:44.293',980,'delivered','completed','220 âu cơ, hồ chí minh, Thành phố Hồ Chí Minh 084, VN'),(2,5,'cs_test_b1dzl4AhmsgKgtpZbXrRyPuVIVfBrlSh5Aua1Dr02Do3pWC1c2j266k1um','2025-05-10 10:02:59.291',1510,'delivered','completed','trường đại học sài gòn, hồ chí minh, Thành phố Hồ Chí Minh 059, VN'),(3,2,'cs_test_b1Uw3AksSC28skredr1FGnvLw4lf30p439jVgGhwS13reFjBw9JvcLwKYG','2025-05-10 10:06:09.203',2615,'delivered','completed','trường đại học sài gòn, gia lai, Gia Lai 071, VN'),(4,2,'cs_test_b1euk8WNBqv9ZVZkpdLHS6A9h5fLf4TkcqwrJPalhyLPT9prQu9VHdRDRO','2025-05-11 01:59:46.862',4029,'delivered','completed','trường đại học sài gòn, Hồ Chí Minh, Thành phố Hồ Chí Minh 084, VN'),(5,2,'cs_test_b1RXkduAGwD8zsFXqM8J6TBQjYWPzuyQKVk6KfcoKcyZWtjR3YpH5vGS27','2025-05-11 02:01:42.947',1961,'delivered','completed','trường đại học sài gòn, hồ chí minh, Thành phố Hồ Chí Minh 084, VN'),(6,2,'cs_test_b1M4HsFfwjcBp0lBhcVMlHVpqsGNecIO4jhAuicdK8Bx7SV1qdw9xpfQuo','2025-05-11 02:03:13.565',2752,'delivered','completed','trường đại học sài gòn, Hồ Chí Minh, Thành phố Hồ Chí Minh 084, VN'),(7,5,'cs_test_b17H8065TtP2tFilvBUj5uWizcUxIWyr5pn9wRMzIdLqCU0TVhJpFp5lwC','2025-05-11 02:05:14.155',3300,'delivered','completed','441 trần bình trọng, gia lai, Gia Lai 071, VN'),(8,5,'cs_test_b1og5clGXWwcIVAvEVl6M0m1Ak55WMxQxrglzFW9X7FIUK6rzakOoUkUMM','2025-05-11 02:06:06.727',3530,'delivered','completed','441 trần bình trọng, gia lai, Gia Lai 071, VN'),(9,5,'cs_test_b15VDvzg27DVD5cIvOj8WQC0eP0DL9uRlBysMNww5iYoVkS4RlKjPy8NVe','2025-05-11 02:06:50.360',3203,'delivered','completed','441 trần bình trọng, gia lai, Gia Lai 071, VN'),(10,3,'cs_test_b1jfaonmnBbK7iTbJGmeWHSQSC7bSacyk2tcQEfQZJ16iuZPESuiTz8a3c','2025-05-11 02:09:18.337',4690,'delivered','completed','760 lạc long quân, cà mau, Cà Mau 064, VN'),(11,3,'cs_test_b1MyveBgjn6b3qcQwmsIWMnsoVzlqn7XCwa0R9Kz3R5X32bcjDNMXmOBfX','2025-05-11 02:10:12.710',4999,'delivered','completed','760 lạc long quân, cà mau, Cà Mau 064, VN'),(12,3,'cs_test_b16nIyeBHvT5TNehL4qeyW4RsezUMX7PcHri92w2pClgg02yMaB8OUkZTX','2025-05-11 02:10:43.863',3222,'delivered','completed','760 lạc long quân, cà mau, Cà Mau 064, VN'),(13,7,'cs_test_b1dZpbVcAZerHQs3jhPqXuGBBJ1ksOrLtgOPF7jsNqXUcD3TW9NnEi0d3R','2025-05-11 02:13:30.069',1480,'delivered','completed','đắk lắk, đắk lắk, Đắk Lắk 044, VN'),(14,7,'cs_test_b1wMIrRQYCGEWgKq1vi4WqUcyy8yciRQZMUQq469S3SRUEvCRDMGT3RDGu','2025-05-11 02:14:47.249',3598,'delivered','completed','đắk lắk, đắk lắk, Đắk Lắk 041, VN'),(15,7,'cs_test_b1BvlLovDtp2EJuKnCjsGBh3uVl9KRJs0NPP3ETW9zOfU8oR4rWmcztcYx','2025-05-11 02:15:39.351',2127,'delivered','completed','đắk lắk, đắk lắk, Đắk Lắk 041, VN'),(16,7,'cs_test_b1g4ifFvSp7QKMMehPJszJw7UwllnjMDY5vwRB0BbuqzX3SjVxzRCOETKH','2025-05-11 02:16:01.250',860,'delivered','completed','đắk lắk, đắk lắk, Đắk Lắk 041, VN');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_item_order_id_idx` (`order_id`),
  KEY `order_item_product_id_idx` (`product_id`),
  CONSTRAINT `order_item_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (4,1,4,1,450),(5,1,6,1,250),(6,1,7,1,280),(7,2,4,1,450),(8,2,6,2,500),(9,2,7,2,560),(10,3,1,1,650),(11,3,2,1,600),(12,3,3,1,350),(13,3,4,1,450),(14,3,5,1,550),(15,4,9,1,720),(16,4,10,2,1740),(17,4,16,1,756),(18,4,17,1,798),(19,5,5,1,550),(20,5,15,1,598),(21,5,17,1,798),(22,6,3,1,350),(23,6,4,1,450),(24,6,10,1,870),(25,6,32,1,674),(26,6,33,1,408),(27,7,5,1,550),(28,7,15,2,1196),(29,7,16,1,756),(30,7,17,1,798),(31,8,5,1,550),(32,8,9,1,720),(33,8,10,1,870),(34,8,23,1,745),(35,8,24,1,645),(36,9,10,1,870),(37,9,13,1,860),(38,9,32,1,674),(39,9,34,1,799),(40,10,5,1,550),(41,10,10,3,2610),(42,10,11,1,770),(43,10,12,1,745),(44,11,11,2,1540),(45,11,12,1,745),(46,11,26,2,1490),(47,11,33,3,1224),(48,12,10,1,870),(49,12,27,1,609),(50,12,28,1,647),(51,12,29,1,688),(52,12,33,1,408),(53,13,2,1,600),(54,13,3,1,350),(55,13,6,1,250),(56,13,7,1,280),(57,14,23,1,745),(58,14,24,2,1290),(59,14,25,4,1548),(60,15,15,1,598),(61,15,33,1,408),(62,15,34,1,799),(63,15,36,1,322),(64,16,6,1,250),(65,16,7,1,280),(66,16,8,1,330);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `output_price` int NOT NULL,
  `input_price` int NOT NULL,
  `country` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_of_product` int NOT NULL,
  `discount_percent` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `brand_id_idx` (`brand_id`),
  KEY `category_id_idx` (`category_id`),
  KEY `supplier_id_idx` (`supplier_id`),
  CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'1','1','Adidas Galaxy',650,500,'Trung Quoc',2022,0,19,'/img/1746778107370_adidas_galaxy.jfif',NULL),(2,'1','2','Nike Air Max 97',600,420,'American',2025,0,23,'/img/1746778173580_nike-air-max-97-blue.png',NULL),(3,'1','3','Van Black Black',350,250,'Japan',2023,0,27,'/img/1746778252196_vans-black-black.png',NULL),(4,'2','1','Converse Chuck TayLor',450,350,'Trung Quoc',2020,0,20,'/img/1746778327231_converse-chuck-taylor.png',NULL),(5,'2','2','Jodan Blue',550,420,'Vietnam',2025,0,25,'/img/1746778549224_jodan_blue.jfif',NULL),(6,'2','3','Nike Adapt BB H20',250,200,'American',2021,0,19,'/img/1746778743478_nike-adapt-bb.png',NULL),(7,'3','1','Nike Shox TL',280,140,'American',2022,0,21,'/img/1746778743501_nike-shox-tl.png',NULL),(8,'3','3','Van Old School',330,180,'Vietnam',2020,0,29,'/img/1746872804163_van-old-school.png',NULL),(9,'1','2','Nike Sport ADI900',720,520,'Vietnam',2019,0,33,'/img/1746890252203_z6588919267811_57181c4ccf21aa85c2077f5e5429d797.jpg',NULL),(10,'2','1','Van N9',870,700,'Vietnam',2025,0,35,'/img/1746890555369_z6588919448155_71b76c284e8ae4ca724c7dca8088681b.jpg',NULL),(11,'3','2','Converse White Speck',770,510,'Vietnam',2020,0,47,'/img/1746890751603_z6588919272593_fc0df280761beee5ecd8d827843722ad.jpg',NULL),(12,'2','2','Converse Chuck Black 200',745,560,'Vietnam',2019,0,43,'/img/1746890751624_z6588919303115_b601ac221400fc0f6b5c6958282fe21a.jpg',NULL),(13,'3','3','Adidas A01',860,737,'Vietnam',2025,0,22,'/img/1746891583887_z6588919290323_c41af3c46a320a07da07706f8be99614.jpg',NULL),(14,'1','3','Adidas Performance FALCON 5',945,788,'Vietnam',2025,0,15,'/img/1746891543193_z6588919278304_10a4eaefb4accd1982d9eb5fad2f00c5.jpg',NULL),(15,'1','1','Jodan Air 1',598,378,'Vietnam',2025,0,30,'/img/1746891894805_z6588919312126_b93fe365bef3860d39287a574735a11c.jpg',NULL),(16,'1','2','Jodan Air 3',756,700,'Vietnam',2025,0,37,'/img/1746891894831_z6588919338455_823cf36cd954b0bb3af00109d0e5bd90.jpg',NULL),(17,'2','3','Jodan Air 4',798,659,'Vietnam',2025,0,64,'/img/1746892197787_z6588919338740_32cf95842156d6c575c65e97d98cb39e.jpg',NULL),(18,'3','1','Jodan Air 5',690,576,'Vietnam',2025,0,12,'/img/1746892197813_z6588919338740_32cf95842156d6c575c65e97d98cb39e.jpg',NULL),(19,'2','3','Jodan Air 5',856,745,'Vietnam',2025,0,12,'/img/1746892480940_z6588919430387_6e0f8553a18025f95fbf8e772242e7a8.jpg',NULL),(20,'3','3','Jodan Air 7',756,698,'Vietnam',2025,0,20,'/img/1746892480965_z6588919448155_71b76c284e8ae4ca724c7dca8088681b.jpg',NULL),(21,'3','1','Nike Even',567,502,'Vietnam',2025,0,34,'/img/1746892743243_z6588919303115_b601ac221400fc0f6b5c6958282fe21a.jpg',NULL),(22,'1','1','Nike B600',489,406,'Vietnam',2025,0,33,'/img/1746892743272_z6588919422814_73d843bd79c081d9ced4095676f6e2a6.jpg',NULL),(23,'1','1','Nike Air 9',745,689,'Vietnam',2025,0,30,'/img/1746892933556_z6588919423532_d7a4ff7e7d59f49df75bb691403bb018.jpg',NULL),(24,'2','2','Nike White Sport',645,509,'Vietnam',2025,0,30,'/img/1746892933580_z6588919285934_a3f0d53515ffa31ce35752231cb95a5c.jpg',NULL),(25,'2','1','Nike V7',387,310,'Vietnam',2025,0,41,'/img/1746893059053_z6588919301752_d2d45aeac3bb182c26d01d5fb791374a.jpg',NULL),(26,'1','2','Converse Chuck 70 Plus',745,657,'Vietnam',2025,0,50,'/img/1746893324817_The Chuck 70 Plus Counter Climate turns to coldâ¦.jfif',NULL),(27,'1','2','Converse Chuck A7',609,566,'Vietnam',2025,0,21,'/img/1746893529208_NÃO OLHES PARA TRÃS_ A plataforma volumosa e aâ¦.jfif',NULL),(28,'2','1','Converse Z423',647,600,'Vietnam',2025,0,34,'/img/1746893529232_Product details â¢ Sports shoe â¢ Flat heel â¢â¦.jfif',NULL),(29,'1','3','Converse Chuck All Star',688,600,'Vietnam',2025,0,20,'/img/1746893873676_Now in a high top, the Star Player 76 takes casualâ¦.jfif',NULL),(30,'1','2','Converse Chuck 70',555,500,'Vietnam',2025,0,12,'/img/1746893873701_7e80702c-c8fe-490b-9f67-c76be4945bc4.jfif',NULL),(31,'1','1','Van ZX01',345,298,'Vietnam',2025,0,12,'/img/1746894099952_85fdb986-fe9c-46d1-ba19-f2cc1e8d3c70.jfif',NULL),(32,'1','1','Van Old School Navy',674,588,'Vietnam',2025,0,24,'/img/1746894099976_Vans _ Skate Old Skool Navy_White Skate Shoe.jfif',NULL),(33,'1','1','Van Black 1',408,355,'Vietnam',2025,0,39,'/img/1746894275975_ComfyCush Sk8-Hi Schoenen _ Zwart _ Vans.jfif',NULL),(34,'2','1','Van Special',799,684,'Vietnam',2025,0,28,'/img/1746894275996_59f47391-44a9-4e51-ad82-33b37c9ea612.jfif',NULL),(35,'1','3','Adidas Galaxy CV',566,487,'Vietnam',2025,0,19,'/img/1746894432436_Mens adidas Forum Low Athletic Shoe - Whiteâ¦.jfif',NULL),(36,'2','1','Adidas V1',322,297,'Vietnam',2025,0,23,'/img/1746894432485_d6650a25-f7c5-4405-b010-142d20bbfb82.jfif',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_entry`
--

DROP TABLE IF EXISTS `product_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_entry` (
  `entry_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `quantity_added` int NOT NULL,
  `entry_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`entry_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `supplier_id_idx` (`supplier_id`),
  CONSTRAINT `product_entry_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_entry_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_entry`
--

LOCK TABLES `product_entry` WRITE;
/*!40000 ALTER TABLE `product_entry` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_group`
--

DROP TABLE IF EXISTS `product_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_group` (
  `product_group_id` int NOT NULL,
  `product_group_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`product_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_group`
--

LOCK TABLES `product_group` WRITE;
/*!40000 ALTER TABLE `product_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resettoken`
--

DROP TABLE IF EXISTS `resettoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resettoken` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `expiryDate` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ResetToken_token_key` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resettoken`
--

LOCK TABLES `resettoken` WRITE;
/*!40000 ALTER TABLE `resettoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `resettoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return`
--

DROP TABLE IF EXISTS `return`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return` (
  `return_id` int NOT NULL,
  `product_id` int NOT NULL,
  `date_return` date NOT NULL,
  `reason` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`return_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return`
--

LOCK TABLES `return` WRITE;
/*!40000 ALTER TABLE `return` DISABLE KEYS */;
/*!40000 ALTER TABLE `return` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('1','admin'),('2','customer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplier_id` int NOT NULL,
  `supplier_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Nike Supplier','TPHCM','0346674072'),(2,'Adidas','Hanoi','0836142051'),(3,'Van Louis','Da nang','0911461151'),(4,'Jodan','Da Lat','0346674071'),(5,'Converse','Binh Thuan','0911461150');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warrantydetail`
--

DROP TABLE IF EXISTS `warrantydetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warrantydetail` (
  `warranty_detai_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `warranty_date` date NOT NULL,
  `reason` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `warranty_status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`warranty_detai_id`),
  KEY `warrantydetail_product_id_idx` (`product_id`),
  CONSTRAINT `fk_warrantydetail_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warrantydetail`
--

LOCK TABLES `warrantydetail` WRITE;
/*!40000 ALTER TABLE `warrantydetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `warrantydetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-11 19:38:41
