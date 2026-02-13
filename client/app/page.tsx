'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Brain, 
  BarChart3, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Users,
  Star,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Extensive Question Bank',
    description: 'Access thousands of AMC-style multiple choice questions covering all exam categories with detailed explanations.',
  },
  {
    icon: Brain,
    title: 'Smart Learning',
    description: 'AI-powered recommendations focus on your weak areas for efficient study and maximum improvement.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track your progress with comprehensive performance reports and insights to optimize your study plan.',
  },
  {
    icon: Clock,
    title: 'Timed Practice Tests',
    description: 'Simulate real exam conditions with customizable timed test sessions to build confidence.',
  },
  {
    icon: CheckCircle2,
    title: 'Detailed Explanations',
    description: 'Every question includes comprehensive explanations and references to deepen your understanding.',
  },
  {
    icon: Users,
    title: 'Study Groups',
    description: 'Connect with peers and study together for better preparation and mutual support.',
  },
]

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'AMC Graduate',
    content: 'This platform was instrumental in my AMC MCQ success. The question bank is comprehensive and the analytics helped me identify my weak areas.',
    rating: 5,
  },
  {
    name: 'Dr. James Wilson',
    role: 'Medical Resident',
    content: 'The timed practice tests really helped me manage my exam anxiety. I felt well-prepared on test day thanks to this platform.',
    rating: 5,
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'AMC Candidate',
    content: 'The detailed explanations after each question helped me understand concepts I had been struggling with for months.',
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with basic features',
    features: [
      '100 practice questions',
      'Basic analytics',
      'Limited bookmarks',
      'Community access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    description: 'Everything you need to pass',
    features: [
      'Unlimited questions',
      'Advanced analytics',
      'Unlimited bookmarks',
      'Priority support',
      'Study groups',
      'Mock exams',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Premium',
    price: 49,
    description: 'For serious candidates',
    features: [
      'Everything in Pro',
      '1-on-1 tutoring',
      'Custom study plans',
      'Exam strategy sessions',
      'Performance reviews',
      'Lifetime updates',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-medical-50/30">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">AMC Prep</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-slate-600 hover:text-slate-900 hidden sm:block">
                Sign In
              </Link>
              <Link href="/register">
                <Button className="bg-medical-600 hover:bg-medical-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-100 text-medical-700 text-sm font-medium mb-8 animate-pulse">
            <Sparkles className="w-4 h-4" />
            Trusted by 10,000+ Medical Students
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Master Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-teal-500">
              AMC MCQ Exam
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Comprehensive question bank, realistic practice tests, and detailed analytics 
            to help you ace the Australian Medical Council examination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-medical-600 hover:bg-medical-700 text-lg px-8 shadow-lg shadow-medical-500/25">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">10,000+ Students</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5,000+', label: 'Practice Questions' },
              { value: '50+', label: 'Categories' },
              { value: '10,000+', label: 'Active Students' },
              { value: '95%', label: 'Pass Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-medical-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform provides comprehensive tools and resources designed specifically 
              for AMC MCQ exam preparation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-medical-200 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-medical-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of successful medical professionals who achieved their AMC goals with us.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to our core features.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative rounded-2xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-medical-600 to-medical-700 text-white shadow-xl shadow-medical-500/25 scale-105' 
                    : 'bg-white border border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={plan.popular ? 'text-white/80' : 'text-slate-500'}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-medical-600'}`} />
                      <span className={plan.popular ? 'text-white/90' : 'text-slate-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.price === 0 ? '/register' : '/register'}>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-white text-medical-600 hover:bg-slate-100' 
                        : 'bg-medical-600 text-white hover:bg-medical-700'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-medical-600 to-teal-500 rounded-3xl p-12 text-center text-white shadow-2xl shadow-medical-500/25">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Preparation?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of medical students who have achieved their AMC goals with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-medical-600 hover:bg-slate-100 text-lg px-8">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-medical-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AMC Prep</span>
              </div>
              <p className="text-sm text-slate-400">
                Comprehensive preparation platform for the Australian Medical Council MCQ examination.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/question-bank" className="hover:text-white transition-colors">Question Bank</Link></li>
                <li><Link href="/test" className="hover:text-white transition-colors">Practice Tests</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Study Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Exam Tips</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} AMC Prep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
