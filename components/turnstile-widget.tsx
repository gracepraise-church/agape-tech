"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileWidgetProps = {
  siteKey: string;
  error?: string;
  onError: () => void;
  onExpired: () => void;
  onTokenChange: (token: string) => void;
};

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({
  siteKey,
  error,
  onError,
  onExpired,
  onTokenChange,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const turnstile = window.turnstile;
    const container = containerRef.current;
    if (!scriptReady || !turnstile || !container || widgetIdRef.current) return;

    widgetIdRef.current = turnstile.render(container, {
      sitekey: siteKey,
      callback: onTokenChange,
      "expired-callback": () => {
        onTokenChange("");
        onExpired();
      },
      "error-callback": () => {
        onTokenChange("");
        onError();
      },
    });

    return () => {
      if (widgetIdRef.current) turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [onError, onExpired, onTokenChange, scriptReady, siteKey]);

  return (
    <div className="contact-field contact-field-full turnstile-field">
      <span id="turnstile-label">Security check</span>
      <Script
        onError={onError}
        onReady={() => setScriptReady(true)}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div aria-describedby={error ? "turnstile-error" : undefined} aria-labelledby="turnstile-label" ref={containerRef} role="group" />
      {error && <span className="field-error" id="turnstile-error" role="alert">{error}</span>}
    </div>
  );
}
