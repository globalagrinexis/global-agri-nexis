import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer>
      <div className="bg-emerald-800 text-gray-100 py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <div className="font-bold mb-2">LOGO</div>
          <p className="text-sm">123 Business Street</p>
          <p className="text-sm">ABC City</p>
          <p className="text-sm">Country</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mt-2">
            Questions?{" "}
            <Link to="/contact" id="reachout" className="link-highlight link-highlight--light">
              Reach out
            </Link>
          </p>
          <a href="#" className="underline">LinkedIn</a>
        </div>


      </div>
      <div className="bg-black text-white text-center py-3 text-xs">© {new Date().getFullYear()} Global Agri Nexis LLP. All rights reserved.</div>
    </footer>
  );
}