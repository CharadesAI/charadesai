// [src/lib/recaptcha.ts](src/lib/recaptcha.ts)
declare global {
  interface Window {
    grecaptcha?: {
      // Called when the library is ready; some implementations accept a callback,
      // others may return a Promise-like value when awaited.
      ready: (callback?: () => void) => void | Promise<void>;
      // Executes an action and returns a token (string) or a Promise resolving to a string.
      execute: (
        siteKey: string,
        options?: { action?: string }
      ) => Promise<string> | string;
      // Optional helpers commonly available on grecaptcha
      render?: (element: HTMLElement | string, params?: Record<string, unknown>) => number;
      getResponse?: (widgetId?: number) => string;
    };
  }
}

const SITE_KEY = (import.meta.env.VITE_RECAPTCHA_SITE_KEY || "").trim();

let _loaded = false;

export function loadRecaptchaScript(): Promise<void> {
  if (!SITE_KEY) return Promise.resolve();
  if (_loaded && window.grecaptcha) return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      _loaded = true;
      return resolve();
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src*="recaptcha/api.js?render=${SITE_KEY}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => {
        _loaded = true;
        resolve();
      });
      existing.addEventListener("error", reject);
      return;
    }

    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      _loaded = true;
      resolve();
    };
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}

export async function executeRecaptcha(
  action = "submit"
): Promise<string | null> {
  if (!SITE_KEY) return null;
  // Wait for library to load
  if (!window.grecaptcha) {
    await loadRecaptchaScript().catch(() => null);
  }
  try {
    if (!window.grecaptcha) return null;
    await window.grecaptcha.ready();
    const token = await window.grecaptcha.execute(SITE_KEY, { action });
    return typeof token === "string" ? token : null;
  } catch (err) {
    console.warn("reCAPTCHA execution failed", err);
    return null;
  }
}
export default { loadRecaptchaScript, executeRecaptcha };
