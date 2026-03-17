/**
 * Utility to format phone numbers for WhatsApp API links.
 * WhatsApp requires the number to be in international format without the "+" prefix.
 * Example for Tanzania: "0712345678" -> "255712345678"
 */

export const formatWhatsAppNumber = (phone?: string | null): string => {
  if (!phone) return "";

  // 1. Remove all non-numeric characters (spaces, dashes, parentheses) except '+'
  let cleaned = phone.replace(/[^\d+]/g, "");

  // 2. If it starts with '+', just remove the '+'
  if (cleaned.startsWith("+")) {
    return cleaned.substring(1);
  }

  // 3. If it starts with '0', assume it's a local Tanzanian number and prepend '255'
  if (cleaned.startsWith("0")) {
    return "255" + cleaned.substring(1);
  }

  // 4. If it already starts with '255' or another country code without '+', return as is
  return cleaned;
};
