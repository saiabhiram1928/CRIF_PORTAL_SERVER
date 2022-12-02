const pool = require("../lib/dbpool");

const getAllByEmail = async (req, res, next) => {
  try {
    const email = req.query.email;
    pool.getConnection(async (err, connection) => {
      if (err && !res.headersSent) {
        res.status(404).json(err);
      }
      const [rows] = await connection
        .promise()
        .query("SELECT * FROM pl WHERE email = ?", [email])
        .catch((err) => {
          if (!res.headersSent) {
            res.status(404).json(err);
          }
        });
      connection.release();
      if (!res.headersSent) {
        res.status(200).json(rows);
      }
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(404).json(err);
    }
  }
};

const getItem = async (req, res, next) => {
  try {
    const ref_id = req.query.ref_id;
    pool.getConnection(async (err, connection) => {
      if (err && !res.headersSent) {
        res.status(404).json(err);
      }
      const [rows] = await connection
        .promise()
        .query("SELECT * FROM pl WHERE ref_id = ?", [ref_id])
        .catch((err) => {
          if (!res.headersSent) {
            res.status(404).json(err);
          }
        });
      connection.release();
      if (!res.headersSent) {
        res.status(200).json(rows);
      }
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(404).json(err);
    }
  }
};

const createItem = async (req, res, next) => {
  try {
    const ref_id_suf = req.body.ref_id;
    const sample_code = req.body.sample_code;
    const liquid_powder = req.body.liquid_powder;
    const solubility = req.body.solubility;
    const excitation_wavelength = req.body.excitation_wavelength;
    const emission_range = req.body.emission_range;
    const temperature = req.body.temperature;
    const analysis = req.body.analysis;
    const health_hazard = req.body.health_hazard;
    const fire_hazard = req.body.fire_hazard;
    const specific_hazard = req.body.specific_hazard;
    const instability_hazard = req.body.instability_hazard;

    pool.getConnection(async (err, connection) => {
      if (err && !res.headersSent) {
        res.status(404).json(err);
      }
      const [application_id] = await connection
        .promise()
        .query("SELECT MAX(application_id) FROM applications")
        .catch((err) => {
          if (!res.headersSent) {
            res.status(404).json(err);
          }
        });
      connection.release();
      const ref_id =
        "" + application_id[0]["MAX(application_id)"] + "_" + ref_id_suf;
      await connection
        .promise()
        .query("INSERT INTO pl VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
          ref_id,
          application_id[0]["MAX(application_id)"],
          sample_code,
          liquid_powder,
          solubility,
          excitation_wavelength,
          emission_range,
          temperature,
          analysis,
          health_hazard,
          fire_hazard,
          specific_hazard,
          instability_hazard,
          "Under Review",
        ])
        .catch((err) => {
          if (!res.headersSent) {
            res.status(404).json(err);
          }
        });
      if (!res.headersSent) {
        res.status(200).json({ message: "Operation Successful" });
      }
      connection.release();
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(404).json(err);
    }
  }
};

exports.getAllByEmail = getAllByEmail;
exports.getItem = getItem;
exports.createItem = createItem;
