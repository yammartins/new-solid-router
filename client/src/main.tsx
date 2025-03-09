import { RouterProvider, createRouter } from "@tanstack/solid-router"
import { render } from "solid-js/web"

import "./styles/index.css"
import { Link, Meta, MetaProvider, Title } from "@solidjs/meta"
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
      <Title>HZC Solid!</Title>
      <Meta
        name="description"
        content="The merge between Tanstack Router and Solid.js for HZC study project."
      />
      <Meta charset="UTF-8" />
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <Link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400..800;1,400..800&display=swap"
        rel="stylesheet"
      />

      <Link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <Link rel="manifest" href="/site.webmanifest" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <RouterProvider router={router} context={{ authToken }} />
    </MetaProvider>
  )
}

const rootElement = document.getElementById("root")
if (rootElement && !rootElement.innerHTML) {
  render(() => <App />, rootElement)
}
