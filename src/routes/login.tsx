import { Logo } from "@/assets/svgs/logo"
import { Button } from "@/components/button"
import { FormErrorDescription, FormLabel, FormWrapper } from "@/components/form"
import { Input } from "@/components/input"
import { type SubmitHandler, createForm, zodForm } from "@modular-forms/solid"
import { Link, createFileRoute, redirect } from "@tanstack/solid-router"
import Cookies from "js-cookie"
import { createEffect } from "solid-js"

import { z } from "zod"

const authLoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "O valor é obrigatório!" })
    .email({ message: "Insira um e-mail válido" }),
  password: z.string().nonempty({ message: "O valor é obrigatório!" }),
})

type AuthLoginSchema = z.infer<typeof authLoginSchema>

export const Route = createFileRoute("/login")({
  beforeLoad: authBeforeLoader,
  component: AuthRoute,
})

function authBeforeLoader() {
  const authToken = Cookies.get("authToken")
  if (authToken) {
    return redirect({
      from: "/login",
      to: "/",
      replace: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  }
}

function AuthRoute() {
  const [form, { Field, Form }] = createForm<AuthLoginSchema>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodForm(authLoginSchema),
  })

  const handleSubmit: SubmitHandler<AuthLoginSchema> = (values) => {
    console.log("values", values)
    console.log("form", form)
  }

  createEffect(() => console.log("form", form))

  return (
    <main class="flex h-full w-full items-center justify-center bg-neutral-900">
      <div class="flex h-133 w-136 flex-col items-center gap-6">
        <h6 class="text-base text-neutral-50">Bem-vindo à plataforma da:</h6>
        <Logo />
        <p class="text-base text-neutral-50">Utilize seus dados para acessar a sua conta</p>
        <Form class="flex w-full flex-col gap-8" onSubmit={handleSubmit} shouldFocus={false}>
          <Field name="email">
            {(field, props) => {
              return (
                <FormWrapper {...field}>
                  <FormLabel>E-mail</FormLabel>
                  <Input {...props} placeholder="E-mail" />
                  <FormErrorDescription />
                </FormWrapper>
              )
            }}
          </Field>
          <Field name="password">
            {(field, props) => {
              return (
                <FormWrapper {...field}>
                  <FormLabel>Senha</FormLabel>
                  <Input {...props} type="password" placeholder="Senha" />
                  <FormErrorDescription />
                </FormWrapper>
              )
            }}
          </Field>

          <Button type="submit" disabled={form.invalid}>
            {form.submitting ? "..." : "Entrar"}
          </Button>
        </Form>
        <p class="ml-auto text-primary-500 text-sm">
          Não possui uma conta?{" "}
          <Link
            to="/register"
            class="font-bold underline transition-colors duration-200 hover:text-primary-500/80"
          >
            Registre-se!
          </Link>
        </p>
      </div>
    </main>
  )
}
