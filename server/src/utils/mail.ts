import nodemailer from "nodemailer";
//4.5
interface verificationMailOption {
  link: string;
  to: string;
}
//4.6
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
//4.4
const mail = {
  async sendVerificationMail(options: verificationMailOption) {
    await transport.sendMail({
      to: options.to,
      from: process.env.EMAIL_USER,
      subject: "Auth Verification",
      html: `
      <div>
        <p>Please click on <a href="${options.link}"> this link</a> to verify your account.</p>
      </div>
    `,
    });
  },
};

export default mail;
