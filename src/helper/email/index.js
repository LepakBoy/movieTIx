const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv");

module.exports = {
  bookingPaymentInvoice: (data) =>
    //setup email pengirim
    new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.EMAIL_SENDER_PASS,
        },
      });

      //penghubung setingan email dengan template
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

      //cek apakah ada attachment di data
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
    }),

  verificationAccount: (data) =>
    //setup email pengirim
    new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.EMAIL_SENDER_PASS,
        },
      });

      //penghubung setingan email dengan template
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

      //cek apakah ada attachment di data
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
    }),
};
