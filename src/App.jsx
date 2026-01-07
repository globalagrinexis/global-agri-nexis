import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Underlay from "./components/Underlay";
import Services from "./components/Services";
import Products from "./components/Products";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import OrientationGuard from "./components/OrientationGuard";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

/* ---------------- Home Page ---------------- */
function Home() {
  return (
    <>
      <Hero />
      <Underlay />
      <Services />
      <Products />
      <Newsletter />
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
    </div>
  );
}
