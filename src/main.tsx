import { RouterProvider, createRouter } from "@tanstack/solid-router"
import { render } from "solid-js/web"

import { MetaProvider } from "@solidjs/meta"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")
if (rootElement && !rootElement.innerHTML) {
  render(
    () => (
      <MetaProvider>
        <title>HZC Solid!</title>
        <meta
          name="description"
          content="The merge between Tanstack Router and Solid.js for HZC study project."
        />
        <RouterProvider router={router} />
      </MetaProvider>
    ),
    rootElement
  )
}
