import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX_LENGTH = 500;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a bot that fills out every field blindly will fill this one
  // too, since real visitors never see or reach it. Report success without
  // sending anything, so the bot has no signal that it was caught.
  const website = typeof body.website === "string" ? body.website.trim() : "";
  if (website !== "") {
    return Response.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Never trust client-side validation alone — re-check on the server.
  if (!name) {
    return Response.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return Response.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > MESSAGE_MAX_LENGTH) {
    return Response.json(
      { error: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.` },
      { status: 400 }
    );
  }

  const user = process.env.CONTACT_EMAIL_USER;
  const pass = process.env.CONTACT_EMAIL_PASS;

  if (!user || !pass) {
    console.error("Missing CONTACT_EMAIL_USER / CONTACT_EMAIL_PASS environment variables.");
    return Response.json({ error: "Contact form isn't configured yet." }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${user}>`,
      to: user,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form send error:", err);
    return Response.json(
      { error: "Something went wrong sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
