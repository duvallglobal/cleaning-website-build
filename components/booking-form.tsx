'use client'

import { useState, useTransition, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { submitBooking } from '@/lib/actions'
import { CheckCircle, CalendarCheck } from 'lucide-react'

const SERVICE_OPTIONS = [
  'Standard Cleaning', 'Deep Cleaning', 'Move-In / Move-Out',
  'Recurring Cleaning', 'Special Event', 'Commercial Cleaning',
]

const TIME_WINDOWS = [
  '8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM', '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
]

export function BookingForm() {
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [serviceType, setServiceType] = useState('')
  const [timeWindow, setTimeWindow] = useState('')
  const [minDate, setMinDate] = useState('')

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0])
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('service_type', serviceType)
    fd.set('time_window', timeWindow)
    fd.append('_hp', '')

    startTransition(async () => {
      const res = await submitBooking(fd)
      if (res.success) {
        setDone(true)
        toast.success('Booking request received! We\'ll confirm within 24 hours.')
      } else {
        toast.error(res.error ?? 'Something went wrong.')
      }
    })
  }

  if (done) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
        <CalendarCheck className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Booking Request Sent!</h2>
        <p className="text-muted-foreground">
          We&apos;ll reach out to confirm your appointment within 24 hours. Thank you for choosing Rainwater &amp; Shine!
        </p>
        <Button className="mt-6 bg-primary text-white font-bold rounded-full px-7" onClick={() => setDone(false)}>
          Book Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
      {/* Honeypot */}
      <input type="text" name="_hp" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="b-name">Full Name *</Label>
          <Input id="b-name" name="name" placeholder="Jane Smith" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="b-email">Email *</Label>
          <Input id="b-email" name="email" type="email" placeholder="jane@example.com" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="b-phone">Phone</Label>
          <Input id="b-phone" name="phone" type="tel" placeholder="(706) 555-0000" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="b-addr">Service Address *</Label>
          <Input id="b-addr" name="service_address" placeholder="123 Oak St, West Point GA" required className="mt-1" />
        </div>
      </div>

      <div>
        <Label htmlFor="b-service">Service Type *</Label>
        <Select value={serviceType} onValueChange={(v) => v && setServiceType(v)} required>
          <SelectTrigger id="b-service" className="mt-1">
            <SelectValue placeholder="Select a service…" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="b-date">Preferred Date *</Label>
          <Input
            id="b-date" name="preferred_date" type="date" required className="mt-1"
            min={minDate}
          />
        </div>
        <div>
          <Label htmlFor="b-time">Time Window</Label>
          <Select value={timeWindow} onValueChange={(v) => v && setTimeWindow(v)}>
            <SelectTrigger id="b-time" className="mt-1">
              <SelectValue placeholder="Select a window…" />
            </SelectTrigger>
            <SelectContent>
              {TIME_WINDOWS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="b-notes">Special Instructions</Label>
        <Textarea id="b-notes" name="special_instructions" placeholder="Gate code, pets, areas to focus on…" className="mt-1" rows={3} />
      </div>

      <Button type="submit" disabled={isPending || !serviceType} className="w-full bg-primary text-white font-bold rounded-full py-3 text-base">
        {isPending ? 'Submitting…' : 'Request Booking'}
      </Button>
    </form>
  )
}
