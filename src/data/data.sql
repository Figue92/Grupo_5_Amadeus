-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: amadeuspc
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
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Irigoyen 526','Lanús','Buenos Aires','Argentina',1824,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(2,'Sarmiento 1282','Rafael Calzada','Buenos Aires','Argentina',1847,'2023-04-12 13:24:16','2023-04-12 13:24:16');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Gigabyte','2023-04-12 13:24:16','2023-04-12 13:24:16'),(2,'Intel','2023-04-12 13:24:16','2023-04-12 13:24:16'),(3,'Adata','2023-04-12 13:24:16','2023-04-12 13:24:16'),(4,'AMD','2023-04-12 13:24:16','2023-04-12 13:24:16'),(5,'Redragon','2023-04-12 13:24:16','2023-04-12 13:24:16'),(6,'Logitech','2023-04-12 13:24:16','2023-04-12 13:24:16'),(7,'GeForce','2023-04-12 13:24:16','2023-04-12 13:24:16'),(8,'HyperX','2023-04-12 13:24:16','2023-04-12 13:24:16');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Motherboards','2023-04-12 13:24:16','2023-04-12 13:24:16'),(2,'Memorias RAM','2023-04-12 13:24:16','2023-04-12 13:24:16'),(3,'Procesadores','2023-04-12 13:24:16','2023-04-12 13:24:16'),(4,'Accesorios','2023-04-12 13:24:16','2023-04-12 13:24:16'),(5,'Placas de video','2023-04-12 13:24:16','2023-04-12 13:24:16');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `productcarts`
--

LOCK TABLES `productcarts` WRITE;
/*!40000 ALTER TABLE `productcarts` DISABLE KEYS */;
/*!40000 ALTER TABLE `productcarts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (1,'1677082210121_products_.jpg',1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(2,'1677082210132_products_.jpg',1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(3,'1677082210138_products_.webp',1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(4,'1677082210138_products_.png',1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(5,'1678375914131_products_.png',2,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(6,'1678826638024_products_.jpg',3,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(7,'1678827340469_products_.jpg',4,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(8,'1678826894003_products_.jpg',5,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(9,'1678826958082_products_.jpg',6,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(10,'Auriculares_Inalambricos.jpg',7,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(11,'1678827485714_products_.jpg',8,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(12,'1678827075449_products_.png',9,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(13,'1678827173953_products_.jpg',10,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(14,'1678827246923_products_.jpg',11,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(15,'1678827565387_products_.jpg',12,'2023-04-12 13:24:16','2023-04-12 13:24:16');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Motherboard Gigabyte',19540,'Mother Gigabyte GA-A320M-H AM4',1,1,20,0,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(2,'Motherboard INTEL',40000,'Mother Intel X670E Taichi Carrara AM5',1,1,0,1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(3,'Memoria DDR5',15170,'Memoria Adata DDR5 8GB 4800Mhz',1,1,30,0,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(4,'Procesador Ryzen',25300,'Procesador AMD Ryzen 3 4100 Sin cooler OEM',1,1,20,0,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(5,'Auriculares HyperX',15000,'Auriculares Inalámbricos Cat Ear Luz Led C/ Mic - Celeste',1,1,0,1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(6,'Auriculares',3860,'Auriculares Redragon H120 Ares PC',1,1,40,1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(7,'Auriculares Inalambricos',2000,'Auriculares Inalambricos Logitech G733 Lightspeed RGB Blue',1,1,0,0,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(8,'Placa de Video GeForce',13650,'Placa de Video GeForce MSI G210 1GB DDR3 Low Profile',1,1,40,0,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(9,'Mother Asrock',270450,'Mother Asrock X670E Taichi Carrara AM5',1,1,0,1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(10,'Teclado',22810,'Teclado Mecanico HP HyperX Alloy Origins Core RGB Switch Blue US',1,1,0,1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(11,'Procesador Intel',21600,'Procesador Intel Pentium Gold G6400 4.0GHz Socket 1200',1,1,0,1,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(12,'Mouse Redragon',2350,'Mouse Redragon Centrophorus M601-RGB',1,1,20,0,'2023-04-12 13:24:16','2023-04-12 13:24:16');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'admin','2023-04-12 13:24:16','2023-04-12 13:24:16'),(2,'user','2023-04-12 13:24:16','2023-04-12 13:24:16');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230402194703-create-brand.js'),('20230402194841-create-rol.js'),('20230402194922-create-address.js'),('20230402195347-create-user.js'),('20230402195405-create-cart.js'),('20230402195513-create-category.js'),('20230402195654-create-product.js'),('20230402195727-create-product-image.js'),('20230402195749-create-product-cart.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','test','admin@test.com','$2a$10$cBFUIpbKeVCR3cKSjMHNku1/MJSDkzwRmwYeNiKCDJDXIESM.hL3K',NULL,1,NULL,NULL,'2023-04-12 13:24:16','2023-04-12 13:24:16'),(2,'user','test','user@test.com','$2a$10$NX.dhvlvcd/O3mjtAEYwI.6Sv2f7n.8ocxpKNLUZm6tE7h5Tz./7u',NULL,2,NULL,NULL,'2023-04-12 13:24:16','2023-04-12 13:24:16');
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

-- Dump completed on 2023-04-12 10:29:48
