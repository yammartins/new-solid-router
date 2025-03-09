import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_private/_layout/hotspots/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/hotspots/"!</div>
}
