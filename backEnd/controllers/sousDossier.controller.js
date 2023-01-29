"use strict";
const { data } = require("jquery");
const SousDossier = require("../models/sousDossier.model");

// Format date aujourdhui pour mysql
let today = new Date();
let dateAujourdHui = new Date();

const y = today.getFullYear();
const m = today.getMonth() + 1;
const d = today.getDate();

const fomatDateAujourdHui = y + "-" + m + "-" + d;

module.exports.addSousDossier = (req, res) => {
	const {
		observationSD,
		mesureAttribuable,
		prixAttribue,
		lettreDesistement,
		planMere,
		certificatSituationJuridique,
		p_numeroDossier,
		p_numeroAffaire,
	} = req.body;

	const dateDepotSD = fomatDateAujourdHui;

	const newSousDossier = {
		observationSD,
		dateDepotSD,
		mesureAttribuable,
		prixAttribue,
		lettreDesistement,
		planMere,
		certificatSituationJuridique,
		p_numeroDossier,
		p_numeroAffaire,
	};
 
	SousDossier.addSousDossier(newSousDossier, (err, resp) => {
		if (err) {
			res.send(err);
		} else {
			res.send(resp);
		}
	});
};

module.exports.getAllSousDossiersOfDossier = (req, res) => {
	SousDossier.getAllSousDossiersOfDossier((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getNbAttenteVISA = (req, res) => {
	SousDossier.getNbAttenteVISA((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getAllAttenteVISA = (req, res) => {
	SousDossier.getAllAttenteVISA((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getAllAttentePREVISA = (req, res) => {
	SousDossier.getAllAttentePREVISA((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getNbAttentePREVISA = (req, res) => {
	SousDossier.getNbAttentePREVISA((err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getIdSousDossier = (req, res) => {
	SousDossier.getIdSousDossier(req.params.id, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getLastSousDossierOfDossier = (req, res) => {
	SousDossier.getLastSousDossierOfDossier(req.params.id, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.getDecompte = (req, res) => {
	SousDossier.getDecompte(req.params.id, (err, resp) => {
		if (!err) {
			res.send(resp);
		} else {
			res.send(err);
		}
	});
};

module.exports.updateSousDossier = (req, res) => {
	let {
		observationSD,
		mesureAttribuable,
		prixAttribue,
		lettreDesistement,
		VISA,
		preVISA,
		planMere,
		certificatSituationJuridique,
	} = req.body;

	// const dateDepotSD = new Date();
	// observationSD = observationSD + "(r*)";

	const updateSousDossier = {
		observationSD,
		mesureAttribuable,
		prixAttribue,
		lettreDesistement,
		VISA,
		preVISA,
		planMere,
		certificatSituationJuridique,
	};

	SousDossier.updateSousDossier(
		updateSousDossier,
		req.params.id,
		(err, resp) => {
			if (!err) {
				res.send(resp);
			} else {
				res.send(err);
			}
		}
	);
};
