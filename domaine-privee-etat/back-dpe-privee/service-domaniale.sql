-- /********************************************************/
-- /***** // B.A.-BA \\ *****/
create database BDD_DOMANIALE_FTSOA;

-- drop database BDD_DOMANIALE_FTSOA;
use BDD_DOMANIALE_FTSOA;

-- show tables;
-- describe nom_table;
-- /********************************************************/
-- /***** // CREATION TABLES \\ *****/
create table ETAT_CIVIL (
  codeEtatCivil int(11) NOT NULL AUTO_INCREMENT,
  etatCivil varchar(15) NOT NULL,
  cinConjoint varchar(12) DEFAULT NULL,
  nomConjoint varchar(50) DEFAULT NULL,
  prenomConjoint varchar(150) DEFAULT NULL,
  dateEtatCivil date,
  lieuEtatCivil varchar(50) DEFAULT NULL,
  PRIMARY KEY (codeEtatCivil)
) ENGINE = INNODB;

create table INDIVIDU (
  cin varchar(12) NOT NULL,
  nom varchar(50) NOT NULL,
  prenom varchar(150) NOT NULL,
  lieuNaiss varchar(100) NOT NULL,
  dateNaiss date,
  profession varchar(100) NOT NULL,
  domicile varchar(50) NOT NULL,
  dateLivrance date,
  lieuLivrance varchar(50) NOT NULL,
  p_codeEtatCivil int(11) NOT NULL,
  PRIMARY KEY (cin),
  INDEX (p_codeEtatCivil),
  FOREIGN KEY (p_codeEtatCivil) REFERENCES ETAT_CIVIL (codeEtatCivil) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = INNODB;

create table REQUERANT (
  numeroRequerant int(11) NOT NULL AUTO_INCREMENT,
  etatMorale BOOLEAN DEFAULT '0',
  numeroTelephone varchar(12) DEFAULT NULL,
  complementInformation varchar(255) DEFAULT NULL,
  p_cin varchar(12) NOT NULL,
  PRIMARY KEY (numeroRequerant),
  INDEX (p_cin),
  FOREIGN KEY (p_cin) REFERENCES INDIVIDU (cin) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = INNODB;

create table COMPTE (
  numeroCompte int(11) NOT NULL AUTO_INCREMENT,
  identification varchar(50) NOT NULL,
  photoPDP varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  attribut varchar(15) DEFAULT 'Agent',
  mdp varchar(100) NOT NULL,
  unite BOOLEAN NOT NULL,
  statu BOOLEAN DEFAULT '0',
  u_cin varchar(12) DEFAULT NULL,
  PRIMARY KEY (numeroCompte),
  INDEX (u_cin),
  FOREIGN KEY (u_cin) REFERENCES INDIVIDU (cin) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = INNODB;

create table TMPCOMPTE (
  numeroCompte int(11) NOT NULL AUTO_INCREMENT,
  identification varchar(50) NOT NULL,
  photoPDP varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  attribut varchar(15) DEFAULT 'Utilisateur',
  mdp varchar(100) NOT NULL,
  unite BOOLEAN NOT NULL,
  statu BOOLEAN DEFAULT '0',
  u_cin varchar(12) DEFAULT NULL,
  PRIMARY KEY (numeroCompte)
) ENGINE = INNODB;

create table DOSSIER_TEMPORAIRE (
  idTmpDossier int(255) NOT NULL AUTO_INCREMENT,
  lettreDemande BOOLEAN,
  planAnnexe BOOLEAN,
  pvDelimitation BOOLEAN,
  superficieTerrain varchar(50) DEFAULT NULL,
  natureAffectation BOOLEAN,
  dependance BOOLEAN,
  planMere BOOLEAN DEFAULT NULL,
  certificatSituationJuridique BOOLEAN DEFAULT NULL,
  empietement BOOLEAN,
  lettreDesistement BOOLEAN DEFAULT NULL,
  dateDemande date,
  droitDemande varchar(10) NOT NULL,
  observationDossier varchar(255),
  tmp_numeroRequerant int(11) NOT NULL,
  PRIMARY KEY (idTmpDossier),
  INDEX(tmp_numeroRequerant),
  FOREIGN KEY (tmp_numeroRequerant) REFERENCES REQUERANT (numeroRequerant) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = INNODB;

create table BUREAU (
  idBureau int(3) NOT NULL AUTO_INCREMENT,
  nomBureau varchar(25) NOT NULL,
  adressBureau varchar(150) NOT NULL,
  PRIMARY KEY (idBureau)
) ENGINE = INNODB;

create table PROCEDURES (
  numeroProcedure int(3) NOT NULL AUTO_INCREMENT,
  nomProcedure varchar(50) NOT NULL,
  natureProcedure varchar(100) NOT NULL,
  movProcedure varchar(20) NOT NULL,
  p_idBureau int(3) NOT NULL,
  PRIMARY KEY (numeroProcedure),
  INDEX(p_idBureau),
  FOREIGN KEY (p_idBureau) REFERENCES BUREAU (idBureau) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = INNODB;

create table NUMERO_AFFAIRE (
  autoNumAffaire int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(autoNumAffaire)
) ENGINE = INNODB;

create table DOSSIER (
  numeroDossier int(255) NOT NULL AUTO_INCREMENT,
  numeroAffaire varchar(15) NOT NULL,
  dependance BOOLEAN,
  natureAffectation BOOLEAN,
  empietement BOOLEAN,
  lettreDemande BOOLEAN NOT NULL,
  planAnnexe BOOLEAN NOT NULL,
  pvDelimitation BOOLEAN DEFAULT NULL,
  superficieTerrain FLOAT(20) DEFAULT NULL,
  dateDemande date,
  droitDemande varchar(10) NOT NULL,
  observationDossier varchar(255),
  p_numeroRequerant int(11) NOT NULL,
  p_numeroProcedure int(2) NOT NULL,
  PRIMARY KEY(numeroDossier, numeroAffaire),
  INDEX (p_numeroRequerant),
  INDEX (p_numeroProcedure),
  FOREIGN KEY (p_numeroRequerant) REFERENCES REQUERANT (numeroRequerant) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (p_numeroProcedure) REFERENCES PROCEDURES (numeroProcedure) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = INNODB;

create table SOUS_DOSSIER (
  numeroSousDossier int(255) NOT NULL AUTO_INCREMENT,
  observationSD varchar(250),
  dateDepotSD date,
  mesureAttribuable varchar(50) DEFAULT NULL,
  prixAttribue varchar(100) DEFAULT NULL,
  lettreDesistement BOOLEAN,
  planMere BOOLEAN,
  certificatSituationJuridique BOOLEAN,
  p_numeroDossier int(255) NOT NULL,
  p_numeroAffaire varchar(15) NOT NULL,
  PRIMARY KEY (numeroSousDossier),
  INDEX (p_numeroDossier, p_numeroAffaire),
  FOREIGN KEY (p_numeroDossier, p_numeroAffaire) REFERENCES DOSSIER (numeroDossier, numeroAffaire) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = INNODB;

create table HISTORIQUE (
  numeroHisto int(255) NOT NULL AUTO_INCREMENT,
  mouvement varchar(25) NOT NULL,
  dateDebutMouvement date,
  dateFinMouvement date,
  dateRDV date,
  dispoDossier BOOLEAN,
  approbation BOOLEAN,
  accomplissement BOOLEAN,
  observation varchar(250) DEFAULT NULL,
  h_numeroDossier int(255) NOT NULL,
  h_numeroAffaire varchar(15) NOT NULL,
  p_numeroCompte int(11) NOT NULL,
  PRIMARY KEY (numeroHisto),
  INDEX(p_numeroCompte),
  INDEX (h_numeroDossier, h_numeroAffaire),
  FOREIGN KEY (h_numeroDossier, h_numeroAffaire) REFERENCES DOSSIER (numeroDossier, numeroAffaire) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (p_numeroCompte) REFERENCES COMPTE (numeroCompte) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = INNODB;

create table NUMERO_IM (
  autoNumIM int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(autoNumIM)
) ENGINE = INNODB;

create table TERRAIN (
  numeroTitre int(255) NOT NULL AUTO_INCREMENT,
  immatriculationTerrain varchar(20) NOT NULL,
  nomPropriete varchar(150) NOT NULL,
  etatCiviqueTerrain varchar(15) DEFAULT 'MALGACHE',
  prixTerrain varchar(100) NOT NULL,
  t_cin varchar(12) DEFAULT NULL,
  PRIMARY KEY(numeroTitre, immatriculationTerrain),
  INDEX(t_cin),
  FOREIGN KEY (t_cin) REFERENCES INDIVIDU (cin) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE = INNODB;

-- /********************************************************/
INSERT INTO
  `etat_civil` (
    `codeEtatCivil`,
    `etatCivil`,
    `cinConjoint`,
    `nomConjoint`,
    `prenomConjoint`,
    `dateEtatCivil`,
    `lieuEtatCivil`
  )
VALUES
  ('1', 'Célibataire', NULL, NULL, NULL, NULL, NULL);

INSERT INTO
  `individu` (
    `cin`,
    `nom`,
    `prenom`,
    `lieuNaiss`,
    `dateNaiss`,
    `profession`,
    `domicile`,
    `dateLivrance`,
    `lieuLivrance`,
    `p_codeEtatCivil`
  )
VALUES
  (
    '201011028460',
    'LEFORT',
    'Nomenjanahary Nuno',
    'Toamasina',
    '2000-07-29',
    'Etudiant',
    'Rova Lot 0206',
    '2018-8-7',
    'Fianarantsoa',
    '1'
  );

-- /***** // AJOUT \\ *****/
INSERT INTO
  `compte` (
    `numeroCompte`,
    `identification`,
    `photoPDP`,
    `attribut`,
    `mdp`,
    `unite`,
    `statu`,
    `u_cin`
  )
VALUES
  (
    NULL,
    'LEFORT',
    NULL,
    'Administrateur',
    '$2b$10$x7i8nWZsUh9NmkkmSGFMzeoS48BSbKbz2C0vofNloSeohLjziIEzi',
    '1',
    '1',
    '201011028460'
  ),
  (
    NULL,
    'Nuno',
    NULL,
    'Administrateur',
    '$2b$10$x7i8nWZsUh9NmkkmSGFMzeoS48BSbKbz2C0vofNloSeohLjziIEzi',
    '0',
    '1',
    '201011028460'
  ),
  (
    NULL,
    'Kanto',
    NULL,
    'Administrateur',
    '$2b$10$x7i8nWZsUh9NmkkmSGFMzeoS48BSbKbz2C0vofNloSeohLjziIEzi',
    '0',
    '1',
    '201011028460'
  );

-- /********************************************************/
ALTER table
  NUMERO_AFFAIRE AUTO_INCREMENT = 50;

ALTER table
  DOSSIER AUTO_INCREMENT = 50;

-- /********************************************************/
INSERT INTO
  `bureau` (`idBureau`, `nomBureau`, `adressBureau`)
VALUES
  ('1', 'C.D.F', 'Tsianolondroa Fianarantsoa'),
  ('2', 'S.R.D', 'Ambalapaiso Fianarantsoa'),
  ('3', 'T.O.P.O', 'Tsianolondroa Fianarantsoa'),
  (
    '4',
    'P.R.E.F.E.C.T.U.R.E',
    'Faritany Fianarantsoa'
  ),
  ('5', 'D.S.F', 'Antananarivo');

-- /********************************************************/
INSERT INTO
  `procedures` (
    `numeroProcedure`,
    `nomProcedure`,
    `natureProcedure`,
    `movProcedure`,
    `p_idBureau`
  )
VALUES
  ('1', 'N.D', 'Nouvelle Demande', 'Interne', '1'),
  (
    '2',
    'C.E.L',
    'Constat de l\'Etat de Lieu',
    'Interne',
    '1'
  ),
  (
    '3',
    '2nd Répèrage',
    'Second Répèrage de TOPO',
    'Depart',
    '3'
  ),
  (
    '4',
    'D.A.S',
    'Décisoin Autorité Supérieur',
    'Depart',
    '2'
  ),
  ('5', 'I.M', 'Immatriculation', 'Interne', '1'),
  ('6', 'BORNAGE', 'Bornage de TOPO', 'Depart', '3'),
  (
    '7',
    'REMISE',
    'Retour après Bornage',
    'Interne',
    '1'
  ),
  (
    '8',
    'F.L.C',
    'Fixation Limite et Contenance',
    'Interne',
    '1'
  ),
  (
    '9',
    'DECOMPTE',
    'Clcule Prix Total du Terrain',
    'Interne',
    '1'
  ),
  (
    '11',
    'MUTATION',
    'Délivrance du titre ',
    'Interne',
    '1'
  ),
  (
    '69',
    'AVORTEMENT',
    'Avorter un dossier ',
    'Interne',
    '1'
  ),
  (
    '10',
    'P.A.V',
    'Projet d Avant Vente (Traitement d Approbation)',
    'Depart',
    '4'
  );

-- /********************************************************/
INSERT INTO
  `requerant` (
    `numeroRequerant`,
    `etatMorale`,
    `numeroTelephone`,
    `complementInformation`,
    `p_cin`
  )
VALUES
  (NULL, '1', '348658868', 'ENI', '201011028460'),
  (NULL, '0', '380994042', NULL, '201011028460');
  
-- / **** FIN **** /
