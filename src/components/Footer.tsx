import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-midnight text-white mt-24 border-t border-white/5">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-2xl font-black mb-6 tracking-tighter inline-block">
              <span className="text-white">mwanachuo</span><span className="text-white/20">shop</span>
            </Link>
            <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-xs">
              Elevation of student commerce across Tanzania. Premium products, local services, community-driven.
            </p>
            <div className="flex flex-col gap-3 text-xs text-white/60">
              <span className="flex items-center gap-3"><MapPin size={14} className="text-white/80" /> Dar es Salaam, Tanzania</span>
              <span className="flex items-center gap-3"><Phone size={14} className="text-white/80" /> +255 616 622 485</span>
              <span className="flex items-center gap-3"><Mail size={14} className="text-white/80" /> mwanachuoshop@gmail.com</span>
            </div>
          </div>

          {[
            { title: "Shop", links: [{ name: "Electronics", href: "/products?category=Electronics" }, { name: "Fashion", href: "/products?category=Fashion" }, { name: "Groceries", href: "/products?category=Groceries" }, { name: "Home & Garden", href: "/products?category=Home" }] },
            { title: "Services", links: [{ name: "Tutoring", href: "/services?category=Academic" }, { name: "Technical", href: "/services?category=Technical" }, { name: "Delivery", href: "/services?category=Transport" }, { name: "Repairs", href: "/services?category=Technical" }] },
            { title: "Company", links: [{ name: "About Us", href: "/" }, { name: "Contact", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }, { name: "Terms of Service", href: "/terms-of-service" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-black text-[10px] mb-6 uppercase tracking-[0.2em] text-white/30">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-xs text-white/50 hover:text-white transition-all hover:translate-x-1 inline-block font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-xs text-white/40 font-medium">
            © 2026 MwanachuoShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
