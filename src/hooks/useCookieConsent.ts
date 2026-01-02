import { useState, useEffect, useCallback } from "react";

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
}

const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_PREFERENCES_KEY = "cookie-preferences";
const COOKIE_SETTINGS_EVENT = "cookie-settings-open";

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
};

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Listen for open settings event (from footer link)
  useEffect(() => {
    const handleOpenSettings = () => setIsSettingsOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  // Load saved consent on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (savedConsent !== null) {
      setHasConsent(savedConsent === "true");
    }

    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...defaultPreferences, ...parsed, essential: true });
      } catch {
        setPreferences(defaultPreferences);
      }
    }

    setIsLoading(false);
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setHasConsent(true);
  }, []);

  const acceptEssentialOnly = useCallback(() => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(essentialOnly));
    setPreferences(essentialOnly);
    setHasConsent(true);
  }, []);

  const savePreferences = useCallback((newPreferences: Partial<CookiePreferences>) => {
    const updated: CookiePreferences = {
      ...preferences,
      ...newPreferences,
      essential: true, // Always keep essential
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updated));
    setPreferences(updated);
    setHasConsent(true);
  }, [preferences]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    setHasConsent(null);
    setPreferences(defaultPreferences);
  }, []);

  const openSettings = useCallback(() => {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
  }, []);

  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  return {
    hasConsent,
    preferences,
    isLoading,
    isSettingsOpen,
    acceptAll,
    acceptEssentialOnly,
    savePreferences,
    resetConsent,
    openSettings,
    closeSettings,
  };
}
