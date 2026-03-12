"use client";

import { useState } from "react";

const MOCK_REVIEWS = [
  { name: "Samantha D.", text: "The quality is amazing and it fits perfectly. Will definitely order again!", date: "August 16, 2023" },
  { name: "Alex M.", text: "Love the fabric and the design. Exactly as described. Fast shipping too.", date: "August 16, 2023" },
  { name: "Jordan K.", text: "Great purchase. Comfortable and stylish. Highly recommend this product.", date: "August 15, 2023" },
  { name: "Taylor R.", text: "Perfect for everyday wear. The material is soft and holds up well after washing.", date: "August 15, 2023" },
  { name: "Casey L.", text: "Exactly what I was looking for. Good quality and true to size.", date: "August 14, 2023" },
  { name: "Morgan P.", text: "Very satisfied with my order. The product exceeded my expectations.", date: "August 14, 2023" },
];

export type ProductDetailsFromApi = {
  title: string;
  description: string;
  category: string;
  price: number;
  rating: { rate: number; count: number };
};

export function ProductDetailTabs({
  reviewCount,
  productDetails,
}: {
  reviewCount: number;
  productDetails: ProductDetailsFromApi;
}) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("reviews");

  return (
    <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-gray-200">
      <div className="flex gap-4 md:gap-8 border-b border-gray-200 overflow-x-auto" role="tablist">
        <button
          type="button"
          role="tab"
          onClick={() => setActiveTab("details")}
          className={`pb-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
            activeTab === "details" ? "text-black font-semibold border-b-2 border-black -mb-px" : "text-gray-500 hover:text-black"
          }`}
          aria-selected={activeTab === "details"}
          aria-controls="tabpanel-details"
          id="tab-details"
        >
          Product Details
        </button>
        <button
          type="button"
          role="tab"
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
            activeTab === "reviews" ? "text-black font-semibold border-b-2 border-black -mb-px" : "text-gray-500 hover:text-black"
          }`}
          aria-selected={activeTab === "reviews"}
          aria-controls="tabpanel-reviews"
          id="tab-reviews"
        >
          Rating & Reviews
        </button>
        <button
          type="button"
          role="tab"
          onClick={() => setActiveTab("faqs")}
          className={`pb-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
            activeTab === "faqs" ? "text-black font-semibold border-b-2 border-black -mb-px" : "text-gray-500 hover:text-black"
          }`}
          aria-selected={activeTab === "faqs"}
          aria-controls="tabpanel-faqs"
          id="tab-faqs"
        >
          FAQs
        </button>
      </div>

      {activeTab === "details" && (
        <div id="tabpanel-details" role="tabpanel" aria-labelledby="tab-details" className="py-8">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-black mb-1">Title</dt>
              <dd className="text-gray-600">{productDetails.title}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black mb-1">Description</dt>
              <dd className="text-gray-600">{productDetails.description}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black mb-1">Category</dt>
              <dd className="text-gray-600 capitalize">{productDetails.category.replace(/'/g, "")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black mb-1">Price</dt>
              <dd className="text-gray-600">${productDetails.price.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black mb-1">Rating</dt>
              <dd className="text-gray-600">
                {productDetails.rating.rate.toFixed(1)} / 5 ({productDetails.rating.count} reviews)
              </dd>
            </div>
          </dl>
        </div>
      )}

      {activeTab === "reviews" && (
        <div id="tabpanel-reviews" role="tabpanel" aria-labelledby="tab-reviews" className="py-6 md:py-8">
          <div className="flex items-center justify-between gap-3 mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-bold text-black">All Reviews ({reviewCount})</h3>
            <div className="flex items-center gap-2">
              <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 md:w-auto md:h-auto md:p-2 md:rounded-lg md:bg-transparent" aria-label="Filter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              </button>
              <select className="hidden sm:block text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/10">
                <option>Latest</option>
              </select>
              <button
                type="button"
                className="text-sm font-semibold text-white bg-black px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Write a Review
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_REVIEWS.map((review, i) => (
              <article key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <div className="flex gap-1 text-amber-400 mb-2" aria-hidden>★★★★★</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-black">{review.name}</span>
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-600 text-white flex-shrink-0" aria-label="Verified">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{review.text}</p>
                <p className="text-gray-400 text-xs">Posted on {review.date}</p>
              </article>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="text-sm font-medium text-black border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Load More Reviews
            </button>
          </div>
        </div>
      )}

{activeTab === "faqs" && (
        <div id="tabpanel-faqs" role="tabpanel" aria-labelledby="tab-faqs" className="py-8">
          <ul className="space-y-6">
            {[
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for unused items in original packaging. Contact our support team to initiate a return.",
              },
              {
                q: "How long does shipping take?",
                a: "Standard shipping typically takes 5–7 business days. Express options (2–3 days) are available at checkout.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes. We ship to most countries. Delivery times and fees vary by location and are shown at checkout.",
              },
              {
                q: "How do I track my order?",
                a: "Once your order ships, you’ll receive an email with a tracking link. You can also check status in your account.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept Visa, Mastercard, PayPal, Apple Pay, and Google Pay. All transactions are secure.",
              },
            ].map((faq, i) => (
              <li key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h4 className="font-semibold text-black mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
