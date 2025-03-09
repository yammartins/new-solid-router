import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_private/_layout/")({
  component: Index,
})

function Index() {
  return (
    <div class="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
