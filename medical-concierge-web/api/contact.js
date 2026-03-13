// POST /api/contact — Handles contact form submissions
// Validates required fields and email format, logs to console (production: forward to email service)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESPONSE_MESSAGES = {
  en: "Thank you for reaching out. We'll contact you within 24 hours.",
  th: "ขอบคุณที่ติดต่อเรา เราจะติดต่อกลับภายใน 24 ชั่วโมง",
  cn: "感谢您的联系。我们将在24小时内与您取得联系。",
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, language = 'en' } = req.body || {};

  // Validate required fields
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required.');
  } else if (name.trim().length > 200) {
    errors.push('Name must be 200 characters or fewer.');
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required.');
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push('Please provide a valid email address.');
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('Message is required.');
  } else if (message.trim().length > 5000) {
    errors.push('Message must be 5000 characters or fewer.');
  }

  // Optional phone validation (if provided, basic sanity check)
  if (phone && typeof phone === 'string' && phone.trim().length > 0) {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{6,15}$/.test(cleaned)) {
      errors.push('Please provide a valid phone number.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Sanitize inputs
  const sanitized = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : null,
    message: message.trim(),
    language,
    submittedAt: new Date().toISOString(),
  };

  // Log the contact request (in production, forward to email service / CRM)
  console.log('[api/contact] New contact submission:', JSON.stringify(sanitized, null, 2));

  // Return localized success message
  const responseMessage = RESPONSE_MESSAGES[language] || RESPONSE_MESSAGES.en;

  return res.status(200).json({
    success: true,
    message: responseMessage,
  });
}
