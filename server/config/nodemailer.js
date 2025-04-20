import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "8adbc4002@smtp-brevo.com",
    pass: "WDFx2Kmf8sQER6da",
  },
});
export default transporter;
