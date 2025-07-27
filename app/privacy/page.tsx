import { Metadata } from 'next'
import AppLayout from '@/components/ui/layout/AppLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for rohanluthra.com',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <AppLayout>
      <div className="px-8 py-12 max-w-3xl mx-auto font-reef">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-sm text-muted dark:text-gray-400 mb-12">Last updated: July 2025</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300">
              This website uses analytics to understand how people use the site. I value your privacy and want to be transparent about what little data is collected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What Gets Collected</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300 mb-4">
              I use Vercel Analytics to see basic information about site visits:
            </p>
            <ul className="space-y-2 text-lg text-muted dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>Which pages are viewed and when</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>General location (country, state, city - derived from IP address)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>Browser and operating system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>Device type (mobile or desktop)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>How you arrived at the site (search engine, direct link, etc.)</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What Doesn't Get Collected</h2>
            <ul className="space-y-2 text-lg text-muted dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>No personal information (names, emails, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>No cookies to track you</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>No IP addresses are stored</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>No tracking across websites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>No user accounts or profiles</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How This Information Is Used</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300 mb-4">
              The anonymous analytics help me:
            </p>
            <ul className="space-y-2 text-lg text-muted dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>See which content is most helpful</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>Ensure the site works well on different devices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted">•</span>
                <span>Understand general visitor patterns</span>
              </li>
            </ul>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300 mt-4">
              I can't identify individual visitors - all data is aggregated and anonymous.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Handling</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300">
              Analytics data is processed by Vercel Inc. and visitor sessions expire after 24 hours. All connections are encrypted with HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300">
              If you prefer not to be included in analytics, most ad blockers and privacy browser extensions will prevent the analytics from loading.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300">
              This site's analytics are provided by Vercel. You can read more about their practices in{' '}
              <a href="https://vercel.com/legal/privacy-policy" className="text-link dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Vercel's Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Updates</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300">
              Any significant changes to this policy will be reflected here with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-lg leading-relaxed text-muted dark:text-gray-300">
              If you have questions about this privacy policy, feel free to reach out through the contact information on the site.
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  )
}