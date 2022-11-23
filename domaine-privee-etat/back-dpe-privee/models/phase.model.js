let dbConn = require("../config/db");

let Phase = function (phase) {
  this.numPhase = phase.numPhase;
  this.nomPhase = phase.nomPhase;
  this.naturePhase = phase.naturePhase;
};

Phase.addPhase = (newPhase, result) => {
  dbConn.query("INSERT INTO Phase SET ?", newPhase, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Phase.getAllPhases = (result) => {
  dbConn.query("SELECT * FROM Phase", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Phase.getIdPhase = (id, result) => {
  dbConn.query("SELECT * FROM Phase WHERE numPhase = ?", id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0){
        result(null, res);
      } else {
        result(null, null);
      }
    }
  });
};

Phase.updatePhase = (updatePhase, id, result) => {
  dbConn.query(
    `update Phase set ? where numPhase = ${id}`,
    updatePhase,
    function (err, res) {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Phase;
