import { Logo } from "@/assets/svgs/logo"
import { createFileRoute, redirect } from "@tanstack/solid-router"
import Cookies from "js-cookie"

export const Route = createFileRoute("/login")({
  beforeLoad: authBeforeLoader,
  component: AuthRoute,
})

function authBeforeLoader() {
  const authToken = Cookies.get("authToken")
  if (authToken) {
    return redirect({
      from: "/",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  }
}

function AuthRoute() {
  return (
    <main class="flex h-full w-full items-center justify-center bg-neutral-900">
      <div class="flex h-133 w-136 flex-col items-center gap-6">
        <h6 class="text-base text-neutral-50">Bem-vindo à plataforma da:</h6>
        <Logo />
        <p class="text-base text-neutral-50">Utilize seus dados para acessar a sua conta</p>
      </div>
    </main>
  )
}
