import SpinningGlobe from "../components/SpinningGlobe";
import { useThemeStore } from "../store/themeStore";

export default function Home() {
  const dark = useThemeStore((state) => state.dark);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans overflow-x-hidden">
        {/* Hero Section */}
        <section className="px-6 md:px-8 py-20 overflow-hidden bg-gradient-to-r from-[#e0e7ff] to-[#c7d2fe] dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                Secure & Transparent <br />
                Escrow Payments
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                A decentralized platform ensuring trusted transactions between
                payers and payees.
              </p>
              <div className="space-x-4">
                <a
                  href="/escrow"
                  className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-lg shadow hover:bg-gray-100 transition dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="px-6 py-3 border border-indigo-500 text-indigo-500 font-bold rounded-lg hover:bg-white hover:text-indigo-700 transition dark:border-gray-300 dark:hover:bg-gray-100 dark:hover:text-gray-900"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center rounded-full">
              <SpinningGlobe />
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="px-8 py-20 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100">
              Why Choose Our Escrow?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Secure Transactions"
                description="All funds are held securely until the transaction is complete and approved."
                icon="🔒"
              />
              <FeatureCard
                title="Dispute Resolution"
                description="Raise a conflict if things go wrong. Admins can release or refund based on evidence."
                icon="⚖️"
              />
              <FeatureCard
                title="Decentralized Trust"
                description="No third-party needed. Transparent smart contract logic ensures fairness."
                icon="🧠"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 py-20 bg-indigo-700 dark:bg-indigo-900 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start a secure deal?
          </h2>
          <p className="text-lg mb-6">
            Join hundreds of users securing their payments the smart way.
          </p>
          <a
            href="/escrow"
            className="px-8 py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition"
          >
            Launch Escrow App
          </a>
        </section>

        <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} EscrowChain. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
