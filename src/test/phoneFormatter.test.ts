import { describe, it, expect } from 'vitest';
import { formatWhatsAppNumber } from '@/utils/phoneFormatter';

describe('formatWhatsAppNumber', () => {
  it('should return empty string for null/undefined', () => {
    expect(formatWhatsAppNumber(null)).toBe('');
    expect(formatWhatsAppNumber(undefined)).toBe('');
  });

  it('should remove plus sign and return international format', () => {
    expect(formatWhatsAppNumber('+255712345678')).toBe('255712345678');
    expect(formatWhatsAppNumber('+255 712 345 678')).toBe('255712345678');
  });

  it('should prepend 255 for local Tanzanian numbers starting with 0', () => {
    expect(formatWhatsAppNumber('0712345678')).toBe('255712345678');
    expect(formatWhatsAppNumber('0712 345 678')).toBe('255712345678');
    expect(formatWhatsAppNumber('0123456789')).toBe('255123456789');
  });

  it('should handle numbers already in international format', () => {
    expect(formatWhatsAppNumber('255712345678')).toBe('255712345678');
    expect(formatWhatsAppNumber('256812345678')).toBe('256812345678');
  });

  it('should remove non-numeric characters except plus', () => {
    expect(formatWhatsAppNumber('(0712) 345-678')).toBe('255712345678');
    expect(formatWhatsAppNumber('+1 (555) 123-4567')).toBe('15551234567');
  });
});
