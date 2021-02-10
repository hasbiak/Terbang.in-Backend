-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 04 Feb 2021 pada 17.13
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `terbangin`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `bookingId` int(5) NOT NULL,
  `userId` int(5) NOT NULL,
  `totalPassenger` int(2) NOT NULL,
  `flightId` int(5) NOT NULL,
  `boardingStatus` int(11) NOT NULL DEFAULT 0,
  `paymentStatus` int(1) NOT NULL,
  `totalPayment` int(30) NOT NULL,
  `code` varchar(50) NOT NULL,
  `contactFullname` varchar(50) NOT NULL,
  `contactEmail` varchar(50) NOT NULL,
  `contactNumber` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`bookingId`, `userId`, `totalPassenger`, `flightId`, `boardingStatus`, `paymentStatus`, `totalPayment`, `code`, `contactFullname`, `contactEmail`, `contactNumber`, `createdAt`, `updatedAt`) VALUES
(25, 2, 1, 18, 1, 0, 150000, 'af0b53fa7e96abf8', 'asd', 'asd@asd', '62123', '2021-02-02 01:39:39', '2021-02-02 08:39:39'),
(26, 2, 1, 15, 0, 0, 150000, 'd86177d4f582e4eb', 'asd', 'asd@asd', '62123', '2021-02-02 01:45:50', '2021-02-02 08:45:50'),
(27, 2, 1, 18, 0, 1, 150000, 'd21d5f577c2d0478', 'asd', 'asd@asd', '62123', '2021-02-02 01:53:48', '2021-02-02 02:17:49'),
(28, 2, 1, 18, 0, 1, 150000, '5fa13ff418a787a0', 'asd', 'asd@asd', '62123', '2021-02-02 01:54:04', '2021-02-02 02:17:49'),
(29, 2, 1, 15, 0, 1, 150000, '64d3266047e6fbd8', 'asd@asd', 'asd@asd', '62123', '2021-02-02 01:54:58', '2021-02-02 02:17:49'),
(30, 2, 1, 15, 0, 1, 150000, 'd978f5f063dbaa87', 'asd@asd', 'asd@asd', '62123', '2021-02-02 01:55:52', '2021-02-02 02:17:48'),
(31, 2, 2, 6, 0, 1, 700000, '57402b2bf3342585', 'asd', 'asd@asd', '62123', '2021-02-02 01:56:41', '2021-02-02 02:17:45'),
(32, 2, 2, 15, 0, 1, 300000, '048448a2f48b2648', 'asd', 'asd@asd', '62123', '2021-02-02 02:00:46', '2021-02-02 02:17:39'),
(33, 2, 2, 3, 0, 1, 1100000, '4d3e73a4ce6af9f8', 'asd', 'asd@asd', '62123', '2021-02-02 02:02:18', '2021-02-02 02:14:47'),
(34, 2, 3, 10, 0, 1, 1950000, '5110a0203e4924cc', 'andra', 'andra@gmail.com', '2147483647', '2021-02-02 03:11:23', '2021-02-02 03:12:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `chat`
--

CREATE TABLE `chat` (
  `chatId` int(10) NOT NULL,
  `roomIdUniq` int(10) NOT NULL,
  `message` varchar(300) NOT NULL,
  `sender` int(5) NOT NULL,
  `receiver` int(5) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `chat`
--

INSERT INTO `chat` (`chatId`, `roomIdUniq`, `message`, `sender`, `receiver`, `createdAt`) VALUES
(51, 882128, 'hello admin', 2, 3, '2021-02-02 10:19:20'),
(52, 882128, 'iya kenapa', 3, 2, '2021-02-02 10:19:37'),
(53, 882128, 'aa', 2, 3, '2021-02-02 10:38:05');

-- --------------------------------------------------------

--
-- Struktur dari tabel `flight`
--

CREATE TABLE `flight` (
  `flightId` int(10) NOT NULL,
  `mascapai` varchar(20) NOT NULL,
  `mascapaiImage` varchar(100) DEFAULT NULL,
  `departureTime` time NOT NULL,
  `arrivedTime` time NOT NULL,
  `flightDate` datetime NOT NULL DEFAULT current_timestamp(),
  `price` int(10) NOT NULL,
  `food` int(11) NOT NULL DEFAULT 0,
  `wifi` int(11) NOT NULL DEFAULT 0,
  `luggage` int(11) NOT NULL DEFAULT 0,
  `capacity` int(4) NOT NULL,
  `clas` int(2) NOT NULL,
  `fromCity` varchar(30) NOT NULL,
  `fromCountry` varchar(30) NOT NULL,
  `toCity` varchar(30) NOT NULL,
  `toCountry` varchar(30) NOT NULL,
  `tripType` varchar(3) NOT NULL,
  `terminal` varchar(10) NOT NULL,
  `transitType` int(1) NOT NULL DEFAULT 0,
  `gate` varchar(10) NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `flight`
--

INSERT INTO `flight` (`flightId`, `mascapai`, `mascapaiImage`, `departureTime`, `arrivedTime`, `flightDate`, `price`, `food`, `wifi`, `luggage`, `capacity`, `clas`, `fromCity`, `fromCountry`, `toCity`, `toCountry`, `tripType`, `terminal`, `transitType`, `gate`, `code`) VALUES
(1, 'Air Asia', '2021-01-28T15-49-35.653Zairasia.png', '15:00:00', '15:45:00', '2021-01-30 00:00:00', 1200000, 1, 1, 0, 90, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A2', 2, '222', ''),
(2, 'Garuda Indonesia', '2021-01-29T06-07-05.305ZgarudaIndonesia.png', '06:45:00', '07:15:00', '2021-01-30 00:00:00', 600000, 1, 1, 0, 100, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'B12', 2, '212', ''),
(3, 'Garuda Indonesia', '2021-01-29T06-08-43.747ZgarudaIndonesia.png', '07:50:00', '08:15:00', '2021-01-30 00:00:00', 550000, 1, 1, 1, 94, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A2', 1, '212', ''),
(4, 'Garuda Indonesia', '2021-01-29T06-09-22.352ZgarudaIndonesia.png', '07:50:00', '08:15:00', '2021-01-30 00:00:00', 550000, 1, 1, 1, 89, 2, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A2', 0, '221', ''),
(5, 'Garuda Indonesia', '2021-01-29T06-10-23.324ZgarudaIndonesia.png', '19:50:00', '20:15:00', '2021-01-30 00:00:00', 750000, 1, 1, 1, 100, 2, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A2', 0, '221', ''),
(6, 'Lion Air', '2021-01-29T06-12-10.457Zlionair.png', '19:00:00', '19:35:00', '2021-01-30 00:00:00', 350000, 1, 1, 0, 98, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A11', 1, '229', ''),
(8, 'Lion Air', '2021-01-29T06-14-33.784Zlionair.png', '16:00:00', '16:35:00', '2021-01-30 00:00:00', 400000, 1, 1, 1, 100, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A11', 2, '232', ''),
(9, 'Lion Air', '2021-01-29T06-15-33.283Zlionair.png', '18:00:00', '18:35:00', '2021-01-30 00:00:00', 500000, 0, 0, 1, 100, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A10', 0, '232', ''),
(10, 'Air Asia', '2021-01-29T06-16-41.803Zairasia.png', '18:00:00', '18:35:00', '2021-01-30 00:00:00', 650000, 1, 0, 1, 97, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A14', 0, '234', ''),
(11, 'Air Asia', '2021-01-29T06-17-19.663Zairasia.png', '20:00:00', '20:35:00', '2021-01-30 00:00:00', 600000, 1, 0, 1, 100, 1, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A16', 0, '234', ''),
(12, 'Air Asia', '2021-01-29T15-07-53.496Zairasia.png', '00:00:02', '02:00:02', '2021-01-31 00:00:00', 1200000, 1, 1, 1, 100, 2, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A2', 2, '', ''),
(13, 'Lion Air', '2021-01-29T15-09-40.410Zairasia.png', '00:00:02', '02:00:02', '2021-01-31 00:00:00', 1200000, 1, 1, 1, 100, 2, 'Surabaya', 'IDN', 'Medan', 'IDN', '1', 'A2', 0, '', ''),
(14, 'Lion Air', '2021-01-30T22-15-55.637Zairasia.png', '00:00:02', '05:00:02', '2021-02-18 08:25:17', 1000000, 1, 1, 1, 100, 2, 'Medan', 'IDN', 'Surabaya', 'IDN', '1', 'A2', 0, '', 'AB-2066'),
(15, 'Garuda Indonesia', '', '21:09:00', '23:13:00', '2021-02-01 00:00:00', 150000, 1, 1, 0, 94, 6, 'Medan', 'IDN', 'Tokyo', 'JPN', '1', 'A', 1, '', 'SJ-212'),
(16, 'Garuda Indonesia', '', '02:52:00', '04:52:00', '2021-01-30 00:00:00', 200000, 1, 0, 1, 100, 4, 'Jakarta', 'IDN', 'Tokyo', 'JPN', '1', 'B', 1, '', 'SJ-221'),
(17, 'Lion Air', '', '13:58:00', '16:58:00', '2021-01-30 00:00:00', 300000, 0, 1, 1, 40, 2, 'Jakarta', 'IDN', 'K.Lumpur', 'MAS', '1', 'A', 2, '', 'HA-325'),
(18, 'Air Asia', '', '22:08:00', '23:16:07', '2021-01-30 00:00:00', 150000, 1, 1, 1, 42, 7, 'Jakarta', 'IDN', 'K.Lumpur', 'MAS', '1', 'A', 1, '', 'JKL-212'),
(19, 'Air Asia', '', '22:12:00', '23:12:00', '2021-01-30 00:00:00', 150000, 0, 1, 0, 60, 1, 'Jakarta', 'IDN', 'K.Lumpur', 'MAS', '1', 'A', 1, '', 'JKL-221'),
(20, 'Lion Air', '', '12:52:00', '15:52:00', '2021-01-30 00:00:00', 100000, 0, 1, 0, 10, 1, 'Medan', 'IDN', 'Tokyo', 'JPN', '1', 'A', 0, '', 'AB12'),
(21, 'Lion Air', '', '16:26:00', '16:26:00', '2021-02-03 00:00:00', 123, 0, 1, 0, 123, 1, 'Medan', 'IDN', 'Jakarta', 'IDN', '1', 'A', 1, '', '123');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notif`
--

CREATE TABLE `notif` (
  `notifId` int(11) NOT NULL,
  `notifTitle` varchar(255) NOT NULL,
  `notifMessage` varchar(600) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `notif`
--

INSERT INTO `notif` (`notifId`, `notifTitle`, `notifMessage`, `receiverId`, `createdAt`) VALUES
(14, 'Booking Status  12', 'Hello there! Your booking status is received and waiting for payment.', 12, '2021-01-31 21:59:04'),
(15, 'Booking Status  12', 'Hello there! Your booking status is received and waiting for payment.', 1, '2021-01-31 21:59:10'),
(29, 'Booking status', 'Hello there! Your booking status is received and waiting for payment. Booking code: ac2f6455b4014442 .', 3, '2021-02-01 22:18:22'),
(36, 'Booking status', 'Hello there! Your booking status is received and waiting for payment. Booking code: 048448a2f48b2648 . Pay your ticket here :\'https://app.sandbox.midtrans.com/snap/v2/vtweb/60a48672-f1de-40b2-93e6-c7e3877cc0c4', 2, '2021-02-02 09:00:46'),
(37, 'Booking status', 'Hello there! Your booking status is received and waiting for payment. Booking code: 4d3e73a4ce6af9f8 . Pay your ticket here :\'https://app.sandbox.midtrans.com/snap/v2/vtweb/56fa905f-0748-493d-a064-b2490c2fa34c', 2, '2021-02-02 09:02:19'),
(38, 'Booking status', 'Hello there! Your booking status is received and waiting for payment. Booking code: 5110a0203e4924cc . Pay your ticket here :\'https://app.sandbox.midtrans.com/snap/v2/vtweb/4a38cd89-20de-4501-b9fd-b95a898feb05', 2, '2021-02-02 10:11:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `passenger`
--

CREATE TABLE `passenger` (
  `passengerId` int(10) NOT NULL,
  `bookingId` int(10) NOT NULL,
  `title` varchar(10) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `nationality` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `passenger`
--

INSERT INTO `passenger` (`passengerId`, `bookingId`, `title`, `fullName`, `nationality`) VALUES
(1, 1, 'ms', 'Nezuko', 'Indonesia'),
(2, 1, 'mr', 'Zenitsu', 'Indonesia'),
(3, 2, 'ms', 'Nezuko', 'Indonesia'),
(4, 2, 'mr', 'Zenitsu', 'Indonesia'),
(5, 3, 'Mr.', 'asd', 'Indonesia'),
(6, 4, 'Mr.', 'awdaw', 'Indonesia'),
(7, 5, 'ms', 'Nezuko', 'Indonesia'),
(8, 5, 'mr', 'Zenitsu', 'Indonesia'),
(9, 6, 'Mr.', 'asd', 'Indonesia'),
(10, 7, 'Mr.', 'asdawdad', 'Indonesia'),
(11, 8, 'Mr.', 'andra', 'Indonesia'),
(12, 9, 'Mr.', 'asd', 'Indonesia'),
(13, 10, 'Mr.', 'asd', 'Indonesia'),
(14, 11, 'Mr.', 'asd', 'Indonesia'),
(15, 12, 'Mr.', 'asd', 'Indonesia'),
(16, 13, 'Mr.', 'asd', 'Indonesia'),
(17, 14, 'Mr.', 'asd', 'Indonesia'),
(18, 15, 'Mr.', 'asd', 'Indonesia'),
(19, 16, 'Mr.', 'asd', 'Indonesia'),
(20, 17, 'Mr.', 'andra', 'Indonesia'),
(21, 17, 'Mr.', 'rizqon', 'Indonesia'),
(22, 18, 'Mr.', 'andra', 'Indonesia'),
(23, 19, 'Mr.', 'asd', 'Indonesia'),
(24, 19, 'Mr.', 'dwad', 'Indonesia'),
(25, 20, 'ms', 'Nezuko', 'Indonesia'),
(26, 20, 'mr', 'Zenitsu', 'Indonesia'),
(27, 21, 'ms', 'Nezuko', 'Indonesia'),
(28, 21, 'mr', 'Zenitsu', 'Indonesia'),
(29, 22, 'Mr.', 'asd', 'Indonesia'),
(30, 23, 'Mr.', 'asd', 'Indonesia'),
(31, 24, 'Mr.', 'asd', 'Indonesia'),
(32, 25, 'Mr.', 'asd', 'Indonesia'),
(33, 26, 'Mr.', 'asd', 'Indonesia'),
(34, 27, 'Mr.', 'asd', 'Indonesia'),
(35, 28, 'Mr.', 'asd', 'Indonesia'),
(36, 29, 'Mr.', 'asd', 'Indonesia'),
(37, 30, 'Mr.', 'asd', 'Indonesia'),
(38, 31, 'Mr.', 'asd', 'Indonesia'),
(39, 31, 'Mr.', 'dsa', 'Indonesia'),
(40, 32, 'Mr.', 'asd', 'Indonesia'),
(41, 32, 'Mr.', 'asd', 'Indonesia'),
(42, 33, 'Mr.', 'asd', 'Indonesia'),
(43, 33, 'Mr.', 'dsa', 'Indonesia'),
(44, 34, 'Mr.', 'Pak Bagus', 'Indonesia'),
(45, 34, 'Mrs.', 'Ibu Intan', 'Indonesia'),
(46, 34, 'Mrs.', 'RIzqon', 'Indonesia');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roomchat`
--

CREATE TABLE `roomchat` (
  `roomId` int(10) NOT NULL,
  `roomIdUniq` int(10) NOT NULL,
  `sender` int(10) NOT NULL,
  `receiver` int(10) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roomchat`
--

INSERT INTO `roomchat` (`roomId`, `roomIdUniq`, `sender`, `receiver`, `createdAt`, `updatedAt`) VALUES
(1, 818935, 2, 1, '2021-01-31 18:51:57', '2021-01-31 18:51:57'),
(2, 818935, 1, 2, '2021-01-31 18:51:57', '2021-01-31 18:51:57'),
(3, 882128, 2, 3, '2021-01-31 22:29:42', '2021-01-31 22:29:42'),
(4, 882128, 3, 2, '2021-01-31 22:29:42', '2021-01-31 22:29:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `userId` int(5) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `profileImage` varchar(200) DEFAULT NULL,
  `phoneNumber` int(20) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `nationality` varchar(25) DEFAULT NULL,
  `postCode` int(10) DEFAULT NULL,
  `role` int(1) DEFAULT 0,
  `status` int(1) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `userKey` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`userId`, `email`, `password`, `fullName`, `profileImage`, `phoneNumber`, `city`, `nationality`, `postCode`, `role`, `status`, `createdAt`, `updatedAt`, `userKey`) VALUES
(1, 'andr7na@gmail.com', '$2b$07$fFgKsFXkRYgV/smKXndE5.4cSiywLcBjJr.FzZlZFsTLqkShdZjX6', 'andrawan', '', 85458345, '', '', 0, 1, 0, '2021-01-29 09:12:46', '2021-02-02 03:00:25', 0),
(2, 'asd@asd', '$2b$07$rPDxGBCPM6ck1rjNXghufejIWwoQ/zQMsg7X2X9ezuK5DrxBz4H3i', 'Andra one', '2021-02-04T07-12-24.613Zaqw2.PNG', 123123, 'bekasi', 'jalan bumi lestari', 1745, 0, 0, '2021-01-31 18:00:54', '2021-02-02 03:14:21', 0),
(3, 'admin@admin', '$2b$10$FeM8aiKF7Wboszh10wo4RukknQ1ZF1226OnsVm8B60HF8cKrSYs/2', 'Chandrawan', '2021-02-01T03-32-52.449Z29d47698-2d7c-4404-85b8-47baf717b068.jpg', 0, '', '', 0, 1, 0, '2021-01-31 18:51:26', '2021-01-31 18:51:26', 0),
(4, '123@123', '$2b$10$/3KkEtEVz0XPN21duxa3Ge6m7/xRxBBVfJGj3mMU.cKUSiT3p2OKq', 'andra123', '', 0, '', '', 0, 0, 0, '2021-02-01 13:48:58', '2021-02-01 13:48:58', 0),
(5, 'asd@aswdad', '$2b$10$zTV/LqHu9o9/cgwEvXyzN.0ZWEpQ1mW/FKEK0ZcEvIWCN6py0Lgnu', 'asd', '', 0, '', '', 0, 0, 0, '2021-02-01 22:24:42', '2021-02-01 22:24:42', 0),
(6, 'andra@gmail.com', '$2b$10$j3QQKrVXn3492561belBoOZ5FGUhm58KwWM1.8ldv0iQGR.XHl0ni', 'andra', '', 0, '', '', 0, 0, 0, '2021-02-02 09:59:16', '2021-02-02 09:59:16', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingId`);

--
-- Indeks untuk tabel `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chatId`);

--
-- Indeks untuk tabel `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`flightId`);

--
-- Indeks untuk tabel `notif`
--
ALTER TABLE `notif`
  ADD PRIMARY KEY (`notifId`);

--
-- Indeks untuk tabel `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`passengerId`);

--
-- Indeks untuk tabel `roomchat`
--
ALTER TABLE `roomchat`
  ADD PRIMARY KEY (`roomId`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT untuk tabel `chat`
--
ALTER TABLE `chat`
  MODIFY `chatId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT untuk tabel `flight`
--
ALTER TABLE `flight`
  MODIFY `flightId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `notif`
--
ALTER TABLE `notif`
  MODIFY `notifId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `passenger`
--
ALTER TABLE `passenger`
  MODIFY `passengerId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `roomchat`
--
ALTER TABLE `roomchat`
  MODIFY `roomId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
