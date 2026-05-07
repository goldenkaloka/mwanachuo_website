import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-black mb-8 tracking-tighter">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/40 mb-8 italic">Last Updated: May 7, 2026</p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
            <p>
              Welcome to MwanachuoShop ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application (collectively, the "Service").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you register on the Service, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address.</li>
              <li><strong>Academic Data:</strong> University affiliation, student ID information (for verification).</li>
              <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products and services you have purchased or sold through our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our Service for a variety of business purposes described below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To manage user accounts and provide customer support.</li>
              <li>To process transactions and send related information.</li>
              <li>To improve our Service and develop new products, services, features, and functionality.</li>
              <li>To comply with legal obligations and protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf.</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, or acquisition.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
              <p className="font-bold">MwanachuoShop Team</p>
              <p>Email: mwanachuoshop@gmail.com</p>
              <p>Address: Dar es Salaam, Tanzania</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
