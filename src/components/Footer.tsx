import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-midnight text-white mt-24 border-t border-white/5">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-2xl font-black mb-6 tracking-tighter">
              <span className="text-white">mwanachuo</span><span className="text-white/20">shop</span>
            </h3>
            <p className="text-sm text-white/40 mb-8 leading-relaxed max-w-xs">
              Elevation of student commerce across Tanzania. Premium products, local services, community-driven.
            </p>
            <div className="flex flex-col gap-3 text-xs text-white/60">
              <span className="flex items-center gap-3"><MapPin size={14} className="text-white/80" /> Dar es Salaam, Tanzania</span>
              <span className="flex items-center gap-3"><Phone size={14} className="text-white/80" /> +255 700 000 000</span>
              <span className="flex items-center gap-3"><Mail size={14} className="text-white/80" /> hello@mwanachuoshop.co.tz</span>
            </div>
          </div>

          {[
            { title: "Shop", links: ["Electronics", "Fashion", "Groceries", "Home & Garden"] },
            { title: "Services", links: ["Plumbing", "Electrician", "Delivery", "Repairs"] },
            { title: "Company", links: ["About Us", "Careers", "Contact", "Blog"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-black text-[10px] mb-6 uppercase tracking-[0.2em] text-white/30">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-white/50 hover:text-white transition-all hover:translate-x-1 inline-block font-medium">
                      {link}
                    </a>
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
