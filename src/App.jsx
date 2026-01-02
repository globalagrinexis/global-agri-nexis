import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Underlay from "./components/Underlay";
import Services from "./components/Services";
import Products from "./components/Products";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="bg-warm-100 min-h-screen"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Animated Routes ---------------- */
function AnimatedRoutes() {
  const location = useLocation();

  /**
   * GitHub Pages refresh fix
   * Converts:
   *   /?//about  →  /about
   */
  if (location.search.startsWith("?/")) {
    const newPath = location.search.slice(1);
    window.history.replaceState(null, "", newPath);
  }

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
      <Header />
      <AnimatedRoutes />
      <Footer />
    </div>
  );
}
