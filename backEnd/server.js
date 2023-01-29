const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config({ path: "./config/.env" });

const utilisateurRoute = require("./routes/utilisateur.route");
const dossiertemporaireRoute = require("./routes/dossiertmp.route");
const individuRoute = require("./routes/individu.route");
const etatCivilRoute = require("./routes/etatCivil.route");
const bureauRoute = require("./routes/bureau.route");
const dossierRoute = require("./routes/dossier.route");
const sousDossierRoute = require("./routes/sousDossier.route");
const terrainRoute = require("./routes/terrain.route");
const historiqueRoute = require("./routes/historique.route");
const procedureRoute = require("./routes/procedure.route");
const requerantRoute = require("./routes/requerant.route");
const statRoute = require("./routes/stats.route");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	}
	next();
});

app.use("/api/utilisateur", utilisateurRoute);
app.use("/api/dossiertemporaire", dossiertemporaireRoute);
app.use("/api/individu", individuRoute);
app.use("/api/etatCivil", etatCivilRoute);
app.use("/api/bureau", bureauRoute);
app.use("/api/dossier", dossierRoute);
app.use("/api/sousDossier", sousDossierRoute);
app.use("/api/terrain", terrainRoute);
app.use("/api/historique", historiqueRoute);
app.use("/api/procedure", procedureRoute);
app.use("/api/requerant", requerantRoute);
app.use("/api/stat", statRoute);

app.listen(process.env.PORT || process.env.URL_HOST_IP, () => {
	console.log(`Ecoute au port ${process.env.PORT} .... `);
});
