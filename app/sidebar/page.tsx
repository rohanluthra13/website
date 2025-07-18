import SidebarLayout from '@/components/ui/layout/SidebarLayout'

export default function SidebarPage() {
  return (
    <SidebarLayout>
      <div className="p-6 border-2 border-dashed border-purple-300">
        <h1 className="text-3xl font-bold mb-6">Sidebar Layout Test</h1>
        <p className="text-lg mb-4">This is the sidebar layout (4-column).</p>
        <p className="mb-4">Features: Left sidebar, Main content, Side content, Right sidebar</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">4-Column Layout</h2>
          <p>Perfect for dashboards, admin panels, or complex interfaces.</p>
        </div>
      </div>
    </SidebarLayout>
  )
}