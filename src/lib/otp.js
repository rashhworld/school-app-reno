import crypto from "crypto";

// In-memory storage for OTPs
const otpStorage = new Map();

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const storeOTP = (email, otp) => {
  const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStorage.set(email, {
    otp,
    expiry: expiryTime,
    attempts: 0,
  });
};

export const verifyOTP = (email, inputOTP) => {
  const stored = otpStorage.get(email);

  if (!stored) {
    return { valid: false, error: "OTP not found or expired" };
  }

  if (Date.now() > stored.expiry) {
    otpStorage.delete(email);
    return { valid: false, error: "OTP has expired" };
  }

  if (stored.attempts >= 3) {
    otpStorage.delete(email);
    return { valid: false, error: "Too many failed attempts" };
  }

  if (stored.otp !== inputOTP) {
    stored.attempts++;
    return { valid: false, error: "Invalid OTP" };
  }

  // OTP is valid, remove it from storage
  otpStorage.delete(email);
  return { valid: true };
};

export const cleanupExpiredOTPs = () => {
  const now = Date.now();
  for (const [email, data] of otpStorage.entries()) {
    if (now > data.expiry) {
      otpStorage.delete(email);
    }
  }
};

// Clean up expired OTPs every 5 minutes
setInterval(cleanupExpiredOTPs, 5 * 60 * 1000);
