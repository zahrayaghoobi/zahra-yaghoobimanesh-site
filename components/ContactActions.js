"use client";

import { useState } from "react";

export default function ContactActions({ profile }) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      setCopyError("");
      window.setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      setCopyError("کپی ایمیل انجام نشد؛ لطفاً ایمیل را دستی کپی کنید.");
    }
  }

  return (
    <>
      <div className="cta c contact-actions">
        <button className="btn primary contact-email" type="button" onClick={copyEmail}>
          {emailCopied ? "ایمیل کپی شد" : profile.email}
        </button>
        <div className="phone-action">
          <details>
            <summary className="btn ghost" dir="ltr">{profile.phone}</summary>
            <div className="phone-options">
              <a href={`tel:${profile.phone}`}>تماس تلفنی</a>
              <a href={`sms:${profile.phone}`}>ارسال پیامک</a>
            </div>
          </details>
        </div>
        <a
          className="btn ghost social-link"
          href={`https://t.me/${profile.telegram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
        >
          تلگرام {profile.telegram}
        </a>
        <a className="btn ghost social-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" dir="ltr">
          LinkedIn
        </a>
      </div>
      {copyError && <p className="contact-feedback" role="alert">{copyError}</p>}
      <span className="sr-only" role="status" aria-live="polite">
        {emailCopied ? "آدرس ایمیل کپی شد" : ""}
      </span>
    </>
  );
}
