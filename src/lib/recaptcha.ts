// Google reCAPTCHA v3 Integration
// Site key should be configured in environment variables

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

// reCAPTCHA site key - replace with your actual site key
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

let scriptLoaded = false;
let scriptLoading = false;

/**
 * Load the reCAPTCHA script dynamically
 */
export const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (scriptLoaded) {
      resolve();
      return;
    }

    if (scriptLoading) {
      // Wait for existing load to complete
      const checkLoaded = setInterval(() => {
        if (scriptLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key not configured");
      resolve(); // Don't block if not configured
      return;
    }

    scriptLoading = true;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      resolve();
    };

    script.onerror = () => {
      scriptLoading = false;
      reject(new Error("Failed to load reCAPTCHA script"));
    };

    document.head.appendChild(script);
  });
};

/**
 * Execute reCAPTCHA and get a token
 * @param action - The action name for this reCAPTCHA execution
 * @returns Promise<string | null> - The reCAPTCHA token or null if not available
 */
export const executeRecaptcha = async (
  action: string
): Promise<string | null> => {
  if (!RECAPTCHA_SITE_KEY) {
    console.warn("reCAPTCHA site key not configured, skipping verification");
    return null;
  }

  try {
    await loadRecaptchaScript();

    return new Promise((resolve) => {
      if (!window.grecaptcha) {
        console.warn("reCAPTCHA not available");
        resolve(null);
        return;
      }

      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action,
          });
          resolve(token);
        } catch (error) {
          console.error("reCAPTCHA execution error:", error);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    return null;
  }
};

/**
 * Check if reCAPTCHA is enabled (site key is configured)
 */
export const isRecaptchaEnabled = (): boolean => {
  return Boolean(RECAPTCHA_SITE_KEY);
};
