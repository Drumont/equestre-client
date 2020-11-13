-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  ven. 13 nov. 2020 à 17:51
-- Version du serveur :  8.0.21
-- Version de PHP :  7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `equestre_database_development`
--

-- --------------------------------------------------------

--
-- Structure de la table `Accounts`
--

CREATE TABLE `Accounts` (
  `id` int NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `licence` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Accounts`
--

INSERT INTO `Accounts` (`id`, `firstname`, `lastname`, `licence`, `createdAt`, `updatedAt`) VALUES
(14, 'Eren', 'Yager', '142096', '2020-11-02 22:38:59', '2020-11-12 01:11:38'),
(16, 'Koami', 'OKPAOUL', '26434A', '2020-11-07 01:23:26', '2020-11-07 01:23:26'),
(17, 'Mikasa', 'Ackerman', '36890Z', '2020-11-07 01:26:34', '2020-11-07 01:26:34'),
(18, 'Conny', 'Spring', '245', '2020-11-07 01:28:26', '2020-11-07 01:28:26'),
(19, 'Koami', 'OKPAOUL', '', '2020-11-11 13:31:27', '2020-11-11 13:31:27'),
(20, 'Koami', 'OKPAOUL', '', '2020-11-11 13:34:47', '2020-11-11 13:34:47'),
(21, 'Root', 'Root', NULL, '2020-11-13 16:18:52', '2020-11-13 16:18:52'),
(22, 'Root', 'Root', NULL, '2020-11-13 16:19:34', '2020-11-13 16:19:34'),
(23, 'Root', 'Root', NULL, '2020-11-13 16:27:00', '2020-11-13 16:27:00');

-- --------------------------------------------------------

--
-- Structure de la table `Courses`
--

CREATE TABLE `Courses` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `started_date` datetime DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `createdBy_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `level` varchar(255) DEFAULT NULL,
  `max_participant` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Courses`
--

INSERT INTO `Courses` (`id`, `title`, `started_date`, `duration`, `createdBy_id`, `createdAt`, `updatedAt`, `level`, `max_participant`) VALUES
(13, 'Grimper cheval', '2020-11-11 14:30:00', 1, 14, '2020-11-12 22:08:43', '2020-11-13 07:54:11', '4', '3'),
(14, 'fary', '2020-11-11 09:30:00', 3, 14, '2020-11-12 22:38:39', '2020-11-12 22:38:39', '5', '5');

-- --------------------------------------------------------

--
-- Structure de la table `Horses`
--

CREATE TABLE `Horses` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdBy_id` int NOT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Horses`
--

INSERT INTO `Horses` (`id`, `name`, `createdBy_id`, `breed`, `createdAt`, `updatedAt`) VALUES
(26, 'Gus', 14, 'Mustang', '2020-11-12 01:46:59', '2020-11-12 01:46:59');

-- --------------------------------------------------------

--
-- Structure de la table `Permissions`
--

CREATE TABLE `Permissions` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Permissions`
--

INSERT INTO `Permissions` (`id`, `title`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrateur', NULL, '2020-09-30 00:00:00', '2020-09-30 00:00:00'),
(2, 'Utilisateur', NULL, '2020-09-30 00:00:00', '2020-09-30 00:00:00'),
(3, 'Moniteur ', NULL, '2020-10-23 00:00:00', '2020-10-23 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20200916081809-create-permission.js'),
('20200916081821-create-account.js'),
('20200916082822-create-user.js'),
('20201007150251-create-horse.js'),
('20201023092953-create-course.js'),
('20201023093956-create-course-user.js'),
('20201024152328-create-session.js'),
('20201024221009-create-session.js'),
('20201024221906-create-session.js'),
('20201112203152-modify-course.js'),
('20201112215602-add-max-participant.js');

-- --------------------------------------------------------

--
-- Structure de la table `Sessions`
--

CREATE TABLE `Sessions` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `user_id` int NOT NULL,
  `horse_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Sessions`
--

INSERT INTO `Sessions` (`id`, `course_id`, `user_id`, `horse_id`, `createdAt`, `updatedAt`) VALUES
(46, 13, 14, NULL, '2020-11-13 09:20:40', '2020-11-13 09:20:40'),
(47, 14, 14, NULL, '2020-11-13 09:46:03', '2020-11-13 09:46:03');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `account_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `account_id`, `permission_id`, `createdAt`, `updatedAt`, `phone`) VALUES
(14, 'eren@shadow.com', '$2b$05$HFZJihN.bEwAkpZpFxciT.izhwX24uPHF66BZBNm6z4pmshJ6Y.sm', 14, 1, '2020-11-02 22:38:59', '2020-11-02 22:38:59', '0752992086'),
(16, 'koamidrumont.okpaoul@skema.edu', '$2b$05$dTMoGnZParfT/sWWf/RsO.nNnzlbOntEdk.mcY.YWoTeQQUjXJtgy', 16, 2, '2020-11-07 01:23:26', '2020-11-07 01:23:26', '+33752992086'),
(17, 'qwe@qwe.qwe', '$2b$05$WIWmvtFFQ/6WPni.zzk8a.Zlui4lejxBXZmC9I3zsHycQ4vaCRepW', 17, 1, '2020-11-07 01:26:34', '2020-11-07 01:26:34', '0752992045'),
(18, 'conny@shadow.com', '$2b$05$PEsQjZVBhIoz.aLa/hy16u6XZv19bq0Y3iPIn/ZskIWhcrIURv3Ty', 18, 3, '2020-11-07 01:28:26', '2020-11-07 01:28:26', '0752992035'),
(19, 'koamidrumont@skema.edu', '$2b$05$Tceb5At.CDDcf2vyCqYeseR/dnQWYdidxMNbnu42thbVP28RJp0OS', 19, 2, '2020-11-11 13:31:27', '2020-11-11 13:31:27', '0752992012'),
(20, 'okpaoul@skema.edu', '$2b$05$PgX7YZheFqba.W8QeQSI/uvTHxxS7EsR85muBl8n9ERi4lHV0CtUu', 20, 3, '2020-11-11 13:34:47', '2020-11-11 13:34:47', '0752992078'),
(21, 'root@root.com', 'root', 23, 1, '2020-11-13 00:00:00', '2020-11-13 00:00:00', '0101010100');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Accounts`
--
ALTER TABLE `Accounts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Courses`
--
ALTER TABLE `Courses`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Horses`
--
ALTER TABLE `Horses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy_id` (`createdBy_id`);

--
-- Index pour la table `Permissions`
--
ALTER TABLE `Permissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `horse_id` (`horse_id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Accounts`
--
ALTER TABLE `Accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `Courses`
--
ALTER TABLE `Courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Horses`
--
ALTER TABLE `Horses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `Permissions`
--
ALTER TABLE `Permissions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `Sessions`
--
ALTER TABLE `Sessions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Horses`
--
ALTER TABLE `Horses`
  ADD CONSTRAINT `horses_ibfk_1` FOREIGN KEY (`createdBy_id`) REFERENCES `Users` (`id`);

--
-- Contraintes pour la table `Sessions`
--
ALTER TABLE `Sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `Courses` (`id`),
  ADD CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `sessions_ibfk_3` FOREIGN KEY (`horse_id`) REFERENCES `Horses` (`id`);

--
-- Contraintes pour la table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `Accounts` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `Permissions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
