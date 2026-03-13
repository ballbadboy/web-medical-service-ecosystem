import { useState, useCallback, useRef } from 'react';

// ── Local keyword-matching fallback (mirrors AiAssistant.jsx logic) ─────────
const localResponses = {
  appointment: {
    text: 'I can arrange that for you right away. We have availability as early as this Friday with Dr. Priya Sharma, our leading cardiologist at Bangkok Heart Institute. Shall I schedule a 30-minute tele-consultation first to review your records?',
    suggestions: ['Upload Medical Records', 'Get Cost Estimate', 'Our Partner Hospitals'],
  },
  transport: {
    text: 'Our VIP Ground Transport package includes: private sedan from Suvarnabhumi Airport, a dedicated patient escort, and all local hospital transfers. A representative will be at arrivals holding your name card. Shall I add this to your care package?',
    suggestions: ['Book Appointment', 'Hotel Accommodation', 'View Transport Pricing'],
  },
  records: {
    text: 'Please upload your documents using the attachment button below. Our team will review and translate them within 12 hours. We accept DICOM scans, lab reports, discharge summaries -- any format works.',
    suggestions: ['Book Appointment', 'Talk to a Specialist', 'Get Cost Estimate'],
  },
  opinion: {
    text: "A second opinion is always a wise step. Our process takes 3-5 business days: (1) Document collection & translation, (2) Specialist review panel, (3) Detailed written report delivered to you. Ready to begin?",
    suggestions: ['Upload Records Now', 'Schedule Consultation', 'View Pricing'],
  },
  cost: {
    text: "Our pricing is fully transparent. Typical ranges:\n- Cardiac procedures: $20,000-$35,000\n- Orthopedic surgery: $12,000-$20,000\n- Stem Cell Therapy: $10,000-$18,000\n- Dental from: $3,000\n\nAll-inclusive VIP packages available. Would you like a personalised estimate?",
    suggestions: ['Book Consultation', 'Upload Records', 'Add Transport Package'],
  },
  specialist: {
    text: "We partner with over 200 certified specialists across Bangkok's top JCI-accredited hospitals. I can match you to the ideal doctor based on your condition, language preference, and schedule. Which specialty are you looking for?",
    suggestions: ['Cardiology', 'Orthopedics', 'Stem Cell Therapy', 'Dental'],
  },
  cardiac: {
    text: "Our cardiac care team includes some of Southeast Asia's most respected cardiologists, with success rates exceeding 97%. Bangkok Heart Institute and Bumrungrad International Hospital are among our premier partners. Would you like to meet our cardiac specialists?",
    suggestions: ['Meet Cardiologists', 'Book Consultation', 'Cardiac Cost Estimate'],
  },
  orthopedic: {
    text: 'Our orthopedic surgeons specialise in joint replacement, sports injuries, and spine procedures, using the latest robotic-assisted surgical technology. What specific condition are you dealing with -- knee, hip, spine, or other?',
    suggestions: ['Book Consultation', 'Upload X-rays / MRI', 'Get Cost Estimate'],
  },
  stemcell: {
    text: 'Our stem cell therapy programmes are conducted under rigorous clinical protocols for autoimmune conditions, orthopedic degeneration, and rejuvenation. A preliminary medical evaluation is required before treatment begins. Shall I schedule one?',
    suggestions: ['Schedule Evaluation', 'Upload Medical History', 'Therapy Pricing'],
  },
  dental: {
    text: "Our dental partners offer world-class procedures at a fraction of Western prices:\n- Implants from $800\n- All-on-4 from $8,000\n- Veneers from $300/tooth\n\nAll dentists are internationally certified. Would you like a free photo consultation?",
    suggestions: ['Free Photo Consult', 'Book Appointment', 'Full Dental Price List'],
  },
  visa: {
    text: "We provide full medical visa support -- invitation letters from partner hospitals, document preparation, and appointment scheduling. Thailand's medical visa allows stays up to 90 days. Shall I start the process for you?",
    suggestions: ['Start Visa Process', 'Book Appointment', 'Airport Transfer'],
  },
  hotel: {
    text: "We partner with recovery-friendly hotels near Bangkok's major hospitals, offering patient packages with adapted rooms, meal delivery, and daily housekeeping. Options from comfortable 3-star to luxury 5-star. Shall I check availability for your dates?",
    suggestions: ['Check Availability', 'Book Appointment', 'Transport Package'],
  },
};

const defaultResponses = [
  { text: "Thank you for reaching out. I'm reviewing your information to connect you with the most suitable specialist. Is there anything specific about your medical history you'd like to share?", suggestions: ['Book Appointment', 'Cost Estimate', 'Find a Specialist'] },
  { text: 'I understand your concern. Our team has extensive experience in this area. Would you like me to arrange a tele-consultation with one of our top specialists this week?', suggestions: ['Book Consultation', 'Upload Records', 'View Pricing'] },
  { text: "Based on what you've described, I recommend a comprehensive evaluation. I can coordinate all pre-arrival documentation, including translation of your medical records. Shall I proceed?", suggestions: ['Yes, Proceed', 'Upload Records', 'Get Estimate'] },
  { text: 'We have several highly qualified specialists available. I can have a preliminary assessment ready within 24 hours. Would you prefer a video consultation or an in-person visit in Bangkok?', suggestions: ['Video Consult', 'Visit Bangkok', 'View Pricing'] },
  { text: 'Our concierge team will prepare a personalised care package including airport transfer, specialist appointment, and post-care coordination. Would you like a detailed cost breakdown?', suggestions: ['Cost Breakdown', 'Book Now', 'Transport Info'] },
];

function getLocalResponse(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) return localResponses.appointment;
  if (lower.includes('transport') || lower.includes('airport') || lower.includes('transfer') || lower.includes('pickup')) return localResponses.transport;
  if (lower.includes('record') || lower.includes('document') || lower.includes('upload') || lower.includes('file')) return localResponses.records;
  if (lower.includes('second opinion') || lower.includes('opinion')) return localResponses.opinion;
  if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('estimate') || lower.includes('fee')) return localResponses.cost;
  if (lower.includes('specialist') || lower.includes('doctor') || lower.includes('physician')) return localResponses.specialist;
  if (lower.includes('cardiac') || lower.includes('heart') || lower.includes('cardiolog') || lower.includes('angiogram')) return localResponses.cardiac;
  if (lower.includes('orthopedic') || lower.includes('knee') || lower.includes('hip') || lower.includes('joint') || lower.includes('spine')) return localResponses.orthopedic;
  if (lower.includes('stem cell') || lower.includes('stemcell') || lower.includes('regenerative')) return localResponses.stemcell;
  if (lower.includes('dental') || lower.includes('teeth') || lower.includes('tooth') || lower.includes('implant') || lower.includes('veneer')) return localResponses.dental;
  if (lower.includes('visa') || lower.includes('travel') || lower.includes('passport')) return localResponses.visa;
  if (lower.includes('hotel') || lower.includes('accommodation') || lower.includes('stay') || lower.includes('room')) return localResponses.hotel;
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

/**
 * Manages chat state and communication with the /api/chat endpoint.
 * Falls back to local keyword matching if the API call fails.
 *
 * @param {string} language - Current UI language code ("en" | "th" | "cn")
 * @returns {{ messages: Array, sendMessage: Function, isLoading: boolean, error: string|null }}
 */
export default function useChat(language = 'en') {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (text) => {
    if (!text || !text.trim() || isLoading) return;

    const trimmed = text.trim();

    // Add user message to state
    const userMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Build the messages payload for the API (include conversation history)
    // Only send the last 20 messages to keep payload reasonable
    const apiMessages = [...messages, userMessage]
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-20);

    try {
      // Cancel any in-flight request
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          language,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage = {
        role: 'assistant',
        content: data.reply,
        suggestions: data.suggestions || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // If request was intentionally aborted, do nothing
      if (err.name === 'AbortError') return;

      console.warn('[useChat] API call failed, falling back to local response:', err.message);

      // Fallback to local keyword matching
      const fallback = getLocalResponse(trimmed);
      const assistantMessage = {
        role: 'assistant',
        content: fallback.text,
        suggestions: fallback.suggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setError('Using offline responses. AI assistant will reconnect automatically.');
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages, isLoading, language]);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
  };
}
