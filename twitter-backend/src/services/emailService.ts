const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});
export async function sendEmailToken(email: string, token: string) {
  try {
    const info = await transport.sendMail({
      from: '"Shyam Radadiya 👻" shyam.radadiya100@gmail.com',
      to: email,
      subject: "Verify your twitter account. ✔",
      text: `Your one-time password for Twitter is: ${token}`,
    });

  } catch (error) {
    console.error("Error sending email: ", email);
    console.error(error);
    return error;
  }
}
