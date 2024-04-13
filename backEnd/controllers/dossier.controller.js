"use strict";
const Dossier = require("../models/dossier.model");
const SousDossier = require("../models/sousDossier.model");
const Histo = require("../models/historique.model");
const NumeroAFF = require("../models/numeroAffaire.model");

Date.prototype.addDays = function (days) {
	let date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

// Format date aujourdhui pour mysql
let today = new Date();
let dateAujourdHui = new Date();

const y = today.getFullYear();
const m = today.getMonth() + 1;
const d = today.getDate();

const fomatDateAujourdHui = y + "-" + m + "-" + d;

module.exports.addDossier = (req, res) => {
	let {
		numeroAffaire,
		dependance,
		natureAffectation,
		empietement,
		lettreDemande,
		planAnnexe,
		pvDelimitation,
		superficieTerrain,
		droitDemande,
		observationDossier,
		lettreDesistement,
		dateRDV,
		planMere,
		labordeLat,
		labordeLong,
		certificatSituationJuridique,
		p_numeroRequerant,
		dateDemande,
		numeroCompte,
		VISA,
		preVISA,
	} = req.body;

	if (!dateDemande) {
		dateDemande = fomatDateAujourdHui;
	}
	if (natureAffectation === "true") {
		natureAffectation = true;
	} else if (natureAffectation === "false") {
		natureAffectation = false;
	}

	const p_numeroProcedure = 1;
	const h_numeroProcedure = p_numeroProcedure;
	let observationSD = observationDossier;
	const mesureAttribuable = "NULL";
	const prixAttribue = "NULL";
	let dateDepotSD = dateDemande;
	let p_numeroDossier;
	let p_numeroAffaire;

	const p_numeroCompte = numeroCompte;
	const mouvement = "Arriver";
	const dateDebutMouvement = dateDemande;
	let dateFinMouvement;
	const dispoDossier = true;
	const accomplissement = false;
	const approbation = false;
	const observation = observationDossier;
	let h_numeroAffaire;
	let h_numeroDossier;

	if (!observationSD) {
		observationSD = "Nouvelle Demande";
	}
	if (!dateRDV) {
		let addRdvDays = 15;
		// dateRDV = dateAujourdHui.addDays(addRdvDays);
		dateRDV = fomatDateAujourdHui;
	}

	let numeroDossier;

	let newDossier = {
		numeroAffaire,
		numeroDossier,
		dependance,
		natureAffectation,
		empietement,
		lettreDemande,
		planAnnexe,
		pvDelimitation,
		superficieTerrain,
		dateDemande,
		droitDemande,
		labordeLat,
		labordeLong,
		observationDossier,
		p_numeroRequerant,
		p_numeroProcedure,
	};

	let newSousDossier = {
		p_numeroAffaire,
		p_numeroDossier,
		observationSD,
		dateDepotSD,
		mesureAttribuable,
		prixAttribue,
		lettreDesistement,
		planMere,
		certificatSituationJuridique,
    VISA,
    preVISA,
	};

	let newHisto = {
		mouvement,
		dateDebutMouvement,
		dateFinMouvement,
		dateRDV,
		dispoDossier,
		approbation,
		accomplissement,
		observation,
		h_numeroAffaire,
		h_numeroDossier,
		h_numeroProcedure,
		p_numeroCompte,
	};

	if (dependance && empietement) {
		//LE DOSSIER PRESENTE UNE EMPIETINEMENT ET UNE DEPENDANCE
		newSousDossier.lettreDesistement = lettreDesistement;
		newSousDossier.planMere = planMere;
		newSousDossier.certificatSituationJuridique = certificatSituationJuridique;
	} else if (dependance && !empietement) {
		//LE DOSSIER EST DEPENDANT
		newSousDossier.planMere = planMere;
		newSousDossier.certificatSituationJuridique = certificatSituationJuridique;
	} else if (!dependance && empietement) {
		//LE DOSSIER PRESENTE UNE EMPIETINEMENT
		newSousDossier.lettreDesistement = lettreDesistement;
	}

	//Ajout Numero Affaire depuis NUMERO_AFFAIRE_INCREMENT_AUTOMATIQUE
	if (numeroAffaire === "V") {
		NumeroAFF.getLastNumeroAffaire_V((err, lastNumAffaire) => {
			if (!err) {
				numeroAffaire =
					lastNumAffaire +
					"-" +
					numeroAffaire +
					"/" +
					dateAujourdHui.getFullYear();
				newDossier.numeroAffaire = numeroAffaire;

				Dossier.getLastIdNumeroDossier((err, lastNumD) => {
					if (!err) {
						newDossier.numeroDossier = lastNumD;
						Dossier.addDossier(newDossier, (err, resp) => {
							if (err) {
								res.send(err);
							} else {
								newSousDossier.p_numeroDossier = newDossier.numeroDossier;
								newSousDossier.p_numeroAffaire = numeroAffaire;
								SousDossier.addSousDossierNewDemande(newSousDossier);

								newHisto.h_numeroAffaire = numeroAffaire;
								newHisto.h_numeroDossier = newDossier.numeroDossier;
								Histo.addHistoNewDemande(newHisto);
								res.send(resp);
							}
						});
					}
				});
			}
		});
	} else if (numeroAffaire === "AX") {
		NumeroAFF.getLastNumeroAffaire_AX((err, lastNumAffaire) => {
			if (!err) {
				numeroAffaire =
					lastNumAffaire +
					"-" +
					numeroAffaire +
					"/" +
					dateAujourdHui.getFullYear();
				newDossier.numeroAffaire = numeroAffaire;

				Dossier.getLastIdNumeroDossier((err, lastNumD) => {
					if (!err) {
						newDossier.numeroDossier = lastNumD;
						Dossier.addDossier(newDossier, (err, resp) => {
							if (err) {
								res.send(err);
							} else {
								newSousDossier.p_numeroDossier = newDossier.numeroDossier;
								newSousDossier.p_numeroAffaire = numeroAffaire;
								SousDossier.addSousDossierNewDemande(newSousDossier);

								newHisto.h_numeroAffaire = numeroAffaire;
								newHisto.h_numeroDossier = newDossier.numeroDossier;
								Histo.addHistoNewDemande(newHisto);
								res.send(resp);
							}
						});
					}
				});
			}
		});
	} else if (numeroAffaire === "X") {
		NumeroAFF.getLastNumeroAffaire_X((err, lastNumAffaire) => {
			if (!err) {
				numeroAffaire =
					lastNumAffaire +
					"-" +
					numeroAffaire +
					"/" +
					dateAujourdHui.getFullYear();
				newDossier.numeroAffaire = numeroAffaire;

				Dossier.getLastIdNumeroDossier((err, lastNumD) => {
					if (!err) {
						newDossier.numeroDossier = lastNumD;
						Dossier.addDossier(newDossier, (err, resp) => {
							if (err) {
								res.send(err);
							} else {
								newSousDossier.p_numeroDossier = newDossier.numeroDossier;
								newSousDossier.p_numeroAffaire = numeroAffaire;
								SousDossier.addSousDossierNewDemande(newSousDossier);

								newHisto.h_numeroAffaire = numeroAffaire;
								newHisto.h_numeroDossier = newDossier.numeroDossier;
								Histo.addHistoNewDemande(newHisto);
								res.send(resp);
							}
						});
					}
				});
			}
		});
	}
};

module.exports.getAllDossiers = (req, res) => {
	Dossier.getAllDossiers((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getMesDossiers = (req, res) => {
	let { numeroCompte, identification } = req.body;
	const valeur = { numeroCompte, identification };

	Dossier.getMesDossiers(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getMesDossiersUsagers = (req, res) => {
	let { numeroCompte, identification } = req.body;
	const valeur = { numeroCompte, identification };

	Dossier.getMesDossiersUsagers(valeur, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getDossiersNouvelleDemande = (req, res) => {
	Dossier.getDossiersNouvelleDemande((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdDossier = (req, res) => {
	Dossier.getIdDossier(req.params.id, (err, resp) => {
		if (!err) {
			if (resp) {
				res.send(resp);
			} else {
				res.send({ success: false, message: "Introuvable" });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.getHistoDossier = (req, res) => {
	Dossier.getHistoDossier(req.params.id, (err, resp) => {
		if (!err) {
			if (resp) {
				res.send(resp);
			} else {
				res.send({ success: false, message: "Introuvable" });
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.updateDossier = (req, res) => {
	const {
		dependance,
		natureAffectation,
		empietement,
		superficieTerrain,
		observationDossier,
		lettreDesistement,
		planMere,
		certificatSituationJuridique,
		p_numeroRequerant,
		p_numeroProcedure,
	} = req.body;

	const updateDossier = {
		dependance,
		natureAffectation,
		empietement,
		superficieTerrain,
		observationDossier,
		lettreDesistement,
		planMere,
		certificatSituationJuridique,
		p_numeroRequerant,
		p_numeroProcedure,
	};
	Dossier.updateDossier(updateDossier, req.params.id, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateAutoDossier = (req, res) => {
	const { numeroAffaire, p_numeroProcedure } = req.body;

	const updateDossier = {
		p_numeroProcedure,
	};

	Dossier.updateDossierProcedureByNumAffaire(
		updateDossier,
		numeroAffaire,
		(err, resp) => {
			if (!err) {
				res.send(resp);
			} else {
				res.send(err);
			}
		}
	);
};

module.exports.avortementDossier = (req, res) => {
	const { p_numeroProcedure } = req.body;

	const updateDossier = {
		p_numeroProcedure,
	};
	Dossier.updateDossier(updateDossier, req.params.id, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.searchDossier = (req, res) => {
	Dossier.searchDossier(req.params.valeur, (err, resp) => {
		if (!err) {
			if (resp) {
				res.send(resp);
			} else {
				res.send(err);
			}
		} else {
			res.send(err);
		}
	});
};

module.exports.searchMonDossier = (req, res) => {
	let { numeroCompte, identification, value } = req.body;
	const valeur = { numeroCompte, identification, value };

	Dossier.searchMonDossier(valeur, (err, resp) => {
		if (!err) {
			if (resp) {
				res.send(resp);
			} else {
				res.send(err);
			}
		} else {
			res.send(err);
		}
	});
};
