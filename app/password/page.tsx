'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PasswordForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [typedText, setTypedText] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  
  const fullText = 'enter password'
  
  useEffect(() => {
    if (!isFocused) {
      let index = 0
      setTypedText('')
      
      const typeInterval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index))
          index++
        } else {
          // Pause at full text, then reset
          setTimeout(() => {
            index = 0
            setTypedText('')
          }, 1000)
        }
      }, 150)
      
      return () => clearInterval(typeInterval)
    }
  }, [isFocused])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(redirect)
        router.refresh()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="font-reef text-center mb-8">sorry, I&apos;m quickly fixing something the site will be back up shortly</h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              placeholder={isFocused ? "" : typedText}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={loading}
              autoFocus
              className="w-full px-0 py-2 text-2xl text-center bg-transparent border-0 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {error && (
              <p className="text-sm mt-2 text-center lowercase">{error}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default function PasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="font-reef text-center">loading...</h1>
        </div>
      </div>
    }>
      <PasswordForm />
    </Suspense>
  )
}