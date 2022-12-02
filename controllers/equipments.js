const pool = require("../lib/dbpool");

const getAll = async (req, res, next) => {
  try {
    pool.getConnection(async (err, connection) => {
      if (err && !res.headersSent) {
        res.status(404).json(err);
      }
      const [rows] = await connection
        .promise()
        .query("SELECT * FROM equipments")
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

const checkIfIncharge = async (req, res, next) => {
  console.log(req.query);
  try {
    const email = req.query.email;
    pool.getConnection(async (err, connection) => {
      if (err && !res.headersSent) {
        res.status(404).json(err);
      }
      const [rows] = await connection
        .promise()
        .query("SELECT COUNT(*) AS count FROM equipments WHERE faculty_in_charge = ?", [
          email,
        ])
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

const updateFacultyInCharge = async (req, res, next) => {
  try {
    const data = req.body.difference;
    Object.keys(data).forEach((key) => {
      const row = data[key];
      pool.getConnection(async (err, connection) => {
        await connection
          .promise()
          .query(
            "UPDATE equipments SET faculty_in_charge = ? WHERE equipment_code = ?",
            [row.faculty_in_charge, row.equipment_code]
          )
          .catch((err) => {
            if (!res.headersSent) {
              res.status(404).json(err);
            }
          });
        if (!res.headersSent) {
          res.status(200).json({ message: "Operation Successful" });
        }
      });
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(404).json(err);
    }
  }
};

exports.getAll = getAll;
exports.checkIfIncharge = checkIfIncharge;
exports.updateFacultyInCharge = updateFacultyInCharge;
