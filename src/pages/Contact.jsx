import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
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
      <section className="bg-emerald-700 text-gray-100 py-24 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl pt-8 md:text-5xl font-bold mb-4">
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
            className="space-y-6"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company / Organization
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full rounded-md border border-gray-300 px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-md
                font-medium hover:bg-emerald-700 transition"
              type="submit"
            >
              Send Message
            </motion.button>
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
                  href="mailto:info@gan.com"
                  className="text-emerald-600 hover:underline"
                >
                  info@gan.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong> +91-XXXXXXXXXX
              </p>
              <p>
                <strong>Location:</strong> India
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
