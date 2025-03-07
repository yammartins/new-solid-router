import { RouterProvider, createRouter } from "@tanstack/solid-router"
import { render } from "solid-js/web"

import "./styles/index.css"
import { MetaProvider } from "@solidjs/meta"
import Cookies from "js-cookie"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    authToken: Cookies.get("authToken"),
  },
})

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  const authToken = Cookies.get("hzc-token")

  return (
    <MetaProvider>
      <title>%s | HZC Solid!</title>
      <meta
        name="description"
        content="The merge between Tanstack Router and Solid.js for HZC study project."
      />
      <RouterProvider router={router} context={{ authToken }} />
    </MetaProvider>
  )
}

const rootElement = document.getElementById("root")
if (rootElement && !rootElement.innerHTML) {
  render(() => <App />, rootElement)
}
