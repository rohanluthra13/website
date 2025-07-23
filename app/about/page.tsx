'use client'

import AppLayout from '@/components/ui/layout/AppLayout'

export default function AboutPage() {
  return (
    <AppLayout>
      <div className="px-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Bio</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            I'm a creative technologist passionate about building intuitive digital experiences that blend form and function. 
            With a background in both design and engineering, I enjoy exploring the intersection of aesthetics and technology. 
            When I'm not coding, you'll find me experimenting with new frameworks, contributing to open-source projects, or 
            diving deep into the latest developments in AI and machine learning. I believe in the power of technology to solve 
            real-world problems and am constantly seeking new challenges that push the boundaries of what's possible.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <div className="grid gap-6">
            <div className="flex items-start gap-4 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                M
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">MindMap Pro</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  An intuitive iOS app for visual thinking and idea organization. Features real-time collaboration, 
                  AI-powered suggestions, and seamless sync across all your devices. Perfect for students, professionals, 
                  and creative thinkers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tools I'm Using</h2>
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Claude Code - AI-powered coding assistant for rapid development</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Cursor - The AI-first code editor that understands context</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Next.js - React framework for production-ready applications</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Tailwind CSS - Utility-first CSS framework for rapid UI development</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>Vercel - Deploy and scale modern web applications</span>
            </li>
          </ul>
        </section>
      </div>
    </AppLayout>
  )
}