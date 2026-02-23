'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Twitter, Linkedin, Instagram, Copy, Check, RefreshCw, Sparkles, LogOut, User } from 'lucide-react'
import { useAuth } from '../auth-context'

const tones = ['Casual', 'Professional', 'Funny', 'Inspirational', 'Controversial']

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [contentType, setContentType] = useState('tweet')
  const [tone, setTone] = useState('Casual')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)
  const [generationsLeft, setGenerationsLeft] = useState(5)

  useEffect(() => {
    if (!user) {
      router.push('/signin')
    } else {
      setGenerationsLeft(user.generationsLeft)
    }
  }, [user, router])

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  const generatedContent = [
    "🚀 5 ways to 10x your productivity as a creator:\n\n1. Batch your content creation\n2. Use AI to help ideation\n3. Repurpose content across platforms\n4. Build in public\n5. Focus on ONE thing\n\nWhich one resonates most? 👇",
    "Hot take: Most creators fail because they overthink.\n\nJust start. Ship. Iterate.\n\nPerfection is the enemy of progress.\n\nWhat's your biggest blocker?",
    "Just shipped a new feature.\n\nTook 2 hours.\n\nWould have taken 2 weeks a year ago.\n\nAI changed everything.\n\nWhat's your productivity hack?",
  ]

  const handleGenerate = async () => {
    if (!prompt.trim() || generationsLeft <= 0) return
    setGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGenerated(generatedContent)
    setGenerating(false)
    setGenerationsLeft(prev => prev - 1)
  }

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ContentForge</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <User className="w-4 h-4" />
              <span>{user.name}</span>
              <span className="text-orange-400">({user.plan})</span>
            </div>
            <button 
              onClick={handleSignOut}
              className="text-slate-400 hover:text-white transition flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" /> AI Content Generator
              </h2>
              
              {/* Content Type */}
              <div className="mb-4">
                <label className="block text-slate-400 text-sm mb-2">Content Type</label>
                <div className="flex flex-wrap gap-2">
                  {['Tweet', 'Thread', 'LinkedIn', 'Instagram'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setContentType(type.toLowerCase())}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                        contentType === type.toLowerCase() 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div className="mb-4">
                <label className="block text-slate-400 text-sm mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-white"
                >
                  {tones.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Prompt */}
              <div className="mb-4">
                <label className="block text-slate-400 text-sm mb-2">What do you want to create?</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create a viral tweet about productivity tips for creators..."
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none transition resize-none"
                  rows={3}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim() || generationsLeft <= 0}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content ({generationsLeft} left)
                  </>
                )}
              </button>
            </div>

            {/* Generated Content */}
            {generated.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Generated Content</h3>
                {generated.map((content, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-orange-400 text-sm">Option {i + 1}</span>
                      <button
                        onClick={() => handleCopy(i, content)}
                        className="text-slate-400 hover:text-white transition flex items-center gap-1 text-sm"
                      >
                        {copied === i ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        {copied === i ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="text-white whitespace-pre-wrap font-sans">{content}</pre>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Your Account</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Plan</span>
                  <span className="text-orange-400 font-bold uppercase">{user.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Generations Left</span>
                  <span className="text-white font-bold">{generationsLeft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email</span>
                  <span className="text-white text-sm">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Pro CTA */}
            {user.plan === 'free' && (
              <div className="bg-gradient-to-br from-orange-600 to-pink-600 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-2">Go Pro</h3>
                <p className="text-white/80 text-sm mb-4">Unlimited generations, all platforms, analytics & more!</p>
                <Link href="/pricing" className="block w-full bg-white text-orange-600 py-2 rounded-lg font-semibold text-center">
                  Upgrade Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
