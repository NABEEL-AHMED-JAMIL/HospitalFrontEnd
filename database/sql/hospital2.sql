-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2017 at 07:54 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital2`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `doctor_type_id` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `confirm_password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `active`, `email`, `firstname`, `gender`, `lastname`, `password`, `username`, `doctor_type_id`, `created_at`, `updated_at`, `deleted_at`, `confirm_password`) VALUES
(1, b'1', 'alinayet@gmail.com', 'ALI', b'1', 'ALI', '$2a$10$CEz4pQBfQRCJNZb1I6swkus0l4/81PPegtyoFkrT983nFS1Ogsd.6', 'alinayet@gmail.com', 3, '2017-07-24 00:48:52', '2017-07-24 00:48:52', NULL, NULL),
(2, b'1', 'nabeel.amd93@gmail.com', 'Abubakar', b'1', 'Zafar', '$2a$10$CBKbTr3h5nc5S6DtBdmQ8.PAC8kuoqk/AAOWfw3Hw54GqqsdT1x4G', 'nabeel.amd93@gmail.com', 3, '2017-07-21 00:11:31', '2017-08-21 07:26:51', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_roles`
--

CREATE TABLE `doctor_roles` (
  `doctor_id` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_roles`
--

INSERT INTO `doctor_roles` (`doctor_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(1, 4),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_type`
--

CREATE TABLE `doctor_type` (
  `id` bigint(20) NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_type`
--

INSERT INTO `doctor_type` (`id`, `type`) VALUES
(1, 'ALL'),
(2, 'Gyn'),
(3, 'Peeds');

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id` bigint(20) NOT NULL,
  `note` longtext,
  `note_date` date DEFAULT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `doctor_type_id` bigint(20) DEFAULT NULL,
  `mr_no` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id`, `note`, `note_date`, `doctor_id`, `doctor_type_id`, `mr_no`) VALUES
(2, 'skdfjlskdjf;lksjflk;sjdlk', '2017-07-21', 1, 2, 2),
(3, 'dsd', '2017-07-22', 2, 3, 2),
(4, '<p>pakistan zindabad</p>', '2017-07-22', 1, 3, 32),
(5, '<p>sdsdffdgfgghf</p>', '2017-07-22', 1, 2, 41),
(6, '<p>yyyy</p>', '2017-07-22', 1, 3, 41),
(7, '<p>jjj</p>', '2017-07-22', 1, 3, 41),
(8, '<p>gghgggh</p>', '2017-07-22', 1, 3, 41),
(9, '<p>ggg</p>', '2017-07-22', 1, 3, 41),
(10, '<p>Sorry</p>', '2017-07-22', 1, 2, 41),
(12, '<p><strong>English Poetry</strong> - Express your feeling with Pakistan&rsquo;s largest collection of English Poetry. Read, submit and share your favorite English Shayari. Find 55 English Poetry, Last Updated on Saturday, July 22 2017. <strong>English poetry</strong> is for those who prefer to express their sentiments in English language. The online English readers of HamariWeb can facilitate from the exclusive English poetry collection updated on regular basis. English Poetry has many variations like love poems and romantic poetry, English poems, quotes and metaphors. Some of the amazing English poets like William Shakespeare, William Wo... <a href=\"http://www.hamariweb.com/poetries/english_poetries45.aspx#desc\">View More</a></p>', '2017-07-23', 1, 3, 32),
(13, '<p>hhhhhhhhhhhhhhhhhhhhh</p>', '2017-07-23', 1, 3, 42);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `mr_no` bigint(20) NOT NULL,
  `age` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`mr_no`, `age`, `name`, `phone`) VALUES
(2, 25, 'nabeel', '123456'),
(4, 5, 'nabeel ahmed', '45pdfa'),
(5, 55, 'pakistan', '12369873'),
(17, 3, 'dfsd', 'fsdfs'),
(19, 2, 'sdfsd', 'dsfsdfsd'),
(28, 11, '11', '11'),
(30, 44, '25', '99'),
(31, 3, 'dd', 'd'),
(32, 3, 'dd', 'dd'),
(34, 5, '5', 'tt'),
(35, 66, '55', '66'),
(37, 77, '1236', '123'),
(38, 88, '123654', '888'),
(39, 22, 'ss', 'ss'),
(40, 3, 'dd', 'rr'),
(41, 33, 'dsfsd', 'sdfs'),
(42, 5, 'gg', 'gg'),
(43, 12365, 'PAKISTAN', 'ZINDABAD'),
(44, 1111, 'DFSD', 'DFSDFS'),
(45, 22, 'dfs', '22');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`, `created_at`, `updated_at`) VALUES
(1, 'ROLE_ADMIN', '2017-07-04 00:00:00', '2017-07-04 00:00:00'),
(2, 'ROLE_USER', '2017-07-15 00:00:00', '2017-07-15 00:26:34'),
(4, 'ROLE_DBA', '2017-08-02 00:00:00', '2017-08-02 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_jdtgexk368pq6d2yb3neec59d` (`email`),
  ADD UNIQUE KEY `UK_2i9eqm6hy3ephpt9ep0xfjsfq` (`username`),
  ADD KEY `FKpj30q9tccvcqdqqwvl3gv996h` (`doctor_type_id`);

--
-- Indexes for table `doctor_roles`
--
ALTER TABLE `doctor_roles`
  ADD PRIMARY KEY (`doctor_id`,`role_id`),
  ADD KEY `FK2q1wstm3rd9887lcr5un03bnr` (`role_id`);

--
-- Indexes for table `doctor_type`
--
ALTER TABLE `doctor_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7ujuw9h8fpdt35riehknwrw9b` (`doctor_id`),
  ADD KEY `FK2k6a0u6xtcp9oexmq5iu9wasa` (`doctor_type_id`),
  ADD KEY `FK4a2yluchtuttc1l9oo07j4ruj` (`mr_no`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`mr_no`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_bjxn5ii7v7ygwx39et0wawu0q` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `doctor_type`
--
ALTER TABLE `doctor_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `mr_no` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `FKpj30q9tccvcqdqqwvl3gv996h` FOREIGN KEY (`doctor_type_id`) REFERENCES `doctor_type` (`id`);

--
-- Constraints for table `doctor_roles`
--
ALTER TABLE `doctor_roles`
  ADD CONSTRAINT `FK2q1wstm3rd9887lcr5un03bnr` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `FKdsa3oe9synalk3mgay4nxn52s` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`);

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `FK2k6a0u6xtcp9oexmq5iu9wasa` FOREIGN KEY (`doctor_type_id`) REFERENCES `doctor_type` (`id`),
  ADD CONSTRAINT `FK4a2yluchtuttc1l9oo07j4ruj` FOREIGN KEY (`mr_no`) REFERENCES `patient` (`mr_no`),
  ADD CONSTRAINT `FK7ujuw9h8fpdt35riehknwrw9b` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
