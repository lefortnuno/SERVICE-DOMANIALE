const AuthMidleware = require("./auth.middleware");

const monRole = process.env.xAGENT;


module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: process.env.xADMIN,
    chef: process.env.xCHEF,
    chefAdjoint: process.env.xCHEFADJOINT,
    agent: monRole,
    client: monRole,
  });
};
