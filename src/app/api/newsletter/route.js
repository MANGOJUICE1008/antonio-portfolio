import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: same approach as the contact form. A bot that fills every
  // field blindly will fill this one too, since real visitors never see or
  // reach it. Report success without doing anything, so the bot gets no
  // signal that it was caught.
  const website = typeof body.website === "string" ? body.website.trim() : "";
  if (website !== "") {
    return Response.json({ success: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";

  // Never trust client-side validation alone — re-check on the server.
  if (!email || !EMAIL_REGEX.test(email)) {
    return Response.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const user = process.env.CONTACT_EMAIL_USER;
  const pass = process.env.CONTACT_EMAIL_PASS;

  if (!user || !pass) {
    console.error("Missing CONTACT_EMAIL_USER / CONTACT_EMAIL_PASS environment variables.");
    return Response.json({ error: "Newsletter signup isn't configured yet." }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // No mailing-list provider (Mailchimp, Buttondown, ConvertKit, etc.) is
    // wired up yet, so for now this just emails you the new subscriber's
    // address to add by hand. Swap this block out once you pick a provider —
    // everything else in this route (honeypot + validation) stays the same.
    await transporter.sendMail({
      from: `"Portfolio Newsletter" <${user}>`,
      to: user,
      replyTo: email,
      subject: "New newsletter subscriber",
      text: `New subscriber: ${email}`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return Response.json(
      { error: "Something went wrong subscribing you. Please try again later." },
      { status: 500 }
    );
  }
}
