import { Outlet, createRootRoute } from "@tanstack/solid-router"

export const Route = createRootRoute({
  component: () => (
    <div class="h-screen w-full scroll-smooth bg-neutral-900 font-open-sans text-base antialiased">
      <Outlet />
    </div>
  ),
})
