-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2021 at 06:51 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmovie`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id_booking` int(64) NOT NULL,
  `id_user` varchar(64) NOT NULL,
  `date_booking` date NOT NULL,
  `time_booking` varchar(64) NOT NULL,
  `id_movie` int(11) NOT NULL,
  `id_schedule` int(11) NOT NULL,
  `total_ticket` int(11) NOT NULL,
  `payment_total` int(32) NOT NULL,
  `payment_method` varchar(32) DEFAULT NULL,
  `payment_status` varchar(32) DEFAULT NULL,
  `booking_status` varchar(16) NOT NULL DEFAULT 'not active',
  `payment_url` varchar(128) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id_booking`, `id_user`, `date_booking`, `time_booking`, `id_movie`, `id_schedule`, `total_ticket`, `payment_total`, `payment_method`, `payment_status`, `booking_status`, `payment_url`, `createdAt`, `updatedAt`) VALUES
(88, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-25', '14:40', 4, 10, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/d42b50a5-f051-4ab6-a136-f35cdc943c6a', '2021-10-25 21:47:58', NULL),
(89, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-25', '16:10', 4, 11, 26, 1040000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/6e7d4b13-3e5c-45da-b587-4aa03180e5b5', '2021-10-25 21:50:12', NULL),
(90, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-25', '16:10', 4, 11, 2, 80000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/7aea2627-5a60-4943-9a42-64e836a5554d', '2021-10-25 21:55:32', NULL),
(91, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '13:15', 3, 7, 1, 55000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/7ca96556-f058-4425-b97c-05cd35e30615', '2021-10-25 23:32:54', NULL),
(92, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '13:15', 3, 7, 1, 55000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f0d11d88-f215-4cb1-a14d-b935419077c7', '2021-10-25 23:34:53', NULL),
(93, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '13:15', 3, 7, 1, 55000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/bcf983f6-0d63-439c-80d2-a183587ef76b', '2021-10-25 23:36:59', NULL),
(94, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-25', '13:15', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/61cfae35-5728-4f7b-88e5-23824ab44bda', '2021-10-25 23:37:28', NULL),
(95, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-25', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/73321f27-3518-489c-b08b-e90b5e7c9aee', '2021-10-26 00:22:03', NULL),
(96, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 2, 5, 4, 160000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/4a63da12-692a-45bc-be6e-dbc8e86edfc4', '2021-10-26 09:33:59', NULL),
(97, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 2, 5, 2, 80000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/b68a1282-a5c4-405f-8696-3b42e7121542', '2021-10-26 09:34:20', NULL),
(98, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 2, 5, 3, 120000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/ce0c4e50-61fc-4314-bdf5-03637ddfc656', '2021-10-26 09:34:31', NULL),
(99, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 4, 10, 8, 360000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f8a2c95d-5a86-417f-99a4-701cb70535e4', '2021-10-26 09:39:13', NULL),
(100, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 4, 10, 3, 135000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/95b0d42b-d4a4-472d-b97e-65c2baa90750', '2021-10-26 09:39:24', NULL),
(101, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/54abf59a-aea5-49c1-b10b-5ed6c6431f93', '2021-10-26 09:39:59', NULL),
(102, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 4, 10, 3, 135000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/e8541010-55bb-4706-9f6e-383924c86a19', '2021-10-26 09:40:09', NULL),
(103, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '15:15', 4, 10, 4, 180000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/3721fcfb-5a69-4825-ae33-664257e94b65', '2021-10-26 09:40:21', NULL),
(104, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-27', '15:15', 3, 8, 5, 225000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/241449d0-ccf1-4906-b694-6140054a37b7', '2021-10-26 10:17:43', NULL),
(105, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '16:15', 1, 2, 4, 120000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/874ed954-d836-480d-aa08-7725459e101c', '2021-10-26 10:40:26', NULL),
(106, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-26', '16:10', 2, 5, 3, 120000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/415c42f6-ab79-4be9-b673-47273f609a9a', '2021-10-26 11:09:51', NULL),
(107, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-29', '15:10', 1, 2, 5, 150000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f1bac5b6-a073-4c76-88a0-b4fc282c26f2', '2021-10-26 23:53:25', NULL),
(108, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-27', '16:10', 2, 5, 1, 40000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f15c1a7e-e980-4220-a184-3a64ffb463df', '2021-10-27 12:12:36', NULL),
(109, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-27', '16:10', 2, 5, 2, 80000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/ef60b5b4-6add-4bc2-8be8-a96496e2e971', '2021-10-27 13:19:54', NULL),
(110, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-27', '16:10', 2, 5, 4, 160000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/6a51d83a-ce7b-4529-b11b-64fbb2dbd663', '2021-10-27 13:20:06', NULL),
(111, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-27', '16:10', 2, 5, 5, 200000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/e0da718b-24e7-4565-a2a9-e12b2704e1d1', '2021-10-27 13:20:25', NULL),
(112, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-27', '16:10', 2, 5, 3, 120000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/d87b012e-5cd4-43a1-86d6-b91ea91d4b0d', '2021-10-27 13:30:32', NULL),
(113, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-29', '15:15', 3, 7, 2, 110000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/9e059172-355b-4d1c-aca6-b293f8a1ad9b', '2021-10-29 12:58:40', NULL),
(114, '20d69903-90f1-4945-8140-676b26dff85c', '2021-10-30', '16:10', 2, 5, 1, 40000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f00d25d9-b002-4139-9485-f554913aed62', '2021-10-30 16:28:33', NULL),
(115, 'a30e3369-648f-4531-84b2-cc73ec3fd2a1', '2021-11-04', '15:15', 2, 5, 4, 160000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/1b5fed7b-30a1-4415-a307-b085f7781cad', '2021-11-04 12:56:11', NULL),
(116, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-06-06', '15:45', 3, 8, 3, 135000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/98b2cad7-65be-471b-8284-02ea28f813f5', '2021-12-09 10:53:25', NULL),
(117, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-06-06', '15:45', 3, 8, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/9c3d1afa-40a8-4eaf-9b0b-1fb459122f1b', '2021-12-09 10:57:31', NULL),
(118, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-06-06', '15:45', 3, 8, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/5f008998-fe69-48f3-b034-78d1f80f0855', '2021-12-11 20:16:08', NULL),
(119, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-12-12', '14:40', 4, 10, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/4371decd-16a3-4299-adb4-1c96b69e421d', '2021-12-12 11:28:49', NULL),
(120, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-12-12', '14:40', 4, 10, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/c5de965d-ba70-4a8a-a7b2-51202d024963', '2021-12-12 11:28:50', NULL),
(121, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-12-12', '13:15', 4, 10, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/836d686e-ef69-4f9c-814f-3a6e1b7d9fc8', '2021-12-12 11:30:32', NULL),
(122, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/3b37a6c8-87d7-4cc6-8fd2-7f4fa667cb3d', '2021-12-12 11:35:28', NULL),
(123, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/afcf4e41-e27a-46c8-a57b-aa53f51ee0a8', '2021-12-12 11:46:43', NULL),
(124, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/7222d1a7-edaa-47c1-a9e3-34fa8ff9ac53', '2021-12-12 11:59:31', NULL),
(125, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/5f19b704-2ebf-4892-bb61-cb9a5437a885', '2021-12-12 12:19:06', NULL),
(126, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '14:20', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/fdb9393d-70c5-41c5-8f67-942733b506e0', '2021-12-12 12:26:49', NULL),
(127, 'cc21bbec-daf0-422b-92a2-35b67a56624e', '2021-12-12', '13:00', 2, 4, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/ce55331f-75f6-47d6-be1b-0a45259f9acc', '2021-12-12 12:36:55', NULL),
(128, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/97ff6390-7d00-4e85-b575-37299be5639a', '2021-12-12 12:37:53', NULL),
(129, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/060e1d84-9196-4f56-8e60-ec7dff8660e0', '2021-12-12 12:38:16', NULL),
(130, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/7ca2f9d3-b023-44e5-9788-6439d6a40c4f', '2021-12-12 12:40:37', NULL),
(131, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-12', '15:15', 4, 10, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/60ca6a42-1c26-47ce-906c-1f3f37a66966', '2021-12-12 13:28:40', NULL),
(132, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 3, 135000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/18f3900f-e0da-44a5-9911-c35a155f396c', '2021-12-12 16:28:13', NULL),
(133, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '14:20', 2, 4, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/1bd45dd7-0735-4c2a-ac98-f62da3657bd8', '2021-12-12 16:29:50', NULL),
(134, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/734346ae-eebd-4941-9639-6a27ab329724', '2021-12-12 16:47:49', NULL),
(135, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/c2553ebb-7daf-44ff-8a62-62ae0b822943', '2021-12-12 16:51:21', NULL),
(136, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/1492838b-ff39-4097-b6f5-349a0e6b9283', '2021-12-12 16:51:58', NULL),
(137, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/cb0bc0d9-0413-483b-aa5b-7b0b402463e5', '2021-12-12 16:52:11', NULL),
(138, '0d48b1aa-f42a-4403-be9a-e4bad4e10685', '2021-12-12', '13:00', 2, 4, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/6fa7f5bb-07d6-4d16-982b-5ec460bcb009', '2021-12-12 16:57:17', NULL),
(139, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '13:00', 2, 4, 4, 180000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/d986ba50-e848-48c1-8a5c-bdf3cbfc0da0', '2021-12-12 20:47:51', NULL),
(140, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '13:00', 2, 4, 4, 180000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/a14a200b-d4d8-4cae-94dd-59453c725a22', '2021-12-12 20:48:39', NULL),
(141, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f28af49d-fb56-425d-9cbf-5e8224fdf8e2', '2021-12-12 20:49:31', NULL),
(142, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f9daf768-d8cd-466b-8b53-33cef24c6fe4', '2021-12-12 20:49:37', NULL),
(143, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/c5cd0384-9a8b-4740-bbdf-a64d7faf46e3', '2021-12-12 20:50:12', NULL),
(144, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/d25d867d-4101-4e1a-a8f4-e24b26aee5fd', '2021-12-12 20:50:47', NULL),
(145, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/cda1a187-3d76-459c-add0-cccbf4636e89', '2021-12-12 20:51:53', NULL),
(146, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/a346ad02-e742-44b3-8413-9a3f60b1c4bf', '2021-12-12 20:52:17', NULL),
(147, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/92b47257-eb87-476c-b722-908c8d1d5631', '2021-12-12 20:53:40', NULL),
(148, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-13', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/58c50505-1551-4d04-ac21-e39b36437055', '2021-12-12 20:55:20', NULL),
(149, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-12', '14:40', 4, 10, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/9c46fa91-defe-46e6-9398-59b4fe56edae', '2021-12-12 21:00:22', NULL),
(150, '211b4801-dc02-4c62-9c06-1910f9176993', '2021-12-12', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f7f8f136-7a47-4b03-918e-d72b1a8045a8', '2021-12-12 21:02:03', NULL),
(151, '1e42246b-f26c-4644-8333-604dc4a45eec', '2021-12-14', '14:40', 4, 10, 2, 90000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/743e2e6f-799a-4530-bc28-16e282dc7a22', '2021-12-13 11:03:07', NULL),
(152, '1e42246b-f26c-4644-8333-604dc4a45eec', '2021-12-14', '14:40', 4, 10, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/be163fa4-6521-4b58-8612-e77e7ded237f', '2021-12-13 11:12:49', NULL),
(153, '1e42246b-f26c-4644-8333-604dc4a45eec', '2021-12-13', '14:40', 4, 12, 1, 45000, NULL, NULL, 'not active', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/c1fa0dd4-07a9-4c86-ac06-39c51bc04ccc', '2021-12-13 11:23:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking2`
--

CREATE TABLE `booking2` (
  `id_booking` varchar(64) NOT NULL,
  `id_user` varchar(64) NOT NULL,
  `date_booking` date NOT NULL,
  `time_booking` varchar(64) NOT NULL,
  `id_movie` int(11) NOT NULL,
  `id_schedule` int(11) NOT NULL,
  `total_ticket` int(11) NOT NULL,
  `payment_total` int(32) NOT NULL,
  `payment_method` varchar(32) DEFAULT NULL,
  `payment_status` varchar(32) DEFAULT NULL,
  `booking_status` varchar(16) NOT NULL DEFAULT 'not active',
  `payment_url` varchar(128) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking2`
--

INSERT INTO `booking2` (`id_booking`, `id_user`, `date_booking`, `time_booking`, `id_movie`, `id_schedule`, `total_ticket`, `payment_total`, `payment_method`, `payment_status`, `booking_status`, `payment_url`, `createdAt`, `updatedAt`) VALUES
('', '0c7fae49-8acd-4d42-8705-213ea4ab2786', '2021-06-06', '15:45', 1, 2, 1, 30000, NULL, NULL, 'not active', NULL, '2021-10-09 12:52:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id_movie` int(11) NOT NULL,
  `movie_name` varchar(64) NOT NULL,
  `director` varchar(64) NOT NULL,
  `releaseDate` date NOT NULL,
  `category` varchar(128) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cast` varchar(128) NOT NULL,
  `duration` varchar(16) NOT NULL,
  `synopsis` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id_movie`, `movie_name`, `director`, `releaseDate`, `category`, `image`, `cast`, `duration`, `synopsis`, `createdAt`, `updatedAt`) VALUES
(1, 'Spider-Man:Homecoming', 'Jon Watts', '2021-04-22', 'action', '2021-12-25T17-29-22.139Zspiderman.jpg', 'Tom Holland, Michael Keato', '2 hour 13 minute', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to ', '2021-09-25 10:22:55', '2021-10-25 17:29:22'),
(2, 'Black Widow', 'Jon Watts', '2021-12-12', 'action', '2021-10-25T17-30-25.361Zmv6.jpg', 'Tom Holland, Michael Keato', '2 hour 09 minute', 'Thrilled by his experience with the Avengers, Peter returns home, where he\n', '2021-09-25 10:23:54', '2021-11-04 05:55:28'),
(3, 'Lacasa de Papel', 'Jon Watts', '2020-12-17', 'crime, drama', '2021-10-25T17-32-19.029Zlacasa.jpg', 'alvaro morte, usrsula cobero', '70 minutes', 'To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose. Five months of seclusion – memorizing every step, every detail, every pr', '2021-09-25 10:24:31', '2021-10-25 17:32:19'),
(4, 'Fast and Furious 9', 'Chris Morgan; Daniel Casey', '2020-12-03', 'action', '2021-11-01T15-37-29.277Zfast9.jpg', 'Vin Diesel, Justin Lin, Samantha Vincent', '2 hours 09 minut', 'Dom Toretto (Vin Diesel) menjalani kehidupan yang tenang dengan Letty dan putranya, Brian kecil, tetapi mereka tahu bahwa bahaya selalu mengintai. Kali ini, ancaman itu akan memaksa Dom untuk menghadapi kesalahan dari masa lalunya jika dia ingin menyelama', '2021-09-25 10:25:24', '2021-11-03 13:33:35'),
(5, 'Upin & Ipin: Keris Siamang Tunggal', 'Adam Amiruddin, Syed Nurfaiz Khalid Syed Ibrahim', '2020-10-04', 'cartoon', '2021-10-25T17-37-14.609Zupin.jpg', 'Ahmad Razuri Roseli, Asyiela Putri', '2 hours 09 minut', 'Upin & Ipin: Keris Siamang Tunggal adalah film petualangan dan fantasi terbaru dari Upin & Ipin dan keenam sahabatnya: Ehsan, Fizi, Mail, Jarjit, Mei Mei, dan Susanti dalam menyelamatkan kerajaan fantasi Inderaloka dari ancaman musuhnya, Raja Bersiong yan', '2021-09-25 10:26:30', '2021-10-25 17:37:14'),
(7, 'Stand by Me Doraemon 2', 'Takashi Yamazaki, Ryuichi Yagi', '2020-02-19', 'cartoon, anime', '2021-10-25T17-39-34.720Zdoraemon.jpg', 'Shirogumi; Robot Communications; Shin-Ei Animation', '2 hours 09 minut', 'Suatu hari Nobita menemukan boneka beruang yang ditambal jahit tangan oleh nenek tercinta. Hal tersebut memicu kenangan mengharukan untuknya dan menanyakan kepada Doraemon apakah mereka dapat menggunakan mesin waktu untuk mengunjungi Nenek di masa lampau.', '2021-09-27 06:52:21', '2021-11-02 06:13:37'),
(19, 'ipin 2020', 'Takashi Yamazaki', '2021-07-13', 'animation, anime', '2021-09-30T08-18-09.230Znodejs.png', 'Wasabi Mizuta', '90 minutes', 'In the suburbs of Tokyo some time ago, there lived a clumsy boy about 10 years old. There appeared in front of him named Sewashi, Nobita’s descendant of four generations later from the 22nd century, and Doraemon, a 22nd century cat-type caretaker robot wh', '2021-09-30 07:39:39', '2021-11-03 08:34:09'),
(20, 'baru banget ', 'Takashi Yamazaki', '2021-07-22', 'baru juga', '2021-09-30T16-00-14.998Znodejs.png', 'Wasabi Mizuta', '90 minutes', 'In the suburbs of Tokyo some time ago, there lived a clumsy boy about 10 years old. There appeared in front of him named Sewashi, Nobita’s descendant of four generations later from the 22nd century, and Doraemon, a 22nd century cat-type caretaker robot wh', '2021-09-30 16:00:15', '2021-11-04 04:40:35');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id_schedule` int(11) NOT NULL,
  `id_movie` int(11) NOT NULL,
  `teater_name` varchar(128) NOT NULL,
  `price` int(8) NOT NULL,
  `location` varchar(128) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `time_schedule` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id_schedule`, `id_movie`, `teater_name`, `price`, `location`, `date_start`, `date_end`, `time_schedule`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'cinepolis', 50000, 'jakarta', '2021-06-02', '2021-07-08', '13:20,14:25,15:10,16:15', '2021-09-25 19:46:14', NULL),
(2, 1, 'hiflix', 30000, 'jakarta', '2021-06-02', '2021-07-08', '13:20,14:25,15:10,16:15', '2021-09-25 19:46:36', '2021-09-25 19:56:30'),
(3, 1, 'hiflix', 45000, 'bandung', '2021-06-02', '2021-07-08', '13:20,14:25,15:10,16:15', '2021-09-25 19:46:57', NULL),
(4, 2, 'hiflix', 45000, 'jakarta', '2021-06-12', '2021-07-18', '13:00,14:20,15:10,16:10', '2021-09-25 19:48:23', NULL),
(5, 2, 'cinepolis', 40000, 'jakarta', '2021-06-11', '2021-07-09', '13:15,14:40,15:15,16:10', '2021-09-25 19:49:13', NULL),
(7, 3, 'ebu.id', 55000, 'bandung', '2021-06-21', '2021-07-15', '13:15,14:40,15:15,16:10', '2021-09-25 19:50:07', NULL),
(8, 3, 'cinepolis', 45000, 'bandung', '2021-06-21', '2021-07-15', '13:15,14:40,15:15,16:10', '2021-09-25 19:50:27', NULL),
(9, 3, 'hiflix', 55000, 'bogor', '2021-06-21', '2021-07-15', '13:15,14:40,15:15,16:10', '2021-09-25 19:50:52', NULL),
(10, 4, 'hiflix', 45000, 'bogor', '2021-07-11', '2021-08-22', '13:15,14:40,15:15,16:10', '2021-09-25 19:51:20', '2021-09-30 15:14:10'),
(11, 4, 'ebu.id', 40000, 'bogor', '2021-07-12', '2021-08-21', '13:15,14:40,15:15,16:10', '2021-09-25 19:52:55', NULL),
(12, 4, 'cinepolis', 45000, 'bandung', '2021-07-12', '2021-08-21', '13:15,14:40,15:15,16:10', '2021-09-25 19:53:21', NULL),
(13, 5, 'cinepolis', 45000, 'jakarta', '2021-07-25', '2021-08-30', '13:15,14:40,15:15,16:10', '2021-09-25 19:54:06', NULL),
(14, 5, 'hiflix', 55000, 'jakarta', '2021-07-22', '2021-08-28', '13:15,14:40,15:15,16:10', '2021-09-25 19:54:36', NULL),
(15, 5, 'ebu.id', 50000, 'jakarta', '2021-07-22', '2021-08-28', '13:00,14:20,15:10,15:45', '2021-09-25 19:55:16', NULL),
(16, 6, 'coba', 50000, 'jakarta', '2021-07-22', '2021-08-28', '13:00,14:20,15:10,15:45', '2021-09-25 19:56:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seatbooking`
--

CREATE TABLE `seatbooking` (
  `id_seat` int(11) NOT NULL,
  `id_booking` int(11) NOT NULL,
  `id_schedule` int(11) NOT NULL,
  `id_movie` int(11) NOT NULL,
  `date_booking` date NOT NULL,
  `time_booking` varchar(128) NOT NULL,
  `seat` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seatbooking`
--

INSERT INTO `seatbooking` (`id_seat`, `id_booking`, `id_schedule`, `id_movie`, `date_booking`, `time_booking`, `seat`, `createdAt`, `updatedAt`) VALUES
(176, 88, 10, 4, '2021-10-25', '14:40', 'E7', '2021-10-25 21:47:58', NULL),
(177, 89, 11, 4, '2021-10-25', '16:10', 'E7', '2021-10-25 21:50:12', NULL),
(178, 89, 11, 4, '2021-10-25', '16:10', 'E8', '2021-10-25 21:50:12', NULL),
(179, 89, 11, 4, '2021-10-25', '16:10', 'E9', '2021-10-25 21:50:12', NULL),
(180, 89, 11, 4, '2021-10-25', '16:10', 'E10', '2021-10-25 21:50:12', NULL),
(181, 89, 11, 4, '2021-10-25', '16:10', 'E11', '2021-10-25 21:50:12', NULL),
(182, 89, 11, 4, '2021-10-25', '16:10', 'E6', '2021-10-25 21:50:12', NULL),
(183, 89, 11, 4, '2021-10-25', '16:10', 'E5', '2021-10-25 21:50:12', NULL),
(184, 89, 11, 4, '2021-10-25', '16:10', 'E4', '2021-10-25 21:50:12', NULL),
(185, 89, 11, 4, '2021-10-25', '16:10', 'E3', '2021-10-25 21:50:12', NULL),
(186, 89, 11, 4, '2021-10-25', '16:10', 'E2', '2021-10-25 21:50:12', NULL),
(187, 89, 11, 4, '2021-10-25', '16:10', 'F7', '2021-10-25 21:50:12', NULL),
(188, 89, 11, 4, '2021-10-25', '16:10', 'F5', '2021-10-25 21:50:12', NULL),
(189, 89, 11, 4, '2021-10-25', '16:10', 'F4', '2021-10-25 21:50:12', NULL),
(190, 89, 11, 4, '2021-10-25', '16:10', 'F3', '2021-10-25 21:50:12', NULL),
(191, 89, 11, 4, '2021-10-25', '16:10', 'F2', '2021-10-25 21:50:12', NULL),
(192, 89, 11, 4, '2021-10-25', '16:10', 'F1', '2021-10-25 21:50:12', NULL),
(193, 89, 11, 4, '2021-10-25', '16:10', 'G1', '2021-10-25 21:50:12', NULL),
(194, 89, 11, 4, '2021-10-25', '16:10', 'G2', '2021-10-25 21:50:12', NULL),
(195, 89, 11, 4, '2021-10-25', '16:10', 'G3', '2021-10-25 21:50:12', NULL),
(196, 89, 11, 4, '2021-10-25', '16:10', 'G4', '2021-10-25 21:50:12', NULL),
(197, 89, 11, 4, '2021-10-25', '16:10', 'G5', '2021-10-25 21:50:12', NULL),
(198, 89, 11, 4, '2021-10-25', '16:10', 'G6', '2021-10-25 21:50:12', NULL),
(199, 89, 11, 4, '2021-10-25', '16:10', 'G8', '2021-10-25 21:50:12', NULL),
(200, 89, 11, 4, '2021-10-25', '16:10', 'G9', '2021-10-25 21:50:12', NULL),
(201, 89, 11, 4, '2021-10-25', '16:10', 'G10', '2021-10-25 21:50:12', NULL),
(202, 89, 11, 4, '2021-10-25', '16:10', 'G11', '2021-10-25 21:50:12', NULL),
(203, 90, 11, 4, '2021-10-25', '16:10', 'F9', '2021-10-25 21:55:32', NULL),
(204, 90, 11, 4, '2021-10-25', '16:10', 'F8', '2021-10-25 21:55:32', NULL),
(205, 91, 7, 3, '2021-10-26', '13:15', 'G8', '2021-10-25 23:32:54', NULL),
(206, 92, 7, 3, '2021-10-26', '13:15', 'G8', '2021-10-25 23:34:53', NULL),
(207, 93, 7, 3, '2021-10-26', '13:15', 'G8', '2021-10-25 23:36:59', NULL),
(208, 94, 10, 4, '2021-10-25', '13:15', 'E7', '2021-10-25 23:37:28', NULL),
(209, 94, 10, 4, '2021-10-25', '13:15', 'E8', '2021-10-25 23:37:28', NULL),
(210, 95, 10, 4, '2021-10-25', '14:40', 'F7', '2021-10-26 00:22:03', NULL),
(211, 95, 10, 4, '2021-10-25', '14:40', 'F6', '2021-10-26 00:22:03', NULL),
(212, 96, 5, 2, '2021-10-26', '15:15', 'E7', '2021-10-26 09:33:59', NULL),
(213, 96, 5, 2, '2021-10-26', '15:15', 'E6', '2021-10-26 09:33:59', NULL),
(214, 96, 5, 2, '2021-10-26', '15:15', 'E5', '2021-10-26 09:33:59', NULL),
(215, 96, 5, 2, '2021-10-26', '15:15', 'F8', '2021-10-26 09:33:59', NULL),
(216, 97, 5, 2, '2021-10-26', '15:15', 'G8', '2021-10-26 09:34:20', NULL),
(217, 97, 5, 2, '2021-10-26', '15:15', 'G9', '2021-10-26 09:34:20', NULL),
(218, 98, 5, 2, '2021-10-26', '15:15', 'F9', '2021-10-26 09:34:31', NULL),
(219, 98, 5, 2, '2021-10-26', '15:15', 'F10', '2021-10-26 09:34:31', NULL),
(220, 98, 5, 2, '2021-10-26', '15:15', 'F11', '2021-10-26 09:34:31', NULL),
(221, 99, 10, 4, '2021-10-26', '15:15', 'F7', '2021-10-26 09:39:13', NULL),
(222, 99, 10, 4, '2021-10-26', '15:15', 'F5', '2021-10-26 09:39:13', NULL),
(223, 99, 10, 4, '2021-10-26', '15:15', 'G6', '2021-10-26 09:39:13', NULL),
(224, 99, 10, 4, '2021-10-26', '15:15', 'F4', '2021-10-26 09:39:13', NULL),
(225, 99, 10, 4, '2021-10-26', '15:15', 'F10', '2021-10-26 09:39:13', NULL),
(226, 99, 10, 4, '2021-10-26', '15:15', 'E11', '2021-10-26 09:39:13', NULL),
(227, 99, 10, 4, '2021-10-26', '15:15', 'F8', '2021-10-26 09:39:13', NULL),
(228, 99, 10, 4, '2021-10-26', '15:15', 'G5', '2021-10-26 09:39:13', NULL),
(229, 100, 10, 4, '2021-10-26', '15:15', 'G9', '2021-10-26 09:39:24', NULL),
(230, 100, 10, 4, '2021-10-26', '15:15', 'G10', '2021-10-26 09:39:24', NULL),
(231, 100, 10, 4, '2021-10-26', '15:15', 'G8', '2021-10-26 09:39:24', NULL),
(232, 101, 10, 4, '2021-10-26', '15:15', 'E4', '2021-10-26 09:39:59', NULL),
(233, 101, 10, 4, '2021-10-26', '15:15', 'E3', '2021-10-26 09:39:59', NULL),
(234, 102, 10, 4, '2021-10-26', '15:15', 'E6', '2021-10-26 09:40:09', NULL),
(235, 102, 10, 4, '2021-10-26', '15:15', 'E7', '2021-10-26 09:40:09', NULL),
(236, 102, 10, 4, '2021-10-26', '15:15', 'E8', '2021-10-26 09:40:09', NULL),
(237, 103, 10, 4, '2021-10-26', '15:15', 'F6', '2021-10-26 09:40:21', NULL),
(238, 103, 10, 4, '2021-10-26', '15:15', 'G7', '2021-10-26 09:40:21', NULL),
(239, 103, 10, 4, '2021-10-26', '15:15', 'F9', '2021-10-26 09:40:21', NULL),
(240, 103, 10, 4, '2021-10-26', '15:15', 'E9', '2021-10-26 09:40:21', NULL),
(241, 104, 8, 3, '2021-10-27', '15:15', 'F6', '2021-10-26 10:17:43', NULL),
(242, 104, 8, 3, '2021-10-27', '15:15', 'F7', '2021-10-26 10:17:43', NULL),
(243, 104, 8, 3, '2021-10-27', '15:15', 'F8', '2021-10-26 10:17:43', NULL),
(244, 104, 8, 3, '2021-10-27', '15:15', 'F9', '2021-10-26 10:17:43', NULL),
(245, 104, 8, 3, '2021-10-27', '15:15', 'F10', '2021-10-26 10:17:43', NULL),
(246, 105, 2, 1, '2021-10-26', '16:15', 'F6', '2021-10-26 10:40:26', NULL),
(247, 105, 2, 1, '2021-10-26', '16:15', 'F7', '2021-10-26 10:40:26', NULL),
(248, 105, 2, 1, '2021-10-26', '16:15', 'G6', '2021-10-26 10:40:26', NULL),
(249, 105, 2, 1, '2021-10-26', '16:15', 'G7', '2021-10-26 10:40:26', NULL),
(250, 106, 5, 2, '2021-10-26', '16:10', 'D5', '2021-10-26 11:09:51', NULL),
(251, 106, 5, 2, '2021-10-26', '16:10', 'D6', '2021-10-26 11:09:51', NULL),
(252, 106, 5, 2, '2021-10-26', '16:10', 'D7', '2021-10-26 11:09:51', NULL),
(253, 107, 2, 1, '2021-10-29', '15:10', 'E6', '2021-10-26 23:53:25', NULL),
(254, 107, 2, 1, '2021-10-29', '15:10', 'E3', '2021-10-26 23:53:25', NULL),
(255, 107, 2, 1, '2021-10-29', '15:10', 'E5', '2021-10-26 23:53:25', NULL),
(256, 107, 2, 1, '2021-10-29', '15:10', 'E4', '2021-10-26 23:53:25', NULL),
(257, 107, 2, 1, '2021-10-29', '15:10', 'E9', '2021-10-26 23:53:26', NULL),
(258, 108, 5, 2, '2021-10-27', '16:10', 'E10', '2021-10-27 12:12:36', NULL),
(259, 109, 5, 2, '2021-10-27', '16:10', 'F7', '2021-10-27 13:19:54', NULL),
(260, 109, 5, 2, '2021-10-27', '16:10', 'F6', '2021-10-27 13:19:54', NULL),
(261, 110, 5, 2, '2021-10-27', '16:10', 'G9', '2021-10-27 13:20:06', NULL),
(262, 110, 5, 2, '2021-10-27', '16:10', 'G10', '2021-10-27 13:20:06', NULL),
(263, 110, 5, 2, '2021-10-27', '16:10', 'G11', '2021-10-27 13:20:06', NULL),
(264, 110, 5, 2, '2021-10-27', '16:10', 'G8', '2021-10-27 13:20:06', NULL),
(265, 111, 5, 2, '2021-10-27', '16:10', 'G4', '2021-10-27 13:20:25', NULL),
(266, 111, 5, 2, '2021-10-27', '16:10', 'G3', '2021-10-27 13:20:25', NULL),
(267, 111, 5, 2, '2021-10-27', '16:10', 'F4', '2021-10-27 13:20:25', NULL),
(268, 111, 5, 2, '2021-10-27', '16:10', 'G5', '2021-10-27 13:20:25', NULL),
(269, 111, 5, 2, '2021-10-27', '16:10', 'F3', '2021-10-27 13:20:25', NULL),
(270, 112, 5, 2, '2021-10-27', '16:10', 'E5', '2021-10-27 13:30:32', NULL),
(271, 112, 5, 2, '2021-10-27', '16:10', 'E4', '2021-10-27 13:30:32', NULL),
(272, 112, 5, 2, '2021-10-27', '16:10', 'E6', '2021-10-27 13:30:32', NULL),
(273, 113, 7, 3, '2021-10-29', '15:15', 'F8', '2021-10-29 12:58:40', NULL),
(274, 113, 7, 3, '2021-10-29', '15:15', 'F7', '2021-10-29 12:58:40', NULL),
(275, 114, 5, 2, '2021-10-30', '16:10', 'D8', '2021-10-30 16:28:33', NULL),
(276, 115, 5, 2, '2021-11-04', '15:15', 'F7', '2021-11-04 12:56:11', NULL),
(277, 115, 5, 2, '2021-11-04', '15:15', 'F12', '2021-11-04 12:56:11', NULL),
(278, 115, 5, 2, '2021-11-04', '15:15', 'F13', '2021-11-04 12:56:11', NULL),
(279, 115, 5, 2, '2021-11-04', '15:15', 'F14', '2021-11-04 12:56:11', NULL),
(280, 116, 8, 3, '2021-06-06', '15:45', 'e9', '2021-12-09 10:53:25', NULL),
(281, 116, 8, 3, '2021-06-06', '15:45', 'e10', '2021-12-09 10:53:25', NULL),
(282, 116, 8, 3, '2021-06-06', '15:45', 'e11', '2021-12-09 10:53:25', NULL),
(283, 117, 8, 3, '2021-06-06', '15:45', 'e9', '2021-12-09 10:57:31', NULL),
(284, 117, 8, 3, '2021-06-06', '15:45', 'e10', '2021-12-09 10:57:31', NULL),
(285, 118, 8, 3, '2021-06-06', '15:45', 'e9', '2021-12-11 20:16:08', NULL),
(286, 118, 8, 3, '2021-06-06', '15:45', 'e10', '2021-12-11 20:16:08', NULL),
(287, 119, 10, 4, '2021-12-12', '14:40', 'G7', '2021-12-12 11:28:49', NULL),
(288, 120, 10, 4, '2021-12-12', '14:40', 'G7', '2021-12-12 11:28:50', NULL),
(289, 121, 10, 4, '2021-12-12', '13:15', 'G7', '2021-12-12 11:30:32', NULL),
(290, 122, 4, 2, '2021-12-12', '13:00', 'G7', '2021-12-12 11:35:28', NULL),
(291, 123, 4, 2, '2021-12-12', '13:00', 'E3', '2021-12-12 11:46:43', NULL),
(292, 124, 4, 2, '2021-12-12', '13:00', 'B8', '2021-12-12 11:59:31', NULL),
(293, 125, 4, 2, '2021-12-12', '13:00', 'C4', '2021-12-12 12:19:06', NULL),
(294, 125, 4, 2, '2021-12-12', '13:00', 'C5', '2021-12-12 12:19:06', NULL),
(295, 126, 4, 2, '2021-12-12', '14:20', 'G6', '2021-12-12 12:26:49', NULL),
(296, 127, 4, 2, '2021-12-12', '13:00', 'E11', '2021-12-12 12:36:55', NULL),
(297, 127, 4, 2, '2021-12-12', '13:00', 'E12', '2021-12-12 12:36:55', NULL),
(298, 128, 4, 2, '2021-12-12', '13:00', 'D8', '2021-12-12 12:37:53', NULL),
(299, 128, 4, 2, '2021-12-12', '13:00', 'D9', '2021-12-12 12:37:53', NULL),
(300, 129, 4, 2, '2021-12-12', '13:00', 'F11', '2021-12-12 12:38:16', NULL),
(301, 130, 4, 2, '2021-12-12', '13:00', 'C12', '2021-12-12 12:40:37', NULL),
(302, 131, 10, 4, '2021-12-12', '15:15', 'F8', '2021-12-12 13:28:40', NULL),
(303, 132, 4, 2, '2021-12-12', '13:00', 'G1', '2021-12-12 16:28:13', NULL),
(304, 132, 4, 2, '2021-12-12', '13:00', 'F1', '2021-12-12 16:28:13', NULL),
(305, 132, 4, 2, '2021-12-12', '13:00', 'E1', '2021-12-12 16:28:13', NULL),
(306, 133, 4, 2, '2021-12-12', '14:20', 'E6', '2021-12-12 16:29:50', NULL),
(307, 133, 4, 2, '2021-12-12', '14:20', 'E7', '2021-12-12 16:29:50', NULL),
(308, 134, 4, 2, '2021-12-12', '13:00', 'G9', '2021-12-12 16:47:49', NULL),
(309, 134, 4, 2, '2021-12-12', '13:00', 'G10', '2021-12-12 16:47:49', NULL),
(310, 135, 4, 2, '2021-12-12', '13:00', 'G13', '2021-12-12 16:51:21', NULL),
(311, 136, 4, 2, '2021-12-12', '13:00', 'G13', '2021-12-12 16:51:58', NULL),
(312, 137, 4, 2, '2021-12-12', '13:00', 'G13', '2021-12-12 16:52:11', NULL),
(313, 138, 4, 2, '2021-12-12', '13:00', 'G6', '2021-12-12 16:57:17', NULL),
(314, 139, 4, 2, '2021-12-13', '13:00', 'G7', '2021-12-12 20:47:51', NULL),
(315, 139, 4, 2, '2021-12-13', '13:00', 'F6', '2021-12-12 20:47:51', NULL),
(316, 139, 4, 2, '2021-12-13', '13:00', 'G4', '2021-12-12 20:47:51', NULL),
(317, 139, 4, 2, '2021-12-13', '13:00', 'G3', '2021-12-12 20:47:51', NULL),
(318, 140, 4, 2, '2021-12-13', '13:00', 'G7', '2021-12-12 20:48:39', NULL),
(319, 140, 4, 2, '2021-12-13', '13:00', 'F6', '2021-12-12 20:48:39', NULL),
(320, 140, 4, 2, '2021-12-13', '13:00', 'G4', '2021-12-12 20:48:39', NULL),
(321, 140, 4, 2, '2021-12-13', '13:00', 'G3', '2021-12-12 20:48:39', NULL),
(322, 141, 10, 4, '2021-12-13', '14:40', 'E5', '2021-12-12 20:49:31', NULL),
(323, 141, 10, 4, '2021-12-13', '14:40', 'E6', '2021-12-12 20:49:31', NULL),
(324, 142, 10, 4, '2021-12-13', '14:40', 'E5', '2021-12-12 20:49:37', NULL),
(325, 142, 10, 4, '2021-12-13', '14:40', 'E6', '2021-12-12 20:49:37', NULL),
(326, 143, 10, 4, '2021-12-13', '14:40', 'F8', '2021-12-12 20:50:12', NULL),
(327, 143, 10, 4, '2021-12-13', '14:40', 'F9', '2021-12-12 20:50:12', NULL),
(328, 144, 10, 4, '2021-12-13', '14:40', 'G7', '2021-12-12 20:50:47', NULL),
(329, 144, 10, 4, '2021-12-13', '14:40', 'F7', '2021-12-12 20:50:47', NULL),
(330, 145, 10, 4, '2021-12-13', '14:40', 'G6', '2021-12-12 20:51:53', NULL),
(331, 145, 10, 4, '2021-12-13', '14:40', 'F4', '2021-12-12 20:51:53', NULL),
(332, 146, 10, 4, '2021-12-13', '14:40', 'D8', '2021-12-12 20:52:17', NULL),
(333, 146, 10, 4, '2021-12-13', '14:40', 'D9', '2021-12-12 20:52:17', NULL),
(334, 147, 10, 4, '2021-12-13', '14:40', 'G9', '2021-12-12 20:53:40', NULL),
(335, 147, 10, 4, '2021-12-13', '14:40', 'G10', '2021-12-12 20:53:40', NULL),
(336, 148, 10, 4, '2021-12-13', '14:40', 'E10', '2021-12-12 20:55:20', NULL),
(337, 148, 10, 4, '2021-12-13', '14:40', 'E11', '2021-12-12 20:55:20', NULL),
(338, 149, 10, 4, '2021-12-12', '14:40', 'E5', '2021-12-12 21:00:22', NULL),
(339, 150, 10, 4, '2021-12-12', '14:40', 'F11', '2021-12-12 21:02:03', NULL),
(340, 150, 10, 4, '2021-12-12', '14:40', 'F10', '2021-12-12 21:02:03', NULL),
(341, 151, 10, 4, '2021-12-14', '14:40', 'E4', '2021-12-13 11:03:07', NULL),
(342, 151, 10, 4, '2021-12-14', '14:40', 'E5', '2021-12-13 11:03:07', NULL),
(343, 152, 10, 4, '2021-12-14', '14:40', 'F7', '2021-12-13 11:12:50', NULL),
(344, 153, 12, 4, '2021-12-13', '14:40', 'G6', '2021-12-13 11:23:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(255) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `role` varchar(16) NOT NULL DEFAULT 'user',
  `status` varchar(16) DEFAULT 'notActive',
  `cretedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `password`, `first_name`, `last_name`, `user_image`, `role`, `status`, `cretedAt`, `updatedAt`) VALUES
('0c7fae49-8acd-4d42-8705-213ea4ab2786', 'admin01@gmail.com', '$2b$12$lXj9aZn4.sBhNghggygLWOmjuP5MpfVE77DHeicqW8IlcwRE5y4Ba', 'Admin', 'Satu', '2021-11-03T08-31-20.560Zpatrick.jpg', 'admin', 'active', '2021-09-28 15:42:31', '2021-11-03 09:11:13'),
('0d48b1aa-f42a-4403-be9a-e4bad4e10685', 'user02@gmail.com', '$2b$12$UadTUpu4v6cQtq7kM4JhxOmOeGcQCvsR.R38XPVAccR4s3Jl3Q1Xq', 'user2', 'dua', NULL, 'user', 'active', '2021-09-30 09:35:16', '2021-09-30 09:54:04'),
('1e42246b-f26c-4644-8333-604dc4a45eec', 'lepakdev@gmail.com', '$2b$12$/Il8pznhZd8ZqmCPLpY3jOv6.9mzhjsxJyeZ5Njo22Kko9KaiAg7e', 'fikria', 'nadif', NULL, 'user', 'active', '2021-12-13 04:00:31', '2021-12-13 04:05:10'),
('211b4801-dc02-4c62-9c06-1910f9176993', 'user03@gmail.com', '$2b$12$UadTUpu4v6cQtq7kM4JhxOmOeGcQCvsR.R38XPVAccR4s3Jl3Q1Xq', 'user3', 'tiga', '2021-10-07T09-20-04.853Zwa.jpeg', 'user', 'active', '2021-09-30 05:49:44', '2021-10-07 09:20:04'),
('6a1f36c2-0079-4fa3-b462-0b8f1c2b0f64', 'user04@gmail.com', '$2b$12$WqibbORT050URU3eEJfbMOy87s9znpjNvrLMLxxdlp.4u.NFDFPTG', 'user4', 'empat', NULL, 'user', 'notActive', '2021-09-28 04:17:10', '2021-09-30 09:51:05'),
('777727f3-c5c3-4f59-aa2c-d4ced7abe8ae', 'user05@gmail.com', '$2b$12$ypAVS5j9gBaEP7JISIHmq.nK2HKnvzCGUbbEjX0iCPBB0mKm8VppW', 'user5', 'lima', NULL, 'user', 'notActive', '2021-09-28 04:11:11', '2021-09-30 09:48:40'),
('78e852ab-5093-4e4d-8f57-1b0137372e90', 'user7@gmail.com', '$2b$12$1k2DYNJVn4H9MX9XO02xJegtiLE7SZTyBbw316.O9.l7rHl7oZTbW', 'user07', 'tujuh', '2021-10-01T08-50-58.293Zwa.jpeg', 'user', 'notActive', '2021-10-01 07:37:53', NULL),
('a30e3369-648f-4531-84b2-cc73ec3fd2a1', 'amdfikri35@gmail.com', '$2b$12$gwiFAEHZmUgaCLTOy1v7zOKmWckgLWrpZqqzzOAUQEJ/IWsnLugd2', 'fikri', 'nadzif', NULL, 'user', 'active', '2021-11-04 04:37:44', NULL),
('cc21bbec-daf0-422b-92a2-35b67a56624e', 'fikrinadzif35@gmail.com', '$2b$12$OhuweGMoW37YnCrkRF2/beO7dbAdVrclaiSNkXK1.nMEtFMP43eKW', 'fikri', 'awok', NULL, 'user', 'active', '2021-11-03 17:57:41', '2021-12-12 03:09:18'),
('fd4ad364-461d-4283-9e63-adda2cc0afb4', 'user8@gmail.com', '$2b$12$SRf751Jj4VssHljxQsjg1.kjdo5G5FWOS/fVXhOr36FXoyFRGBLFi', 'user08', 'delapan', '2021-10-04T13-24-44.911Zwa.jpeg', 'user', 'notActive', '2021-10-04 02:49:23', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`);

--
-- Indexes for table `booking2`
--
ALTER TABLE `booking2`
  ADD PRIMARY KEY (`id_booking`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id_movie`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id_schedule`);

--
-- Indexes for table `seatbooking`
--
ALTER TABLE `seatbooking`
  ADD PRIMARY KEY (`id_seat`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id_booking` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id_movie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id_schedule` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `seatbooking`
--
ALTER TABLE `seatbooking`
  MODIFY `id_seat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=345;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
