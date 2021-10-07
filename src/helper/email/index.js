const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv");

const sendMail = (data) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "lepakdev@gmail.com",
        pass: "Lepakdev35.",
      },
    });

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".html",
          partialsDir: path.resolve("./src/template/email"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./src/template/email"),
        extName: ".html",
      })
    );

    const mailOptions = {
      from: '"MovieTix App"  <lepakdev@gmail.com>',
      to: data.to,
      subject: data.subject,
      template: data.template,
      context: data.data,
    };

    //cek apakah ada template di data
    if (data.attachment || data.attachment.length > 0) {
      mailOptions.attachment = data.attachment;
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Email sent !${info.response}`);
        resolve(info.response);
      }
    });
  });

module.exports = sendMail;
