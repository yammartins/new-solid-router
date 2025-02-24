import { Link, Outlet, createRootRoute } from "@tanstack/solid-router"

export const Route = createRootRoute({
  component: () => (
    <>
      <div class="flex gap-2 p-2">
        <Link to="/" class="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" class="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})
