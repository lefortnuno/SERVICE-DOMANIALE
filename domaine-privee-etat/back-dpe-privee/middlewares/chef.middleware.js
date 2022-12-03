const AuthMidleware = require("./auth.middleware");

const monRole = process.env.xCHEF;

module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: process.env.xADMIN,
    chef: monRole,
    chefAdjoint: monRole,
    agent: monRole,
    client: monRole,
  });
};
