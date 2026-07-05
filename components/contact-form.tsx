'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitContact } from '@/lib/actions'
import { CheckCircle, Send } from 'lucide-react'

export function ContactForm() {
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.append('_hp', '')

    startTransition(async () => {
      const res = await submitContact(fd)
      if (res.success) {
        setDone(true)
        toast.success('Message sent! We\'ll be in touch soon.')
      } else {
        toast.error(res.error ?? 'Something went wrong.')
      }
    })
  }

  if (done) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center h-full flex flex-col items-center justify-center">
        <CheckCircle className="w-14 h-14 text-primary mb-4" />
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Message Received!</h2>
        <p className="text-muted-foreground">We&apos;ll respond within 1 business day. Thank you!</p>
        <Button className="mt-6 bg-primary text-white font-bold rounded-full px-7" onClick={() => setDone(false)}>
          Send Another
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
          <Label htmlFor="c-name">Full Name *</Label>
          <Input id="c-name" name="name" placeholder="Jane Smith" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="c-email">Email *</Label>
          <Input id="c-email" name="email" type="email" placeholder="jane@example.com" required className="mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="c-phone">Phone</Label>
          <Input id="c-phone" name="phone" type="tel" placeholder="(706) 555-0000" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="c-subject">Subject</Label>
          <Input id="c-subject" name="subject" placeholder="Quote request, question…" className="mt-1" />
        </div>
      </div>

      <div>
        <Label htmlFor="c-message">Message *</Label>
        <Textarea id="c-message" name="message" placeholder="Tell us how we can help…" required className="mt-1" rows={5} />
      </div>

      <Button type="submit" disabled={isPending} className="w-full bg-primary text-white font-bold rounded-full py-3 text-base">
        {isPending ? 'Sending…' : <><Send className="w-4 h-4 mr-2" />Send Message</>}
      </Button>
    </form>
  )
}
