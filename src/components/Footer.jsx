import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from '../lib/supabase';
import logoWHITE from "/logo-white.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
        is_confirmed: consent,
        source: "footer",
      });

    if (error) {
      if (error.code === "23505") {
        setError("You're already subscribed!");
      } else {
        setError(error.message);
      }
    } else {
      // ✅ Trigger success UI
      setSuccess(true);
    }

    setLoading(false);
  };


  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
      setEmail("");
      setConsent(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [success]);



  return (
    <footer>
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 via-emerald-600 via-emerald-700 to-emerald-800 text-gray-100 py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:text-left">
        {/* Column 1 (tall) */}
        <div>
          <div className="font-bold mb-4 pb-4">
            <img
              src={logoWHITE}
              alt="Company logo"
              className="h-20 px-4 block mx-auto md:mx-0 w-auto"
              loading="eager"
              decoding="async"
            />
            <h4 className="pt-2 px-2 text-xl text-center md:text-left block mx-auto md:mx-0 w-auto">
              Global Agri Nexis
            </h4>
            <p className="pt-4 font-normal text-center md:text-left">
              <a 
                href="mailto:info@globalagrinexis.com"
                data-text="info@globalagrinexis.com"
                className="link-white"
              >
                info@globalagrinexis.com
              </a>
            </p>
          </div>

          <p className="font-bold">India</p>
          <p className="text-sm">D-59, Hauz Khas</p>
          <p className="text-sm mb-4">New Delhi, Delhi - 110016</p>

          <p className="font-bold">United Arab Emirates</p>
          <p className="text-sm">FDRK3423, Compass Building,</p>
          <p className="text-sm">
            Al Shohada Road, AL Hamra Industrial Zone-FZ,
          </p>
          <p className="text-sm">Ras Al Khaimah</p>
        </div>

        {/* Columns 2 + 3 wrapper */}
        <div className="relative md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Column 2 */}
            <div>
              <p className="font-bold mb-4">Quick Links</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    state={{ scrollToTop: true }}
                    className="link-white"
                  >
                    <span data-text="About Us">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="link-white">
                    <span data-text="Terms & Conditions">
                      Terms & Conditions
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="link-white">
                    <span data-text="Privacy Policy">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                   <br />
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/global-agri-nexis/"
                    data-text="LinkedIn"
                    className="link-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <p className="mt-2">
                    Questions?{" "}
                    <Link
                      to="/contact"
                      state={{ scrollToTop: true }}
                      id="reachout"
                      className="link-white"
                    >
                      <span data-text="Reach out">Reach out</span>
                    </Link>
                  </p>
                </li>
              </ul>
            </div>

            {/* Columns 3: Newsletter */}
            <div>
              <p className="font-bold mb-4">
                Sign up for our Newsletter
              </p>
              <p className="text-sm text-left pb-5">
                Our weekly perspective on the key drivers shaping agri-commodity markets globally.
              </p>
              
              
              <form
                aria-label="Newsletter signup"
                onSubmit={handleSubscribe}
                className="
                  flex flex-col
                  gap-4
                  w-full max-w-sm
                "
              >
                {/* Email field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm pt-4 font-medium text-gray-100">
                    Email <span className="opacity-70">*</span>
                  </label>

                  <input
                    aria-label="Email"
                    type="email"
                    placeholder="example@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full
                      border border-gray-200
                      px-3 py-2.5
                      rounded-md
                      bg-warm-50 text-black
                      focus:outline-none focus:ring-2 focus:ring-black/40
                    "
                  />
                </div>

                {/* Consent checkbox */}
                <label
                  className="
                    relative
                    flex items-start
                    gap-3 mt-1
                    text-sm text-gray-100
                    leading-snug
                  "
                >
                  {/* Checkbox wrapper ensures stable sizing on iPad */}
                  <span className="relative flex-shrink-0 h-5 w-5 mt-0.5">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="
                        peer
                        absolute inset-0
                        h-5 w-5
                        appearance-none
                        rounded-md
                        border border-gray-100
                        bg-transparent
                      "
                    />

                    {/* Custom checkmark */}
                    <span
                      className="
                        cursor-pointer
                        absolute inset-0
                        flex items-center justify-center
                        text-white
                        opacity-0
                        peer-checked:opacity-100
                        transition-opacity duration-150
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </span>

                  {/* Label text */}
                  <span>
                    Yes, subscribe me to your newsletter.
                    <span className="opacity-70"> *</span>
                  </span>
                </label>

                {/* Submit button */}
                <motion.button
                  whileTap={{ scale: success ? 1 : 0.95 }}
                  disabled={loading || success}
                  className={`
                    mt-1 cursor-pointer
                    px-4 py-2.5 rounded-md
                    text-sm font-medium
                    transition-colors duration-300
                    ${
                      success
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-black/85 hover:bg-black text-white"
                    }
                    ${loading ? "opacity-60" : ""}
                  `}
                  type="submit"
                >
                  {loading
                    ? "Subscribing…"
                    : success
                    ? "Subscribed ✓"
                    : "Subscribe"}
                </motion.button>

                {/* Auto-dismiss success message / Feedback */}
                <AnimatePresence>
                  {success && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-sm text-gray-100 mt-1"
                    >
                      Thanks for subscribing!
                    </motion.p>
                  )}
                </AnimatePresence>

                {error && (
                  <p className="text-sm text-red-500 mt-1">
                    {error}
                  </p>
                )}
              </form>
            </div>

            {/* centered underneath cols 2 + 3 */}
            <div className="hidden md:flex md:col-span-2 justify-center mt-10">
              <h1
                className="
                  text-gray-100
                  hidden
                  md:text-4xl
                  xl:text-5xl
                  font-medium
                  tracking-wide
                  select-none
                  pointer-events-none
                  leading-tight
                  text-center
                  whitespace-nowrap
                "
              >
                <span className="block lg:inline">
                  Sourcing quality,
                </span>
                <span className="block lg:inline lg:ml-2">
                  sustaining trust.
                </span>
              </h1>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-black text-white text-center py-3 text-xs">
        © {new Date().getFullYear()} Global Agri Nexis LLP. All rights reserved.
      </div>
    </footer>
  );
}
