import sendEmail from "../config/nodemailer.js";

// POST /api/email/test
// Admin-only endpoint to check Brevo SMTP immediately.
export const sendTestEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "A valid recipient email is required." });
  }

  try {
    const delivery = await sendEmail({
      to: email.trim(),
      subject: "QuickEMS - Brevo email test",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Brevo email test successful</h2>
          <p>This message was sent immediately from your QuickEMS backend.</p>
        </div>
      `,
    });

    return res.json({ success: true, delivery });
  } catch (error) {
    console.error("Test email failed:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to send test email.",
    });
  }
};
