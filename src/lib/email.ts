import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  numPeople: number;
  snackChoice: string | null;
  vegetarianCount: number;
  dogKennel: boolean;
  musicPreference: string | null;
  notes: string | null;
  totalPrice: number;
}

const MUSIC_LABELS: Record<string, string> = {
  chill: "Chill & acoustic",
  upbeat: "Upbeat & fun",
  slovenian: "Slovenian classics",
  surprise: "Surprise me",
  silence: "No music",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildExtrasText(data: BookingEmailData) {
  const extras: string[] = [];
  if (data.snackChoice) {
    const veg = data.vegetarianCount;
    let label: string;
    if (veg === 0) label = `Homemade snack: ${data.snackChoice}`;
    else if (veg === data.numPeople) label = `Vegetarian homemade snack: ${data.snackChoice}`;
    else label = `Homemade snack: ${data.snackChoice} (${veg} vegetarian, ${data.numPeople - veg} regular)`;
    extras.push(label);
  }
  if (data.dogKennel) extras.push("Dog kennel");
  if (data.musicPreference) {
    extras.push(`Music: ${MUSIC_LABELS[data.musicPreference] ?? data.musicPreference}`);
  }
  return extras.length ? extras.join(", ") : "None";
}

function senderAddress() {
  const addr = process.env.EMAIL_FROM!;
  // Wrap in friendly display-name format if the env var is just the bare address.
  return addr.includes("<") ? addr : `Tilen Tours <${addr}>`;
}

function replyToAddress() {
  const addr = process.env.EMAIL_FROM!;
  return addr.includes("<") ? addr.replace(/.*<(.+)>.*/, "$1") : addr;
}

export async function sendCustomerConfirmation(data: BookingEmailData) {
  const replyTo = replyToAddress();
  const extras = buildExtrasText(data);
  const text = `Hi ${data.customerName},

Your Tilen Tours booking is confirmed.

Date: ${formatDate(data.date)}
Group: ${data.numPeople} people
Add-ons: ${extras}
${data.notes ? `Notes: ${data.notes}\n` : ""}Total paid: €${data.totalPrice}

Tilen will contact you before the tour with pickup details. Reply to this email with any questions, or message us on WhatsApp at +386 40 842 594.

— Tilen Tours Slovenia
Ljubljana, Slovenia
https://tilen-tours.com`;

  await getResend().emails.send({
    from: senderAddress(),
    to: data.customerEmail,
    replyTo,
    subject: `Your Tilen Tours booking · ${formatDate(data.date)}`,
    text,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#2d5a27;padding:32px;text-align:center">
          <h1 style="color:#fff;margin:0;font-size:24px">You're booked!</h1>
          <p style="color:#c8e6c9;margin:8px 0 0">Tilen Tours Slovenia</p>
        </div>
        <div style="padding:32px;background:#fff">
          <p>Dear ${data.customerName},</p>
          <p>Your booking is confirmed. We look forward to an unforgettable day with you!</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 0;color:#666;width:140px">Date</td>
              <td style="padding:10px 0;font-weight:600">${formatDate(data.date)}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 0;color:#666">Group size</td>
              <td style="padding:10px 0;font-weight:600">${data.numPeople} people</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 0;color:#666">Add-ons</td>
              <td style="padding:10px 0;font-weight:600">${buildExtrasText(data)}</td>
            </tr>
            ${data.notes ? `<tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 0;color:#666;vertical-align:top">Notes</td>
              <td style="padding:10px 0;font-weight:600;white-space:pre-wrap">${escapeHtml(data.notes)}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:10px 0;color:#666">Total paid</td>
              <td style="padding:10px 0;font-weight:600;color:#2d5a27">€${data.totalPrice}</td>
            </tr>
          </table>
          <div style="background:#f5f5f0;padding:16px;border-radius:8px;margin-top:16px">
            <p style="margin:0;font-size:14px;color:#555">
              Your guide will contact you before the tour with pickup details. If you have any questions, reply to this email.
            </p>
          </div>
        </div>
        <div style="padding:24px;text-align:center;color:#999;font-size:12px">
          Tilen Tours Slovenia · Ljubljana, Slovenia
        </div>
      </div>
    `,
  });
}

export async function sendClientNotification(data: BookingEmailData) {
  const extras = buildExtrasText(data);
  const text = `New booking received.

Date: ${formatDate(data.date)}
People: ${data.numPeople}
Customer: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}
Add-ons: ${extras}
${data.notes ? `Notes: ${data.notes}\n` : ""}Total: €${data.totalPrice}`;

  await getResend().emails.send({
    from: senderAddress(),
    to: process.env.CLIENT_EMAIL!,
    replyTo: data.customerEmail,
    subject: `New booking · ${formatDate(data.date)} · ${data.numPeople} people`,
    text,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#2d5a27;padding:24px">
          <h1 style="color:#fff;margin:0;font-size:20px">New Booking</h1>
        </div>
        <div style="padding:24px;background:#fff">
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0;color:#666;width:140px">Date</td>
              <td style="padding:8px 0;font-weight:600">${formatDate(data.date)}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0;color:#666">People</td>
              <td style="padding:8px 0;font-weight:600">${data.numPeople}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0;color:#666">Customer</td>
              <td style="padding:8px 0;font-weight:600">${data.customerName}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0;color:#666">Email</td>
              <td style="padding:8px 0">${data.customerEmail}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0;color:#666">Phone</td>
              <td style="padding:8px 0">${data.customerPhone}</td>
            </tr>
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0;color:#666">Add-ons</td>
              <td style="padding:8px 0">${buildExtrasText(data)}</td>
            </tr>
            ${data.notes ? `<tr style="border-bottom:1px solid #eee">
              <td style="padding:8px 0;color:#666;vertical-align:top">Notes</td>
              <td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(data.notes)}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:8px 0;color:#666">Total</td>
              <td style="padding:8px 0;font-weight:600;color:#2d5a27">€${data.totalPrice}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  });
}
