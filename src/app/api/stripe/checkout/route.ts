import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { priceId } = body

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    // Demo mode - redirect to success
    // In production, integrate with Stripe
    return NextResponse.json({ 
      url: '/dashboard?upgraded=true',
      demo: true 
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
