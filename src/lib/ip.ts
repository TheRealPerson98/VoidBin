import { headers } from 'next/headers';

export async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers();
    
    // Try standard headers first
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    
    // Try Cloudflare-specific header
    const cfConnectingIP = headersList.get('cf-connecting-ip');
    if (cfConnectingIP) {
      return cfConnectingIP;
    }
    
    // Fallback
    const remoteAddr = headersList.get('x-real-ip') || '0.0.0.0';
    return remoteAddr;
  } catch (error) {
    console.error('Error getting client IP:', error);
    return '0.0.0.0';
  }
} 