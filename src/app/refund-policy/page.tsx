import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CreditCard, Clock, Shield, Mail, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy | GenStacker - AI Tools Platform',
  description: 'GenStacker Refund Policy - 14-day money-back guarantee for Pro plan subscriptions. Fair and transparent refund process.',
  robots: 'index, follow',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Refund Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">14-Day Money-Back Guarantee</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We're confident you'll love GenStacker. That's why we offer a <strong>14-day money-back guarantee</strong> on all new Pro plan subscriptions. If you're not completely satisfied with our AI tools platform, you can request a full refund within 14 days of your initial purchase.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="font-semibold text-green-900 dark:text-green-100">No questions asked</span>
                </div>
                <p className="text-green-800 dark:text-green-200">
                  We believe in our product and want you to try it risk-free. No complicated forms or lengthy approval processes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Eligibility Requirements</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">What's Eligible for Refund:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>New Pro plan subscriptions (first-time customers only)</li>
                <li>Requests made within 14 days of the initial purchase</li>
                <li>Annual and monthly Pro plan subscriptions</li>
                <li>Unused portion of subscription services</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">What's Not Eligible:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Free plan subscriptions (no payment required)</li>
                <li>Requests after the 14-day guarantee period</li>
                <li>Renewals of existing subscriptions</li>
                <li>Enterprise or custom plans</li>
                <li>Requests from resellers or third-party purchases</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How to Request a Refund</h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Simple 3-Step Process:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Contact Support</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Email us at <span className="font-mono">refunds@genstacker.com</span> with your account email and subscription details
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Brief Feedback (Optional)</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Let us know why you're requesting a refund. This helps us improve our service (optional but appreciated)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Receive Refund</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        We process refunds within 5-7 business days. The amount will be credited back to your original payment method
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Refund Processing</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Timeline</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Request Review:</strong> Within 24 hours of submission</li>
                <li><strong>Approval:</strong> Within 48 hours (most requests are approved immediately)</li>
                <li><strong>Processing:</strong> 3-5 business days to your payment provider</li>
                <li><strong>Appearance:</strong> 5-7 business days total from request date</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Payment Methods</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Refunds are issued to the original payment method used for purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Credit Cards:</strong> Credited back to your card (3-5 business days)</li>
                <li><strong>PayPal:</strong> Returned to your PayPal account (1-2 business days)</li>
                <li><strong>Bank Transfer:</strong> Returned to your bank account (5-7 business days)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Account Access After Refund</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Upon refund approval, your Pro plan subscription will be immediately cancelled and your account will be downgraded to the free plan. You'll retain access to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Your account and all saved data</li>
                <li>10 free AI generations per day</li>
                <li>Access to all 41 tools (with daily limits)</li>
                <li>Basic email support</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Any content generated during your Pro period remains accessible in your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Special Circumstances</h2>
              
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">Technical Issues</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you experience technical problems that prevent you from using our service, please contact our technical support team first. We'll work to resolve the issue, and if we can't, we'll provide a full refund regardless of the 14-day period.
              </p>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Service Downtime</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If our service experiences extended downtime (more than 24 consecutive hours), affected users may request prorated refunds for the downtime period, regardless of when they subscribed.
              </p>

              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">Billing Errors</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you're accidentally charged due to a billing error on our part, we'll immediately issue a full refund and may offer additional compensation for the inconvenience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Exceptions and Limitations</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>One refund per customer per 12-month period</li>
                <li>Refunds only available for first-time Pro subscriptions</li>
                <li>We reserve the right to deny refund requests in cases of abuse or fraud</li>
                <li>Refunds cannot be processed for subscriptions purchased through third-party app stores</li>
                <li>Partial refunds are not available for unused portions of monthly subscriptions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For refund requests or questions about our refund policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-4">
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">Refunds Department</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> refunds@genstacker.com<br />
                  <strong>Response Time:</strong> Within 24 hours<br />
                  <strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Policy Changes</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this refund policy from time to time. Any changes will be posted on this page with an updated revision date. Changes to the policy will not affect refund requests made before the change takes effect.
              </p>
            </section>

            <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Our Commitment</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                We stand behind our AI tools platform and are committed to your satisfaction. Our refund policy is designed to be fair, transparent, and customer-friendly. We believe that if you're not happy with our service, you shouldn't have to pay for it.
              </p>
              <div className="mt-4 pt-4 border-t border-primary/20">
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "Your success is our success. We're here to help you create amazing content with AI, and we're confident you'll love the GenStacker experience."
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  — The GenStacker Team
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
