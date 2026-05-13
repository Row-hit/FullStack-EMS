import { verifyTransporter } from "../config/nodemailer.js";

const sendVerificationMail = async (email, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  http: await verifyTransporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Email Verification</h2>
      <p>Click below to verify your email:</p>

      <a href="${verifyUrl}">
        Verify Email
      </a>
    `,
  });
};

export default sendVerificationMail;
