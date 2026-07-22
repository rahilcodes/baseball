"use client";

import { useState, useEffect, useCallback } from "react";

interface DraftData<T> {
  expiry: number;
  step: number;
  values: T;
}

export function useFormDraft<T>(key: string) {
  const [savedDraft, setSavedDraft] = useState<{ step: number; values: T } | null>(null);

  useEffect(() => {
    // Read draft on mount
    try {
      const draftStr = localStorage.getItem(key);
      if (draftStr) {
        const draft = JSON.parse(draftStr) as DraftData<T>;
        if (Date.now() < draft.expiry) {
          setSavedDraft({ step: draft.step, values: draft.values });
        } else {
          localStorage.removeItem(key); // clear expired draft
        }
      }
    } catch (e) {
      console.error("Failed to read form draft", e);
    }
  }, [key]);

  const saveDraft = useCallback((step: number, values: T) => {
    try {
      // 24 hours expiry
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(key, JSON.stringify({ expiry, step, values }));
    } catch (e) {
      console.error("Failed to save form draft", e);
    }
  }, [key]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
    setSavedDraft(null);
  }, [key]);

  return { savedDraft, saveDraft, clearDraft };
}
