import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Header from "./components/Header";
import Hero from "./components/hero/Hero";
import Underlay from "./components/Underlay";
import Services from "./components/services/Services";
import Products from "./components/products/Products";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import OrientationGuard from "./components/ui/OrientationGuard";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

/* ---------------- Home Page ---------------- */
function Home() {
  return (
    <>
      <Hero />
      <Underlay />
      <section id="services">
        <Services />
      </section>
      <section id="products">
        <Products />
      </section>
    </>
  );
}

/* ---------------- Page Animation Wrapper ---------------- */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0.6, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.6, y: -6 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-warm-100 min-h-screen"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Animated Routes ---------------- */
function AnimatedRoutes() {
  const location = useLocation();
  const isFirstLoad = useRef(true);

  if (location.search.startsWith("?/")) {
    const newPath = location.search.slice(1);
    window.history.replaceState(null, "", newPath);
  }

  useEffect(() => {
    if (!location.state?.scrollToTop) return;

    if (isFirstLoad.current) {
      window.scrollTo({ top: 0 });
      isFirstLoad.current = false;
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    if (!location.hash) return;

    // Only handle hash scrolling on the home page
    if (location.pathname !== "/") return;

    const id = location.hash.slice(1);

    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500); // wait for Framer Motion + DOM paint

    return () => clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <AboutUs />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* ---------------- App Root ---------------- */
export default function App() {
  return (
    <div className="bg-warm-100 min-h-screen">
      <OrientationGuard />
      <Header />
      <AnimatedRoutes />
      <Footer />

      {/* Scroll-to-top button (mobile only) */}
      <ScrollToTopButton />
    </div>
  );
}
