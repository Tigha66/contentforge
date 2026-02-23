import Link from 'next/link'
import { Zap, Twitter, Linkedin, Instagram, MessageSquare, Hash, Calendar, BarChart3, Check, ArrowRight, Star, Users, Sparkles } from 'lucide-react'

export default function Home() {
  const features = [
    { icon: <MessageSquare className="w-6 h-6" />, title: 'AI Content Generation', desc: 'Generate viral tweets, threads, and posts instantly' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Content Calendar', desc: 'Plan and schedule your content for the week' },
    { icon: <Hash className="w-6 h-6" />, title: 'Hashtag Suggestions', desc: 'Get trending hashtags for maximum reach' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Analytics Dashboard', desc: 'Track engagement and growth metrics' },
  ]

  const platforms = [
    { name: 'Twitter', icon: <Twitter className="w-8 h-8" />, color: 'text-blue-400' },
    { name: 'LinkedIn', icon: <Linkedin className="w-8 h-8" />, color: 'text-blue-600' },
    { name: 'Instagram', icon: <Instagram className="w-8 h-8" />, color: 'text-pink-500' },
  ]

  const testimonials = [
    { name: 'Sarah M.', role: 'Content Creator', text: 'Generated 50+ tweets in minutes. My engagement up 300%!' },
    { name: 'John D.', role: 'Marketing Pro', text: 'Best AI content tool I\'ve used. Worth every penny.' },
    { name: 'Mike R.', role: 'Founder', text: 'Saved 10 hours/week on content creation. Game changer!' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ContentForge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition">Features</Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</Link>
            <Link href="#testimonials" className="text-slate-300 hover:text-white transition">Testimonials</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-slate-300 hover:text-white transition">Sign In</Link>
            <Link href="/signup" className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white px-5 py-2 rounded-full font-medium transition">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-slate-300">AI-Powered Content Generator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Create Viral Content in{' '}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Seconds</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Generate engaging tweets, LinkedIn posts, and Instagram captions with AI. 
            Save 10+ hours every week. Perfect for creators, marketers, and businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition flex items-center justify-center gap-2">
              Start Generating Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#features" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition border border-slate-700">
              See Features
            </Link>
          </div>
          <p className="text-slate-500 mt-4 text-sm">No credit card required • 5 free generations</p>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-12 px-6 border-y border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 mb-6">Works with your favorite platforms</p>
          <div className="flex justify-center gap-12">
            {platforms.map((platform, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={platform.color}>{platform.icon}</div>
                <span className="text-slate-400 text-sm">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-slate-400">Powerful features to supercharge your content creation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-600/20 rounded-xl flex items-center justify-center text-orange-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-slate-400">Start free, upgrade when you're ready</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-white mb-4">$0<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300"><Check className="w-5 h-5 text-green-400" /> 5 generations/day</li>
                <li className="flex items-center gap-2 text-slate-300"><Check className="w-5 h-5 text-green-400" /> Basic templates</li>
                <li className="flex items-center gap-2 text-slate-300"><Check className="w-5 h-5 text-green-400" /> Twitter support</li>
              </ul>
              <Link href="/signup" className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition text-center block">Get Started</Link>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-pink-600 border border-transparent rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-4">$19<span className="text-lg font-normal text-white/70">/mo</span></div>
              <ul className="space-y-3 mb-8 text-white/90">
                <li className="flex items-center gap-2"><Check className="w-5 h-5" /> Unlimited generations</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" /> All platforms</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" /> Content calendar</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" /> Analytics</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" /> Priority support</li>
              </ul>
              <Link href="/pricing" className="w-full bg-white text-orange-600 hover:bg-gray-100 py-3 rounded-xl font-medium transition text-center block">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Loved by Creators</h2>
            <p className="text-slate-400">Join thousands of happy users</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-300 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to create viral content?</h2>
          <p className="text-slate-400 mb-8 text-lg">Join 10,000+ creators generating content faster</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg transition">
            <Zap className="w-5 h-5" /> Start Generating Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold">ContentForge</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 ContentForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
