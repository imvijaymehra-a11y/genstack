import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | GenStacker - AI Tools Platform',
  description: 'GenStacker Privacy Policy - How we collect, use, and protect your personal information when using our AI tools platform.',
  robots: 'index, follow',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At GenStacker, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website genstacker.com and use our AI tools platform.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By using GenStacker, you consent to the data practices described in this policy. If you do not agree with the terms of this privacy policy, please do not access or use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Email address and password for account creation</li>
                <li>Name and contact information provided during registration</li>
                <li>Payment information (processed securely by third-party payment providers)</li>
                <li>Profile information and preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>AI tools usage patterns and frequency</li>
                <li>Generated content and prompts (processed securely and temporarily)</li>
                <li>Session duration and interaction data</li>
                <li>Feature usage statistics</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>IP address and geolocation data</li>
                <li>Browser type, operating system, and device information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Referral sources and navigation patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Service Provision:</strong> To provide and maintain our AI tools platform</li>
                <li><strong>Account Management:</strong> To create and manage your user account</li>
                <li><strong>Personalization:</strong> To customize your experience and improve our services</li>
                <li><strong>Communication:</strong> To send you important updates, support responses, and marketing communications (with consent)</li>
                <li><strong>Analytics:</strong> To analyze usage patterns and improve our platform</li>
                <li><strong>Security:</strong> To protect against fraud, abuse, and security threats</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Sharing and Disclosure</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Service Providers</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We share information with trusted third-party service providers who assist us in operating our platform, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Supabase (database and authentication services)</li>
                <li>OpenAI (AI model processing for content generation)</li>
                <li>Payment processors (Stripe, PayPal for subscription management)</li>
                <li>Email service providers (for transactional emails)</li>
                <li>Analytics providers (for website optimization)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Legal Requirements</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may disclose your information if required by law or in good faith belief that such action is necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Comply with legal obligations</li>
                <li>Protect and defend our rights and property</li>
                <li>Prevent or investigate possible wrongdoing</li>
                <li>Protect user personal safety</li>
                <li>Protect against legal liability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure authentication and session management</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure data storage and backup systems</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Generated content may be temporarily stored for processing purposes but is not permanently retained unless explicitly saved by you. Account deletion results in the removal of personal information within 30 days, except where required for legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Restriction:</strong> Request restriction of processing your information</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@genstacker.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Essential cookies are required for basic website functionality. Non-essential cookies may be disabled without affecting core services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">International Data Transfers</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GenStacker is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You are advised to review this Privacy Policy periodically for any changes. Changes become effective when posted on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> privacy@genstacker.com<br />
                  <strong>Website:</strong> www.genstacker.com<br />
                  <strong>Response Time:</strong> We will respond to your inquiry within 30 days
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
