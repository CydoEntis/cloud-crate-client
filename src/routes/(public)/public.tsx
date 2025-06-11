import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/public')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/layout"!</div>
}
