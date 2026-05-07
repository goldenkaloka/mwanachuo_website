import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-black mb-8 tracking-tighter">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/40 mb-8 italic">Last Updated: May 7, 2026</p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing or using MwanachuoShop, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Description of Service</h2>
            <p>
              MwanachuoShop is a marketplace platform designed for university students to buy, sell, and trade products and services. We provide the infrastructure for these transactions but are not directly involved in the actual transactions between buyers and sellers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for safeguarding your password.</li>
              <li>You agree not to disclose your password to any third party.</li>
              <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Marketplace Rules</h2>
            <p>
              Users are prohibited from listing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Illegal items or substances.</li>
              <li>Stolen goods.</li>
              <li>Counterfeit products.</li>
              <li>Items that violate intellectual property rights.</li>
              <li>Harmful or dangerous materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Limitation of Liability</h2>
            <p>
              In no event shall MwanachuoShop, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Tanzania, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at mwanachuoshop@gmail.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
