import * as dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3001;
const emailMailer = process.env.EMAIL;
const password = process.env.PASSWORD;

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: emailMailer,
        pass: password,
      },
    });

    const mailOptions = {
      from: `Furino Mailer <${emailMailer}>`,
      to: 'tuankenji12@gmail.com',
      subject: `New message from contact form ${email}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    const mailer = await transporter.sendMail(mailOptions);

    res.status(200).json(mailer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send('response from root router');
});

app.listen(port, async () => {
  console.log(`listening on port: ${port}`);
});
