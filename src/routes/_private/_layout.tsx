import { Outlet, createFileRoute, redirect } from "@tanstack/solid-router"
import Cookies from "js-cookie"

export const Route = createFileRoute("/_private/_layout")({
  component: RouteComponent,
  beforeLoad: privateLoader,
})

function privateLoader() {
  const authToken = Cookies.get("hzc-token")
  if (!authToken) {
    return redirect({
      to: "/login",
      replace: true,
    })
  }
}

function RouteComponent() {
  return (
    <div>
      Teste se isso daqui funciona.
      <Outlet />
    </div>
  )
}
