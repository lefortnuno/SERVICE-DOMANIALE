-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 30 jan. 2023 à 06:25
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `bdd_domaniale_ftsoa`
--

-- --------------------------------------------------------

--
-- Structure de la table `bureau`
--

DROP TABLE IF EXISTS `bureau`;
CREATE TABLE IF NOT EXISTS `bureau` (
  `idBureau` int(3) NOT NULL AUTO_INCREMENT,
  `nomBureau` varchar(25) NOT NULL,
  `adressBureau` varchar(150) NOT NULL,
  PRIMARY KEY (`idBureau`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `bureau`
--

INSERT INTO `bureau` (`idBureau`, `nomBureau`, `adressBureau`) VALUES
(1, 'C.D.F', 'Tsianolondroa Fianarantsoa'),
(2, 'S.R.D', 'Ambalapaiso Fianarantsoa'),
(3, 'T.O.P.O', 'Tsianolondroa Fianarantsoa'),
(4, 'P.R.E.F.E.C.T.U.R.E', 'Faritany Fianarantsoa'),
(5, 'D.S.F', 'Antananarivo');

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

DROP TABLE IF EXISTS `compte`;
CREATE TABLE IF NOT EXISTS `compte` (
  `numeroCompte` int(11) NOT NULL AUTO_INCREMENT,
  `identification` varchar(50) NOT NULL,
  `photoPDP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attribut` varchar(15) DEFAULT 'Agent',
  `mdp` varchar(100) NOT NULL,
  `unite` tinyint(1) NOT NULL,
  `statu` tinyint(1) DEFAULT '0',
  `u_cin` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`numeroCompte`),
  KEY `u_cin` (`u_cin`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`numeroCompte`, `identification`, `photoPDP`, `attribut`, `mdp`, `unite`, `statu`, `u_cin`) VALUES
(1, 'LEFORT', '1671269107521-DSC_0101.JPG', 'Administrateur', '$2b$10$x7i8nWZsUh9NmkkmSGFMzeoS48BSbKbz2C0vofNloSeohLjziIEzi', 1, 1, '201011028460'),
(4, 'Kanto', '1671659425487-IMG_20221222_005007.jpg', 'Chef', '$2b$10$HR/qGl6WQIfThhNEI8vhpuFSdkkb2LsX4a19wYbmoQq61v05ek0OG', 1, 1, '201012013089'),
(5, 'Nuno', '1672771262506-logo.jpg', 'Chef Adjoint', '$2b$10$aNURlBzDZh0Z.hLK.rTYkOoS590v6c/7sZ7ppKSem/.inVvUmgiRa', 1, 1, '201011028460'),
(6, 'aaaa-6', '1674994064309-IMGP7505.jpg', 'Usager', '$2b$10$Jen.aioYLjT.46nc6hF6uetrMV8X.VZcn7hgWw0e6ymjoMd3b9l1y', 1, 0, '501012035987'),
(7, 'bbbb-7', '1675003716828-Logo_Transparent.png', 'utilisateur', '$2b$10$HR/qGl6WQIfThhNEI8vhpuFSdkkb2LsX4a19wYbmoQq61v05ek0OG', 1, 0, '901022036548'),
(8, 'Nadia-8', '1675003937225-IMGP7563.jpg', 'Usager', '$2b$10$0aTVZvQPPe8qrERcNHb7gO/5d4j/yVdvJfrE5xKuPB6sJcavgbTdG', 1, 1, '901022036548'),
(9, 'jimm-9', '1675004036338-327730047_585488820060034_7880572166000777784_n.jpg', 'Agent', '$2b$10$VwsE8c.lVaG9su7RkbD71uXKURPgs3cMF6Ge1U5jRlnaOCQLbRB4O', 1, 1, '333331333333'),
(10, 'Koto-10', '1675004134525-e-Cin-07.png', 'Usager', '$2b$10$q2fKscy4TyECss3kaJzLE.C/X/QZRu34ym4Qv0KIIBESMw/ykj8T6', 0, 0, '201011460028');

-- --------------------------------------------------------

--
-- Structure de la table `dossier`
--

DROP TABLE IF EXISTS `dossier`;
CREATE TABLE IF NOT EXISTS `dossier` (
  `numeroDossier` int(255) NOT NULL AUTO_INCREMENT,
  `numeroAffaire` varchar(15) NOT NULL,
  `dependance` tinyint(1) DEFAULT NULL,
  `natureAffectation` tinyint(1) DEFAULT NULL,
  `empietement` tinyint(1) DEFAULT NULL,
  `lettreDemande` tinyint(1) NOT NULL,
  `planAnnexe` tinyint(1) NOT NULL,
  `pvDelimitation` tinyint(1) DEFAULT NULL,
  `superficieTerrain` float DEFAULT NULL,
  `dateDemande` date DEFAULT NULL,
  `droitDemande` varchar(10) NOT NULL,
  `labordeLat` varchar(12) DEFAULT NULL,
  `labordeLong` varchar(12) DEFAULT NULL,
  `observationDossier` varchar(255) DEFAULT NULL,
  `p_numeroRequerant` int(11) NOT NULL,
  `p_numeroProcedure` int(2) NOT NULL,
  PRIMARY KEY (`numeroDossier`,`numeroAffaire`),
  KEY `p_numeroRequerant` (`p_numeroRequerant`),
  KEY `p_numeroProcedure` (`p_numeroProcedure`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `dossier`
--

INSERT INTO `dossier` (`numeroDossier`, `numeroAffaire`, `dependance`, `natureAffectation`, `empietement`, `lettreDemande`, `planAnnexe`, `pvDelimitation`, `superficieTerrain`, `dateDemande`, `droitDemande`, `labordeLat`, `labordeLong`, `observationDossier`, `p_numeroRequerant`, `p_numeroProcedure`) VALUES
(1, '11-V/2022', 1, 0, 1, 1, 1, 1, 25, '2022-12-01', '5.000', '-21.456000 ', '47.111397', '750m', 2, 11),
(2, '12-V/2022', 0, 0, 0, 1, 1, 1, 777, '2022-10-01', '5.000', NULL, NULL, 'aucune2', 3, 9),
(3, '13-V/2023', 0, 0, 0, 1, 1, 1, 555, '2023-01-24', '5.000', NULL, NULL, 'Hhhggttt', 2, 3),
(4, '14-V/2023', 0, 0, 0, 1, 1, 1, 11111, '2022-01-02', '5.000', NULL, NULL, 'Demande de uno le 1', 6, 7),
(5, '15-V/2023', 0, 0, 0, 1, 1, 1, 22222, '2022-12-01', '5.000', NULL, NULL, '22222', 7, 9),
(6, '16-V/2023', 1, 1, 1, 1, 1, 1, 350, '2022-12-02', '5.000', NULL, NULL, 'Teste mm req 2iem doss', 2, 9),
(7, '17-V/2023', 0, 0, 0, 1, 1, 1, 6996, '2023-01-02', '5.000', NULL, NULL, '9696969', 3, 9),
(8, '11-X/2023', 0, 0, 0, 1, 1, 1, 5555, '2023-01-03', '5.000', NULL, NULL, '125986', 2, 1),
(9, '11-AX/2023', 0, 0, 1, 1, 1, 1, 654, '2022-12-31', '5.000', NULL, NULL, '123131989', 2, 10),
(10, '12-X/2023', 1, 1, 1, 1, 1, 1, 122, '2023-01-03', '5.000', NULL, NULL, 'AUCUNE', 2, 11),
(11, '13-X/2023', 1, 1, 1, 1, 1, 1, 254, '2023-01-03', '5.000', NULL, NULL, 'KANTO', 3, 10),
(12, '18-V/2023', 0, 0, 0, 1, 1, 1, 45, '2023-01-12', '5.000', '-21.565989', '47.598785', 'Quarente cinq', 16, 1),
(13, '19-V/2023', 1, 0, 1, 1, 1, 1, 74.5, '2023-01-15', '5.000', '-21.459993', '47.087585', 'aaaaaaaaaaaaaaa', 69, 1),
(14, '20-V/2023', 0, 0, 0, 1, 1, 1, 79.8, '2023-01-15', '5.000', '-21.459993', '47.087585', 'bbbbbbbbb', 3, 1),
(15, '21-V/2023', 0, 0, 0, 1, 1, 1, 33, '2023-01-15', '5.000', '-21.461486', '47.070139', '22222222222222222', 14, 1),
(16, '22-V/2023', 0, 0, 0, 1, 1, 1, 55, '2023-01-27', '5.000', '-21.256987', '47.258976', 'Aucune remarque', 70, 1);

-- --------------------------------------------------------

--
-- Structure de la table `dossier_temporaire`
--

DROP TABLE IF EXISTS `dossier_temporaire`;
CREATE TABLE IF NOT EXISTS `dossier_temporaire` (
  `idTmpDossier` int(255) NOT NULL AUTO_INCREMENT,
  `numeroAffaire` varchar(15) DEFAULT NULL,
  `dependance` tinyint(1) DEFAULT NULL,
  `natureAffectation` tinyint(1) DEFAULT NULL,
  `empietement` tinyint(1) DEFAULT NULL,
  `lettreDemande` tinyint(1) DEFAULT NULL,
  `planAnnexe` tinyint(1) DEFAULT NULL,
  `pvDelimitation` tinyint(1) DEFAULT NULL,
  `superficieTerrain` float DEFAULT NULL,
  `labordeLat` varchar(15) DEFAULT NULL,
  `labordeLong` varchar(15) DEFAULT NULL,
  `dateDemande` date DEFAULT NULL,
  `droitDemande` varchar(10) DEFAULT NULL,
  `observationDossier` varchar(255) DEFAULT NULL,
  `tmp_numeroRequerant` int(11) DEFAULT NULL,
  `lettreDesistement` tinyint(1) DEFAULT NULL,
  `planMere` tinyint(1) DEFAULT NULL,
  `certificatSituationJuridique` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idTmpDossier`),
  KEY `tmp_numeroRequerant` (`tmp_numeroRequerant`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `dossier_temporaire`
--

INSERT INTO `dossier_temporaire` (`idTmpDossier`, `numeroAffaire`, `dependance`, `natureAffectation`, `empietement`, `lettreDemande`, `planAnnexe`, `pvDelimitation`, `superficieTerrain`, `labordeLat`, `labordeLong`, `dateDemande`, `droitDemande`, `observationDossier`, `tmp_numeroRequerant`, `lettreDesistement`, `planMere`, `certificatSituationJuridique`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `etat_civil`
--

DROP TABLE IF EXISTS `etat_civil`;
CREATE TABLE IF NOT EXISTS `etat_civil` (
  `codeEtatCivil` int(11) NOT NULL AUTO_INCREMENT,
  `etatCivil` varchar(15) NOT NULL,
  `cinConjoint` varchar(12) DEFAULT NULL,
  `nomConjoint` varchar(50) DEFAULT NULL,
  `prenomConjoint` varchar(150) DEFAULT NULL,
  `dateEtatCivil` date DEFAULT NULL,
  `lieuEtatCivil` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`codeEtatCivil`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etat_civil`
--

INSERT INTO `etat_civil` (`codeEtatCivil`, `etatCivil`, `cinConjoint`, `nomConjoint`, `prenomConjoint`, `dateEtatCivil`, `lieuEtatCivil`) VALUES
(1, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(2, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(3, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(4, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(5, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(6, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(7, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(8, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(9, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(10, 'Célibataire', NULL, NULL, NULL, NULL, NULL),
(11, 'Célibataire', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

DROP TABLE IF EXISTS `historique`;
CREATE TABLE IF NOT EXISTS `historique` (
  `numeroHisto` int(255) NOT NULL AUTO_INCREMENT,
  `mouvement` varchar(25) NOT NULL,
  `dateDebutMouvement` date DEFAULT NULL,
  `dateFinMouvement` date DEFAULT NULL,
  `dateRDV` date DEFAULT NULL,
  `dispoDossier` tinyint(1) DEFAULT NULL,
  `approbation` tinyint(1) DEFAULT NULL,
  `accomplissement` tinyint(1) DEFAULT NULL,
  `observation` varchar(250) DEFAULT NULL,
  `h_numeroDossier` int(255) NOT NULL,
  `h_numeroAffaire` varchar(15) NOT NULL,
  `h_numeroProcedure` int(2) NOT NULL,
  `p_numeroCompte` int(11) NOT NULL,
  PRIMARY KEY (`numeroHisto`),
  KEY `p_numeroCompte` (`p_numeroCompte`),
  KEY `h_numeroDossier` (`h_numeroDossier`,`h_numeroAffaire`),
  KEY `h_numeroProcedure` (`h_numeroProcedure`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `historique`
--

INSERT INTO `historique` (`numeroHisto`, `mouvement`, `dateDebutMouvement`, `dateFinMouvement`, `dateRDV`, `dispoDossier`, `approbation`, `accomplissement`, `observation`, `h_numeroDossier`, `h_numeroAffaire`, `h_numeroProcedure`, `p_numeroCompte`) VALUES
(1, 'Arriver', '2021-01-01', '2021-01-01', '2022-12-01', 1, 1, 1, '750m', 1, '11-V/2022', 1, 1),
(2, 'Interne', '2022-12-02', '2022-12-12', '2022-12-09', 1, 1, 1, 'apres 8j nande ny CEL ', 1, '11-V/2022', 2, 1),
(3, 'Depart', '2022-12-29', '2023-01-10', '2022-12-16', 0, 1, 1, 'am\'16/12 nverina av any am\'2nd rep ny sossier', 1, '11-V/2022', 3, 1),
(4, 'Depart', '2022-12-12', '2023-02-02', '2022-12-19', 0, 1, 1, 'am 15 nverina av any am DAS e', 1, '11-V/2022', 4, 1),
(5, 'Arriver', '2022-12-29', '2023-03-15', '2023-01-06', 1, 1, 1, 'Voray av any am\'DAS ny dossier', 1, '11-V/2022', 5, 1),
(6, 'Interne', '2022-12-29', '2023-03-06', '2023-01-06', 1, 1, 1, 'MANAO I.M apres nandoa vola', 1, '11-V/2022', 5, 1),
(23, 'Depart', '2022-12-29', '2023-03-21', '2022-12-23', 0, 1, 1, 'vita bornage io 23', 1, '11-V/2022', 6, 1),
(24, 'Arriver', '2022-12-29', '2023-04-02', NULL, 1, 1, 1, '725.5 haza le 24', 1, '11-V/2022', 7, 1),
(25, 'Interne', '2022-12-29', '2023-04-11', NULL, 1, 1, 1, 'F.L.C Valide.', 1, '11-V/2022', 8, 1),
(26, 'Interne', '2022-12-29', '2023-04-19', NULL, 1, 1, 1, 'Decompte Encours ....', 1, '11-V/2022', 9, 1),
(27, 'Depart', '2022-12-29', '2023-04-24', '2022-12-29', 0, 1, 1, 'EST CE QUE CA VA PASSER AU P.A.V', 1, '11-V/2022', 10, 1),
(30, 'Arriver', '2022-12-29', NULL, '2023-05-05', 1, 0, 0, 'MVERINA AV AM PAV', 1, '11-V/2022', 11, 1),
(31, 'Arriver', '2022-10-01', '2022-10-01', '2022-10-01', 1, 1, 1, 'aucune2', 2, '12-V/2022', 1, 1),
(32, 'Interne', '2022-12-05', '2022-12-12', '2022-10-06', 1, 1, 1, 'Cel kanto', 2, '12-V/2022', 2, 1),
(33, 'Depart', '2022-12-30', '2023-01-20', '2022-10-12', 0, 1, 1, '2nd repra', 2, '12-V/2022', 3, 1),
(34, 'Depart', '2022-12-30', '2023-02-12', '2022-10-13', 0, 1, 1, 'das srd', 2, '12-V/2022', 4, 1),
(35, 'Arriver', '2022-12-30', '2023-03-15', '2023-01-07', 1, 1, 1, 'retour vers DRD\n', 2, '12-V/2022', 5, 1),
(36, 'Interne', '2022-12-30', '2023-03-06', '2023-01-07', 1, 1, 1, 'tss blem fona', 2, '12-V/2022', 5, 1),
(37, 'Depart', '2022-12-30', '2023-03-21', '2022-10-25', 0, 1, 1, 'pour bornage', 2, '12-V/2022', 6, 1),
(38, 'Arriver', '2022-12-30', '2023-04-02', NULL, 1, 1, 1, 'nahazo mesure terrain', 2, '12-V/2022', 7, 1),
(39, 'Interne', '2022-12-30', '2023-04-11', NULL, 1, 1, 1, 'F.L.C Valide.', 2, '12-V/2022', 8, 1),
(40, 'Interne', '2022-12-30', NULL, NULL, 1, 0, 0, 'Decompte Encours ....', 2, '12-V/2022', 9, 1),
(41, 'Arriver', '2023-01-24', '2023-01-24', '2023-01-27', 1, 1, 1, 'Hhhggttt', 3, '13-V/2023', 1, 1),
(42, 'Arriver', '2022-01-02', '2022-01-02', '2023-01-07', 1, 1, 1, 'Demande de uno le 1', 4, '14-V/2023', 1, 1),
(43, 'Interne', '2023-01-01', '2023-01-12', '2023-01-14', 1, 1, 1, 'Cel le 14', 4, '14-V/2023', 2, 1),
(44, 'Depart', '2023-01-01', NULL, '2023-01-15', 0, 0, 0, '21 apres reperage topo', 4, '14-V/2023', 3, 1),
(45, 'Depart', '2023-01-01', '2023-01-21', '2023-01-28', 0, 1, 1, 'Das ny srd nay', 4, '14-V/2023', 4, 1),
(46, 'Interne', '2023-01-01', '2023-02-05', '2023-01-09', 1, 1, 1, '11111111111', 4, '14-V/2023', 5, 1),
(47, 'Depart', '2023-01-01', '2023-03-17', '2023-02-02', 0, 1, 1, 'Fin bornage le 2 fevr', 4, '14-V/2023', 6, 1),
(48, 'Arriver', '2023-01-01', NULL, '2023-02-09', 1, 0, 0, 'Date remise', 4, '14-V/2023', 7, 1),
(49, 'Arriver', '2022-12-01', '2022-12-01', '2022-12-01', 1, 1, 1, '22222', 5, '15-V/2023', 1, 1),
(50, 'Interne', '2023-01-01', '2023-01-21', '2022-12-02', 1, 1, 1, 'Cel le 2 jav', 5, '15-V/2023', 2, 1),
(51, 'Depart', '2023-01-01', '2023-01-15', '2022-12-05', 0, 1, 1, 'Le 5 jav 2nd repra', 5, '15-V/2023', 3, 1),
(52, 'Depart', '2023-01-01', '2023-01-21', '2022-12-08', 0, 1, 1, 'Retour et envoyé en DASS', 5, '15-V/2023', 4, 1),
(53, 'Arriver', '2023-01-01', '2023-02-09', '2023-01-09', 1, 1, 1, 'Atoko le olona f lasa pour I.M ty', 5, '15-V/2023', 5, 1),
(54, 'Interne', '2023-01-01', '2023-02-28', '2023-01-09', 1, 1, 1, 'Tong anome anarana le tompony', 5, '15-V/2023', 5, 2),
(55, 'Depart', '2023-01-01', '2023-03-29', '2022-12-30', 0, 1, 1, '30mverena', 5, '15-V/2023', 6, 2),
(56, 'Arriver', '2023-01-01', '2023-04-03', NULL, 1, 1, 1, 'Nahazo mesure lery', 5, '15-V/2023', 7, 2),
(57, 'Interne', '2023-01-01', '2023-04-08', NULL, 1, 1, 1, 'F.L.C Valide.', 5, '15-V/2023', 8, 2),
(58, 'Interne', '2023-01-01', NULL, NULL, 1, 0, 0, 'Decompte Encours ....', 5, '15-V/2023', 9, 2),
(59, 'Arriver', '2022-12-02', '2022-12-02', '2022-12-02', 1, 1, 1, 'Teste mm req 2iem doss', 6, '16-V/2023', 1, 2),
(60, 'Interne', '2023-01-01', '2023-01-05', '2022-12-09', 1, 1, 1, 'Lasa ar kanto ah', 6, '16-V/2023', 2, 2),
(61, 'Depart', '2023-01-01', '2023-01-15', '2022-12-14', 0, 1, 1, 'Nnnn', 6, '16-V/2023', 3, 2),
(62, 'Depart', '2023-01-01', '2023-01-21', '2022-12-15', 0, 1, 1, 'Bdjdkdkd', 6, '16-V/2023', 4, 2),
(63, 'Arriver', '2023-01-01', '2023-02-05', '2023-01-09', 1, 1, 1, 'Kdkdnd', 6, '16-V/2023', 5, 2),
(64, 'Interne', '2023-01-01', '2023-02-28', '2023-01-09', 1, 1, 1, 'Jdjdkks', 6, '16-V/2023', 5, 2),
(65, 'Depart', '2023-01-01', '2023-03-17', '2022-12-22', 0, 1, 1, 'Jbbsis', 6, '16-V/2023', 6, 2),
(66, 'Arriver', '2023-01-01', '2023-04-03', NULL, 1, 1, 1, 'Hdjsislskdjdhdjksksksdjdj', 6, '16-V/2023', 7, 1),
(67, 'Interne', '2023-01-01', '2023-04-08', NULL, 1, 1, 1, 'F.L.C Valide.', 6, '16-V/2023', 8, 1),
(68, 'Interne', '2023-01-01', NULL, NULL, 1, 0, 0, 'Decompte Encours ....', 6, '16-V/2023', 9, 1),
(69, 'Arriver', '2023-01-02', '2023-12-02', '2023-01-02', 1, 1, 1, '9696969', 7, '17-V/2023', 1, 1),
(70, 'Interne', '2023-01-02', '2023-01-21', '2023-01-02', 1, 1, 1, '54444444', 7, '17-V/2023', 2, 1),
(71, 'Depart', '2023-01-02', '2023-01-04', '2023-01-03', 0, 1, 1, '5444444', 7, '17-V/2023', 3, 1),
(72, 'Depart', '2023-01-02', '2023-01-21', '2023-01-04', 0, 1, 1, '5425425', 7, '17-V/2023', 4, 1),
(73, 'Arriver', '2023-01-02', '2023-02-09', '2023-01-10', 1, 1, 1, '52222', 7, '17-V/2023', 5, 1),
(74, 'Interne', '2023-01-02', '2023-02-28', '2023-01-10', 1, 1, 1, '2222222', 7, '17-V/2023', 5, 1),
(75, 'Depart', '2023-01-02', '2023-03-29', '2023-01-04', 0, 1, 1, '2222', 7, '17-V/2023', 6, 1),
(76, 'Arriver', '2023-01-02', '2023-04-03', NULL, 1, 1, 1, '669.99', 7, '17-V/2023', 7, 1),
(77, 'Interne', '2023-01-02', '2023-04-08', NULL, 1, 1, 1, 'F.L.C Valide.', 7, '17-V/2023', 8, 1),
(78, 'Interne', '2023-01-02', NULL, NULL, 1, 0, 0, 'Decompte Encours ....', 7, '17-V/2023', 9, 1),
(79, 'Interne', '2023-01-02', '2023-01-12', '2023-01-02', 1, 1, 1, '111111', 3, '13-V/2023', 2, 2),
(80, 'Depart', '2023-01-02', NULL, '2023-01-08', 0, 0, 0, '25244', 3, '13-V/2023', 3, 2),
(81, 'Arriver', '2023-01-03', NULL, '2023-01-03', 1, 0, 0, '125986', 8, '11-X/2023', 1, 1),
(82, 'Arriver', '2022-12-31', '2023-01-03', '2023-01-03', 1, 1, 1, '123131989', 9, '11-AX/2023', 1, 1),
(83, 'Arriver', '2023-01-03', '2023-01-04', '2023-01-03', 1, 1, 1, 'AUCUNE', 10, '12-X/2023', 1, 1),
(84, 'Arriver', '2023-01-03', '2023-01-03', '2023-01-03', 1, 1, 1, 'KANTO', 11, '13-X/2023', 1, 1),
(85, 'Arriver', '2023-01-03', '2023-01-03', '2023-01-03', 1, 1, 1, 'KANTO', 12, '12-AX/2023', 1, 1),
(86, 'Interne', '2023-01-03', '2023-01-03', '2023-01-04', 1, 1, 1, 'manao CEL', 12, '12-AX/2023', 2, 5),
(87, 'Depart', '2023-01-03', '2023-01-03', '2023-01-11', 0, 1, 1, 'Lasa pour 2nd reperage\n', 12, '12-AX/2023', 3, 5),
(88, 'Depart', '2023-01-03', '2023-01-03', '2023-01-11', 0, 1, 1, 'sssssssss', 12, '12-AX/2023', 4, 5),
(89, 'Arriver', '2023-01-03', NULL, '2023-01-11', 1, 0, 0, '950 hoz SRD', 12, '12-AX/2023', 5, 5),
(90, 'Arriver', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, '950 hoz SRD', 12, '12-AX/2023', 7, 5),
(91, 'Interne', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, 'F.L.C Valide.', 12, '12-AX/2023', 8, 5),
(92, 'Interne', '2023-01-03', NULL, NULL, 1, 0, 0, 'Decompte Encours ....', 12, '12-AX/2023', 9, 5),
(93, 'Interne', '2023-01-03', '2023-01-03', '2023-01-04', 1, 1, 1, '555555', 11, '13-X/2023', 2, 5),
(94, 'Depart', '2023-01-03', '2023-01-03', '2023-01-06', 0, 1, 1, '5555', 11, '13-X/2023', 3, 5),
(95, 'Depart', '2023-01-03', '2023-01-03', '2023-01-11', 0, 1, 1, '55555555', 11, '13-X/2023', 4, 5),
(96, 'Arriver', '2023-01-03', '2023-01-03', '2023-01-11', 1, 1, 1, '5555555555', 11, '13-X/2023', 5, 5),
(97, 'Interne', '2023-01-03', '2023-01-03', '2023-01-11', 1, 1, 1, '555555', 11, '13-X/2023', 5, 5),
(98, 'Depart', '2023-01-03', '2023-01-03', '2023-01-12', 0, 1, 1, 'XXXXXXXX', 11, '13-X/2023', 6, 5),
(99, 'Arriver', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, 'XXXXXXX', 11, '13-X/2023', 7, 5),
(100, 'Interne', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, 'F.L.C Valide.', 11, '13-X/2023', 8, 5),
(101, 'Interne', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, 'Decompte Encours ....', 11, '13-X/2023', 9, 5),
(102, 'Depart', '2023-01-03', NULL, '2023-01-21', 0, 0, 0, '555555555', 11, '13-X/2023', 10, 5),
(103, 'Interne', '2023-01-03', '2023-01-03', '2023-01-04', 1, 1, 1, '5555555', 9, '11-AX/2023', 2, 5),
(104, 'Depart', '2023-01-03', '2023-01-03', '2023-01-11', 0, 1, 1, '475858', 9, '11-AX/2023', 3, 5),
(105, 'Depart', '2023-01-03', '2023-01-03', '2023-01-11', 0, 1, 1, '272727', 9, '11-AX/2023', 4, 5),
(106, 'Arriver', '2023-01-03', '2023-01-03', '2023-01-11', 1, 1, 1, '455542', 9, '11-AX/2023', 5, 5),
(107, 'Interne', '2023-01-03', '2023-01-03', '2023-01-11', 1, 1, 1, '8787785', 9, '11-AX/2023', 5, 5),
(108, 'Depart', '2023-01-03', '2023-01-03', '2023-01-19', 0, 1, 1, '6666666', 9, '11-AX/2023', 6, 5),
(109, 'Arriver', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, '55555555', 9, '11-AX/2023', 7, 5),
(110, 'Interne', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, 'F.L.C Valide.', 9, '11-AX/2023', 8, 5),
(111, 'Interne', '2023-01-03', '2023-01-03', NULL, 1, 1, 1, 'Decompte Encours ....', 9, '11-AX/2023', 9, 5),
(112, 'Depart', '2023-01-03', NULL, '2023-01-13', 0, 0, 0, 'fefefrefererf', 9, '11-AX/2023', 10, 5),
(113, 'Interne', '2023-01-04', '2023-01-04', '2023-01-05', 1, 1, 1, 'cel am\'5', 10, '12-X/2023', 2, 1),
(114, 'Depart', '2023-01-04', '2023-01-04', '2023-01-05', 0, 1, 1, '2nd reperage', 10, '12-X/2023', 3, 1),
(115, 'Depart', '2023-01-04', '2023-01-04', '2023-01-12', 0, 1, 1, 'prposition de prix', 10, '12-X/2023', 4, 1),
(116, 'Arriver', '2023-01-04', '2023-01-04', '2023-01-12', 1, 1, 1, 'prix proposer par la SRD', 10, '12-X/2023', 5, 1),
(117, 'Interne', '2023-01-04', '2023-01-04', '2023-01-12', 1, 1, 1, 'IMMATRICULATION', 10, '12-X/2023', 5, 1),
(118, 'Depart', '2023-01-04', '2023-01-04', '2023-01-18', 0, 1, 1, 'Pour Bornage', 10, '12-X/2023', 6, 1),
(119, 'Arriver', '2023-01-04', '2023-01-04', NULL, 1, 1, 1, 'remise venant de topo', 10, '12-X/2023', 7, 1),
(120, 'Interne', '2023-01-04', '2023-01-04', NULL, 1, 1, 1, 'F.L.C Valide.', 10, '12-X/2023', 8, 1),
(121, 'Interne', '2023-01-04', '2023-01-04', NULL, 1, 1, 1, 'Decompte Encours ....', 10, '12-X/2023', 9, 1),
(122, 'Depart', '2023-01-04', '2023-01-04', '2023-01-04', 0, 1, 1, 'projet PAV ', 10, '12-X/2023', 10, 1),
(123, 'Arriver', '2023-01-04', NULL, '2023-01-12', 1, 0, 0, 'MUTATION', 10, '12-X/2023', 11, 1),
(124, 'Arriver', '2023-01-12', NULL, '2023-01-12', 1, 0, 0, 'Quarente cinq', 12, '18-V/2023', 1, 1),
(125, 'Arriver', '2023-01-15', NULL, '2023-01-15', 1, 0, 0, 'aaaaaaaaaaaaaaa', 13, '19-V/2023', 1, 2),
(126, 'Arriver', '2023-01-15', NULL, '2023-01-15', 1, 0, 0, 'bbbbbbbbb', 14, '20-V/2023', 1, 4),
(127, 'Arriver', '2023-01-15', NULL, '2023-01-15', 1, 0, 0, '22222222222222222', 15, '21-V/2023', 1, 2),
(128, 'Arriver', '2023-01-27', NULL, '2023-01-27', 1, 0, 0, 'Aucune remarque', 16, '22-V/2023', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `individu`
--

DROP TABLE IF EXISTS `individu`;
CREATE TABLE IF NOT EXISTS `individu` (
  `cin` varchar(12) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `lieuNaiss` varchar(100) NOT NULL,
  `dateNaiss` date DEFAULT NULL,
  `profession` varchar(100) NOT NULL,
  `domicile` varchar(50) NOT NULL,
  `dateLivrance` date DEFAULT NULL,
  `lieuLivrance` varchar(50) NOT NULL,
  `p_codeEtatCivil` int(11) NOT NULL,
  PRIMARY KEY (`cin`),
  KEY `p_codeEtatCivil` (`p_codeEtatCivil`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `individu`
--

INSERT INTO `individu` (`cin`, `nom`, `prenom`, `lieuNaiss`, `dateNaiss`, `profession`, `domicile`, `dateLivrance`, `lieuLivrance`, `p_codeEtatCivil`) VALUES
('111111111111', 'UNO ', 'Mister First', 'Tamatave', '1990-01-01', 'Maitre en un', 'Lot 1111 Ftsoa', '2008-01-02', 'Ftsoa', 3),
('201011028460', 'LEFORT', 'Nomenjanahary Nuno', 'Toamasina', '2000-07-29', 'Etudiant', 'Rova Lot 0206', '2018-08-07', 'Fianarantsoa', 1),
('201011460028', 'RAKOTO', 'Clement', 'FIANARANTSOA', '1985-01-11', 'MALGACHE', 'FIANARANTSOA', '2003-01-11', 'FIANARANTSOA', 1),
('201012013089', 'ANDRIANIFITIAVANA ', 'Ny Kanto Michella ', 'FTSOA', '2001-01-31', 'Étudiante', 'ANKOFAFA', '2019-01-31', 'Ftsoa', 2),
('222221222222', 'DEUX', 'TWOOO', 'TAMATAVE', '1992-02-22', 'MAITRE', 'LOT 2222 ANJOMA', '2010-02-22', 'INCONNU', 5),
('222222222223', '22222', '222222', '2222222', '1992-02-22', '222222', '2222222', '2010-02-22', '22222', 6),
('333331333333', 'BIGFLO', 'Oli ', 'TANA', '1957-01-12', 'Avocat', 'Ampasambazaha Lot 333', '1975-01-13', 'TANA', 9),
('501011222218', 'AAAAB', 'AAAAAB', 'Diego', '1992-02-20', '22222', '222222', '2010-02-22', '222222', 7),
('501012035987', 'DEUX', 'MIss Two', 'Tana', '2000-01-01', 'Deuxième ', 'Fianar lot 202', '2018-01-01', 'Ftsoa', 4),
('901012565897', 'TESTE', 'NOTRE TESTE', 'Ftsoa', '1992-01-04', 'Chauffeur', 'Lot 206 Anjoma', '2010-01-04', 'Ftsoa', 8),
('901022036548', 'MERLINA', 'Bella', 'Fianarantsoa', '1980-01-22', 'Juge', 'Talatamaty Lot IB 2015', '1998-01-23', 'Toliar', 10);

-- --------------------------------------------------------

--
-- Structure de la table `numero_affaire_ax`
--

DROP TABLE IF EXISTS `numero_affaire_ax`;
CREATE TABLE IF NOT EXISTS `numero_affaire_ax` (
  `autoNumber` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`autoNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `numero_affaire_ax`
--

INSERT INTO `numero_affaire_ax` (`autoNumber`) VALUES
(10),
(11),
(12);

-- --------------------------------------------------------

--
-- Structure de la table `numero_affaire_v`
--

DROP TABLE IF EXISTS `numero_affaire_v`;
CREATE TABLE IF NOT EXISTS `numero_affaire_v` (
  `autoNumber` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`autoNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `numero_affaire_v`
--

INSERT INTO `numero_affaire_v` (`autoNumber`) VALUES
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22);

-- --------------------------------------------------------

--
-- Structure de la table `numero_affaire_x`
--

DROP TABLE IF EXISTS `numero_affaire_x`;
CREATE TABLE IF NOT EXISTS `numero_affaire_x` (
  `autoNumber` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`autoNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `numero_affaire_x`
--

INSERT INTO `numero_affaire_x` (`autoNumber`) VALUES
(10),
(11),
(12),
(13);

-- --------------------------------------------------------

--
-- Structure de la table `numero_im_ax`
--

DROP TABLE IF EXISTS `numero_im_ax`;
CREATE TABLE IF NOT EXISTS `numero_im_ax` (
  `autoNumber` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`autoNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `numero_im_ax`
--

INSERT INTO `numero_im_ax` (`autoNumber`) VALUES
(10),
(11);

-- --------------------------------------------------------

--
-- Structure de la table `numero_im_v`
--

DROP TABLE IF EXISTS `numero_im_v`;
CREATE TABLE IF NOT EXISTS `numero_im_v` (
  `autoNumber` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`autoNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `numero_im_v`
--

INSERT INTO `numero_im_v` (`autoNumber`) VALUES
(10),
(11),
(12),
(13),
(14),
(15),
(16);

-- --------------------------------------------------------

--
-- Structure de la table `numero_im_x`
--

DROP TABLE IF EXISTS `numero_im_x`;
CREATE TABLE IF NOT EXISTS `numero_im_x` (
  `autoNumber` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`autoNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `numero_im_x`
--

INSERT INTO `numero_im_x` (`autoNumber`) VALUES
(10),
(11),
(12);

-- --------------------------------------------------------

--
-- Structure de la table `procedures`
--

DROP TABLE IF EXISTS `procedures`;
CREATE TABLE IF NOT EXISTS `procedures` (
  `numeroProcedure` int(3) NOT NULL AUTO_INCREMENT,
  `nomProcedure` varchar(50) NOT NULL,
  `natureProcedure` varchar(100) NOT NULL,
  `movProcedure` varchar(20) NOT NULL,
  `p_idBureau` int(3) NOT NULL,
  PRIMARY KEY (`numeroProcedure`),
  KEY `p_idBureau` (`p_idBureau`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `procedures`
--

INSERT INTO `procedures` (`numeroProcedure`, `nomProcedure`, `natureProcedure`, `movProcedure`, `p_idBureau`) VALUES
(1, 'N.D', 'Nouvelle Demande', 'Interne', 1),
(2, 'C.E.L', 'Constat de l\'Etat de Lieu', 'Interne', 1),
(3, '2nd Répèrage', 'Second Répèrage de TOPO', 'Depart', 3),
(4, 'D.A.S', 'Décisoin Autorité Supérieur', 'Depart', 2),
(5, 'I.M', 'Immatriculation', 'Interne', 1),
(6, 'BORNAGE', 'Bornage de TOPO', 'Depart', 3),
(7, 'REMISE', 'Retour après Bornage', 'Arriver', 1),
(8, 'F.L.C', 'Fixation Limite et Contenance', 'Interne', 1),
(9, 'DECOMPTE', 'Clcule Prix Total du Terrain', 'Interne', 1),
(10, 'P.A.V', 'Projet d Avant Vente (Traitement d Approbation)', 'Depart', 4),
(11, 'MUTATION', 'Délivrance du titre ', 'Interne', 1),
(69, 'AVORTEMENT', 'Avorter un dossier ', 'Interne', 1);

-- --------------------------------------------------------

--
-- Structure de la table `requerant`
--

DROP TABLE IF EXISTS `requerant`;
CREATE TABLE IF NOT EXISTS `requerant` (
  `numeroRequerant` int(11) NOT NULL AUTO_INCREMENT,
  `etatMorale` tinyint(1) DEFAULT '0',
  `numeroTelephone` varchar(12) DEFAULT NULL,
  `complementInformation` varchar(255) DEFAULT NULL,
  `p_cin` varchar(12) NOT NULL,
  PRIMARY KEY (`numeroRequerant`),
  KEY `p_cin` (`p_cin`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `requerant`
--

INSERT INTO `requerant` (`numeroRequerant`, `etatMorale`, `numeroTelephone`, `complementInformation`, `p_cin`) VALUES
(1, 1, '348658868', 'ENI', '201011028460'),
(2, 0, '380994042', NULL, '201011028460'),
(3, 0, '349071211', 'Personne independnate.', '201012013089'),
(6, 0, '111111111', 'C\'est le UNO', '111111111111'),
(7, 0, '222222222', 'Ma tres cher 2', '501012035987'),
(8, 0, '222222222', '222222', '222221222222'),
(9, 0, '222222222', '222222', '222222222223'),
(10, 0, '222222222', '222222', '501011222218'),
(14, 0, '888888888', '888888888', '501011222218'),
(15, 0, '348978889', 'Aucune', '901012565897'),
(16, 0, '333333333', 'Aucune', '333331333333'),
(69, 0, '343395370', NULL, '201011460028'),
(70, 0, '348995878', 'Aucune remarque', '901022036548');

-- --------------------------------------------------------

--
-- Structure de la table `sous_dossier`
--

DROP TABLE IF EXISTS `sous_dossier`;
CREATE TABLE IF NOT EXISTS `sous_dossier` (
  `numeroSousDossier` int(255) NOT NULL AUTO_INCREMENT,
  `observationSD` varchar(250) DEFAULT NULL,
  `dateDepotSD` date DEFAULT NULL,
  `mesureAttribuable` varchar(50) DEFAULT NULL,
  `prixAttribue` varchar(100) DEFAULT NULL,
  `lettreDesistement` tinyint(1) DEFAULT NULL,
  `planMere` tinyint(1) DEFAULT NULL,
  `certificatSituationJuridique` tinyint(1) DEFAULT NULL,
  `VISA` tinyint(1) DEFAULT NULL,
  `preVISA` tinyint(1) DEFAULT NULL,
  `p_numeroDossier` int(255) NOT NULL,
  `p_numeroAffaire` varchar(15) NOT NULL,
  PRIMARY KEY (`numeroSousDossier`),
  KEY `p_numeroDossier` (`p_numeroDossier`,`p_numeroAffaire`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `sous_dossier`
--

INSERT INTO `sous_dossier` (`numeroSousDossier`, `observationSD`, `dateDepotSD`, `mesureAttribuable`, `prixAttribue`, `lettreDesistement`, `planMere`, `certificatSituationJuridique`, `VISA`, `preVISA`, `p_numeroDossier`, `p_numeroAffaire`) VALUES
(1, '750m', '2022-12-01', 'NULL', 'NULL', 1, 1, 1, NULL, NULL, 1, '11-V/2022'),
(2, 'am\'15 nverina av any am\'DAS e', '2022-12-29', NULL, '525', 1, 1, 1, NULL, NULL, 1, '11-V/2022'),
(8, '725.5 haza le 24', '2022-12-29', '2.85', '525', 1, 1, 1, NULL, NULL, 1, '11-V/2022'),
(9, 'aucune2', '2022-10-01', 'NULL', 'NULL', 0, 0, 0, 0, 0, 2, '12-V/2022'),
(10, 'das srd', '2022-12-30', NULL, '1500', 0, 0, 0, NULL, NULL, 2, '12-V/2022'),
(11, 'nahazo mesure terrain', '2022-12-30', '755.5', '1500', 0, 0, 0, NULL, NULL, 2, '12-V/2022'),
(12, 'Hhhggttt', '2023-01-24', 'NULL', 'NULL', 0, 0, 0, NULL, NULL, 3, '13-V/2023'),
(13, 'Demande de uno le 1', '2022-01-02', 'NULL', 'NULL', 0, 0, 0, NULL, NULL, 4, '14-V/2023'),
(14, 'Das ny srd nay', '2023-01-01', NULL, '800', 0, 0, 0, NULL, NULL, 4, '14-V/2023'),
(15, '22222', '2022-12-01', 'NULL', 'NULL', 0, 0, 0, NULL, NULL, 5, '15-V/2023'),
(16, 'Retour et envoyé en DASS', '2023-01-01', NULL, '800', 0, 0, 0, NULL, NULL, 5, '15-V/2023'),
(17, 'Nahazo mesure lery', '2023-01-01', '2220', '800', 0, 0, 0, NULL, NULL, 5, '15-V/2023'),
(18, 'Teste mm req 2iem doss', '2022-12-02', 'NULL', 'NULL', 1, 1, 1, NULL, NULL, 6, '16-V/2023'),
(19, 'Bdjdkdkd', '2023-01-01', NULL, '950', 1, 1, 1, NULL, NULL, 6, '16-V/2023'),
(20, 'Hdjsislskdjdhdjksksksdjdj', '2023-01-01', '375', '950', 1, 1, 1, NULL, NULL, 6, '16-V/2023'),
(21, '9696969', '2023-01-02', 'NULL', 'NULL', 0, 0, 0, NULL, NULL, 7, '17-V/2023'),
(22, '5425425', '2023-01-02', NULL, '900', 0, 0, 0, NULL, NULL, 7, '17-V/2023'),
(23, '669.99', '2023-01-02', '669.9', '900', 0, 0, 0, NULL, NULL, 7, '17-V/2023'),
(24, '125986', '2023-01-03', 'NULL', 'NULL', 0, 0, 0, NULL, NULL, 8, '11-X/2023'),
(25, '123131989', '2022-12-31', 'NULL', 'NULL', 1, 0, 0, NULL, NULL, 9, '11-AX/2023'),
(26, 'AUCUNE', '2023-01-03', 'NULL', 'NULL', 1, 1, 1, NULL, NULL, 10, '12-X/2023'),
(27, 'KANTO', '2023-01-03', 'NULL', 'NULL', 1, 1, 1, NULL, NULL, 11, '13-X/2023'),
(31, '55555555', '2023-01-03', NULL, '450', 1, 1, 1, NULL, NULL, 11, '13-X/2023'),
(32, '5555555555', '2023-01-03', NULL, '560', 1, 1, 1, NULL, NULL, 11, '13-X/2023'),
(33, 'XXXXXXX', '2023-01-03', '789', '560', 1, 1, 1, NULL, NULL, 11, '13-X/2023'),
(34, '272727', '2023-01-03', NULL, '252', 1, 0, 0, NULL, NULL, 9, '11-AX/2023'),
(35, '455542', '2023-01-03', NULL, '400', 1, 0, 0, NULL, NULL, 9, '11-AX/2023'),
(36, '55555555', '2023-01-03', '12.5', '400', 1, 0, 0, NULL, NULL, 9, '11-AX/2023'),
(37, 'prposition de prix', '2023-01-04', NULL, '750', 1, 1, 1, NULL, NULL, 10, '12-X/2023'),
(38, 'prix proposer par la SRD', '2023-01-04', NULL, '700', 1, 1, 1, NULL, NULL, 10, '12-X/2023'),
(39, 'remise venant de topo', '2023-01-04', '690', '700', 1, 1, 1, NULL, NULL, 10, '12-X/2023'),
(40, 'Quarente cinq', '2023-01-12', 'NULL', 'NULL', 0, 0, 0, 0, 1, 12, '18-V/2023'),
(41, 'aaaaaaaaaaaaaaa', '2023-01-15', 'NULL', 'NULL', 1, 1, 1, 0, 1, 13, '19-V/2023'),
(42, 'bbbbbbbbb', '2023-01-15', 'NULL', 'NULL', 0, 0, 0, 0, 1, 14, '20-V/2023'),
(43, '22222222222222222', '2023-01-15', 'NULL', 'NULL', 0, 0, 0, 0, 1, 15, '21-V/2023'),
(44, 'Aucune remarque', '2023-01-27', 'NULL', 'NULL', 0, 0, 0, 0, 0, 16, '22-V/2023');

-- --------------------------------------------------------

--
-- Structure de la table `terrain`
--

DROP TABLE IF EXISTS `terrain`;
CREATE TABLE IF NOT EXISTS `terrain` (
  `numeroTitre` int(255) NOT NULL AUTO_INCREMENT,
  `immatriculationTerrain` varchar(20) NOT NULL,
  `nomPropriete` varchar(150) NOT NULL,
  `etatCiviqueTerrain` varchar(15) DEFAULT 'MALGACHE',
  `prixTerrain` varchar(100) DEFAULT NULL,
  `t_labordeLat` varchar(15) DEFAULT NULL,
  `t_labordeLong` varchar(15) DEFAULT NULL,
  `t_cin` varchar(12) DEFAULT NULL,
  `t_numeroDossier` int(100) DEFAULT NULL,
  `t_numeroAffaire` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`numeroTitre`,`immatriculationTerrain`),
  KEY `t_cin` (`t_cin`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `terrain`
--

INSERT INTO `terrain` (`numeroTitre`, `immatriculationTerrain`, `nomPropriete`, `etatCiviqueTerrain`, `prixTerrain`, `t_labordeLat`, `t_labordeLong`, `t_cin`, `t_numeroDossier`, `t_numeroAffaire`) VALUES
(11, '11-AX', 'FITIA', 'MALGACHE', '348.000', NULL, NULL, '201011028460', 9, '11-AX/2023'),
(12, '12-X', 'MAMISOA', 'MALGACHE', NULL, '-21.457636', '47.092757', '201011028460', 10, '12-X/2023'),
(13, '13-V', 'SOAMILA', 'MALGACHE', '257.500', '-21.461660', '47.069991', '201011028460', 3, '13-V/2023'),
(14, '14-V', 'SOANIERA', 'MALGACHE', '25.650', NULL, NULL, '501012035987', 5, '15-V/2023'),
(15, '15-V', 'BEAU 2IEL', 'MALGACHE', NULL, NULL, NULL, '201011028460', 6, '16-V/2023'),
(16, '16-V', 'TESMILA', 'MALGACHE', '128.700', NULL, NULL, '201012013089', 7, '17-V/2023'),
(17, '11-V', 'KINYA', 'MALGACHE', '232.100', '-21.456000', '47.111397', '201011028460', 1, '11-V/2022'),
(18, '11-X', 'RABE', 'MALGACHE', NULL, NULL, NULL, '201012013089', 11, '13-X/2023'),
(19, '12-V', 'KANTMI', 'MALGACHE', '582.100', NULL, NULL, '201012013089', 2, '12-V/2022');

-- --------------------------------------------------------

--
-- Structure de la table `tmpcompte`
--

DROP TABLE IF EXISTS `tmpcompte`;
CREATE TABLE IF NOT EXISTS `tmpcompte` (
  `numeroCompte` int(11) NOT NULL AUTO_INCREMENT,
  `identification` varchar(50) NOT NULL,
  `photoPDP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attribut` varchar(15) DEFAULT 'Utilisateur',
  `mdp` varchar(100) NOT NULL,
  `unite` tinyint(1) NOT NULL,
  `statu` tinyint(1) DEFAULT '0',
  `u_cin` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`numeroCompte`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `compte_ibfk_1` FOREIGN KEY (`u_cin`) REFERENCES `individu` (`cin`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `dossier`
--
ALTER TABLE `dossier`
  ADD CONSTRAINT `dossier_ibfk_1` FOREIGN KEY (`p_numeroRequerant`) REFERENCES `requerant` (`numeroRequerant`) ON UPDATE CASCADE,
  ADD CONSTRAINT `dossier_ibfk_2` FOREIGN KEY (`p_numeroProcedure`) REFERENCES `procedures` (`numeroProcedure`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `dossier_temporaire`
--
ALTER TABLE `dossier_temporaire`
  ADD CONSTRAINT `dossier_temporaire_ibfk_1` FOREIGN KEY (`tmp_numeroRequerant`) REFERENCES `requerant` (`numeroRequerant`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `individu`
--
ALTER TABLE `individu`
  ADD CONSTRAINT `individu_ibfk_1` FOREIGN KEY (`p_codeEtatCivil`) REFERENCES `etat_civil` (`codeEtatCivil`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `procedures`
--
ALTER TABLE `procedures`
  ADD CONSTRAINT `procedures_ibfk_1` FOREIGN KEY (`p_idBureau`) REFERENCES `bureau` (`idBureau`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `requerant`
--
ALTER TABLE `requerant`
  ADD CONSTRAINT `requerant_ibfk_1` FOREIGN KEY (`p_cin`) REFERENCES `individu` (`cin`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `sous_dossier`
--
ALTER TABLE `sous_dossier`
  ADD CONSTRAINT `sous_dossier_ibfk_1` FOREIGN KEY (`p_numeroDossier`,`p_numeroAffaire`) REFERENCES `dossier` (`numeroDossier`, `numeroAffaire`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `terrain`
--
ALTER TABLE `terrain`
  ADD CONSTRAINT `terrain_ibfk_1` FOREIGN KEY (`t_cin`) REFERENCES `individu` (`cin`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
