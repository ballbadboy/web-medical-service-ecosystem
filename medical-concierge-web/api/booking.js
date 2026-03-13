// POST /api/booking — Handles booking form submissions
// Validates required fields, generates a booking reference, logs to console

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded I, O, 0, 1 to avoid ambiguity
  let ref = '';
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return `BC-${ref}`;
}

const RESPONSE_MESSAGES = {
  en: 'Your booking has been received. Our concierge team will confirm your appointment within 24 hours.',
  th: 'ได้รับการจองของคุณแล้ว ทีมคอนเซียร์จของเราจะยืนยันนัดหมายภายใน 24 ชั่วโมง',
  cn: '您的预约已收到。我们的礼宾团队将在24小时内确认您的预约。',
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://bio.techdev.in.th');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Body size limit
  const bodyStr = JSON.stringify(req.body);
  if (bodyStr.length > 50 * 1024) {
    return res.status(413).json({ error: 'Request payload too large.' });
  }

  const {
    name,
    email,
    phone,
    specialistId,
    condition,
    preferredDate,
    notes,
    addons = {},
    language = 'en',
  } = req.body || {};

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

  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    errors.push('Phone number is required.');
  } else {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{6,15}$/.test(cleaned)) {
      errors.push('Please provide a valid phone number.');
    }
  }

  if (!condition || typeof condition !== 'string' || condition.trim().length === 0) {
    errors.push('Medical condition or treatment type is required.');
  } else if (condition.trim().length > 1000) {
    errors.push('Condition description must be 1000 characters or fewer.');
  }

  // Validate preferredDate if provided (must be in the future)
  if (preferredDate) {
    const dateObj = new Date(preferredDate);
    if (isNaN(dateObj.getTime())) {
      errors.push('Preferred date is not a valid date.');
    } else if (dateObj < new Date()) {
      errors.push('Preferred date must be in the future.');
    }
  }

  // Validate notes length if provided
  if (notes && typeof notes === 'string' && notes.trim().length > 5000) {
    errors.push('Notes must be 5000 characters or fewer.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Build the booking record
  const bookingRef = generateBookingRef();

  const booking = {
    bookingRef,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    specialistId: specialistId || null,
    condition: condition.trim(),
    preferredDate: preferredDate || null,
    notes: notes ? notes.trim() : null,
    addons: {
      transport: Boolean(addons.transport),
      postSurgeryCare: Boolean(addons.postSurgeryCare),
      languageSupport: Boolean(addons.languageSupport),
    },
    language,
    submittedAt: new Date().toISOString(),
  };

  // Log the booking (in production, persist to database and trigger email notifications)
  console.log('[api/booking] New booking submission:', JSON.stringify(booking, null, 2));

  // Return localized success message
  const responseMessage = RESPONSE_MESSAGES[language] || RESPONSE_MESSAGES.en;

  return res.status(200).json({
    success: true,
    bookingRef,
    message: responseMessage,
  });
}
