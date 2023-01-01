const express = require("express");

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const email = req.query.email;
        const application_id = req.query.application_id;
        const folderName = `./public/${email}/${application_id}`;
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
        cb(null, folderName);
    },
    filename: (req, file, cb) => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const date = dd + "-" + mm + "-" + yyyy;
        cb(null, date + "_" + file.originalname);
    },
});

const upload = multer({ storage }).single("file");

const uploadPaymentSlip = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
};

const getPaymentSlipsUploadByEmail = async (req, res) => {
    const { email } = req.body.params;
    const folder = `./public/${email}`;
    var applicationIDs = fs
        .readdirSync(folder, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
    res.status(200).json({ paymentSlipsUploaded: applicationIDs });
};

exports.uploadPaymentSlip = uploadPaymentSlip;
exports.getPaymentSlipsUploadByEmail = getPaymentSlipsUploadByEmail;
