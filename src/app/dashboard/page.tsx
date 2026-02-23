'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Twitter, Linkedin, Instagram, Copy, Check, RefreshCw, Sparkles, Hash, Calendar, BarChart3, Plus } from 'lucide-react'

const contentTypes = [
  { id: 'tweet', name: 'Tweet', icon: <Twitter className="w-5 h-5" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'thread', name: 'Thread', icon: <MessageSquare className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'linkedin', name: 'LinkedIn Post', icon: <Linkedin className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'text-pink-500', bg: 'bg-pink-500/10' },
]

const tones = ['Casual', 'Professional', 'Funny', 'Inspirational', 'Controversial']

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [contentType, setContentType] = useState('tweet')
  const [tone, setTone] = useState('Casual')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const generatedContent = [
    "🚀 5 ways to 10x your productivity as a creator:\n\n1. Batch your content creation\n2. Use AI to help ideation\n3. Repurpose content across platforms\n4. Build in public\n5. Focus on ONE thing\n\nWhich one resonates most? 👇",
    "Hot take: Most creators fail because they overthink.\n\nJust start. Ship. Iterate.\n\nPerfection is the enemy of progress.\n\nWhat's your biggest blocker?",
    "Just shipped a new feature.\n\nTook 2 hours.\n\nWould have taken 2 weeks a year ago.\n\nAI changed everything.\n\nWhat's your productivity hack?",
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGenerated(generatedContent)
    setGenerating(false)
  }

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
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
            <Link href="/pricing" className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white px-5 py-2 rounded-full font-medium transition">
              Upgrade to Pro
            </Link>
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
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                        contentType === type.id 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {type.icon}
                      {type.name}
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
                disabled={generating || !prompt.trim()}
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
                    Generate Content
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
                    <div className="flex gap-2 mt-4">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                        <Twitter className="w-4 h-4" /> Post to Twitter
                      </button>
                      <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                        <Linkedin className="w-4 h-4" /> Post to LinkedIn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Generations Left</span>
                  <span className="text-orange-400 font-bold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">This Month</span>
                  <span className="text-white font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Created</span>
                  <span className="text-white font-bold">47</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Quick Generate</h3>
              <div className="space-y-2">
                {['Motivation Monday', 'Product Launch', 'Ask a Question', 'Share a Tip'].map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(topic)}
                    className="w-full text-left bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition"
                  >
                    + {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Pro CTA */}
            <div className="bg-gradient-to-br from-orange-600 to-pink-600 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-2">Go Pro</h3>
              <p className="text-white/80 text-sm mb-4">Unlimited generations, all platforms, analytics & more!</p>
              <Link href="/pricing" className="block w-full bg-white text-orange-600 py-2 rounded-lg font-semibold text-center">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
