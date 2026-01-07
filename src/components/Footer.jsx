import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="bg-emerald-800 text-gray-100 py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <div className="font-bold mb-4">LOGO</div>
          <p className="text-sm font-bold">India</p>
          <p className="text-sm">D-59, Hauz Khas</p>
          <p className="text-sm mb-4">New Delhi, Delhi - 110016</p>
          <p className="text-sm font-bold">United Arab Emirates</p>
          <p className="text-sm">405, Compass Building, </p>
          <p className="text-sm">Al Shohada Road, 309049</p>
          <p className="text-sm">Al Hamra Industrial Zone-FZ, Ras Al Khaimah</p>
        </div>
        <div>
          <p className="font-bold mb-4">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="link-white">
                <span data-text="About Us">About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="link-white">
                <span data-text="Terms & Conditions">Terms & Conditions</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="link-white">
                <span data-text="Privacy Policy">Privacy Policy</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mt-2">
            Questions?{" "}
            <Link to="/contact" id="reachout" className="link-white">
              <span data-text="Reach out">Reach out</span>    
            </Link>
          </p>
          <a href="#" data-text="LinkedIn" className="link-white">LinkedIn</a>
        </div>


      </div>
      <div className="bg-black text-white text-center py-3 text-xs">© {new Date().getFullYear()} Global Agri Nexis LLP. All rights reserved.</div>
    </footer>
  );
}