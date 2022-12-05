import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import XOAuth2 from "nodemailer/lib/xoauth2";

export async function verifyEmail(
  email: string,
  content: string,
  htmlContent: any
) {
  try {
    const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
    const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
    const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
    const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;

    const myOAuth2Client = new OAuth2Client(
      GOOGLE_MAILER_CLIENT_ID,
      GOOGLE_MAILER_CLIENT_SECRET
    );

    myOAuth2Client.setCredentials({
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
    });

    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;
    const auth: AuthenticationTypeOAuth2 = {
      user: ADMIN_EMAIL_ADDRESS,
      clientId: GOOGLE_MAILER_CLIENT_ID,
      clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken: myAccessToken,
      type: "OAUTH2",
      oauth2: new XOAuth2(),
      method: "XOAUTH2",
    };

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: auth,
    });

    const mailOptions = {
      to: email,
      subject: "Print Tag",
      html: htmlContent(content),
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}
