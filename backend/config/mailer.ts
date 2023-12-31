import nodemailer from "nodemailer";

const sendEmail = (email: string, OTP: string) => {
  const mail_configs = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "PASSWORD RECOVERY",
    html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>CodePen - OTP Email Template</title>     
      </head>
      <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">HTYH</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing HTYH. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />HTYH</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>HTYH</p>
            <p>my address</p>
            <p>Vancouver</p>
          </div>
        </div>
      </div> 
      </body>
      </html>`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" + info.response });
    });
  });
};

export default sendEmail;
