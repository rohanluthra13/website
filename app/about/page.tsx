'use client'

import AppLayout from '@/components/ui/layout/AppLayout'
import Section from '@/components/ui/primitives/Section'

const sections = [
  { id: 'bio', label: 'hi 👋' },
  { id: 'projects', label: 'projects' },
  { id: 'reading', label: 'some things i\'ve been reading' },
  { id: 'tools', label: 'tools i\'m using' }
]

export default function AboutPage() {
  return (
    <AppLayout sections={sections}>
      <div className="px-8 py-12">
        <div className="h-48"></div>
        <Section id="bio" hideTitle className="mb-64">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            I'm a creative technologist passionate about building intuitive digital experiences that blend form and function. 
            With a background in both design and engineering, I enjoy exploring the intersection of aesthetics and technology. 
            When I'm not coding, you'll find me experimenting with new frameworks, contributing to open-source projects, or 
            diving deep into the latest developments in AI and machine learning. I believe in the power of technology to solve 
            real-world problems and am constantly seeking new challenges that push the boundaries of what's possible.
          </p>
        </Section>

        <Section id="projects" hideTitle className="mb-64">
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
        </Section>

        <Section id="reading" hideTitle className="mb-64">
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <a href="https://www.paulgraham.com/think.html" className="text-blue-600 dark:text-blue-400 hover:underline">
                How to Think for Yourself
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <a href="https://waitbutwhy.com/2015/11/the-cook-and-the-chef-musks-secret-sauce.html" className="text-blue-600 dark:text-blue-400 hover:underline">
                The Cook and the Chef: Musk's Secret Sauce
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <a href="https://stratechery.com/2024/the-ai-epoch/" className="text-blue-600 dark:text-blue-400 hover:underline">
                The AI Epoch
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <a href="https://www.eugenewei.com/blog/2019/2/19/status-as-a-service" className="text-blue-600 dark:text-blue-400 hover:underline">
                Status as a Service
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <a href="https://fs.blog/mental-models/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Mental Models: The Best Way to Make Intelligent Decisions
              </a>
            </li>
          </ul>
        </Section>

        <Section id="tools" hideTitle>
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
        </Section>
      </div>
    </AppLayout>
  )
}