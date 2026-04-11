"use client";

import { useState, useEffect, useCallback } from "react";

export function useSessionEmail(formType: string) {
  const key = `bpl_verified_email_${formType}`;
  const [cachedEmail, setCachedEmailState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const email = sessionStorage.getItem(key);
      if (email) setCachedEmailState(email);
    } catch (e) {}
  }, [key]);

  const setCachedEmail = useCallback((email: string) => {
    try {
      sessionStorage.setItem(key, email);
    } catch (e) {}
    setCachedEmailState(email);
  }, [key]);

  const clearCachedEmail = useCallback(() => {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {}
    setCachedEmailState(null);
  }, [key]);

  return { cachedEmail, setCachedEmail, clearCachedEmail };
}
