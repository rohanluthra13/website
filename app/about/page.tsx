import { Metadata } from 'next'
import AppLayout from '@/components/ui/layout/AppLayout'
import Section from '@/components/ui/primitives/Section'
import CollapsibleSection from '@/components/ui/primitives/CollapsibleSection'
import { Github, Linkedin, Twitter } from 'lucide-react'
import EmailLink from '@/components/ui/primitives/EmailLink'

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

  return (
    <AppLayout sections={sections}>
      <div className="px-8 py-12">
        <div className="h-48"></div>
        <Section id="bio" title="hi 👋" hideTitle className="mb-64">
          <p className="text-lg leading-relaxed text-strong dark:text-gray-300 mb-8">
            I'm a creative technologist passionate about building intuitive digital experiences that blend form and function. 
            With a background in both design and engineering, I enjoy exploring the intersection of aesthetics and technology. 
            When I'm not coding, you'll find me experimenting with new frameworks, contributing to open-source projects, or 
            diving deep into the latest developments in AI and machine learning. I believe in the power of technology to solve 
            real-world problems and am constantly seeking new challenges that push the boundaries of what's possible.
          </p>
          
          <div className="flex gap-4 items-center">
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
            </a>
            
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-all duration-200"
              aria-label="Twitter"
            >
              <Twitter size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
            </a>
            
            <a
              href="https://github.com/yourusername"
              target="_blank"
              
              rel="noopener noreferrer"
              className="group relative p-2 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
            </a>
            
            <EmailLink email="your.email@example.com" />
          </div>
        </Section>

        <Section id="projects" title="some stuff i've been doing" hideTitle className="mb-64">
          <div className="space-y-16">
            <CollapsibleSection title="vibe coding">
              <div className="grid gap-6">
                <div className="p-6 rounded-lg transition-colors">
                  <h4 className="text-lg font-medium mb-4">cryptogram <span className="italic">- a free no-ads daily puzzle iOS app</span></h4>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex-shrink-0">
                      <img 
                        src="/cryptogramicon.png" 
                        alt="Cryptogram app icon" 
                        className="w-full h-full rounded-xl"
                      />
                    </div>
                    <div>
                      <ul className="text-muted dark:text-gray-400 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-muted">•</span>
                          <span>i like daily puzzle apps. but i don't like ads. i had a cryptogram app with too many ads and decided to see how hard it would be to just make my own. so here we are.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-muted">•</span>
                          <span className="italic">currently on testflight</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-lg transition-colors">
                  <h4 className="text-lg font-medium mb-4">this website <span className="italic">- to see if i could do a personal web app</span></h4>
                  <ul className="text-muted dark:text-gray-400 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-muted">•</span>
                      <span>i wanted to build my own web app from scratch, partly to see if I could, partly just to create</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted">•</span>
                      <span>tech stack: next.js, typescript, deployed on vercel</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="gpt connector">
              <p className="text-muted dark:text-gray-400 italic ml-4">
                coming soon
              </p>
            </CollapsibleSection>
          </div>
        </Section>

        <Section id="reading" title="some things i've been reading" hideTitle className="mb-64">
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

        <Section id="tools" title="some tools i like using" hideTitle className="mb-64">
          <div className="mb-8">
            <p className="text-muted dark:text-gray-400 mb-4">
              these tools have completely transformed how i approach coding and problem-solving:
            </p>
            <ul className="space-y-2 text-lg ml-4">
              <li className="flex items-center gap-2">
                <span className="text-muted">•</span>
                <span>Claude Code - AI-powered coding assistant for rapid development</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted">•</span>
                <span>Cursor - The AI-first code editor that understands context</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-muted dark:text-gray-400 mb-4">
              my go-to technologies for building modern web applications:
            </p>
            <ul className="space-y-2 text-lg ml-4">
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
          </div>
        </Section>
        
        {/* Spacer to ensure last section can scroll high enough to be selected */}
        <div className="h-[15vh]"></div>
      </div>
    </AppLayout>
  )
}