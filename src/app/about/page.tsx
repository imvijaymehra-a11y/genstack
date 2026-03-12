'use client';

import Link from 'next/link';
import { CheckCircle, Users, Zap, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning-quick AI responses with 99.9% uptime'
    },
    {
      icon: Users,
      title: 'User-Focused',
      description: 'Built for creators, marketers, and innovators'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Trusted by 500K+ users worldwide'
    }
  ];

  const team = [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      bio: 'Former AI researcher with passion for democratizing technology'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Product',
      bio: 'UX expert with 10+ years in SaaS product development'
    },
    {
      name: 'Michael Johnson',
      role: 'Lead Engineer',
      bio: 'Full-stack developer passionate about AI and scalability'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <section className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            About GenStacker
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to empower creators and entrepreneurs with cutting-edge AI tools that are simple, fast, and incredibly powerful.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-24 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
            GenStacker was founded in 2023 with a simple vision: make AI-powered content creation accessible to everyone. We noticed that amazing AI technologies existed, but they were scattered across dozens of platforms and difficult to use for non-technical people.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Today, GenStacker brings together 41 powerful AI tools in one intuitive platform. From blog writing to video scripts, social media captions to SEO optimization—everything you need to create outstanding content is right here.
          </p>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                      <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <div className="w-20 h-20 bg-indigo-200 dark:bg-indigo-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-12 text-white text-center mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-extrabold mb-2">500K+</div>
              <p className="text-indigo-200">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">41</div>
              <p className="text-indigo-200">AI Tools</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2">10M+</div>
              <p className="text-indigo-200">Generations/Month</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Join Thousands of Creative Professionals
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Start creating amazing content with GenStacker today. No credit card required.
          </p>
          <Link 
            href="/auth/signup"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            Sign Up Free
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}
