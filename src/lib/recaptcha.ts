// Lightweight helper to get captcha tokens (supports reCAPTCHA v3)
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action?: string }) => Promise<string>;
    };
  }
}

export async function getCaptchaToken(action: string): Promise<string | null> {
  const provider = (
    import.meta.env.VITE_CAPTCHA_PROVIDER || "recaptcha"
  ).toLowerCase();

  if (provider === "none") return null;

  if (provider === "recaptcha") {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (!siteKey) return null;

    // Ensure grecaptcha script is loaded
    if (!window.grecaptcha) {
      await new Promise<void>((resolve, reject) => {
        const src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        const existing = document.querySelector(`script[src='${src}']`);
        if (existing) {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", () => reject());
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      }).catch((err) => {
        console.error("Failed to load grecaptcha script", err);
        return null;
      });
    }

    try {
      await new Promise<void>((resolve) =>
        window.grecaptcha?.ready(() => resolve())
      );
      const token: string = await window.grecaptcha!.execute(siteKey, {
        action,
      });
      return token;
    } catch (err) {
      console.error("grecaptcha execute failed", err);
      return null;
    }
  }

  // Fallback: provider not supported yet
  return null;
}
