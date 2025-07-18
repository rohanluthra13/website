import AppLayout from '@/components/ui/layout/AppLayout'

export default function HomePage() {
  return (
    <AppLayout>
      <div className="p-6 border-2 border-dashed border-purple-300">
        <h1 className="text-2xl font-bold mb-4">Home Page Content</h1>
        <p>This is the main content area</p>
      </div>
    </AppLayout>
  )
}