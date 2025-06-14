import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-64 border">
          {/* Main content */}
          <div className="flex-1 p-4 bg-yellow-100">
            <p className="text-lg font-semibold text-yellow-900">Main content here</p>
            <p>Stuff inside the card body</p>
          </div>

          {/* Footer */}
          <div className="bg-yellow-300 p-4 text-sm text-yellow-900 border-t mt-auto">Footer content</div>
        </div>
      </div>
    </section>
  );
}
