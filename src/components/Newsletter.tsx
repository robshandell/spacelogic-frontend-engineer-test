"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section
      className="py-12 md:py-16 bg-[#f5f5f5] animate-fade-in-up animate-fade-in-up-delay-3"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 lg:gap-12">
            <h2
              id="newsletter-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight max-w-xl leading-tight"
            >
              Stay upto date about
              <br />
              our latest offers
            </h2>
            <form
              className="flex flex-col gap-3 w-full md:max-w-md"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-black placeholder:text-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-white/30 transition-shadow duration-200"
                  aria-describedby="newsletter-desc"
                />
              </div>
              <p id="newsletter-desc" className="sr-only">
                We'll send you updates on new products and offers.
              </p>
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-800 transition-colors duration-200 md:bg-white md:text-black md:hover:bg-gray-100"
              >
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
