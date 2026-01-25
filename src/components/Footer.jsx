import { Link } from "react-router-dom";
import logoWHITE from "/logo-white.svg";
import { motion } from "framer-motion";

export default function Footer({ compact = false }) {
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
              <p className="text-sm pb-5">
                Our weekly perspective on the key drivers shaping agri-commodity markets globally.
              </p>
              <p className="text-sm pb-2">
                <span className="font-medium">Email</span> *
              </p>
              <form
                aria-label="Newsletter signup"
                className={`
                  flex flex-col gap-2
                  w-full max-w-sm

                  xl:flex-row xl:items-center
                  xl:absolute

                  ${compact ? "" : "xl:justify-center"}
                `}
              >
                <input
                  aria-label="Email"
                  type="email"
                  placeholder="example@company.com"
                  required
                  className="
                    w-full
                    border px-3 py-2 rounded
                    bg-warm-50 text-black
                  "
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="
                    w-full xl:w-auto
                    bg-black/85 hover:bg-black
                    cursor-pointer
                    text-white px-4 py-2 rounded
                  "
                >
                  Subscribe
                </motion.button>
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
