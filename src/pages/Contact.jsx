import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from '../lib/supabase';

import { pagesHeadingReveal } from "../lib/motion"
import { AnimatePresence, motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase
      .from("contact_form")
      .insert({
        full_name: form.fullName,
        email: form.email,
        company: form.company || null,
        message: form.message,
      });

    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      // ✅ Trigger success UI (button + message)
      setSuccess(true);
    }

    setLoading(false);
  };


  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
      setForm({
        fullName: "",
        email: "",
        company: "",
        message: "",
      });
    }, 3500);

    return () => clearTimeout(timer);
  }, [success]);


  
  const location = useLocation();

  /* --------------------------------
     Scroll to top when navigated
     via "Reach out"
  -------------------------------- */
  useEffect(() => {
    if (location.state?.scrollToTop) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        // Clear state so refresh/back doesn't re-trigger scroll
        window.history.replaceState({}, document.title);
      });
    }
  }, [location]);

  return (
    <main className="bg-warm-100 text-gray-900">
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-r from-emerald-800 via-emerald-700 via-emerald-600 via-emerald-700 to-emerald-800 text-gray-100 py-24 px-6 md:px-20">
        <motion.div
          {...pagesHeadingReveal}
          className="max-w-3xl"
        >
          <h1 
            className="text-4xl pt-8 md:text-5xl font-bold mb-4"
          >
            Contact Us
          </h1>
          <p className="text-lg text-gray-100">
            Have a question, enquiry, or looking to explore a partnership?
            Reach out to us and our team will get back to you promptly.
          </p>
        </motion.div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl grid md:grid-cols-2 gap-12">
          {/* FORM */}
          <form
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Contact form"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={form.fullName}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          Company / Organization
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Submit */}
      <motion.button
        whileTap={{ scale: success ? 1 : 0.97 }}
        disabled={loading || success}
        className={`
          bg-emerald-700 hover:bg-emerald-800
          disabled:opacity-60
          cursor-pointer
          text-white px-6 py-3 rounded-md
          font-medium transition-colors duration-300
          ${success ? "bg-emerald-600 cursor-default" : ""}
        `}
        type="submit"
      >
        {loading
          ? "Sending…"
          : success
          ? "Sent ✓"
          : "Send Message"}
      </motion.button>

      {/* Auto-dismiss success message */}
      <AnimatePresence>
        {success && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-emerald-600 mt-1"
          >
            Thanks! Your message has been sent.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}

    </form>


          {/* CONTACT DETAILS */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Get in touch
              </h3>
              <p className="text-gray-700">
                We work with buyers, sellers, refiners, and global partners
                across the agri-commodities value chain.
              </p>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@globalagrinexis.com"
                  className="text-emerald-600 link-emerald"
                  data-text="info@globalagrinexis.com"
                >
                  info@globalagrinexis.com
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                  <a
                    href="https://www.linkedin.com/company/global-agri-nexis/"
                    className="text-emerald-600 link-emerald"
                    data-text="global-agri-nexis"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    global-agri-nexis
                  </a>
                </p>
              <p>
                <strong>Phone:</strong> +91-7827901476
              </p>
              <p>
                <strong>Locations:</strong> India, UAE
              </p>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500">
                We aim to respond to all enquiries within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
