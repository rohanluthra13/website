'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import AppLayout from '@/components/ui/layout/AppLayout'
import Section from '@/components/ui/primitives/Section'
import ButtonTile from '@/components/ui/primitives/ButtonTile'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Rohan Luthra',
  alternates: {
    canonical: '/about',
  },
}

const sections = [
  { id: 'bio', label: 'hi 👋' },
  { id: 'projects', label: 'some stuff i\'ve been doing' },
  { id: 'reading', label: 'some things i\'ve been reading' },
  { id: 'tools', label: 'some tools i like using' }
]

export default function AboutPage() {
  const [showVibeCode, setShowVibeCode] = useState(true)
  const [showGptConnector, setShowGptConnector] = useState(true)

  return (
    <AppLayout sections={sections}>
      <div className="px-8 py-12">
        <div className="h-48"></div>
        <Section id="bio" hideTitle className="mb-64">
          <p className="text-lg leading-relaxed text-strong dark:text-gray-300">
            I'm a creative technologist passionate about building intuitive digital experiences that blend form and function. 
            With a background in both design and engineering, I enjoy exploring the intersection of aesthetics and technology. 
            When I'm not coding, you'll find me experimenting with new frameworks, contributing to open-source projects, or 
            diving deep into the latest developments in AI and machine learning. I believe in the power of technology to solve 
            real-world problems and am constantly seeking new challenges that push the boundaries of what's possible.
          </p>
        </Section>

        <Section id="projects" hideTitle className="mb-64">
          <div className="space-y-16">
            <div>
              <ButtonTile 
                onClick={() => setShowVibeCode(!showVibeCode)}
                className="mb-6"
              >
                vibe coding
              </ButtonTile>
              {showVibeCode && (
                <div className="grid gap-6">
                <div className="flex items-start gap-4 p-6 rounded-lg border border-light dark:border-gray-800 hover:border-light dark:hover:border-gray-700 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    W
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Work Project 1</h4>
                    <p className="text-muted dark:text-gray-400">
                      Replace this with your actual professional work project. Include details about the technology stack, 
                      your role, key achievements, and impact.
                    </p>
                  </div>
                </div>
              </div>
              )}
            </div>
            
            <div>
              <ButtonTile 
                onClick={() => setShowGptConnector(!showGptConnector)}
                className="mb-6"
              >
                gpt connector
              </ButtonTile>
              {showGptConnector && (
                <div className="grid gap-6">
                <div className="flex items-start gap-4 p-6 rounded-lg border border-light dark:border-gray-800 hover:border-light dark:hover:border-gray-700 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    P
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Personal Project 1</h4>
                    <p className="text-muted dark:text-gray-400">
                      Replace with your personal project details. This could be an open source contribution, weekend hack, 
                      mobile app, or passion project.
                    </p>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </Section>

        <Section id="reading" hideTitle className="mb-64">
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <a href="https://www.paulgraham.com/think.html" className="text-link dark:text-blue-400 hover:underline">
                How to Think for Yourself
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <a href="https://waitbutwhy.com/2015/11/the-cook-and-the-chef-musks-secret-sauce.html" className="text-link dark:text-blue-400 hover:underline">
                The Cook and the Chef: Musk's Secret Sauce
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <a href="https://stratechery.com/2024/the-ai-epoch/" className="text-link dark:text-blue-400 hover:underline">
                The AI Epoch
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <a href="https://www.eugenewei.com/blog/2019/2/19/status-as-a-service" className="text-link dark:text-blue-400 hover:underline">
                Status as a Service
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <a href="https://fs.blog/mental-models/" className="text-link dark:text-blue-400 hover:underline">
                Mental Models: The Best Way to Make Intelligent Decisions
              </a>
            </li>
          </ul>
        </Section>

        <Section id="tools" hideTitle className="mb-64">
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <span>Claude Code - AI-powered coding assistant for rapid development</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <span>Cursor - The AI-first code editor that understands context</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <span>Next.js - React framework for production-ready applications</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <span>Tailwind CSS - Utility-first CSS framework for rapid UI development</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-muted">•</span>
              <span>Vercel - Deploy and scale modern web applications</span>
            </li>
          </ul>
        </Section>
        
        {/* Spacer to ensure last section can scroll high enough to be selected */}
        <div className="h-[15vh]"></div>
      </div>
    </AppLayout>
  )
}