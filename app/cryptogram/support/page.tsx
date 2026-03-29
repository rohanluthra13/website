'use client'

import { useState, FormEvent } from 'react'
import AppLayout from '@/components/ui/layout/AppLayout'
import ButtonTile from '@/components/ui/primitives/ButtonTile'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreoeqnn'

export default function CryptogramSupportPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <AppLayout>
      <article className="px-8 pb-80">
        <header className="mb-12">
          <div className="h-4"></div>
          <h1 className="text-4xl font-bold mb-4">simple cryptogram — support</h1>
          <p className="text-sm text-muted dark:text-gray-400">
            Have a question, found a bug, or want to share feedback? Send us a message below.
          </p>
        </header>

        <div className="max-w-lg">
          {status === 'success' ? (
            <p className="text-lg leading-relaxed">
              Thanks for reaching out! We&apos;ll get back to you as soon as we can.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-transparent bg-[var(--color-background)] px-4 py-3 text-base text-[var(--color-text-primary)] shadow-[0px_0px_0px_1px_var(--color-text-secondary)] transition-all duration-200 focus:border-[var(--color-border)] focus:outline-none"
                  placeholder="your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  email <span className="text-muted dark:text-gray-400 font-normal">(optional, if you&apos;d like a reply)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border border-transparent bg-[var(--color-background)] px-4 py-3 text-base text-[var(--color-text-primary)] shadow-[0px_0px_0px_1px_var(--color-text-secondary)] transition-all duration-200 focus:border-[var(--color-border)] focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-lg border border-transparent bg-[var(--color-background)] px-4 py-3 text-base text-[var(--color-text-primary)] shadow-[0px_0px_0px_1px_var(--color-text-secondary)] transition-all duration-200 focus:border-[var(--color-border)] focus:outline-none resize-y"
                  placeholder="what's on your mind?"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}

              <ButtonTile
                type="submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'sending...' : 'send message'}
              </ButtonTile>
            </form>
          )}
        </div>
      </article>
    </AppLayout>
  )
}
