const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config();

const port = process.env.PORT || 8081;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(port, () => console.log("Server Running"));

const pass = process.env.EMAIL_PASSWORD;

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "frontdesk.chicago17@gmail.com",
        pass,
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "aurrecochearaysa@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
});