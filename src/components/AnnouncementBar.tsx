"use client";

import { useState } from "react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="bg-black text-white text-center text-sm py-2.5 px-4 relative">
      <p>
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="underline font-bold">
          Sign Up Now
        </a>
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-80"
        aria-label="Close announcement"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
