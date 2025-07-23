'use client'

import AppLayout from '@/components/ui/layout/AppLayout'
import Link from 'next/link'

export default function LessonsFromSideProjectsPost() {
  return (
    <AppLayout>
      <article className="px-8">
        <header className="mb-12">
          <Link href="/writing" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 inline-block">
            ← Back to Writing
          </Link>
          <h1 className="text-4xl font-bold mb-4">Lessons Learned from Shipping 10 Side Projects</h1>
          <div className="text-gray-500 dark:text-gray-400">
            <time>January 5, 2024</time>
            <span className="mx-2">·</span>
            <span>6 min read</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">
            Over the past two years, I've shipped 10 side projects ranging from simple utilities to full-fledged SaaS applications. Each project taught me valuable lessons about building, launching, and sometimes failing. Here's what I learned along the way.
          </p>

          <h2>1. Perfect is the Enemy of Shipped</h2>
          <p>
            My first three projects never saw the light of day because I kept adding "just one more feature" before launch. Project #4 was different—I gave myself a hard deadline of two weeks and shipped with only the core functionality. It wasn't perfect, but it was in users' hands, gathering feedback and improving.
          </p>
          
          <blockquote>
            <p>"Ship early, ship often, and listen to your users. They'll tell you what actually matters."</p>
          </blockquote>

          <h2>2. Scope Creep is Real (and Deadly)</h2>
          <p>
            My todo app started as a simple list maker. By week three, I was building a full project management suite with Gantt charts and team collaboration features. The project died under its own weight. Now, I write down the core value proposition and religiously defend it against feature creep.
          </p>

          <h3>My Scope Management Strategy:</h3>
          <ul>
            <li>Define the MVP in one sentence</li>
            <li>List max 3 core features</li>
            <li>Everything else goes in the "v2 maybe" list</li>
            <li>Ship v1 before touching the maybe list</li>
          </ul>

          <h2>3. Marketing is Not Optional</h2>
          <p>
            "If you build it, they will come" is a lie. My best technical project got 12 users. My simplest project, which I actually marketed, got 10,000. The difference? I spent as much time talking about the simple project as I did building it.
          </p>

          <h2>4. Monetization Should Be Built In</h2>
          <p>
            Adding payments to an existing free product is incredibly difficult psychologically—both for you and your users. If you plan to charge, start charging from day one. Even if it's just $1, it sets the expectation and validates that people will pay.
          </p>

          <h2>5. Choose Boring Technology</h2>
          <p>
            Project #6 failed because I decided to learn Rust, GraphQL, and Kubernetes simultaneously. For side projects, stick to what you know. There's enough challenge in building something useful without adding technical complexity.
          </p>

          <h3>My Current "Boring" Stack:</h3>
          <ul>
            <li>Next.js (I know it well)</li>
            <li>PostgreSQL (battle-tested)</li>
            <li>Tailwind CSS (fast to develop with)</li>
            <li>Vercel (zero-config deployment)</li>
          </ul>

          <h2>6. Automate Everything</h2>
          <p>
            Every manual process is a future bottleneck. Deployment, backups, monitoring, customer onboarding—automate it all. The time invested in automation pays dividends when you're juggling multiple projects.
          </p>

          <h2>7. Kill Projects Fast</h2>
          <p>
            Not every project will succeed, and that's okay. I now give projects 3 months to show traction. No users or revenue by then? Kill it and move on. Emotional attachment to failing projects is the biggest productivity killer.
          </p>

          <h2>8. Build in Public</h2>
          <p>
            Sharing the journey—the wins, losses, and learnings—created more opportunities than any cold outreach. My Twitter threads about building led to consulting gigs, partnerships, and even acquisition offers.
          </p>

          <h2>9. Solve Your Own Problems</h2>
          <p>
            My most successful projects solved problems I personally faced. When you're your own user, you have deep understanding of the problem space and instant feedback on solutions.
          </p>

          <h2>10. Consistency Beats Intensity</h2>
          <p>
            One hour every day beats 10-hour weekend marathons. Consistent small progress maintains momentum and prevents burnout. Plus, sleeping on problems often leads to better solutions.
          </p>

          <h2>The Meta Lesson</h2>
          <p>
            The biggest lesson? Side projects are about more than the projects themselves. They're about learning, experimenting, and pushing your boundaries. Even the "failed" projects taught me skills I use daily in my main work.
          </p>

          <p>
            Start small, ship fast, and keep building. Each project is a stepping stone to the next, and you never know which one will change your trajectory. My project #8, a simple Chrome extension I built in a weekend, now generates more revenue than projects I spent months on.
          </p>

          <p>
            The only real failure is not starting. So what are you waiting for? That idea you've been thinking about? Start it today. Not tomorrow. Today.
          </p>
        </div>
      </article>
    </AppLayout>
  )
}