import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, time, program } = body;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const meetingLink = process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK || 'https://meet.google.com/your-personal-link';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@clarityfinance.com';

    // 1. Send Email to Client
    await transporter.sendMail({
      from: `"Clarity Finance" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Booking Confirmation: Coaching Session on ${date}`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Your booking for <strong>${program || 'a Coaching Session'}</strong> has been confirmed.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <br/>
        <p>To join the meeting at the scheduled time, please click the link below:</p>
        <a href="${meetingLink}" style="display:inline-block;padding:10px 20px;background-color:#2563EB;color:white;text-decoration:none;border-radius:5px;">Join Google Meet</a>
        <br/><br/>
        <p>We look forward to speaking with you!</p>
        <p>- The Clarity Finance Team</p>
      `,
    });

    // 2. Send Notification Email to Admin
    await transporter.sendMail({
      from: `"Clarity Finance System" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Booking: ${name}`,
      html: `
        <h2>New Booking Alert</h2>
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Client Email:</strong> ${email}</p>
        <p><strong>Program:</strong> ${program || 'Coaching Session'}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <br/>
        <p>The client has been sent the Google Meet link: <a href="${meetingLink}">${meetingLink}</a></p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Booking confirmed and emails sent' });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
