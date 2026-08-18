import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, body }) => {
  const response = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
  });

  const delivery = {
    to,
    messageId: response.messageId,
    accepted: response.accepted,
    rejected: response.rejected,
    response: response.response,
  };

  console.log("Email delivery result:", delivery);
  return delivery;
};

export default sendEmail;
