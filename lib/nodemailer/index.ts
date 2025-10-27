import nodemailer from "nodemailer";
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

export const sendWelcomeEmail = async({email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{intro}}", intro || "Thanks for joining StockSense!");

    const mailOptions = {
        from: "StockSense",
        to: email,
        subject: `Welcome to StockSense - your stock market toolkit is ready`,
        text: intro?.replace(/<[^>]*>/g, "") || "Thanks for joining StockSense!",
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions)
}