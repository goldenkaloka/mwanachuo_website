import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-lg font-bold mb-3">
              <span className="text-primary">mwanachuo</span>shop
            </h3>
            <p className="text-sm text-secondary-foreground/70 mb-4">
              Your local marketplace for products and services, tailored to your area.
            </p>
            <div className="flex flex-col gap-2 text-xs text-secondary-foreground/60">
              <span className="flex items-center gap-2"><MapPin size={14} /> Dar es Salaam, Tanzania</span>
              <span className="flex items-center gap-2"><Phone size={14} /> +255 700 000 000</span>
              <span className="flex items-center gap-2"><Mail size={14} /> hello@mwanachuoshop.co.tz</span>
            </div>
          </div>

          {[
            { title: "Shop", links: ["Electronics", "Fashion", "Groceries", "Home & Garden"] },
            { title: "Services", links: ["Plumbing", "Electrician", "Delivery", "Repairs"] },
            { title: "Company", links: ["About Us", "Careers", "Contact", "Blog"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm mb-3">{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-secondary-foreground/60 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-secondary-foreground/10 mt-8 pt-6 text-center">
          <p className="text-xs text-secondary-foreground/40">
            © 2026 MwanachuoShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
