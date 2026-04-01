export const metadata = {
  title: "Privacy Policy | BuildTheBaby",
  description: "Privacy policy for BuildTheBaby.com",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 31, 2026</p>

      <section className="space-y-6 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
          <p>
            Welcome to BuildTheBaby.com ("we," "our," or "us"). We are committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and safeguard information when
            you visit our website at https://buildthebaby.com.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, browser type, and referring URLs (collected automatically via analytics tools).</li>
            <li><strong>Cookies:</strong> Small files stored on your device to improve your browsing experience.</li>
            <li><strong>Contact Information:</strong> If you contact us directly, we may collect your name and email address.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To operate and improve the website</li>
            <li>To understand how visitors use our site</li>
            <li>To respond to inquiries or support requests</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Affiliate Disclosure</h2>
          <p>
            BuildTheBaby.com participates in the Amazon Services LLC Associates Program, an affiliate
            advertising program designed to provide a means for sites to earn advertising fees by
            advertising and linking to Amazon.com. When you click a product link and make a purchase,
            we may earn a small commission at no extra cost to you.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Third-Party Services</h2>
          <p>
            We may use third-party services such as analytics providers (e.g., Google Analytics) and
            advertising networks. These services may collect information about your visits to our site
            and other websites. Their use of your data is governed by their own privacy policies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Cookies</h2>
          <p>
            You can choose to disable cookies through your browser settings. Note that disabling
            cookies may affect some functionality of the site.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Children's Privacy</h2>
          <p>
            Our website is not directed at children under the age of 13. We do not knowingly collect
            personal information from children. If you believe we have inadvertently collected such
            information, please contact us immediately.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">8. Data Security</h2>
          <p>
            We take reasonable measures to protect your information. However, no method of
            transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated date. Continued use of the site after changes constitutes acceptance of
            the updated policy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:support@buildthebaby.com" className="text-blue-600 hover:underline">
              support@buildthebaby.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
