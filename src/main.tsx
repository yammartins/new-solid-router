import { RouterProvider, createRouter } from "@tanstack/solid-router"
import { render } from "solid-js/web"

import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")
if (rootElement && !rootElement.innerHTML) {
  render(() => <RouterProvider router={router} />, rootElement)
}
