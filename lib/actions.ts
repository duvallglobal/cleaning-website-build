'use server'

import { createClient } from '@/lib/supabase/server'
import { OWNER_EMAIL, SITE_NAME } from '@/lib/constants'
import { calculateEstimate } from '@/lib/estimate'

const WEBHOOK_URL = process.env.WEBHOOK_URL ?? ''

// --- Rate-limit store (in-memory, resets on cold start) ---
const rateMap = new Map<string, { count: number; reset: number }>()
function isRateLimited(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateMap.get(key)
  if (!entry || now > entry.reset) {
    rateMap.set(key, { count: 1, reset: now + windowMs })
    return false
  }
  if (entry.count >= limit) return true
  entry.count++
  return false
}

/**
 * Sends the submission to the Make.com webhook.
 * The payload always includes `customer_email` (the submitter) and
 * `owner_email` (the business copy recipient) so the Make.com scenario
 * can email a copy to BOTH parties.
 */
async function sendWebhook(payload: Record<string, unknown>): Promise<boolean> {
  if (!WEBHOOK_URL) {
    console.error('[actions] WEBHOOK_URL is not configured — submission saved to DB but no notification sent.')
    return false
  }
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('[actions] Webhook responded with status:', res.status)
      return false
    }
    return true
  } catch (err) {
    console.error('[actions] Webhook error:', err)
    return false
  }
}

// --- submitQuote ---
export async function submitQuote(formData: FormData) {
  const honeypot = formData.get('_hp') as string
  if (honeypot) return { success: false as const, error: 'Spam detected.' }

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  if (!name || !email || !email.includes('@')) {
    return { success: false as const, error: 'Please provide a valid name and email.' }
  }
  if (isRateLimited(`quote:${email}`)) return { success: false as const, error: 'Too many requests. Please try again later.' }

  const specialAreas: string[] = []
  if (formData.get('basement') === 'on') specialAreas.push('basement')
  if (formData.get('garage') === 'on') specialAreas.push('garage')
  if (formData.get('patio') === 'on') specialAreas.push('patio')
  if (formData.get('windows') === 'on') specialAreas.push('windows')

  const bedrooms = parseInt(formData.get('bedrooms') as string) || 2
  const bathrooms = parseFloat(formData.get('bathrooms') as string) || 1
  const serviceType = (formData.get('service_type') as string) || 'standard-cleaning'
  const hasPets = formData.get('has_pets') === 'on'

  const { min, max } = calculateEstimate({
    bedrooms,
    bathrooms,
    serviceType,
    hasBasement: specialAreas.includes('basement'),
    hasGarage: specialAreas.includes('garage'),
    hasPatio: specialAreas.includes('patio'),
    hasWindows: specialAreas.includes('windows'),
    hasPets,
  })

  const supabase = await createClient()
  const { error } = await supabase.from('quotes').insert({
    name,
    email,
    phone: (formData.get('phone') as string) || null,
    address: (formData.get('address') as string) || null,
    city: (formData.get('city') as string) || null,
    state: (formData.get('state') as string) || null,
    zip: (formData.get('zip') as string) || null,
    property_type: (formData.get('property_type') as string) || null,
    bedrooms,
    bathrooms,
    service_type: serviceType,
    preferred_date: (formData.get('preferred_date') as string) || null,
    has_pets: hasPets,
    special_areas: specialAreas,
    notes: (formData.get('notes') as string) || null,
    estimate_min: min,
    estimate_max: max,
  })

  if (error) {
    console.error('[actions] Quote DB error:', error)
    return { success: false as const, error: 'Failed to save quote. Please try again.' }
  }

  await sendWebhook({
    form_type: 'quote',
    business_name: SITE_NAME,
    customer_name: name,
    customer_email: email,
    owner_email: OWNER_EMAIL,
    phone: formData.get('phone'),
    address: formData.get('address'),
    city: formData.get('city'),
    state: formData.get('state'),
    zip: formData.get('zip'),
    property_type: formData.get('property_type'),
    bedrooms,
    bathrooms,
    service_type: serviceType,
    preferred_date: formData.get('preferred_date'),
    has_pets: hasPets,
    special_areas: specialAreas,
    notes: formData.get('notes'),
    estimate_min: min,
    estimate_max: max,
    submitted_at: new Date().toISOString(),
  })

  return { success: true as const, estimate: { min, max } }
}

// --- submitBooking ---
export async function submitBooking(formData: FormData) {
  const honeypot = formData.get('_hp') as string
  if (honeypot) return { success: false as const, error: 'Spam detected.' }

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  if (!name || !email || !email.includes('@')) {
    return { success: false as const, error: 'Please provide a valid name and email.' }
  }
  if (isRateLimited(`booking:${email}`)) return { success: false as const, error: 'Too many requests. Please try again later.' }

  const supabase = await createClient()
  const { error } = await supabase.from('bookings').insert({
    name,
    email,
    phone: (formData.get('phone') as string) || null,
    service_address: (formData.get('service_address') as string) || null,
    service_type: (formData.get('service_type') as string) || null,
    preferred_date: (formData.get('preferred_date') as string) || null,
    time_window: (formData.get('time_window') as string) || null,
    special_instructions: (formData.get('special_instructions') as string) || null,
  })

  if (error) {
    console.error('[actions] Booking DB error:', error)
    return { success: false as const, error: 'Failed to save booking. Please try again.' }
  }

  await sendWebhook({
    form_type: 'booking',
    business_name: SITE_NAME,
    customer_name: name,
    customer_email: email,
    owner_email: OWNER_EMAIL,
    phone: formData.get('phone'),
    service_address: formData.get('service_address'),
    service_type: formData.get('service_type'),
    preferred_date: formData.get('preferred_date'),
    time_window: formData.get('time_window'),
    special_instructions: formData.get('special_instructions'),
    submitted_at: new Date().toISOString(),
  })

  return { success: true as const }
}

// --- submitContact ---
export async function submitContact(formData: FormData) {
  const honeypot = formData.get('_hp') as string
  if (honeypot) return { success: false as const, error: 'Spam detected.' }

  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()
  if (!name || !email || !email.includes('@') || !message) {
    return { success: false as const, error: 'Please fill in all required fields.' }
  }
  if (isRateLimited(`contact:${email}`)) return { success: false as const, error: 'Too many requests. Please try again later.' }

  const supabase = await createClient()
  const { error } = await supabase.from('contacts').insert({
    name,
    email,
    phone: (formData.get('phone') as string) || null,
    subject: (formData.get('subject') as string) || null,
    message,
  })

  if (error) {
    console.error('[actions] Contact DB error:', error)
    return { success: false as const, error: 'Failed to send message. Please try again.' }
  }

  await sendWebhook({
    form_type: 'contact',
    business_name: SITE_NAME,
    customer_name: name,
    customer_email: email,
    owner_email: OWNER_EMAIL,
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message,
    submitted_at: new Date().toISOString(),
  })

  return { success: true as const }
}
