import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { name, email, projectType, message } = req.body;

  await resend.emails.send({
    from: "Dhruv Portfolio <contact@my.dg.portfolio.com>",
    to: "goeldhruv9876@gmail.com",
    subject: `New Lead: ${projectType}`,
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>${message}</p>
    `,
  });

  return res.status(200).json({ success: true });
}