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
                .query("SELECT * FROM applications WHERE email = ?", [email])
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
        const application_id = req.query.application_id;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [rows] = await connection
                .promise()
                .query("SELECT * FROM applications WHERE application_id = ?", [
                    application_id,
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

const getAllByEmailWithInstrument = async (req, res, next) => {
    try {
        const email = req.query.email;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            var result = [];
            const [rows] = await connection
                .promise()
                .query("SELECT * FROM applications WHERE email = ?", [email])
                .catch((err) => {
                    if (!res.headersSent) {
                        res.status(404).json(err);
                    }
                });
            connection.release();
            for (var x of rows) {
                const [samples] = await connection
                    .promise()
                    .query(
                        `SELECT * FROM ${x.instrument_code.toLowerCase()} WHERE application_id = ?`,
                        [x.application_id]
                    )
                    .catch((err) => {
                        if (!res.headersSent) {
                            res.status(404).json(err);
                        }
                    });
                for (var y of samples) {
                    result.push({ ...x, ...y });
                }
            }

            if (!res.headersSent) {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json(err);
        }
    }
};

const getAllByEmailForDashboard = async (req, res, next) => {
    try {
        const email = req.query.email;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            var result = [];
            const [rows] = await connection
                .promise()
                .query("SELECT * FROM applications WHERE email = ?", [email])
                .catch((err) => {
                    if (!res.headersSent) {
                        res.status(404).json(err);
                    }
                });
            connection.release();
            for (var x of rows) {
                var data = [];
                const [samples] = await connection
                    .promise()
                    .query(
                        `SELECT * FROM ${x.instrument_code.toLowerCase()} WHERE application_id = ? ORDER BY application_id`,
                        [x.application_id]
                    )
                    .catch((err) => {
                        if (!res.headersSent) {
                            res.status(404).json(err);
                        }
                    });
                for (var y of samples) {
                    data.push(y);
                }
                result.push({ ...x, data: data });
            }

            if (!res.headersSent) {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json(err);
        }
    }
};

const getAllForFaculty = async (req, res, next) => {
    try {
        const name = req.query.name;
        const status = req.query.status;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            var result = [];
            const [rows] = await connection
                .promise()
                .query(
                    "SELECT * FROM applications WHERE supervisor_name = ? AND status = ?",
                    [name, status]
                )
                .catch((err) => {
                    if (!res.headersSent) {
                        res.status(404).json(err);
                    }
                });
            connection.release();
            for (var x of rows) {
                var data = [];
                const [samples] = await connection
                    .promise()
                    .query(
                        `SELECT * FROM ${x.instrument_code.toLowerCase()} WHERE application_id = ? ORDER BY application_id`,
                        [x.application_id]
                    )
                    .catch((err) => {
                        if (!res.headersSent) {
                            res.status(404).json(err);
                        }
                    });
                for (var y of samples) {
                    data.push(y);
                }
                result.push({ ...x, data: data });
            }

            if (!res.headersSent) {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        if (!res.headersSent) {
            res.status(404).json(err);
        }
    }
};

const getAllForAdmin = async (req, res, next) => {
    try {
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            var result = [];
            const [rows] = await connection
                .promise()
                .query(
                    "SELECT * FROM applications WHERE status = 'ADMIN REVIEW'"
                )
                .catch((err) => {
                    if (!res.headersSent) {
                        res.status(404).json(err);
                    }
                });
            connection.release();
            for (var x of rows) {
                var data = [];
                const [samples] = await connection
                    .promise()
                    .query(
                        `SELECT * FROM ${x.instrument_code.toLowerCase()} WHERE application_id = ? ORDER BY application_id`,
                        [x.application_id]
                    )
                    .catch((err) => {
                        if (!res.headersSent) {
                            res.status(404).json(err);
                        }
                    });
                for (var y of samples) {
                    data.push(y);
                }
                result.push({ ...x, data: data });
            }

            if (!res.headersSent) {
                res.status(200).json(result);
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
        const instrument_code = req.body.instrument_code;
        const email = req.body.email;
        const role = req.body.role;
        const sample_properties = req.body.sample_properties;
        const incompatibility = req.body.incompatibility;
        const toxicity = req.body.toxicity;
        const health_hazard = req.body.health_hazard;
        const first_aid = req.body.first_aid;
        const disposal = req.body.sample_disposal;
        const additional_info = req.body.additional_information;
        const department = req.body.student_dept;
        const supervisor_department = req.body.supervisor_dept;
        const supervisor_name = req.body.supervisor_name;
        const pricing = req.body.pricing;
        const status = "FACULTY REVIEW";

        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            await connection
                .promise()
                .query(
                    "INSERT INTO applications VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                        null,
                        instrument_code,
                        email,
                        role,
                        sample_properties,
                        incompatibility,
                        toxicity,
                        health_hazard,
                        first_aid,
                        disposal,
                        additional_info,
                        department,
                        supervisor_department,
                        supervisor_name,
                        pricing,
                        status,
                    ]
                )
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

const rejectApplication = async (req, res, next) => {
    try {
        const application_id = req.query.application_id;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [row] = await connection
                .promise()
                .query(
                    "UPDATE applications SET status = 'REJECTED' WHERE application_id = ?",
                    [application_id]
                )
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

const facultyApproveApplication = async (req, res, next) => {
    try {
        const application_id = req.query.application_id;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [row] = await connection
                .promise()
                .query(
                    "UPDATE applications SET status = 'INCHARGE REVIEW' WHERE application_id = ?",
                    [application_id]
                )
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

const inchargeApproveApplication = async (req, res, next) => {
    try {
        const application_id = req.query.application_id;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [row] = await connection
                .promise()
                .query(
                    "UPDATE applications SET status = 'ADMIN REVIEW' WHERE application_id = ?",
                    [application_id]
                )
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

const adminApproveApplication = async (req, res, next) => {
    try {
        const application_id = req.query.application_id;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [row] = await connection
                .promise()
                .query(
                    "UPDATE applications SET status = 'WORK IN PROGRESS' WHERE application_id = ?",
                    [application_id]
                )
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
exports.getAllByEmailWithInstrument = getAllByEmailWithInstrument;
exports.getAllByEmailForDashboard = getAllByEmailForDashboard;
exports.getAllForFaculty = getAllForFaculty;
exports.getAllForAdmin = getAllForAdmin;
exports.getItem = getItem;
exports.createItem = createItem;
exports.rejectApplication = rejectApplication;
exports.facultyApproveApplication = facultyApproveApplication;
exports.inchargeApproveApplication = inchargeApproveApplication;
exports.adminApproveApplication = adminApproveApplication;
