const express = require("express");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { promises: fsPromise } = require("fs");


// payments upload #

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const email = req.query.email;
        const application_id = req.query.application_id;
        const folderName=req.query.folderName;
        const folderStruct = `./public/${email}/${application_id}/${folderName}`;
        console.log(folderStruct)
        if (!fs.existsSync(folderStruct)) {
            fs.mkdirSync(folderStruct, { recursive: true });
        }
        cb(null, folderStruct)
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


//changed the route name from : uploadPaymentSlip to to:uploadFile
const uploadFiles = (req, res) => {
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
    if (!fs.existsSync(folder)) {
        res.status(404).json({ message: "Payment Slip not found" });
    } else {
        var applicationIDs = fs
            .readdirSync(folder, { withFileTypes: true })
            .filter((item) => item.isDirectory())
            .map((item) => item.name);
        res.status(200).json({ paymentSlipsUploaded: applicationIDs });
    }
};

const downloadPaymentSlip = async (req, res) => {
    const { email, application_id } = req.body.params;
    const directory = `./public/${email}/${application_id}/PaymentSlip`;
    console.log(directory);
    if (!fs.existsSync(directory)) {
        res.status(404).json({ message: "Payment Slip not found" });
    } else {
        try {
            // Finding first file in `directory`
            let filePath = "";
            console.log("directory:", directory);
            const files = await fsPromise.readdir(directory);
            if (files.length > 0) {
                const file = files[0];
                filePath = path.join(directory, file);
                console.log(filePath);
            } else {
                console.log("Directory is empty");
            }
            const data = await fsPromise.readFile(filePath);
            res.set("Content-Type", "image/png");
            res.status(200).send({ image: data, filePath: filePath });
        } catch (err) {
            console.error(err);
        }
    }
};
//Added get filepath route
 const getFilePath = async (req, res) => {
    const { email, application_id ,type} = req.body.params;
    const directory = `./public/${email}/${application_id}/${type}`;
    console.log(directory);
    if (!fs.existsSync(directory)) {
        res.status(404).json({ message: "File not found" });
    } else {
        try {
            // Finding first file in `directory`
            let filePath = "";
            console.log("directory:", directory);
            const files = await fsPromise.readdir(directory);
            if (files.length > 0) {
                const file = files[0];
                filePath = path.join(directory, file);
                console.log(filePath);
            } else {
                console.log("Directory is empty");
            }
            res.set("Content-Type", "application/json");
            res.status(200).send({ filePath: filePath });
        } catch (err) {
            console.error(err);
        }
    }
};
 





exports.uploadFiles = uploadFiles;
exports.getFilePath=getFilePath
exports.getPaymentSlipsUploadByEmail = getPaymentSlipsUploadByEmail;
exports.downloadPaymentSlip = downloadPaymentSlip;
