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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Admin','admin@gmail.com','$2b$10$aZyoknDc5bk3HAjvjS3aGup1v6Eb0.KpghR9ftQRVil5FzPGBd9wa','1'),(2,'SGU.AnhHuy','nguyenanhhuy20112004@gmail.com','$2b$10$aZyoknDc5bk3HAjvjS3aGup1v6Eb0.KpghR9ftQRVil5FzPGBd9wa','2'),(3,'pham ngoc bang tam','bangtam2004@gmail.com','$2b$10$EhJ2a8g4F/v5zYzaXmrK8uk3MaoZuAf5IBemlCjU2iIcgB3/Ad.JO','2'),(4,'Đoàn Thị Hiền','doanhien03@gmail.com','$2b$10$8ZmaxHkvuXIFJXXPvruvzeqHVN6EjNjjTkRX5m.8PSi1Q40blG5dK','2');
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
INSERT INTO `brand` VALUES ('B1','Brand A'),('B2','Brand B'),('B3','Brand C'),('B4','Brand D');
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
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (202,4,1,1,450),(203,4,2,1,250),(204,4,3,1,200),(332,3,1,1,450),(333,3,2,3,250),(334,3,7,3,350);
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
INSERT INTO `category` VALUES ('C1','Category A'),('C2','Category B'),('C3','Category C');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'nguyenanhhuy','0346674072'),(2,'nguyenthuytrang','0911461151');
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
INSERT INTO `discount` VALUES ('DISCOUNT2024','Giảm 10% cho đơn hàng trên 500.000 VNĐ','10%','2024-01-01','2024-12-31','Đang hoạt động'),('SPRINGSALE','Mua 1 tặng 1','100%','2024-03-01','2024-05-31','Đang hoạt động'),('SUMMER21','Giảm 15% cho sản phẩm mùa hè','15%','2024-06-01','2024-08-31','Sắp diễn ra'),('SUMMER24','GIAM 30% TONG BILL','30%','2023-11-20','2024-09-10','DANG HOAT DONG');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodsreceipt`
--

LOCK TABLES `goodsreceipt` WRITE;
/*!40000 ALTER TABLE `goodsreceipt` DISABLE KEYS */;
INSERT INTO `goodsreceipt` VALUES (1,'nhập hàng Nike','2025-02-17',1000,1,1),(2,'Nhập Converse','2025-02-19',1000,2,1),(3,'Nhập Nike','2025-02-19',1500,1,1),(4,'Nhập Nike','2025-02-20',1000,1,1),(5,'Nhập Nike','2025-02-20',2000,1,1),(6,'Nhập Van','2025-02-20',600,3,1),(7,'Nhập Jodan','2025-02-21',2700,4,1),(8,'Nhập Nike','2025-02-23',1000,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodsreceipt_detail`
--

LOCK TABLES `goodsreceipt_detail` WRITE;
/*!40000 ALTER TABLE `goodsreceipt_detail` DISABLE KEYS */;
INSERT INTO `goodsreceipt_detail` VALUES (1,2,5,1,200),(2,4,5,2,200),(3,1,5,3,300),(4,2,5,4,200),(5,1,5,5,400),(6,6,2,6,300),(7,7,9,7,300),(8,3,10,8,100);
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
  `order_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `total_price` int NOT NULL,
  `delivery_status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `payment_status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_session_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address` varchar(155) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `account_id_idx` (`account_id`),
  CONSTRAINT `order_account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (4,2,'2024-12-14 19:16:44.964',1300,'delivered','completed','cs_test_b1rwm7g19Se3pv22gUEEMCgfEfH0rCR2uM5dbV7p529nUHrrP6HAQG7OZ4','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(5,2,'2024-12-14 19:31:11.366',1300,'delivered','completed','cs_test_b1oSZurN2CaflwXPsn3w4HcVhIglV3DtveAWIcCsJXpvs3cGZ7vqG0TgMi','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(6,2,'2024-12-15 07:05:19.535',900,'delivered','completed','cs_test_a1Dt9UTEpSoPbBHR2cXGoIQZoIHH9sqIzbgZnUHcJRxidMa55IwCukzzQ8','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(7,2,'2024-12-15 07:06:43.540',900,'delivered','completed','cs_test_a1ZvKEYrVxJo8Yo89HO8phk8lxkHCRVZxj2tlSmc8Bv6I55oBxxJDdZ8xN','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(8,2,'2024-12-15 07:08:08.477',450,'delivered','completed','cs_test_a1MA6DbJlRnf7oUErcxEWUKZCitPjFbcHfYJ2MK40ugONoQ4sFEmglcDYf','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(9,2,'2024-12-15 07:24:58.936',700,'delivered','completed','cs_test_b1m8Z4rgiJcgyD8w2nf6HvbBEpOyhY0K4pJg383DqzWCLTnqwoU5wIi82z','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(10,2,'2024-12-15 07:38:46.529',700,'delivered','completed','cs_test_b1soLUFWyyhRGLNM660HeqI31IWBRrgM0PdcC62MiuJTg6DXaKbxzLee6j','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(11,2,'2024-12-15 07:48:10.155',700,'delivered','completed','cs_test_b1ck46xubXMjDZaZjJDalH91x5bWughsiJi3HevPaQMTR2lglVIq4zA6ky','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(12,2,'2024-12-15 07:57:53.102',700,'delivered','completed','cs_test_b1E6Pc6k4CdY6Vy5GWi3XndlbbJgPog6W9GsjghY5AzBzdqpZsgVk5HsyZ','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(13,2,'2024-12-15 08:01:33.545',1800,'delivered','completed','cs_test_a1AEr84vCIWRM9IUZfYCCp5izq9IPLuZSsXhl1eS8W6jn185ersVQrBlKS','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(14,2,'2024-12-15 08:04:12.461',1150,'pending','completed','cs_test_b1KynC4dYYXnjcpHIZtNcYFR0Fkoub3FToWAMgfsjXwODY6l7ljCb1zMsl','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(15,2,'2024-12-21 18:33:59.149',2750,'pending','completed','cs_test_b12KivEVB1vJtttOaxGDIlv0Q1DdocNz9ooMuA8AL0iY7kMdscIuq2wzNj','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(16,3,'2025-02-13 12:00:41.128',1400,'pending','completed','cs_test_b1OkrjGrAgFk0oxF7O75piI5NYUtkeKm5k14ebhnUlDw4TxnescAY37ulp','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(17,3,'2025-02-13 12:07:16.599',900,'delivered','completed','cs_test_b1Af9AQsXRvZpWgxuxe1OuQNYAyTekOPLDnDhmQ4cvMvr6C85xSvPktXmZ','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(18,3,'2025-02-17 06:29:31.437',2250,'delivered','completed','cs_test_a1FHfQzQVszLndTif52Mshr7SbbaJkJ9SW32U30hx2tNRaCZSDIvNoQ4Pu','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(19,3,'2025-02-20 06:00:32.964',2250,'delivered','completed','cs_test_a1Gjo6KhzGaZzubBjdNeAKZhoCKNREEUvIaFSO8nPSVZI4pkyyzKrAKlHf','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(20,3,'2025-02-23 03:51:24.316',1600,'delivered','completed','cs_test_a1X4slgpiZwq8V8njIIm9dPLKIfLw6VquvQ3JmoZE8xbkeiGjkVHcO7ems','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN'),(21,4,'2025-02-23 15:14:32.584',900,'pending','completed','cs_test_b19bCBYm0wBvPeIlFk0luCZvDRDz7KViIOuw8EaJAxzzYzbn1twclbAbR9','123 Đường Lê Lợi, Tòa nhà XYZ, Hà Nội, Hoàn Kiếm 100000, VN');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (5,4,1,1,450),(6,4,2,1,250),(7,4,3,3,600),(8,5,1,1,450),(9,5,2,1,250),(10,5,3,3,600),(11,6,1,2,900),(12,7,1,2,900),(13,8,1,1,450),(14,9,1,1,450),(15,9,2,1,250),(16,10,1,1,450),(17,10,2,1,250),(18,11,1,1,450),(19,11,2,1,250),(20,12,1,1,450),(21,12,2,1,250),(22,13,1,4,1800),(23,14,1,1,450),(24,14,2,1,250),(25,14,3,1,200),(26,14,4,1,250),(27,15,1,4,1800),(28,15,2,3,750),(29,15,3,1,200),(30,16,1,2,900),(31,16,2,2,500),(32,17,1,1,450),(33,17,2,1,250),(34,17,3,1,200),(35,18,1,5,2250),(36,19,1,5,2250),(37,20,6,5,1600),(38,21,1,1,450),(39,21,2,1,250),(40,21,3,1,200);
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
  `country` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_of_product` int NOT NULL,
  `discount_percent` int NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `supplier_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `brand_id_idx` (`brand_id`),
  KEY `category_id_idx` (`category_id`),
  KEY `supplier_id_idx` (`supplier_id`),
  CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'C1','B1','Nike J97 Drop Tag',450,'Vietnam',2018,0,'/img/1739446095620_nike-react-element.png',19,1),(2,'C2','B2','Nike Adapt BB H20',250,'Vietnam',2024,15,'/img/1739446126705_nike-adapt-bb.png',19,1),(3,'C3','B3','Nike Air Max 97',200,'Vietnam',2024,20,'/img/1739446151585_nike-air-max-97.png',24,1),(4,'C2','B1','Converse Chuck TayLor',250,'Vietnam',2024,10,'/img/1739446173887_converse-chuck-taylor.png',10,2),(5,'C2','B2','Nike FlyKnit',200,'Vietnam',2024,15,'/img/1739446189918_nike-flyknit.png',25,1),(6,'C2','B2','Van Black Black',320,'Vietnam',2024,5,'/img/1739446210324_vans-black-black.png',5,3),(7,'C2','B2','Jodan DelShip',350,'Vietnam',2025,0,'/img/1740151635944_nike-air-max-97.png',10,3);
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
  `quantity_added` int NOT NULL,
  `entry_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `supplier_id` int NOT NULL,
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
INSERT INTO `resettoken` VALUES ('13fb75f3-be90-4936-a2fe-d67c748c73b4','7b2a2abc-5e42-44d3-a405-7a4128b23d00',12,'2024-11-06 16:04:19.645','2024-11-06 15:04:19.647','2024-11-06 15:04:19.647'),('18b02ffb-3b9c-48b3-99a7-ff094a05c80b','2c30f171-590e-41f3-ac16-2abbc11efa1d',12,'2024-11-06 13:47:56.887','2024-11-06 12:47:56.889','2024-11-06 12:47:56.889'),('230ecb71-d041-44a9-bbd1-552e2113e8c1','73f26ecc-7019-40db-946b-09d0ba8e3cb9',12,'2024-11-06 13:46:55.223','2024-11-06 12:46:55.226','2024-11-06 12:46:55.226'),('24963eaa-045e-431b-acf8-1eb1fca71bf4','19d8f67a-d277-4f0c-bf26-937fffb6c939',3,'2025-02-12 14:50:03.643','2025-02-12 13:50:03.644','2025-02-12 13:50:03.644'),('2d127705-f2e7-4eb8-b8c5-aa2669314190','a0f186f5-be01-4151-8879-a6738a676a5b',12,'2024-11-06 14:05:59.665','2024-11-06 13:05:59.667','2024-11-06 13:05:59.667'),('32404383-ac72-4cf9-82d9-17bdb0be4478','55e98940-8ef2-43f2-9797-f06516989d25',2,'2025-02-12 12:16:36.750','2025-02-12 11:16:36.751','2025-02-12 11:16:36.751'),('42926820-6820-4f90-87f3-f05e207b6543','7d8c5c02-b050-451b-8fc3-649a0d6619d8',12,'2024-11-07 03:46:15.895','2024-11-07 02:46:15.896','2024-11-07 02:46:15.896'),('45ca5a1c-77e3-42c5-901d-d452f5c28a8c','483b86e7-09c3-4a4c-a389-125b68f3c927',12,'2024-11-06 14:05:29.380','2024-11-06 13:05:29.381','2024-11-06 13:05:29.381'),('4f10c7be-10e6-401d-ad1d-9c77821c4ecf','6e8e7e4e-a732-4a7c-9dd9-81e8c73c0d9c',12,'2024-11-06 15:59:59.225','2024-11-06 14:59:59.226','2024-11-06 14:59:59.226'),('51943b51-2dec-43b6-935b-88173165aeae','024a644b-0426-4c64-acb7-5d7b9d23707d',12,'2024-11-06 14:05:27.943','2024-11-06 13:05:27.944','2024-11-06 13:05:27.944'),('6e2299cc-ab73-4e39-83c8-6222de4fd9bb','9e91b382-0091-4a28-bd29-821aecff0222',12,'2024-11-06 14:01:45.436','2024-11-06 13:01:45.438','2024-11-06 13:01:45.438'),('7512979d-96fd-49ad-b035-0def6b6d1e68','ffe521b1-c0cf-44c1-a538-778787519276',2,'2025-02-13 08:33:45.923','2025-02-13 07:33:45.932','2025-02-13 07:33:45.932'),('7baabfb6-8728-4770-90c3-2d6d62b9c629','4302846a-1d2a-48bc-b45a-de285553a780',12,'2024-11-06 14:01:40.098','2024-11-06 13:01:40.100','2024-11-06 13:01:40.100'),('7bd58508-1dbf-4d54-aa14-3068cd545fef','c46e8f1d-fb2b-4353-84c1-db30e2f56bed',12,'2024-11-07 03:48:18.823','2024-11-07 02:48:18.824','2024-11-07 02:48:18.824'),('80300c66-a3c6-4686-bdb8-67a3b5fb5510','ec61d175-34ef-47ac-9402-d33173761f6f',12,'2024-11-06 14:00:22.422','2024-11-06 13:00:22.423','2024-11-06 13:00:22.423'),('8a359ca5-af43-4eae-937f-deeaaebc2128','26ad2305-786a-41f3-aa37-85e1fdd5b3ce',12,'2024-11-06 14:06:42.658','2024-11-06 13:06:42.660','2024-11-06 13:06:42.660'),('8c998cf4-915a-41e9-8a3d-1160470400b1','7a63f8df-0b40-4448-b538-ea039cd1b570',3,'2025-02-12 12:17:50.762','2025-02-12 11:17:50.763','2025-02-12 11:17:50.763'),('96470783-25cc-44ff-802d-ee1dbf38658a','f44d21e7-e234-441c-83e5-11b870a2fdd1',1,'2025-02-11 14:39:07.821','2025-02-11 13:39:07.824','2025-02-11 13:39:07.824'),('96643527-32fb-4e14-b55d-a50a491e0ef3','726d1786-b54a-4e11-9eef-de7e774928a0',12,'2024-11-06 14:00:41.940','2024-11-06 13:00:41.941','2024-11-06 13:00:41.941'),('9d2fae12-ffbb-44d3-bbc9-2447a886ecba','2da5b98c-63ac-4fce-be6b-c80c1f019424',3,'2025-02-12 14:52:36.566','2025-02-12 13:52:36.567','2025-02-12 13:52:36.567'),('a10f0943-a87a-4319-891a-92cc13199822','50ebd909-724f-4a43-9b11-eeda592ef241',12,'2024-11-06 13:47:55.766','2024-11-06 12:47:55.767','2024-11-06 12:47:55.767'),('a1d8b1ef-a133-4a13-bffd-b8b4f8acc9d0','3524e449-7da5-4f9c-bc1d-8304e51f3d33',12,'2024-11-06 16:09:59.452','2024-11-06 15:09:59.453','2024-11-06 15:09:59.453'),('abc4f5fb-7b9c-4b35-9874-0cd4fb4b0569','302282ad-d41b-4388-b724-9df40d288c91',12,'2024-11-06 14:02:54.970','2024-11-06 13:02:54.972','2024-11-06 13:02:54.972'),('acf8d185-5ca7-4873-bb7c-bd877e0bf956','e60532e8-8d83-4bd0-b4fe-0d3ccefc70c9',12,'2024-11-06 14:07:28.495','2024-11-06 13:07:28.496','2024-11-06 13:07:28.496'),('b58f70b5-47e8-4699-b5c1-69179890d791','143b3d9a-ecdb-40b8-90fb-e570094a83a9',12,'2024-11-07 03:48:09.798','2024-11-07 02:48:09.799','2024-11-07 02:48:09.799'),('caf476d5-cecb-4154-ae65-a6cf0cd40869','02e4aca5-aa20-446e-ab0b-92707a2fca97',12,'2024-11-06 14:02:54.204','2024-11-06 13:02:54.205','2024-11-06 13:02:54.205'),('ed0ece7a-6939-438a-b5b5-435dcac2bf85','5f926ae5-0a6a-4b66-b9dd-dd7a6d35f1cb',12,'2024-11-07 03:43:36.211','2024-11-07 02:43:36.212','2024-11-07 02:43:36.212'),('eed00ba0-fced-40ad-b357-66079e507bb4','6d152290-1a44-4261-930c-ed26467e3d38',12,'2024-11-06 13:46:56.347','2024-11-06 12:46:56.348','2024-11-06 12:46:56.348'),('fedc831f-e419-48a7-9d76-c73ba6075643','b15608d8-7c6a-4e93-a98a-95f116c25876',12,'2024-11-06 14:06:43.755','2024-11-06 13:06:43.757','2024-11-06 13:06:43.757');
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
INSERT INTO `role` VALUES ('1','ADMIN'),('2','USER');
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
INSERT INTO `supplier` VALUES (1,'Nike','TPHCM','0346674072'),(2,'Converse','TPHCM','0911461151'),(3,'Van','Hanoi','0836142051'),(4,'Jodan','Da nang','0911461152');
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

-- Dump completed on 2025-03-12 11:12:09
