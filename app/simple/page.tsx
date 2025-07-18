import AppLayout from '@/components/ui/layout/AppLayout'

export default function SimplePage() {
  return (
    <AppLayout>
      <div className="border-2 border-dashed border-purple-300 p-6">
        <h1 className="text-3xl font-bold mb-6">App Layout Test</h1>
        <p className="text-lg mb-4">This is the app layout (3-column).</p>
        <p className="mb-4">Try adjusting the width settings in the right sidebar to see how the content width changes.</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Content Width Test</h2>
          <p>This content should respond to the width controls.</p>
        </div>
      </div>
    </AppLayout>
  )
}