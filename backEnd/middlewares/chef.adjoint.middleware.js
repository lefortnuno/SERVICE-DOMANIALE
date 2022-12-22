const AuthMidleware = require("./auth.middleware");

const monRole = process.env.xCHEFADJOINT;

module.exports.checkUtilisateur = (req, res, next) => {
  AuthMidleware.checkUtilisateur(req, res, next, {
    admin: process.env.xADMIN,
    chef: process.env.xCHEF,
    chefAdjoint: monRole,
    agent: monRole,
    client: monRole,
  });
};
