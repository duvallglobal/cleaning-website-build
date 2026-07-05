'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { submitQuote } from '@/lib/actions'
import { calculateEstimate } from '@/lib/estimate'
import { CheckCircle, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

const STEPS = ['Contact', 'Property', 'Service', 'Extras', 'Review']
const TOTAL = STEPS.length

const SERVICE_OPTIONS = [
  { value: 'standard-cleaning', label: 'Standard Cleaning' },
  { value: 'deep-cleaning', label: 'Deep Cleaning' },
  { value: 'move-in-out', label: 'Move-In / Move-Out' },
  { value: 'recurring-cleaning', label: 'Recurring Cleaning' },
  { value: 'special-event', label: 'Special Event Cleaning' },
]

type FormState = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  property_type: string
  bedrooms: string
  bathrooms: string
  service_type: string
  preferred_date: string
  has_pets: boolean
  basement: boolean
  garage: boolean
  patio: boolean
  windows: boolean
  notes: string
}

const INITIAL: FormState = {
  name: '', email: '', phone: '',
  address: '', city: '', state: 'GA', zip: '',
  property_type: 'house', bedrooms: '2', bathrooms: '1',
  service_type: 'standard-cleaning', preferred_date: '',
  has_pets: false, basement: false, garage: false, patio: false, windows: false,
  notes: '',
}

export function QuoteWizard() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null)
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()

  const pct = ((step + 1) / TOTAL) * 100

  function set(field: keyof FormState, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function liveEstimate() {
    return calculateEstimate({
      bedrooms: parseInt(form.bedrooms) || 2,
      bathrooms: parseFloat(form.bathrooms) || 1,
      serviceType: form.service_type,
      hasBasement: form.basement,
      hasGarage: form.garage,
      hasPatio: form.patio,
      hasWindows: form.windows,
      hasPets: form.has_pets,
    })
  }

  function handleSubmit() {
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (typeof v === 'boolean') { if (v) fd.append(k, 'on') }
      else fd.append(k, v)
    })
    fd.append('_hp', '') // honeypot empty

    startTransition(async () => {
      const res = await submitQuote(fd)
      if (res.success && res.estimate) {
        setEstimate(res.estimate)
        setDone(true)
        toast.success('Quote submitted! Check your email for details.')
      } else {
        toast.error(res.error ?? 'Something went wrong. Please try again.')
      }
    })
  }

  if (done && estimate) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Your Estimate is Ready!</h2>
        <p className="text-muted-foreground mb-6">We&apos;ve sent a copy to <strong>{form.email}</strong>.</p>
        <div className="bg-secondary rounded-2xl p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Estimated Price Range</p>
          <p className="text-4xl font-extrabold text-primary">
            ${estimate.min} – ${estimate.max}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Final price confirmed after a quick walkthrough. No hidden fees.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-primary text-white font-bold rounded-full px-7">
            <a href="/book">Book This Service</a>
          </Button>
          <Button variant="outline" className="border-primary text-primary font-bold rounded-full px-7" onClick={() => { setDone(false); setStep(0); setForm(INITIAL) }}>
            Start Over
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Progress */}
      <div className="px-8 pt-8 pb-0">
        <div className="flex justify-between items-center mb-2">
          {STEPS.map((s, i) => (
            <span key={s} className={`text-xs font-semibold ${i === step ? 'text-primary' : i < step ? 'text-primary/50' : 'text-muted-foreground'}`}>
              {s}
            </span>
          ))}
        </div>
        <Progress value={pct} className="h-2 mb-6" />
      </div>

      <div className="px-8 pb-8">
        {/* Step 0 — Contact */}
        {step === 0 && (
          <fieldset>
            <legend className="text-xl font-bold text-foreground mb-5">Contact Information</legend>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(706) 555-0000" className="mt-1" />
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 1 — Property */}
        {step === 1 && (
          <fieldset>
            <legend className="text-xl font-bold text-foreground mb-5">Your Property</legend>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 Oak Street" className="mt-1" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" value={form.city} onChange={e => set('city', e.target.value)} placeholder="West Point" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select value={form.state} onValueChange={v => v && set('state', v)}>
                    <SelectTrigger id="state" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="AL">Alabama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="ptype">Property Type</Label>
                  <Select value={form.property_type} onValueChange={v => v && set('property_type', v)}>
                    <SelectTrigger id="ptype" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="beds">Bedrooms</Label>
                  <Select value={form.bedrooms} onValueChange={v => v && set('bedrooms', v)}>
                    <SelectTrigger id="beds" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['1','2','3','4','5','6+'].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="baths">Bathrooms</Label>
                  <Select value={form.bathrooms} onValueChange={v => v && set('bathrooms', v)}>
                    <SelectTrigger id="baths" className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['1','1.5','2','2.5','3','3.5','4+'].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 2 — Service */}
        {step === 2 && (
          <fieldset>
            <legend className="text-xl font-bold text-foreground mb-5">Service Type</legend>
            <div className="grid grid-cols-1 gap-3">
              {SERVICE_OPTIONS.map(o => (
                <label key={o.value} className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all ${form.service_type === o.value ? 'border-primary bg-secondary' : 'border-border hover:border-primary/50'}`}>
                  <input
                    type="radio"
                    name="service_type"
                    value={o.value}
                    checked={form.service_type === o.value}
                    onChange={() => set('service_type', o.value)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-medium text-sm text-foreground">{o.label}</span>
                </label>
              ))}
              <div className="mt-2">
                <Label htmlFor="pdate">Preferred Date</Label>
                <Input
                  id="pdate" type="date" value={form.preferred_date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => set('preferred_date', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 3 — Extras */}
        {step === 3 && (
          <fieldset>
            <legend className="text-xl font-bold text-foreground mb-5">Special Areas &amp; Add-Ons</legend>
            <p className="text-sm text-muted-foreground mb-4">Select any additional areas or conditions that apply:</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { key: 'basement', label: 'Basement (+$50)' },
                { key: 'garage', label: 'Garage (+$35)' },
                { key: 'patio', label: 'Patio / Deck (+$30)' },
                { key: 'windows', label: 'Interior Windows (+$40)' },
                { key: 'has_pets', label: 'Pets in home (+$25)' },
              ].map(({ key, label }) => (
                <label key={key} className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition-all ${form[key as keyof FormState] ? 'border-primary bg-secondary' : 'border-border hover:border-primary/50'}`}>
                  <input
                    type="checkbox"
                    checked={!!form[key as keyof FormState]}
                    onChange={e => set(key as keyof FormState, e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </label>
              ))}
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Anything else we should know?" className="mt-1" rows={3} />
            </div>
            {/* Live estimate preview */}
            <div className="mt-5 bg-secondary rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Live Estimate</p>
                <p className="text-2xl font-extrabold text-primary">
                  ${liveEstimate().min} – ${liveEstimate().max}
                </p>
              </div>
              <Sparkles className="w-8 h-8 text-primary/30" />
            </div>
          </fieldset>
        )}

        {/* Step 4 — Review */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-5">Review Your Quote</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-6">
              {[
                ['Name', form.name], ['Email', form.email], ['Phone', form.phone || '—'],
                ['Address', `${form.address}, ${form.city} ${form.state}`],
                ['Property', `${form.property_type} • ${form.bedrooms}bd / ${form.bathrooms}ba`],
                ['Service', SERVICE_OPTIONS.find(o => o.value === form.service_type)?.label ?? ''],
                ['Preferred Date', form.preferred_date || 'Flexible'],
                ['Add-ons', [form.basement && 'Basement', form.garage && 'Garage', form.patio && 'Patio', form.windows && 'Windows', form.has_pets && 'Pets'].filter(Boolean).join(', ') || 'None'],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <dt className="text-muted-foreground font-medium">{k}</dt>
                  <dd className="text-foreground font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="bg-secondary rounded-2xl p-5 text-center mb-6">
              <p className="text-xs text-muted-foreground mb-1">Your Estimated Price</p>
              <p className="text-3xl font-extrabold text-primary">${liveEstimate().min} – ${liveEstimate().max}</p>
              <p className="text-xs text-muted-foreground mt-1">Final price confirmed on-site. No hidden fees.</p>
            </div>
            {/* Honeypot */}
            <input type="text" name="_hp" className="hidden" aria-hidden="true" tabIndex={-1} />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0 || isPending}
            className="rounded-full border-border"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>

          {step < TOTAL - 1 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={
                (step === 0 && (!form.name || !form.email)) ||
                (step === 1 && (!form.address || !form.city))
              }
              className="bg-primary text-white font-semibold rounded-full px-6"
            >
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-primary text-white font-semibold rounded-full px-6"
            >
              {isPending ? 'Submitting…' : 'Submit Quote'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
