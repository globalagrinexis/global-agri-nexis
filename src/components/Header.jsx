import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const heroRef = useRef(null);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  /* -------------------------------
     IntersectionObserver (HOME ONLY)
  -------------------------------- */
  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0.9 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [isHome]);

  /* -------------------------------
     Home navigation helpers
  -------------------------------- */
  const goHome = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleHomeScroll = (id) => {
    if (!isHome) {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* -------------------------------
     Styles
  -------------------------------- */
  const navLinkClass =
    solid || !isHome
      ? "text-gray-600 hover:text-emerald-600"
      : "text-gray-300 hover:text-emerald-600";

  const logoClass =
    solid || !isHome ? "text-gray-600" : "text-white";

  return (
    <>
      {/* Hero observer trigger */}
      {isHome && (
        <div
          ref={heroRef}
          className="absolute top-0 h-screen w-full pointer-events-none"
        />
      )}

      {/* HEADER */}
      <header
        className={`fixed top-0 w-full transition-colors duration-300
          ${solid || !isHome ? "bg-warm-100 shadow" : "bg-transparent"}
          ${menuOpen ? "pointer-events-none" : "z-50"}
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO → HOME */}
          <button
            onClick={goHome}
            className={`font-bold tracking-wide transition-colors ${logoClass}`}
            aria-label="Go to home page"
          >
            LOGO
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/about" className={navLinkClass}>
              About Us
            </Link>

            <button
              onClick={() => handleHomeScroll("services")}
              className={navLinkClass}
            >
              Services
            </button>

            <button
              onClick={() => handleHomeScroll("products")}
              className={navLinkClass}
            >
              Products
            </button>

            <Link to="/contact" className={navLinkClass}>
              Contact Us
            </Link>
          </nav>

          {/* Hamburger */}
          {!menuOpen && (
            <button
              aria-label="Open menu"
              className={`md:hidden text-2xl transition-colors ${
                solid || !isHome ? "text-gray-600" : "text-white"
              }`}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          )}
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] bg-warm-100 md:hidden transition-opacity duration-300
          ${menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Close */}
        <button
          aria-label="Close menu"
          className="absolute top-6 right-6 text-4xl text-gray-600"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        {/* Mobile nav */}
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
          {/* HOME */}
          <button
            onClick={() => {
              goHome();
              setMenuOpen(false);
            }}
          >
            Home
          </button>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>

          <button
            onClick={() => {
              handleHomeScroll("services");
              setMenuOpen(false);
            }}
          >
            Services
          </button>

          <button
            onClick={() => {
              handleHomeScroll("products");
              setMenuOpen(false);
            }}
          >
            Products
          </button>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
}
