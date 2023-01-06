const pool = require("../lib/dbpool");

const getAll = (req, res, next) => {
    try {
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [rows] = await connection
                .promise()
                .query("SELECT * FROM users")
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

const getFaculty = (req, res, next) => {
    try {
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [rows] = await connection
                .promise()
                .query(
                    "SELECT CONCAT(first_name, ' ', last_name) AS name FROM users WHERE role = 'faculty'"
                )
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
        const email = req.query.email;
        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [rows] = await connection
                .promise()
                .query("SELECT * FROM users WHERE email = ?", [email])
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
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const role = req.body.role;
        const img = req.body.img;

        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [row] = await connection
                .promise()
                .query(
                    "INSERT INTO users (first_name, last_name, email, role, img) VALUES (?, ?, ?, ?, ?)",
                    [first_name, last_name, email, role, img]
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

const updateItem = async (req, res, next) => {
    try {
        const email = req.body.email;
        const year = req.body.year;
        const course = req.body.course;
        const branch = req.body.branch;
        const img_url = req.body.img_url;

        pool.getConnection(async (err, connection) => {
            if (err && !res.headersSent) {
                res.status(404).json(err);
            }
            const [row] = await connection
                .promise()
                .query(
                    "UPDATE users SET year = ?, course = ?, branch = ?, image_url = ? WHERE email = ?",
                    [year, course, branch, img_url, email]
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

exports.getAll = getAll;
exports.getItem = getItem;
exports.getFaculty = getFaculty;
exports.createItem = createItem;
exports.updateItem = updateItem;
