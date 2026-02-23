'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Loader2 } from 'lucide-react'

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string) => {
    setLoading(priceId)
    
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      
      const { url, error } = await res.json()
      
      if (error) {
        console.error('Checkout error:', error)
        setLoading(null)
        return
      }
      
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      console.error('Error:', err)
      setLoading(null)
    }
  }

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/mo',
      description: 'Perfect for trying things out',
      features: [
        '5 generations/day',
        'Basic templates',
        'Twitter support',
        'Community support',
      ],
      cta: 'Get Started',
      priceId: null,
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/mo',
      description: 'For serious creators',
      features: [
        'Unlimited generations',
        'All platforms (Twitter, LinkedIn, Instagram)',
        'Content calendar',
        'Analytics dashboard',
        'Priority support',
        'Custom templates',
      ],
      cta: 'Start Free Trial',
      priceId: 'price_pro_monthly',
      highlight: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold text-white">ContentForge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition">Features</Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Pricing */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-slate-400 text-lg">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-orange-600 to-pink-600 border-2 border-transparent'
                  : 'bg-slate-800/50 border border-slate-700'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/70 ml-1">{plan.period}</span>
              </div>
              <p className="text-white/70 text-sm mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-white/90">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => plan.priceId && handleSubscribe(plan.priceId)}
                disabled={loading !== null}
                className={`w-full py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                  plan.highmark
                    ? 'bg-white text-orange-600 hover:bg-gray-100'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                } disabled:opacity-50`}
              >
                {loading === plan.priceId ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  plan.cta
                )}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 mt-8">
          Secure payments powered by Stripe. Cancel anytime.
        </p>
      </main>
    </div>
  )
}
