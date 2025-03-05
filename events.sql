-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 05, 2023 at 07:53 PM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `322`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `name` varchar(40) NOT NULL,
  `category` varchar(20) NOT NULL,
  `month` varchar(12) NOT NULL,
  `day` int(11) NOT NULL,
  `time` time NOT NULL,
  `cost` float NOT NULL,
  `location` varchar(40) NOT NULL,
  `id` int(11) NOT NULL,
  `tagged` tinyint(1) NOT NULL,
  `lon_lat` varchar(50) NOT NULL,
  `notes` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`name`, `category`, `month`, `day`, `time`, `cost`, `location`, `id`, `tagged`, `lon_lat`, `notes`) VALUES
('Farmer\'s Market', 'Shopping', 'March', 28, '08:15:00', 0, 'Claudelands car park', 1, 0, '-37.779685496119896, 175.28972478072055', 'monthly'),
('10K fun run and walk', 'Sport', 'March', 20, '09:45:00', 0, 'Hamilton Lake', 2, 0, '-37.7984299637687, 175.27397748770377', 'organised by Hamilton Marathon club'),
('Knitting circle', 'Craft', 'March', 25, '19:00:00', 0, 'The Link', 3, 0, '-37.78411411161777, 175.28756370732006', 'wool and kneedles supplied'),
('Public Lecture', 'Education', 'March', 23, '18:30:00', 0, 'University of Waikato', 4, 0, '-37.784351202837506, 175.31573275955625', ''),
('Rivertones Concert', 'Entertainment', 'March', 26, '19:30:00', 25, 'The Meteor', 5, 0, '-37.78829878046303, 175.32050771099262', 'Tickets on door'),
('Clarise Dance School Show', 'Entertainment', 'April', 14, '18:45:00', 10, 'Claudelands', 6, 0, '-37.779685496119896, 175.28972478072055', ''),
('Food Show', 'Shopping', 'April', 24, '08:30:00', 30, 'Claudelands ', 7, 0, '-37.779685496119896, 175.28972478072055', ''),
('Hamilton Cycle Club Road Race', 'Sport', 'April', 11, '08:45:00', 0, 'Cycleworks Frankton', 8, 0, '-37.795262469468035, 175.26164545551313', 'Graded cycle race'),
('Cambridge Ukelele Orchestra', 'Entertainment', 'April', 16, '19:30:00', 25, 'Clarence St Theatre', 9, 0, '-37.794368284985424, 175.28301895858212', ''),
('Waikato Sewing Bee', 'Craft', 'April', 12, '14:30:00', 0, 'Te Awamutu College', 10, 0, '-38.00619867397368, 175.31557836073821', 'Bring your own workpiece'),
('Bootleg Brewery Sale', 'Shopping', 'April', 28, '19:00:00', 0, 'Bootleg Brewery Matangi', 11, 0, '-37.80532994331132, 175.39742650121482', 'Over 18 only'),
('The Great Debate', 'Educational', 'May', 12, '19:45:00', 0, 'UoW Performing Arts Centre', 12, 0, '-37.784351202837506, 175.31573275955625', ''),
('ParkRun', 'Sport', 'May', 16, '10:00:00', 0, 'Hamilton Lake', 13, 1, '-37.7984299637687, 175.27397748770377', ''),
('The Great Poetry Slam', 'Entertainment', 'May', 28, '21:00:00', 15, 'Meteor Theatre', 14, 0, '-37.78829878046303, 175.32050771099262', 'Open mic'),
('Hamilton Barbershop Quarter', 'Entertainment', 'May', 29, '19:30:00', 25, 'Clarence St Theatre', 15, 0, '-37.794368284985424, 175.28301895858212', ''),
('Farmer\'s Market', 'Shopping', 'May', 30, '08:00:00', 0, 'Claudelands Car Park', 16, 0, '-37.779685496119896, 175.28972478072055', ''),
('June\'s Jugglers', 'Entertainment', 'June', 12, '11:00:00', 0, 'Huntly domain', 17, 0, '-37.553332975426926, 175.16249975205463', ''),
('Facepainting workshop', 'Craft', 'June', 26, '10:30:00', 15, 'The Link', 18, 0, '-37.78411411161777, 175.28756370732006', ''),
('Farmer\'s Market', 'Shopping', 'June', 27, '08:00:00', 0, 'Claudelands car park', 19, 0, '-37.779685496119896, 175.28972478072055', 'monthly'),
('Billy and the Bagpipes', 'Entertainment', 'June', 21, '19:30:00', 20, 'Meteor Theatre', 20, 0, '-37.78829878046303, 175.32050771099262', ''),
('Build a Bear', 'Craft', 'June', 6, '10:00:00', 5, 'Te Aroha Hot Pools', 21, 0, '-37.54461816151039, 175.71651654936036', ''),
('Da Vinci Exhibition', 'Entertainment', 'June ', 11, '09:30:00', 15, 'Museum', 22, 0, '-37.78923900013832, 175.28620835854034', ''),
('Winter Solstice', 'Entertainment', 'June', 27, '21:30:00', 0, 'Hamilton Gardens', 23, 0, '-37.805242150406805, 175.30171567237957', ''),
('Mid Winter Christmas Fair', 'Shopping', 'July', 4, '17:50:00', 0, 'Te Awa The Base', 24, 0, '-37.747666659922764, 175.2327654229594', 'Rotary club event'),
('Farmer\'s Market', 'Shopping', 'July', 27, '08:00:00', 0, 'Claudelands Car Park', 25, 0, '-37.779685496119896, 175.28972478072055', 'monthly'),
('Ski Patrol', 'Educational', 'August', 21, '10:00:00', 15, 'WINTEC Avalon Drive', 26, 0, '-37.76062875046747, 175.23121603374304', 'Public event'),
('Winter Plunge', 'Sport', 'August', 7, '10:00:00', 0, 'Wellington St Beach', 27, 0, '-37.7981808045352, 175.28959808402632', ''),
('Cantando Choir', 'Entertainment', 'August', 14, '17:30:00', 25, 'St Peters School Cambridge', 28, 0, '-37.89114960245375, 175.4286665901349', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
