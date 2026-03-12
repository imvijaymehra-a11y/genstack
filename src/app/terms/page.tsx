import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | GenStacker - AI Tools Platform',
  description: 'GenStacker Terms of Service - Rules and guidelines for using our AI tools platform and services.',
  robots: 'index, follow',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing and using GenStacker ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms govern your use of our AI tools platform, website (www.genstacker.com), and all related services and features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Description of Service</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GenStacker is an AI-powered platform that provides 41 different tools for content creation, marketing, business productivity, and creative tasks. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>AI Writing Tools (blog generation, email writing, content creation)</li>
                <li>Creator Tools (YouTube scripts, social media content, video ideas)</li>
                <li>Business Productivity Tools (meeting notes, business plans, proposals)</li>
                <li>Marketing & SEO Tools (ad copy, meta descriptions, keyword research)</li>
                <li>Image Tools (AI image generation, prompts, thumbnails)</li>
                <li>AI Prompt Tools (ChatGPT, Midjourney, coding prompts)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Accounts</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Account Creation</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>You must provide accurate, complete, and current information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must be at least 13 years old to use our Service</li>
                <li>Each user may maintain only one free account</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Account Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>You are solely responsible for all activities under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to suspend or terminate accounts for violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Subscription Plans and Billing</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Free Plan</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>10 AI generations per day</li>
                <li>Access to all 41 tools</li>
                <li>No credit card required</li>
                <li>Basic support via email</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Pro Plan ($29/month)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Unlimited AI generations</li>
                <li>Access to all 41 tools</li>
                <li>Priority support</li>
                <li>Early access to new features</li>
                <li>Commercial usage rights</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Billing Terms</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Subscriptions are billed monthly in advance</li>
                <li>Payments are processed through secure third-party payment providers</li>
                <li>No refunds for partial months or unused portions</li>
                <li>Prices are subject to change with 30 days notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Acceptable Use</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Permitted Uses</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Creating content for personal, educational, or commercial purposes</li>
                <li>Using generated content in your projects and publications</li>
                <li>Modifying and adapting AI-generated content to your needs</li>
                <li>Sharing your experiences with our Service (with attribution)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Prohibited Uses</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Generating illegal, harmful, or malicious content</li>
                <li>Creating content that violates intellectual property rights</li>
                <li>Using the Service for spam, fraud, or deceptive practices</li>
                <li>Attempting to reverse engineer or circumvent our systems</li>
                <li>Sharing account credentials or reselling access</li>
                <li>Automated access or scraping without permission</li>
                <li>Creating content that is discriminatory, hateful, or violent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Our Rights</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GenStacker and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Generated Content</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You retain ownership of content you generate using our tools. However, you grant us a limited, non-exclusive license to use, analyze, and improve our services based on aggregated, anonymized usage data.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Generated content is provided "as is" and you are responsible for ensuring it complies with applicable laws and does not infringe on third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our Service, to understand our practices.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use industry-standard security measures to protect your information, but cannot guarantee absolute security of data transmission over the internet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Service Availability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We strive to maintain high availability but do not guarantee uninterrupted access to our Service. We may experience downtime for maintenance, updates, or technical issues.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service at any time without liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Disclaimers and Limitations</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our Service is provided "as is" without warranties of any kind. We disclaim all warranties, whether express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Accuracy or reliability of generated content</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property rights</li>
                <li>Security or uninterrupted operation</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                In no event shall we be liable for any indirect, incidental, special, or consequential damages arising from your use of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Indemnification</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You agree to indemnify and hold harmless GenStacker, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Your use of our Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another</li>
                <li>Content you generate or share using our Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason, including if you breach the Terms.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Upon termination, your right to use the Service ceases immediately. All provisions of the Terms which by their nature should survive termination shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the effective date of the changes.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which GenStacker operates, without regard to conflict of law provisions.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Any disputes arising from these Terms shall be resolved through binding arbitration in accordance with applicable arbitration rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> legal@genstacker.com<br />
                  <strong>Website:</strong> www.genstacker.com<br />
                  <strong>Response Time:</strong> We will respond to legal inquiries within 5 business days
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Severability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining Terms will remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Entire Agreement</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms constitute the entire agreement between you and GenStacker regarding your use of the Service and supersede all prior agreements between you and us.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
