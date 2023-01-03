const express = require("express");
const http = require("http");
const path = require("path");

const applicationsRouter = require("./routes/applications");
const equipmentsRouter = require("./routes/equipments");
const cdordRouter = require("./routes/cdord");
const esrRouter = require("./routes/esr");
const icpoesRouter = require("./routes/icpoes");
const plRouter = require("./routes/pl");
const mailerRouter = require("./routes/mailer");
const usersRouter = require("./routes/users");
const filesRouter = require("./routes/files");

const PORT = 8050;

const app = express();
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use("/applications", applicationsRouter);
app.use("/files", filesRouter);
app.use("/equipments", equipmentsRouter);
app.use("/cdord", cdordRouter);
app.use("/esr", esrRouter);
app.use("/icpoes", icpoesRouter);
app.use("/pl", plRouter);
app.use("/mailer", mailerRouter);
app.use("/users", usersRouter);

var server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}...`);
});
