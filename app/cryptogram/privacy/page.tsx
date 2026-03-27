import { Metadata } from 'next'
import AppLayout from '@/components/ui/layout/AppLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy — Simple Cryptogram',
  description: 'Privacy policy for Simple Cryptogram iOS app',
}

export default function CryptogramPrivacyPage() {
  return (
    <AppLayout>
      <article className="px-8 pb-80">
        <header className="mb-12">
          <div className="h-4"></div>
          <h1 className="text-4xl font-bold mb-4">privacy policy — simple cryptogram</h1>
          <p className="text-sm text-muted dark:text-gray-400">Last updated: March 2026</p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-p:mb-6 prose-p:leading-relaxed">
          <p>
            Simple Cryptogram does not collect, store, or transmit any personal data. All game progress, settings, and statistics are stored locally on your device.
          </p>
          <p>
            The app does not use analytics, tracking, advertising, or third-party services.
          </p>
          <p>
            No account or sign-in is required.
          </p>
          <p>
            If you have any questions, please visit our{' '}
            <a href="/cryptogram/support">support page</a>.
          </p>
        </div>
      </article>
    </AppLayout>
  )
}
