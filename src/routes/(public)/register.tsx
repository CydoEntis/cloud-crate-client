import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/register"!</div>
}
